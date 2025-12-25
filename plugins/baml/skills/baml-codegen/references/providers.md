# Provider Configuration Reference

Complete guide to configuring LLM providers in BAML with retry policies, fallback strategies, load balancing, and advanced configuration options.

## Provider Basics

```baml
client<llm> ClientName {
  provider PROVIDER_TYPE
  retry_policy RETRY_POLICY_NAME    // Optional
  options {
    // Provider-specific options
  }
}
```

## Supported Providers

BAML supports native providers with first-class integration and OpenAI-compatible providers through the `openai-generic` adapter.

### Native Providers

First-class support with optimized implementations:

| Provider | Shorthand Example | Default API Key Env Var |
|----------|-------------------|------------------------|
| **openai** | `"openai/gpt-4o"` | `OPENAI_API_KEY` |
| **anthropic** | `"anthropic/claude-sonnet-4-20250514"` | `ANTHROPIC_API_KEY` |
| **google-ai** | `"google-ai/gemini-2.0-flash"` | `GOOGLE_API_KEY` |
| **vertex** | `"vertex/gemini-2.0-flash"` | Google Cloud credentials |
| **azure-openai** | (requires full config) | `AZURE_OPENAI_API_KEY` |
| **aws-bedrock** | (requires full config) | AWS credentials |

### OpenAI-Compatible Providers

These providers use OpenAI's API format. Configure them using `provider openai-generic` with their specific `base_url`:

| Service | base_url |
|---------|----------|
| **Groq** | `https://api.groq.com/openai/v1` |
| **Together AI** | `https://api.together.ai/v1` |
| **OpenRouter** | `https://openrouter.ai/api/v1` |
| **Ollama** | `http://localhost:11434/v1` |
| **Cerebras** | `https://api.cerebras.ai/v1` |
| **Hugging Face** | `https://api-inference.huggingface.co/v1` |
| **LM Studio** | `http://localhost:1234/v1` |
| **vLLM** | `http://localhost:8000/v1` |

For the complete provider list, see: https://docs.boundaryml.com/ref/llm-client

## Shorthand vs Named Client Syntax

### Shorthand (Quick Configuration)

Use for rapid prototyping with default settings:

```baml
function MyFunc(input: string) -> string {
  client "openai/gpt-4o"
  prompt #"
    {{ input }}
    {{ ctx.output_format }}
  "#
}
```

Automatically uses the default environment variable for API keys (e.g., `OPENAI_API_KEY` for OpenAI).

### Named Client (Full Control)

Use for production with custom configuration:

```baml
client<llm> MyClient {
  provider openai
  options {
    model "gpt-4o"
    api_key env.MY_OPENAI_KEY
    temperature 0.7
    max_tokens 1000
  }
}

function MyFunc(input: string) -> string {
  client MyClient
  prompt #"..."#
}
```

## Provider Configurations

### OpenAI

**Full Configuration:**
```baml
client<llm> GPT4 {
  provider openai
  options {
    model "gpt-4o"           // or "gpt-4o-mini", "gpt-4-turbo", "o1", "o1-mini"
    api_key env.OPENAI_API_KEY
    temperature 0.0          // 0.0 for extraction, 0.7-1.0 for creative tasks
    max_tokens 4096
    base_url "https://api.openai.com/v1"  // Optional override
  }
}
```

**Shorthand:**
```baml
client<llm> GPT4Mini {
  provider "openai/gpt-4o-mini"  // Uses env.OPENAI_API_KEY
}
```

**Supported Models:**
- `gpt-4o` - Most capable for complex extraction
- `gpt-4o-mini` - Fast and cost-effective
- `gpt-4-turbo` - Previous generation flagship
- `o1-mini`, `o1-preview` - Reasoning models (no temperature support)

**Temperature Guidelines:**
- **0.0** - Extraction, factual tasks (recommended)
- **0.3-0.5** - Balanced extraction with slight creativity
- **0.7-1.0** - Creative generation (not for extraction)

### Anthropic

**Full Configuration:**
```baml
client<llm> Claude {
  provider anthropic
  options {
    model "claude-sonnet-4-20250514"  // or "claude-3-5-haiku-latest"
    api_key env.ANTHROPIC_API_KEY
    max_tokens 4096
    temperature 0.0
  }
}
```

