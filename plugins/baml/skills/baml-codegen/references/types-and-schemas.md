# BAML Types and Schemas Reference

Complete reference for BAML's type system, which compiles to native Pydantic models (Python) and TypeScript interfaces.

## Primitive Types

```baml
bool      // true, false
int       // 42, -10, 0
float     // 3.14, -0.5, 2.0
string    // "text", 'text'
null      // null value
```

## Composite Types

### Arrays

```baml
string[]           // array of strings
int[]              // array of integers
int[][]            // nested arrays (matrix)
```

Arrays **cannot be optional** in BAML.

### Optional Types

```baml
class User {
  name string      // Required
  nickname string? // Optional (shorthand)
}
```

### Union Types

```baml
string | int       // union type (tries string first, then int)
int | string | bool | float  // multiple types
```

### Maps

```baml
map<string, int>        // key-value map
map<string, string[]>   // map with array values
map<string, string | int | bool>  // map with union values
```

Map keys must be strings or enums.

### Literal Unions

```baml
"a" | "b" | "c"    // literal string union
1 | 2 | 3          // literal number union
"high" | "medium" | "low"  // prefer over enums for small fixed sets
```

## Multimodal Types

```baml
image    // for vision models
audio    // for audio models
video    // for video models
pdf      // for document models
```

**Usage in functions:**
```baml
function DescribeImage(img: image) -> string {
  client "openai/gpt-4o"
  prompt #"
    {{ _.role("user") }}
    Describe this image:
    {{ img }}
    {{ ctx.output_format }}
  "#
}
```

**Python usage:**
```python
from baml_py import Image

# From URL
result = b.DescribeImage(Image.from_url("https://example.com/photo.jpg"))

# From base64
result = b.DescribeImage(Image.from_base64("image/png", base64_string))

# From file path
result = b.DescribeImage(Image.from_url("file://path/to/image.jpg"))
```

**TypeScript usage:**
```typescript
import { Image } from "@boundaryml/baml"

// From URL
const result = await b.DescribeImage(Image.fromUrl("https://example.com/photo.jpg"))

// From base64
const result = await b.DescribeImage(Image.fromBase64("image/png", base64String))
```

## Type Aliases

```baml
type Primitive = int | string | bool | float
type Graph = map<string, string[]>

// Recursive types are supported through containers
type JsonValue = int | string | bool | float | JsonObject | JsonArray
type JsonObject = map<string, JsonValue>
type JsonArray = JsonValue[]
```

Use type aliases to:
- Give semantic names to complex types
- Define recursive structures
- Reuse type definitions across schemas

## Classes (Structured Types)

Classes define structured data. **Properties have NO colon** after the field name.

```baml
class MyObject {
  // Required string
  name string

  // Optional field (use ?)
  nickname string?

  // Field with description (goes AFTER the type)
  age int @description("Age in years")

  // Field with alias (renames for LLM, keeps original in code)
  email string @alias("email_address")

  // Arrays (cannot be optional)
  tags string[]

  // Nested objects
  address Address

  // Enum field
  status Status

  // Union type
  result "success" | "error"

  // Literal types
  version 1 | 2 | 3

  // Map type
  metadata map<string, string>

  // Multimodal
  photo image
}
```

### Field Attributes

**@alias** - Rename field for LLM (keeps original name in generated code):
```baml
class Person {
  fullName string @alias("full_name")
  email string @alias("email_address")
}
```

**@description** - Add context for the LLM (critical for extraction accuracy):
```baml
class Task {
  priority int @description("1-5 where 5 is highest")
  dueDate string @description("Format: yyyy-mm-dd")
  amount float @description("Dollar amount without currency symbols")
}
```

**@skip** - Exclude from LLM prompt schema:
```baml
class User {
  name string
  internal_id string @skip  // Not sent to LLM
}
```

### Class Attributes

**@@dynamic** - Allow adding fields at runtime:
```baml
class Resume @@dynamic {
  name string
  email string
}
```

**Python usage:**
```python
from baml_client.type_builder import TypeBuilder

tb = TypeBuilder()
tb.Resume.add_property("linkedin", tb.string())
tb.Resume.add_property("github", tb.string().optional())
result = b.ExtractResume(text, {"tb": tb})
```

**TypeScript usage:**
```typescript
import { TypeBuilder } from './baml_client/type_builder'

const tb = new TypeBuilder()
tb.Resume.addProperty("linkedin", tb.string())
tb.Resume.addProperty("github", tb.string().optional())
const result = await b.ExtractResume(text, { tb })
```

### Recursive Classes

```baml
// Tree structure
class Node {
  value int
  children Node[]
}

// Document hierarchy
class Section {
  heading string
  content string
  subsections Section[]  // Recursive reference
}

// File system
class FileNode {
  name string
  type "file" | "directory"
  children FileNode[]
}
```

