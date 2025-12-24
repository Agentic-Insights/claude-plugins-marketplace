---
name: aws-agentcore-langgraph
description: Deploy production LangGraph agents on AWS Bedrock AgentCore. Use for (1) multi-agent systems with orchestrator and specialist agent patterns, (2) building stateful agents with persistent cross-session memory, (3) connecting external tools via AgentCore Gateway (MCP, Lambda, APIs), (4) managing shared context across distributed agents, or (5) deploying complex agent ecosystems via CLI with production observability and scaling.
---

# AWS AgentCore + LangGraph Integration

## Overview: Multi-Agent Systems on AWS

This skill covers building production-grade multi-agent applications using LangGraph orchestration with AWS Bedrock AgentCore managed runtime. It handles the full lifecycle: development, deployment, memory management, tool integration, and observability for complex agent ecosystems across any domain.

- 'uvx tool install install bedrock-agentcore-starter-toolkit' will install ['agentcore' cli](references/agentcore-cli.md)
- 'agentcore dev' runs a dev server
- https://github.com/aws/bedrock-agentcore-starter-toolkit is the repo

### Core Patterns Covered

**Multi-Agent Orchestration**: Orchestrator agents coordinate work across specialist agents, each with focused responsibilities.

**Persistent Memory**: Short-term session context + long-term facts and preferences persist across sessions and agent boundaries.

**Tool Integration**: Connect external APIs, Lambda functions, and MCP servers via AgentCore Gateway with unified auth handling.

**Domain-Agnostic**: These patterns apply to customer service, e-commerce, supply chain, healthcare, financial services, advertising, and any multi-agent domain.

## Quick Start: Minimal Runtime Integration

```python
from langgraph.graph import StateGraph, START
from langgraph.graph.message import add_messages
from langgraph.prebuilt import ToolNode, tools_condition
from bedrock_agentcore.runtime import BedrockAgentCoreApp
from typing import Annotated
from typing_extensions import TypedDict

# 1. Define state
class State(TypedDict):
    messages: Annotated[list, add_messages]

# 2. Build LangGraph
builder = StateGraph(State)
builder.add_node("agent", agent_node)
builder.add_edge(START, "agent")
graph = builder.compile()

# 3. Wrap with AgentCore
app = BedrockAgentCoreApp()

@app.entrypoint
def invoke(payload, context):
    result = graph.invoke({"messages": [("user", payload.get("prompt", ""))]})
    return {"result": result["messages"][-1].content}

app.run()
```

## Multi-Agent Orchestration Pattern

This demonstrates how an orchestrator agent coordinates work across specialist agents using shared memory and gateway tools:

```python
from bedrock_agentcore.memory import MemoryClient
from bedrock_agentcore.gateway import GatewayToolClient

class OrchestratorAgent:
    """Generic orchestrator pattern for any domain."""
    def __init__(self):
        self.memory = MemoryClient()
        self.gateway = GatewayToolClient()

    def orchestrate(self, user_request: str, session_id: str):
        """
        1. Query shared memory for conversation context (STM/LTM)
        2. Delegate to specialist agents in parallel
        3. Integrate external tools via gateway
        4. Synthesize response and store insights
        """
        # Retrieve session context from shared memory
        context = self.memory.list_events(session_id)

        # Invoke specialist agents (can be separate deployed agents or functions)
        specialist_1 = invoke_specialist("SpecialistAgent1", user_request)
        specialist_2 = invoke_specialist("SpecialistAgent2", user_request)
        specialist_3 = invoke_specialist("SpecialistAgent3", user_request)

        # Call external tools via gateway (Lambda, APIs, MCP servers)
        external_data = self.gateway.call("tool_name", param1=value1, param2=value2)

        # Synthesize insights from all sources
        result = synthesize(specialist_1, specialist_2, specialist_3, external_data)

        # Store key facts in long-term memory for future sessions
        self.memory.create_event(
            session_id=session_id,
            actor_id="OrchestratorAgent",
            event_type="decision_made",
            payload={"result": result}
        )

        return result
```

**Key Patterns:**
- **Shared Memory**: `MemoryClient.list_events()` retrieves turn-by-turn conversation (STM) and cross-session facts (LTM)
- **Specialist Delegation**: Orchestrator routes requests to specialists; specialists can be inline functions or separate deployed agents
- **Tool Gateway**: `GatewayToolClient.call()` provides unified access to Lambda, APIs, and MCP servers with auth handling
- **Cross-Agent Context**: All agents in a session share memory via `session_id`, enabling coordinated decision-making