**Supported Models:**
- `claude-sonnet-4-20250514` - Best balance of capability and cost
- `claude-opus-4-20250514` - Most powerful
- `claude-haiku-4-20250514` - Fast and efficient
- `claude-3-5-haiku-latest` - Latest Haiku version

**Prompt Caching:**

Reduce costs by caching static context (system prompts, documentation):

```baml
client<llm> ClaudeWithCache {
  provider anthropic
  options {
    model "claude-sonnet-4-20250514"
    api_key env.ANTHROPIC_API_KEY
    allowed_role_metadata ["cache_control"]
  }
}

function Extract(doc: string) -> Data {
  client ClaudeWithCache
  prompt #"
    {{ _.role("system", cache_control={"type": "ephemeral"}) }}
    You are an expert extractor.

    {{ _.role("user") }}
    Extract from: {{ doc }}
    {{ ctx.output_format }}
  "#
}
```

### Google AI (Gemini)

**Full Configuration:**
```baml
client<llm> Gemini {
  provider google-ai
  options {
    model "gemini-2.0-flash"  // or "gemini-2.5-pro", "gemini-2.5-flash"
    api_key env.GOOGLE_API_KEY
    generationConfig {
      temperature 0.7
    }
  }
}
```

**Shorthand:**
```baml
client "google-ai/gemini-2.0-flash"
```

### Azure OpenAI

**Full Configuration:**
```baml
client<llm> AzureGPT {
  provider azure-openai
  options {
    resource_name "my-resource"
    deployment_id "my-deployment"
    api_key env.AZURE_OPENAI_API_KEY
  }
}
```

Note: Azure requires full configuration - shorthand syntax is not available.

### Groq

**Configuration:**
```baml
client<llm> Groq {
  provider openai-generic
  options {
    base_url "https://api.groq.com/openai/v1"
    api_key env.GROQ_API_KEY
    model "llama-3.1-70b-versatile"
    temperature 0.7
  }
}
```

### Together AI

**Configuration:**
```baml
client<llm> Together {
  provider openai-generic
  options {
    base_url "https://api.together.ai/v1"
    api_key env.TOGETHER_API_KEY
    model "meta-llama/Llama-3-70b-chat-hf"
  }
}
```

### OpenRouter

**Configuration:**
```baml
client<llm> OpenRouter {
  provider openai-generic
  options {
    base_url "https://openrouter.ai/api/v1"
    api_key env.OPENROUTER_API_KEY
    model "anthropic/claude-3.5-sonnet"
  }
}
```

### Ollama (Local)

Ollama uses `openai-generic` provider for OpenAI-compatible APIs.

**Local Development:**
```baml
client<llm> OllamaLocal {
  provider openai-generic
  options {
    base_url "http://localhost:11434/v1"
    model "llama3"
    temperature 0.7
  }
}
```

No API key required for local Ollama.

**Remote Ollama (e.g., Windows host from WSL):**
```baml
client<llm> OllamaRemote {
  provider openai-generic
  options {
    base_url "http://172.30.224.1:11434/v1"
    model "llama3"
  }
}
```

**Supported Models:**
- `llama3` (8B, 70B) - General purpose
- `mistral` - Fast inference
- `mixtral` - Mixture of experts
- `qwen2` - Multilingual
- `codellama` - Code generation

## Retry Policies

Retry policies provide automatic recovery from transient failures with exponential backoff.

### Basic Retry Configuration

```baml
retry_policy StandardRetry {
  max_retries 3
}

client<llm> ResilientClient {
  provider openai
  retry_policy StandardRetry
  options {
    model "gpt-4o"
  }
}
```

**Automatic exponential backoff**: ~100ms → ~200ms → ~400ms (with jitter)

**Retried conditions:**
- Network timeouts
- 5xx server errors
- 429 rate limits

**Not retried:**
- 4xx client errors
- Invalid API keys
- Validation errors

### Advanced Retry Configuration

Full control over retry strategy:

