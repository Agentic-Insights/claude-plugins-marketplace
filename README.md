# AWS AgentCore + LangGraph

A LangGraph agent with web search capabilities, deployed on AWS Bedrock AgentCore.

Also distributed as a **Claude Code plugin** with skills for AgentCore + LangGraph integration patterns.

## Claude Code Plugin Installation

```bash
# Add the marketplace
/plugin marketplace add Agentic-Insights/agentcore-lg

# Install the plugin
/plugin install aws-agentcore-langgraph@agentcore-lg-marketplace
```

Or install directly from GitHub:
```bash
/plugin install github:Agentic-Insights/agentcore-lg
```

Once installed, the skill auto-activates when you work on:
- Deploying LangGraph agents to AgentCore
- Adding AgentCore Memory (STM/LTM) to agents
- Creating Gateway MCP tools (Lambda, OpenAPI, MCP servers)
- Using `agentcore` CLI workflows

### Skill Contents

```
skills/aws-agentcore-langgraph/
├── SKILL.md                      # Main entry point
├── reference/
│   ├── agentcore-cli.md         # All primitives + AWS CLI
│   ├── agentcore-gateway.md     # Lambda/OpenAPI/MCP → tools
│   ├── agentcore-memory.md      # STM/LTM patterns
│   ├── agentcore-runtime.md     # Streaming, async, tools
│   └── langgraph-patterns.md    # StateGraph best practices
└── scripts/
    ├── list-all.sh              # List all AgentCore resources
    ├── agent-details.sh         # Get agent info
    ├── memory-details.sh        # Get memory info
    └── tail-logs.sh             # Stream runtime logs
```

## Quick Start

```bash
# Install dependencies
uv sync

# Configure environment
cp .env.example .env
# Edit .env with your settings

# Deploy to AgentCore
agentcore configure -e langgraph_agent_web_search.py --region us-east-1
agentcore launch

# Test
agentcore invoke '{"prompt": "What is the tallest mountain in Africa?"}'

# Cleanup
agentcore destroy
```

## Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| `AWS_PROFILE` | AWS CLI profile | - |
| `AWS_REGION` | AWS region | `us-east-1` |
| `BEDROCK_MODEL_ID` | Bedrock model | `us.anthropic.claude-haiku-4-5-20251001-v1:0` |
| `BEDROCK_MODEL_PROVIDER` | Model provider | `bedrock_converse` |

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    AgentCore Runtime                     │
│  ┌───────────────────────────────────────────────────┐  │
│  │              LangGraph StateGraph                 │  │
│  │  ┌─────────┐    tools_condition    ┌──────────┐  │  │
│  │  │ chatbot │ ──────────────────────▶│  tools   │  │  │
│  │  └─────────┘ ◀─────────────────────└──────────┘  │  │
│  │       │                                  │        │  │
│  │       ▼                                  ▼        │  │
│  │  Claude 4.5 Haiku              DuckDuckGo Search  │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

## Requirements

- Python 3.11+
- AWS account with Bedrock access
- Model access enabled for Claude models in Bedrock console