## CLI Workflow

```bash
# Setup
pip install bedrock-agentcore bedrock-agentcore-starter-toolkit langgraph

# Deploy (interactive)
agentcore configure -e agent.py --region us-east-1
agentcore launch

# Deploy (non-interactive/scripted)
agentcore configure -e agent.py --region us-east-1 --name my_agent \
  --non-interactive --disable-memory --deployment-type container

# Test
agentcore invoke '{"prompt": "Hello"}'

# Cleanup
agentcore destroy
```

**Agent naming rules**: Must start with letter, contain only letters/numbers/underscores, 1-48 chars. Use `my_agent` not `my-agent`.

## Tool Integration via AgentCore Gateway

AgentCore Gateway provides unified access to external tools and APIs for your agents. Choose the transport that fits your use case:

```bash
# Deploy the gateway
python -m bedrock_agentcore.gateway.deploy \
    --stack-name my-agents \
    --region us-east-1

# Environment variables auto-configured:
# BEDROCK_AGENTCORE_GATEWAY_URL = https://{gateway-id}.gateway.bedrock-agentcore.{region}.amazonaws.com/mcp
# BEDROCK_AGENTCORE_USE_GATEWAY = true
```

**Gateway Transport Options:**

| Transport | Use Case | Setup |
|-----------|----------|-------|
| **Fallback Mock** | Development/testing without external services | None - returns hardcoded responses |
| **Local MCP Server** | Local development with custom tools | Run MCP server, set `USE_MCP=true` |
| **AgentCore Gateway** | Production with Lambda, APIs, MCP servers | Deploy via CloudFormation, AWS IAM auth |

**Example Tool Invocation** (any domain):

```python
# Query customer service database
support_data = self.gateway.call("get_customer_history", customer_id=12345)

# Trigger payment processing
payment = self.gateway.call("process_payment", amount=100, currency="USD")

# Verify inventory availability
stock = self.gateway.call("check_inventory", product_id="SKU-789")
```

### Example: Advertising Domain Tools

The AWS AgentCore reference implementation includes a domain-specific protocol (AdCP) with 8 advertising tools. This serves as a reference for building domain-specific tool sets:

| Tool | Purpose |
|------|---------|
| `get_products` | Discover inventory matching criteria |
| `get_signals` | Retrieve audience targeting signals |
| `activate_signal` | Activate signal on decisioning platform |
| `create_media_buy` | Create media buy with packages |
| `get_media_buy_delivery` | Get delivery metrics |
| `verify_brand_safety` | Verify URLs match brand safety criteria |
| `resolve_audience_reach` | Resolve reach across channels |
| `configure_brand_lift_study` | Set up measurement study |

Your domain may have different tools (e.g., e-commerce: `get_products`, `create_order`, `track_shipment`; healthcare: `query_patient_records`, `check_insurance_eligibility`).

## Architecture Decision Tree

```
Need multiple agents coordinating?
├── Yes → Use orchestrator + specialist pattern (see Multi-Agent Orchestration)
│         - Orchestrator delegates to specialists
│         - Specialists focus on specific tasks
│         - All share session context via memory
└── No → Single agent? → Use Quick Start above

Need persistent memory across sessions/agents?
├── Yes → Use AgentCore Memory (references/agentcore-memory.md)
│         - STM: turn-by-turn within session
│         - LTM: facts and decisions across sessions/agents
│         - Methods: `MemoryClient.create_event()`, `list_events()`
└── No → Use LangGraph checkpointing within single agent

Need external APIs, databases, or Lambda functions?
├── Yes → Use AgentCore Gateway (references/agentcore-gateway.md)
│         - Fallback mode for dev, production Gateway for IAM auth
│         - Works with MCP servers, Lambda, REST APIs
└── No → Use LangGraph tools directly

Complex multi-step/conditional logic?
├── Yes → Review LangGraph patterns (references/langgraph-patterns.md)
└── No → Use Quick Start above
```

## Key Concepts

**AgentCore Runtime**: Wraps any Python agent as HTTP service on port 8080. Handles `/invocations` and `/ping` endpoints.