```baml
retry_policy CustomRetry {
  max_retries 5
  strategy {
    type exponential_backoff
    delay_ms 200           // Initial delay
    multiplier 1.5         // Backoff multiplier
    max_delay_ms 10000     // Cap maximum delay
  }
}

client<llm> ReliableClient {
  provider anthropic
  retry_policy CustomRetry
  options {
    model "claude-sonnet-4-20250514"
  }
}
```

**Strategy Options:**
- `type` - Always `exponential_backoff`
- `delay_ms` - Initial retry delay in milliseconds
- `multiplier` - Factor to increase delay between retries
- `max_delay_ms` - Maximum delay cap to prevent excessive waits

## Fallback Strategies

Fallback clients provide resilience by attempting multiple providers sequentially.

### Basic Fallback Chain

```baml
client<llm> Primary {
  provider openai
  options { model "gpt-4o" }
}

client<llm> Secondary {
  provider anthropic
  options { model "claude-sonnet-4-20250514" }
}

client<llm> Tertiary {
  provider openai-generic
  options {
    base_url "http://localhost:11434/v1"
    model "llama3"
  }
}

client<llm> ResilientPipeline {
  provider fallback
  options {
    strategy [Primary, Secondary, Tertiary]
  }
}
```

Execution order: Primary → Secondary → Tertiary (stops at first success)

### Cost-Optimized Fallback Pattern

```baml
client<llm> CostOptimized {
  provider fallback
  retry_policy StandardRetry
  options {
    strategy [
      GPT4Mini,   // Tier 1: Cheap and fast
      Claude,     // Tier 2: Balanced capability/cost
      GPT4,       // Tier 3: Most capable
      OllamaLocal // Tier 4: Free local fallback
    ]
  }
}
```

**Best practices:**
- Start with cheaper/faster models
- Use retries on each client before fallback
- Include local model as final safety net
- Test fallback chain thoroughly

## Round-Robin Load Balancing

Distribute requests across multiple clients for horizontal scaling:

```baml
client<llm> ClientA {
  provider openai
  options { model "gpt-4o" }
}

client<llm> ClientB {
  provider openai
  options { model "gpt-4o" }
}

client<llm> ClientC {
  provider openai
  options { model "gpt-4o" }
}

client<llm> LoadBalanced {
  provider round-robin
  options {
    strategy [ClientA, ClientB, ClientC]
  }
}
```

**Use cases:**
- Distribute load across multiple API keys
- Avoid rate limits on high-volume applications
- Geographic load distribution

## Custom Headers

Add custom HTTP headers for authentication, tracking, or provider-specific requirements:

```baml
client<llm> WithHeaders {
  provider openai
  options {
    model "gpt-4o"
    api_key env.OPENAI_API_KEY
    headers {
      "X-Custom-Header" "value"
      "X-Request-ID" "tracking-123"
    }
  }
}
```

**Common use cases:**
- Custom authentication schemes
- Request tracking and observability
- Provider-specific feature flags

## Environment Variables

Reference environment variables using `env.VAR_NAME` syntax:

```baml
client<llm> ConfigurableClient {
  provider openai
  options {
    api_key env.OPENAI_API_KEY
    base_url env.OPENAI_BASE_URL
    model env.OPENAI_MODEL
  }
}
```

### .env File Example

```env
OPENAI_API_KEY=sk-your-openai-key
ANTHROPIC_API_KEY=sk-ant-your-anthropic-key
GOOGLE_API_KEY=your-google-api-key
GROQ_API_KEY=your-groq-key
TOGETHER_API_KEY=your-together-key
OPENROUTER_API_KEY=your-openrouter-key
OLLAMA_BASE_URL=http://localhost:11434/v1
```

**Environment variable patterns:**
- Always use `env.` prefix in BAML
- Store credentials in `.env` files (never commit)
- Use different keys for dev/staging/production
- Validate required variables at startup

## Best Practices

### For Production

- **Always use retry policies** - Minimum 3 retries for resilience
- **Implement fallbacks** - Chain multiple providers for availability
- **Set temperature to 0.0** - Ensures consistent extraction results
- **Separate API keys** - Different credentials for dev/staging/prod
- **Monitor latency** - Track performance with `_.latency_ms` in tests
- **Use named clients** - Full configuration for maintainability

### For Development

