# AgentCore Examples Overview
# Shows the complete set of AgentCore primitive demos

Output recordings/00-overview.gif
Output recordings/00-overview.mp4

Source tapes/_settings.tape

Set TypingSpeed 30ms

# Title
Type "# AWS Bedrock AgentCore + LangGraph Examples"
Enter
Sleep 1s

Type "# Let's explore the complete demo suite..."
Enter
Sleep 500ms

# Show examples directory
Type "ls -la examples/"
Enter
Sleep 2s

# Highlight each demo
Type "echo ''"
Enter
Type "echo '📦 Available Demos:'"
Enter
Sleep 500ms

Type "echo '  1. memory-demo       - Cross-session conversation persistence'"
Enter
Sleep 300ms

Type "echo '  2. gateway-demo      - MCP server unification hub'"
Enter
Sleep 300ms

Type "echo '  3. browser-demo      - Cloud browser automation'"
Enter
Sleep 300ms

Type "echo '  4. code-interpreter  - Sandboxed code execution'"
Enter
Sleep 300ms

Type "echo '  5. guardrails-demo   - Production safety controls'"
Enter
Sleep 300ms

Type "echo '  6. policy-demo       - Cedar authorization rules'"
Enter
Sleep 300ms

Type "echo '  7. runtime-demo      - Serverless deployment'"
Enter
Sleep 300ms

Type "echo '  8. deep-research     - Complete showcase agent'"
Enter
Sleep 1s

# Show the architecture
Type "echo ''"
Enter
Type "echo '🏗️  Architecture: Each demo is self-contained with:'"
Enter
Type "echo '    - README.md     Documentation'"
Enter
Type "echo '    - *.py          Runnable demo code'"
Enter
Type "echo '    - pyproject.toml Dependencies'"
Enter
Type "echo '    - .env.example  Configuration template'"
Enter
Sleep 1.5s

# Quick start
Type "echo ''"
Enter
Type "echo '🚀 Quick Start:'"
Enter
Type "echo '   cd examples/<demo-name>'"
Enter
Type "echo '   cp .env.example .env'"
Enter
Type "echo '   uv sync && uv run python *.py'"
Enter
Sleep 2s

Type "echo ''"
Enter
Type "echo '✅ Ready to explore AgentCore primitives!'"
Enter
Sleep 2s
