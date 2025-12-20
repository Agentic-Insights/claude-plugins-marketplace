# AgentCore Hero Demo
# Quick showcase of all capabilities

Output recordings/09-hero.gif
Output recordings/09-hero.mp4

Source tapes/_settings.tape

Set TypingSpeed 25ms
Set PlaybackSpeed 1.2

# Big title
Type "echo ''"
Enter
Type "echo '  ╔═══════════════════════════════════════════════════════╗'"
Enter
Type "echo '  ║     AWS Bedrock AgentCore + LangGraph                 ║'"
Enter
Type "echo '  ║     Production-Grade AI Agent Infrastructure         ║'"
Enter
Type "echo '  ╚═══════════════════════════════════════════════════════╝'"
Enter
Sleep 1.5s

# Show the primitives
Type "echo ''"
Enter
Type "echo '  🧠 Memory      - Cross-session conversation persistence'"
Enter
Sleep 300ms
Type "echo '  🌐 Gateway     - Unified MCP tool access'"
Enter
Sleep 300ms
Type "echo '  🔍 Browser     - Cloud browser automation'"
Enter
Sleep 300ms
Type "echo '  💻 Code        - Sandboxed code execution'"
Enter
Sleep 300ms
Type "echo '  🛡️ Guardrails  - Production safety controls'"
Enter
Sleep 300ms
Type "echo '  📜 Policy      - Cedar authorization rules'"
Enter
Sleep 300ms
Type "echo '  🚀 Runtime     - Serverless deployment'"
Enter
Sleep 1s

# Show examples
Type "echo ''"
Enter
Type "echo '  📁 Complete Examples:'"
Enter
Sleep 500ms

Type "ls examples/"
Enter
Sleep 1.5s

# Quick code preview
Type "echo ''"
Enter
Type "echo '  🤖 Sample: Deep Research Agent'"
Enter
Sleep 500ms

Type "head -30 examples/deep-research-agent/agent.py | tail -15"
Enter
Sleep 2s

# Call to action
Type "echo ''"
Enter
Type "echo '  ┌─────────────────────────────────────────────────────┐'"
Enter
Type "echo '  │  Get started:                                       │'"
Enter
Type "echo '  │    git clone https://github.com/Agentic-Insights/   │'"
Enter
Type "echo '  │               aws-skills-cc.git                     │'"
Enter
Type "echo '  │    cd examples/<demo> && uv sync                    │'"
Enter
Type "echo '  │    uv run python *.py                               │'"
Enter
Type "echo '  └─────────────────────────────────────────────────────┘'"
Enter
Sleep 2s

Type "echo ''"
Enter
Type "echo '  🌟 Learn more at agenticinsights.com'"
Enter
Sleep 2s