- **Use local models** - Ollama for rapid iteration without API costs
- **Use cheaper models** - GPT-4o-mini, Claude Haiku for testing
- **Reduce max_tokens** - Lower costs during development
- **Enable verbose logging** - Easier debugging of provider issues

### For Reliability

- **Chain cheap → expensive** - Start with fast models, fallback to powerful ones
- **Combine retries + fallbacks** - Retry on each provider before moving to next
- **Test failure scenarios** - Verify fallback chains actually work
- **Set reasonable timeouts** - Prevent hanging on slow providers

### For Cost Optimization

- **Start with mini/small models** - Use powerful models only when needed
- **Use prompt caching** - Anthropic caching reduces costs for repeated context
- **Implement smart routing** - Simple tasks → cheap models, complex → expensive
- **Monitor token usage** - Track costs across different providers

## Advanced Patterns

### Multi-Region Redundancy

```baml
client<llm> USEast {
  provider openai
  options {
    model "gpt-4o"
    base_url "https://api.openai.com/v1"
  }
}

client<llm> USWest {
  provider openai
  options {
    model "gpt-4o"
    base_url "https://us-west.api.openai.com/v1"
  }
}

client<llm> GeoRedundant {
  provider fallback
  retry_policy StandardRetry
  options {
    strategy [USEast, USWest]
  }
}
```

### A/B Testing Setup

```baml
client<llm> ModelA {
  provider openai
  options { model "gpt-4o" }
}

client<llm> ModelB {
  provider anthropic
  options { model "claude-sonnet-4-20250514" }
}

client<llm> ABTest {
  provider round-robin
  options {
    strategy [ModelA, ModelB]
  }
}
```

Use with observability to compare performance metrics.

### Budget-Conscious Pipeline

```baml
retry_policy QuickRetry {
  max_retries 2
}

client<llm> BudgetTier {
  provider openai
  retry_policy QuickRetry
  options { model "gpt-4o-mini" }
}

client<llm> PremiumTier {
  provider anthropic
  options { model "claude-sonnet-4-20250514" }
}

client<llm> FreeTier {
  provider openai-generic
  options {
    base_url "http://localhost:11434/v1"
    model "llama3"
  }
}

client<llm> SmartPipeline {
  provider fallback
  options {
    strategy [BudgetTier, PremiumTier, FreeTier]
  }
}
```

## Troubleshooting

### Common Issues

**API Key Not Found:**
```
Error: OPENAI_API_KEY not found in environment
```
- Verify `.env` file exists in project root
- Check variable name matches exactly
- Ensure `.env` is loaded before running BAML

**Base URL Connection Failed:**
```
Error: Connection refused to http://localhost:11434/v1
```
- Verify Ollama/service is running
- Check port number is correct
- Test URL in browser or curl

**Rate Limit Exceeded:**
```
Error: 429 Too Many Requests
```
- Increase retry delays
- Use round-robin with multiple API keys
- Reduce request rate

**Model Not Available:**
```
Error: Model 'gpt-5' not found
```
- Check model name spelling
- Verify model availability in provider
- Consult provider documentation for model list

### Validation Commands

```bash
# Test BAML configuration
baml-cli generate

# Run provider-specific tests
baml-cli test -i "FunctionName:TestName"

# Check environment variables
env | grep API_KEY
```

## Documentation

For detailed provider documentation:
- **Provider Reference**: https://docs.boundaryml.com/ref/llm-client
- **Retry Policies**: https://docs.boundaryml.com/guide/baml-advanced/retry-policies
- **Fallback Clients**: https://docs.boundaryml.com/guide/baml-advanced/fallback-clients

## Summary

This reference covers:
- ✅ Native providers (OpenAI, Anthropic, Google AI, Azure, AWS)
- ✅ OpenAI-compatible providers (Groq, Together, OpenRouter, Ollama)
- ✅ Shorthand vs named client syntax
- ✅ Retry policies with exponential backoff
- ✅ Fallback strategies for resilience
- ✅ Round-robin load balancing
- ✅ Custom headers and authentication
- ✅ Environment variable patterns
- ✅ Production best practices
- ✅ Advanced patterns and troubleshooting

Always refer to the official BAML documentation for the most up-to-date provider capabilities and configuration options.