**AgentCore Memory vs LangGraph Checkpointing**:
- AgentCore Memory: Managed service for cross-session/cross-agent memory
- LangGraph Checkpointing: In-graph state persistence per thread
- Use both together: AgentCore Memory for long-term facts, LangGraph checkpoints for conversation state

**AgentCore Gateway**: Transforms APIs/Lambda into MCP tools with auth handling.

## Reference Files

**Core Multi-Agent Framework Documentation** (apply to any domain):
- **AgentCore CLI**: [references/agentcore-cli.md](references/agentcore-cli.md) — deployment, configuration, lifecycle management
- **AgentCore Runtime**: [references/agentcore-runtime.md](references/agentcore-runtime.md) — streaming, async, health checks, observability
- **AgentCore Memory**: [references/agentcore-memory.md](references/agentcore-memory.md) — STM/LTM patterns, cross-agent context, API reference
- **AgentCore Gateway**: [references/agentcore-gateway.md](references/agentcore-gateway.md) — tool integration, MCP, Lambda, APIs, authentication
- **LangGraph Patterns**: [references/langgraph-patterns.md](references/langgraph-patterns.md) — StateGraph design, conditional routing, checkpointing

**Optional: AWS Advertising Agents Reference Implementation**
If you're building in the advertising domain OR want to see a production multi-agent system in action:
- **Architecture Diagram**: [references/reference-architecture-advertising-agents-use-case.pdf](references/reference-architecture-advertising-agents-use-case.pdf) — visual overview of orchestrator + specialist pattern with 4 orchestrators coordinating 17+ specialists
- **AdCP Protocol Reference**: How the advertising domain defines 8 tools (get_products, get_signals, verify_brand_safety, etc.) — useful as a template for building domain-specific tool sets in other industries
- **Agent Interaction Matrix**: Example of how orchestrators route work to specialists in advertising; adapt this pattern for your domain

**Important**: The advertising reference implementation is one example of the orchestrator/specialist pattern. You'll map these concepts to your domain:
- Advertising orchestrators → Your domain orchestrators (e.commerce: OrderOrchestrator, Healthcare: PatientCareOrchestrator)
- Advertising specialists → Your domain specialists
- AdCP tools → Your domain tools (e-commerce: inventory, payment, shipping; healthcare: records, eligibility, scheduling)

## Utility Scripts

Quick discovery scripts (run from skill directory):

```bash
# List all AgentCore resources in region
./scripts/list-all.sh us-east-1 ag

# Get agent details
./scripts/agent-details.sh langgraph_agent_web_search-Fpc6MyE5Eh us-east-1 ag

# Tail runtime logs
./scripts/tail-logs.sh langgraph_agent_web_search-Fpc6MyE5Eh 5m us-east-1 ag

# Get memory details
./scripts/memory-details.sh langgraph_agent_web_search_mem-4DFwz46tZN us-east-1 ag
```

## Example: Advertising Use Case

The AWS AgentCore reference implementation demonstrates these patterns in an advertising context. If you're building in another domain (e-commerce, customer service, supply chain, etc.), adapt these examples to your tools and agents.

### Scenario 1: Orchestrator Delegating to Specialists (Media Planning Example)

In advertising, a **MediaPlannerOrchestrator** delegates work to specialists. This pattern applies to any domain:

```python
from bedrock_agentcore.memory import MemoryClient
from bedrock_agentcore.gateway import GatewayToolClient

class MediaPlannerOrchestrator:  # Domain-specific: could be OrderOrchestrator, SupportOrchestrator, etc.
    def __init__(self):
        self.memory = MemoryClient()
        self.gateway = GatewayToolClient()

    def orchestrate(self, user_request: str, session_id: str):
        """
        Orchestrator Pattern Applied to Media Planning:
        User: "Develop strategic media plan for Q4 holiday season"

        Pattern steps:
        1. Query memory for previous decisions/constraints
        2. Delegate to specialist agents
        3. Query external tools via gateway
        4. Synthesize insights
        5. Store decisions for future reference
        """
        # Retrieve previous context (STM/LTM)
        previous_context = self.memory.list_events(
            session_id=session_id,
            actor_id="MediaPlannerOrchestrator"
        )

        # Delegate to specialists (advertising-specific)
        audience_insights = self._call_specialist("AudienceIntelligenceAgent", user_request)
        timing_strategy = self._call_specialist("TimingStrategyAgent", user_request)
        channel_mix = self._call_specialist("ChannelMixAgent", user_request)

        # Query inventory via gateway (advertising-specific tool)
        products = self.gateway.call(
            "get_products",
            channels=["ctv", "display", "video"],
            budget=500000
        )

        # Synthesize recommendations
        media_plan = synthesize(audience_insights, timing_strategy, channel_mix, products)

        # Store decision in LTM for future sessions
        self.memory.create_event(
            session_id=session_id,
            actor_id="MediaPlannerOrchestrator",
            event_type="plan_created",
            payload={"plan": media_plan}
        )

        return media_plan
```