## Enums

Enums are for classification tasks with a fixed set of values.

```baml
enum Category {
  PENDING
  ACTIVE @description("Currently being processed")
  COMPLETE
  CANCELLED @alias("CANCELED") @description("Was stopped before completion")
  INTERNAL @skip  // Exclude from prompt
}

enum Priority {
  Low
  Medium
  High
}

enum Status {
  DRAFT
  PUBLISHED
  ARCHIVED
}
```

### Enum Value Attributes

- `@alias("name")` - Rename value for LLM
- `@description("...")` - Add context to guide LLM
- `@skip` - Exclude from prompt schema

### Dynamic Enums

```baml
// Dynamic enum (can modify at runtime)
enum DynamicCategory {
  Value1
  Value2
  @@dynamic
}
```

**Python usage:**
```python
from baml_client.type_builder import TypeBuilder

tb = TypeBuilder()
tb.DynamicCategory.add_value("Value3")
tb.DynamicCategory.add_value("Value4")
result = b.Classify(text, {"tb": tb})
```

**TypeScript usage:**
```typescript
import { TypeBuilder } from './baml_client/type_builder'

const tb = new TypeBuilder()
tb.DynamicCategory.addValue("Value3")
tb.DynamicCategory.addValue("Value4")
const result = await b.Classify(text, { tb })
```

## Union Types for Tool Selection

Union return types enable LLM-powered routing and tool selection:

```baml
class SearchQuery {
  query string
}

class WeatherRequest {
  city string
}

class CalendarEvent {
  title string
  date string
}

function RouteRequest(input: string) -> SearchQuery | WeatherRequest | CalendarEvent {
  client "openai/gpt-4o"
  prompt #"
    Determine what the user wants and extract the appropriate data.

    {{ _.role("user") }}
    {{ input }}

    {{ ctx.output_format }}
  "#
}
```

**Python usage:**
```python
result = b.RouteRequest("What's the weather in Seattle?")

if isinstance(result, WeatherRequest):
    # Handle weather query
    print(f"Weather for {result.city}")
elif isinstance(result, SearchQuery):
    # Handle search
    print(f"Searching for: {result.query}")
elif isinstance(result, CalendarEvent):
    # Handle calendar
    print(f"Event: {result.title} on {result.date}")
```

## Nested Structures

```baml
class Address {
  street string
  city string
  state string
  zip_code string
}

class Company {
  name string
  founded_year int
  headquarters Address  // Nested object
  offices Address[]     // Array of nested objects
}

class Employee {
  name string
  company Company       // Deeply nested
  metadata map<string, string>
}
```

**Best practice:** Keep nesting to 3-4 levels maximum for extraction accuracy.

## Calculated Fields

Use @description to hint at calculations the LLM should perform:

```baml
class LineItem {
  quantity int
  unit_price float
  total float @description("quantity * unit_price")
}

class Invoice {
  items LineItem[]
  subtotal float @description("Sum of all line item totals")
  tax_rate float
  tax_amount float @description("subtotal * tax_rate")
  total float @description("subtotal + tax_amount")
}
```

## Complete Type System Example

```baml
// Type aliases for reusability
type Primitive = int | string | bool | float
type Graph = map<string, string[]>

// Enum for classification
enum Priority {
  LOW
  MEDIUM
  HIGH
  CRITICAL @description("Requires immediate attention")
}

// Basic class with various field types
class Task {
  id string
  title string
  description string @description("Detailed task description")
  priority Priority
  status "pending" | "in_progress" | "completed"
  tags string[]
  metadata map<string, string>
  assignee User?  // Optional nested object
  due_date string? @description("Format: yyyy-mm-dd")
}

// Class with nested and recursive types
class User {
  name string
  email string @alias("email_address")
  manager User?  // Recursive reference
  tasks Task[]   // Array of nested objects
}

// Class with multimodal field
class Report {
  title string
  content string
  attachments image[]
  created_at string
}

// Dynamic class for runtime flexibility
class CustomData @@dynamic {
  base_field string
  // Additional fields can be added at runtime via TypeBuilder
}

// Function using these types
function ExtractTasks(document: string) -> Task[] {
  client "openai/gpt-4o"
  prompt #"
    Extract all tasks from the following document.

    {{ _.role("user") }}
    {{ document }}

    {{ ctx.output_format }}
  "#
}
```

## TypeBuilder (Dynamic Types at Runtime)

`TypeBuilder` allows modifying output schemas at runtime - useful for dynamic categories from databases or user-provided schemas.

### Setup: Mark types as @@dynamic

```baml
enum Category {
  RED
  BLUE
  @@dynamic  // Allows runtime modification
}

class User {
  name string
  age int
  @@dynamic  // Allows adding properties at runtime
}
```

### Modify Types at Runtime

