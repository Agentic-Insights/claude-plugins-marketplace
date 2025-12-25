# Validation Patterns Reference

Guide to using @assert and @check for data quality enforcement in BAML.

## Overview

- **@assert**: Strict validation - raises exception on failure
- **@check**: Non-blocking validation - tracks pass/fail for monitoring

Both use Jinja2 expressions wrapped in `{{ }}` delimiters.

**Syntax:**
- Field-level: `@assert(name, {{ expression }})` or `@check(name, {{ expression }})`
- Block-level: `@@assert(name, {{ expression }})`
- Return type: `-> Type @assert(name, {{ expression }})`

## @assert - Strict Validation

### Basic Assertions

```baml
class Payment {
  amount float @assert(positive_amount, {{ this > 0 }})
  currency string @assert(valid_currency, {{ this in ["USD", "EUR", "GBP"] }})
  status string @assert(valid_status, {{ this in ["pending", "completed", "failed"] }})
}
```

### Numeric Constraints

```baml
class Product {
  price float @assert(non_negative_price, {{ this >= 0 }})
  quantity int @assert(positive_quantity, {{ this > 0 }})
  discount_percent float @assert(valid_discount, {{ this >= 0 and this <= 100 }})
  rating float @assert(valid_rating, {{ this >= 1 and this <= 5 }})
}
```

### String Validations

```baml
class User {
  username string @assert(valid_username_length, {{ this|length >= 3 and this|length <= 20 }})
  email string @assert(has_at_and_dot, {{ "@" in this and "." in this }})
  phone string @assert(valid_phone_length, {{ this|length == 10 }})
}
```

### Regex Validation

```baml
class Contact {
  email string @assert(valid_email, {{ this|regex_match("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$") }})
  phone string @assert(valid_phone_format, {{ this|regex_match("^\\d{3}-\\d{3}-\\d{4}$") }})
}
```

### Collection Validations

```baml
class Data {
  tags string[] @assert(non_empty_tags, {{ this|length > 0 }})
  scores int[] @assert(valid_score_range, {{ this|min >= 0 and this|max <= 100 }})
}

class Team {
  members string[] @assert(unique_members, {{ this|unique|length == this|length }})  // No duplicates
}
```

## @check - Monitoring Validation

Non-blocking - data passes through but status is tracked.

```baml
class Citation {
  line_number int @assert(positive_line, {{ this > 0 }})           // Strict
  quote string @check(exact_citation_found, {{ this|length > 0 }})  // Monitored
  website_link string @check(valid_link, {{ "https://" in this }})
}
```

### Accessing Check Results

```python
result = b.GetCitation(text)

if result.__baml_checks__.exact_citation_found.passed:
    print("Citation found!")
else:
    log_warning("Citation might be missing", result.quote)

# Check all
all_passed = all(
    check.passed
    for check in result.__baml_checks__.__dict__.values()
)
```

## Block-Level Validation (@@assert)

Validate relationships between fields:

```baml
class Invoice {
  subtotal float
  tax_amount float
  total float
  @@assert(valid_total, {{ this.total == this.subtotal + this.tax_amount }})
}

class DateRange {
  start_date string
  end_date string
  @@assert(valid_date_range, {{ this.start_date <= this.end_date }})
}
```

## Return Type Assertions

Apply validations to function return values:

```baml
function GetScore(input: string) -> int @assert(valid_score, {{ this >= 0 and this <= 100 }}) {
  client "openai/gpt-4o"
  prompt #"
    Rate this on a scale of 0-100: {{ input }}
    {{ ctx.output_format }}
  "#
}

class Person {
  age int @assert(valid_age, {{ this >= 0 and this <= 150 }})
  email string @assert(valid_email, {{ this|regex_match("@") }})
}
```

## Validation Expressions

### Operators

```baml
{{ this > 0 }}                     // Comparison
{{ this >= 10 and this < 100 }}    // Logical
{{ this in ["a", "b"] }}           // Membership
{{ "@" in this }}                  // Contains
```

### Available Jinja Filters

```baml
{{ this|length > 5 }}              // String/collection length
{{ this|lower == "test" }}         // String transform
{{ this|regex_match("pattern") }}  // Regex validation
{{ this|min >= 0 }}                // Collection min
{{ this|max <= 100 }}              // Collection max
{{ this|sum == 1000 }}             // Collection sum
{{ this|unique|length == this|length }}  // No duplicates
```

## Production Patterns

### Layered Validation

```baml
class Transaction {
  amount float
    @assert(positive_amount, {{ this > 0 }})                         // Critical
    @check(reasonable_amount, {{ this <= 10000 }})  // Warning
}
```

### Calculated Field Verification

```baml
class LineItem {
  quantity int @assert(positive_qty, {{ this > 0 }})
  unit_price float @assert(non_negative_price, {{ this >= 0 }})
  subtotal float @check(correct_calc, {{ this == quantity * unit_price }})
}
```

If calculation is wrong, data returns but check fails - fix in app:

```python
for item in items:
    if not item.__baml_checks__.correct_calc.passed:
        item.subtotal = item.quantity * item.unit_price
```

### Confidence Scoring

```baml
class Extraction {
  value string @check(high_confidence, {{ this|length > 5 }})
  source string @check(has_source, {{ this|length > 0 }})
}
```

```python
result = b.Extract(doc)
confidence = sum(
    1 for check in result.__baml_checks__.__dict__.values()
    if check.passed
) / len(result.__baml_checks__.__dict__)

if confidence < 0.7:
    queue_for_manual_review(result)
```

## Best Practices

### Use @assert For
- Critical business rules
- Data integrity requirements
- Type constraints
- Security validations

### Use @check For
- Quality monitoring
- Optional validations
- Calculated field verification
- Confidence tracking

### Error Handling

```python
from baml_client.errors import BamlValidationError

try:
    result = b.ExtractData(text)
except BamlValidationError as e:
    # Fallback or manual review
    result = b_fallback.ExtractData(text)
```

### Testing Validations

```baml
test ValidPayment {
  functions [ExtractPayment]
  args { text "Payment of $100 USD" }
  @@assert(valid_amount, {{ this.amount > 0 }})
  @@assert(valid_currency, {{ this.currency in ["USD", "EUR"] }})
}
```

## Syntax Summary

| Level | Assert | Check |
|-------|--------|-------|
| Field | `field Type @assert(name, {{ expr }})` | `field Type @check(name, {{ expr }})` |
| Block | `@@assert(name, {{ expr }})` | `@@check(name, {{ expr }})` |
| Return Type | `-> Type @assert(name, {{ expr }})` | `-> Type @check(name, {{ expr }})` |

**Key Points:**
- All assertions and checks require a **name** as the first parameter
- All expressions must be wrapped in `{{ }}` Jinja delimiters
- Use `this` to reference the current field/object value
- Block-level validations use `this.field_name` to access fields
- Checks don't raise exceptions - inspect `__baml_checks__` for results