**Pattern (applies to any domain):**
- Orchestrator delegates to specialists (e-commerce: order validation, payment, shipment tracking)
- All agents share `session_id` for coordinated context
- Gateway calls fetch domain-specific data

### Scenario 2: Specialist Agent Using Gateway Tools (Yield Optimization Example)

In advertising, a **YieldOptimizationAgent** uses gateway tools to verify safety and analyze options. This pattern applies to any domain:

```python
class YieldOptimizationAgent:  # Domain-specific: could be OrderValidationAgent, PricingAgent, etc.
    def optimize_yield(self, user_request: str, session_id: str):
        """
        Specialist Agent Pattern in Advertising:
        User: "Optimize yield for premium video inventory - current $12 CPM, target $18 CPM"

        Pattern steps:
        1. Call specialized logic (bid optimization)
        2. Use gateway to verify safety/constraints
        3. Query available options
        4. Store analysis for orchestrator to synthesize
        """
        # Delegate specialized analysis to another agent
        competitor_analysis = self._call_external("BidAnalysis", user_request)

        # Verify brand safety constraints via gateway (advertising-specific)
        safety_check = self.gateway.call(
            "verify_brand_safety",
            urls=["publisher1.com", "publisher2.com", "publisher3.com"],
            brand="automotive"
        )

        # Query available inventory matching constraints
        options = self.gateway.call(
            "get_products",
            channels=["video"],
            brand_safe=True,
            min_cpm=15
        )

        # Store analysis in memory for orchestrator
        self.memory.create_event(
            session_id=session_id,
            actor_id="YieldOptimizationAgent",
            event_type="analysis_complete",
            payload={"options": options, "safety": safety_check}
        )

        return {"options": options, "analysis": competitor_analysis}
```

**Pattern (applies to any domain):**
- Specialist performs focused task
- Uses gateway for domain-specific queries (e-commerce: inventory, pricing; healthcare: patient records, eligibility)
- Stores results in shared memory
- Orchestrator synthesizes multiple specialists' outputs

### Scenario 3: Memory-Driven Cross-Agent Context (Forecasting Example)

In advertising, agents access shared memory to understand previous context and constraints. This pattern applies to any domain:

```python
class InventoryOptimizationAgent:  # Domain-specific: could be DemandForecastingAgent, ResourceAllocationAgent, etc.
    def forecast_inventory(self, user_request: str, session_id: str):
        """
        Memory Pattern in Advertising:
        User: "Forecast inventory availability for Q1 2025 across all formats"

        Pattern steps:
        1. Query shared memory for context (previous forecasts, constraints)
        2. Query available signals/options via gateway
        3. Activate decision points
        4. Update memory with forecast for other agents
        """
        # Retrieve previous forecasts and constraints from memory
        previous_decisions = self.memory.list_events(
            session_id=session_id,
            actor_id="InventoryOptimizationAgent"
        )

        # Get available audience signals (advertising-specific)
        audience_signals = self.gateway.call(
            "get_signals",
            audience="luxury_automotive"
        )

        # Activate a signal for decision tracking (advertising-specific)
        self.gateway.call(
            "activate_signal",
            signal_id=audience_signals[0]["id"],
            platform="forecasting"
        )

        # Query inventory across all channels
        inventory = self.gateway.call(
            "get_products",
            channels=["ctv", "display", "video", "audio"],
            return_all=True
        )

        # Perform forecasting based on previous decisions + current inventory
        forecast = self._forecast_q1_demand(previous_decisions, inventory)

        # Store forecast in shared memory for orchestrator and other agents
        self.memory.create_event(
            session_id=session_id,
            actor_id="InventoryOptimizationAgent",
            event_type="forecast_complete",
            payload={"forecast": forecast}
        )

        return forecast
```