**Python:**
```python
from baml_client.type_builder import TypeBuilder
from baml_client import b

tb = TypeBuilder()

# Add enum values
tb.Category.add_value('GREEN')
tb.Category.add_value('YELLOW')

# Add class properties
tb.User.add_property('email', tb.string())
tb.User.add_property('address', tb.string().optional())

# Pass TypeBuilder when calling function
result = b.Categorize("The sun is bright", {"tb": tb})
```

**TypeScript:**
```typescript
import { TypeBuilder } from './baml_client/type_builder'
import { b } from './baml_client'

const tb = new TypeBuilder()

// Add enum values
tb.Category.addValue('GREEN')
tb.Category.addValue('YELLOW')

// Add class properties
tb.User.addProperty('email', tb.string())
tb.User.addProperty('address', tb.string().optional())

// Pass TypeBuilder when calling function
const result = await b.Categorize("The sun is bright", { tb })
```

### Create New Types at Runtime

```python
tb = TypeBuilder()

# Create a new enum
hobbies = tb.add_enum("Hobbies")
hobbies.add_value("Soccer")
hobbies.add_value("Reading")

# Create a new class
address = tb.add_class("Address")
address.add_property("street", tb.string())
address.add_property("city", tb.string())

# Attach to existing type
tb.User.add_property("hobbies", hobbies.type().list())
tb.User.add_property("address", address.type())
```

### TypeBuilder Methods

| Method | Description |
|--------|-------------|
| `tb.string()` | String type |
| `tb.int()` | Integer type |
| `tb.float()` | Float type |
| `tb.bool()` | Boolean type |
| `tb.string().list()` | List of strings |
| `tb.string().optional()` | Optional string |
| `tb.add_class("Name")` | Create new class |
| `tb.add_enum("Name")` | Create new enum |
| `.add_property(name, type)` | Add property to class |
| `.add_value(name)` | Add value to enum |
| `.description("...")` | Add description |

## Type System Best Practices

### For Extraction Accuracy
- Set temperature to 0.0 for consistent parsing
- Use `@description` to clarify ambiguous fields
- Prefer enums over strings when values are known
- Use `@assert` for critical validations
- Use literal unions (`"high" | "medium" | "low"`) for small fixed sets instead of enums

### For Type Design
- Keep nesting to 3-4 levels maximum
- Use `?` for truly optional fields
- Prefer unions over generic types when possible
- One class per concept (avoid bloated classes)
- Use descriptive field names
- Group related types in the same .baml file

### For Token Efficiency
- Rely on `{{ ctx.output_format }}` for schema injection
- Use `@alias` sparingly (adds tokens to prompts)
- Use `@skip` for fields that don't need LLM extraction
- Avoid repeating field names in `@description` attributes

### For Maintainability
- Use type aliases to name complex types
- Define shared types once and reuse
- Use recursive types for hierarchical data
- Document calculated fields with `@description`
- Prefer composition over deep nesting

## Common Patterns

### Chat History
```baml
class Message {
  role "user" | "assistant"
  content string
}

function Chat(messages: Message[]) -> string {
  client "openai/gpt-4o"
  prompt #"
    {{ _.role("system") }}
    You are a helpful assistant.

    {% for message in messages %}
      {{ _.role(message.role) }}
      {{ message.content }}
    {% endfor %}
  "#
}
```

### Classification with Confidence
```baml
class Classification {
  category Category
  confidence "low" | "medium" | "high"
  reasoning string @description("Why this category was chosen")
}
```

### Entity Extraction
```baml
class Person {
  name string
  title string?
  organization string?
  email string?
}

class Document {
  title string
  summary string
  people Person[]
  topics string[]
}
```

### Structured Extraction with Validation
```baml
class Email {
  from_address string @description("Must be valid email format")
  to_addresses string[] @description("List of valid email addresses")
  subject string
  body string
  sentiment "positive" | "negative" | "neutral"
  priority Priority
}
```

## Generated Type Mapping

### Python (Pydantic)
```python
from baml_client.types import Task, Priority

# BAML class -> Pydantic model
task = Task(
    id="123",
    title="Example",
    priority=Priority.HIGH,
    tags=["urgent", "bug"]
)
```

### TypeScript
```typescript
import { Task, Priority } from './baml_client/types'

// BAML class -> TypeScript interface
const task: Task = {
    id: "123",
    title: "Example",
    priority: Priority.HIGH,
    tags: ["urgent", "bug"]
}
```

## Additional Resources

- **Type System Documentation**: https://docs.boundaryml.com/guide/baml-basics/types
- **TypeBuilder Guide**: https://docs.boundaryml.com/ref/baml-client/typebuilder
- **Dynamic Types**: https://docs.boundaryml.com/guide/baml-advanced/dynamic-runtime-types
- **Validation with Checks**: https://docs.boundaryml.com/guide/baml-advanced/checks-and-asserts