**Pattern (applies to any domain):**
- All agents retrieve session context via `memory.list_events(session_id)`
- Gateway queries are domain-specific but follow same pattern
- Results stored back in memory for cross-agent coordination
- Example domains: e-commerce (demand forecasting, stock allocation), healthcare (resource scheduling, capacity planning)

## Common Patterns

### With Web Search Tool

```python
from langchain_community.tools import DuckDuckGoSearchRun
from langchain.chat_models import init_chat_model
from langgraph.prebuilt import ToolNode, tools_condition

llm = init_chat_model("anthropic.claude-3-haiku-20240307-v1:0", model_provider="bedrock_converse")
tools = [DuckDuckGoSearchRun()]
llm_with_tools = llm.bind_tools(tools)

def agent(state):
    return {"messages": [llm_with_tools.invoke(state["messages"])]}

builder = StateGraph(State)
builder.add_node("agent", agent)
builder.add_node("tools", ToolNode(tools))
builder.add_conditional_edges("agent", tools_condition)
builder.add_edge("tools", "agent")
builder.add_edge(START, "agent")
```

### With Streaming Response

```python
@app.entrypoint
async def invoke(payload, context):
    async for chunk in graph.astream({"messages": [("user", payload["prompt"])]}):
        if "agent" in chunk:
            yield chunk["agent"]["messages"][-1].content
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `langgraph.prebuilt` deprecation warning | Still works in 1.0, but `create_react_agent` → `langchain.agents.create_agent` |
| Cold start slow | Use `agentcore launch --local` for testing first |
| Memory not persisting | Check if using AgentCore Memory vs LangGraph checkpointer |
| Tools not executing | Verify `tools_condition` routing and tool binding |
| `ValidationException: on-demand throughput isn't supported` | Claude 4.5 models require inference profiles. Use `us.anthropic.claude-*` not `anthropic.claude-*` |
| `ResourceNotFoundException: Model use case details not submitted` | Fill out Anthropic use case form in AWS Bedrock Console → Model access |
| `Invalid agent name` | Use underscores not hyphens: `my_agent` not `my-agent` |
| Platform mismatch warning (amd64 vs arm64) | Normal - CodeBuild handles cross-platform ARM64 builds automatically |
| Memory `list_events` returns empty | ~10s eventual consistency delay after `create_event`. Also check actor_id/session_id match |
| `'list' object has no attribute 'get'` | `list_events` returns list directly, and `event['payload']` is also a list. See agentcore-memory.md |
| Container not reading .env | Set env vars in Dockerfile ENV, not .env file (container doesn't load .env) |
| Memory not working after deploy | Check logs for "Memory enabled/disabled". Toolkit auto-injects `BEDROCK_AGENTCORE_MEMORY_ID` - don't hardcode in Dockerfile |
| "Memory disabled" in logs | Verify memory configured during `agentcore configure` and `.bedrock_agentcore.yaml` has `memory.memory_id` set |
| Gateway "Unknown tool" error | Lambda must strip `___` prefix from `bedrockAgentCoreToolName`. See agentcore-gateway.md |
| Gateway Lambda timeout | Lambda event format differs from API Gateway - flat dict of input properties only |

## Late 2025 Features (re:Invent)

| Feature | Description | Status |
|---------|-------------|--------|
| **MCP Server Targets** | Unite multiple MCP servers behind single Gateway (Nov 2025) | GA |
| **Policy** | Natural language guardrails (e.g., "allow refunds up to $100") | Preview |
| **Evaluations** | 13 pre-built metrics for correctness, safety, tool accuracy | Preview |
| **Bidirectional Streaming** | Voice agents: listen/respond simultaneously, handle interruptions | GA |
| **Episodic Memory** | Agents learn from experiences across sessions | GA |

## Documentation

**General Resources** (see topic-specific docs in each reference file):

| Resource | URL |
|----------|-----|
| AgentCore Docs | https://docs.aws.amazon.com/bedrock-agentcore/ |
| Starter Toolkit | https://aws.github.io/bedrock-agentcore-starter-toolkit/ |
| GitHub Samples | https://github.com/awslabs/amazon-bedrock-agentcore-samples |
| LangGraph Docs | https://langchain-ai.github.io/langgraph/ |
| CloudFormation | https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-bedrockagentcore-runtime.html |
