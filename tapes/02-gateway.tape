# AgentCore Gateway Demo
# MCP server unification hub

Output recordings/02-gateway.gif
Output recordings/02-gateway.mp4

Source tapes/_settings.tape

# Title
Type "# AgentCore Gateway Demo"
Enter
Type "# Unified MCP Tool Access"
Enter
Sleep 1s

# Navigate
Type "cd examples/gateway-demo"
Enter
Sleep 500ms

Type "ls -la"
Enter
Sleep 1s

# Show architecture from README
Type "echo ''"
Enter
Type "echo '🌐 Gateway Architecture:'"
Enter
Sleep 500ms

Type "grep -A 20 'Architecture' README.md | head -25"
Enter
Sleep 3s

# Show API patterns
Type "echo ''"
Enter
Type "echo '🔧 API Patterns:'"
Enter
Sleep 500ms

Type "grep -A 15 'Create a Gateway' README.md"
Enter
Sleep 2s

# Show Lambda target
Type "echo ''"
Enter
Type "echo '⚡ Adding Lambda as MCP Tool:'"
Enter
Sleep 500ms

Type "grep -A 20 'Add a Lambda Target' README.md"
Enter
Sleep 3s

# Show LangGraph integration
Type "echo ''"
Enter
Type "echo '🤖 LangGraph Integration:'"
Enter
Sleep 500ms

Type "grep -A 15 'LangGraph Integration' README.md"
Enter
Sleep 2s

Type "echo ''"
Enter
Type "echo '✅ Gateway unifies all your tools behind one endpoint!'"
Enter
Sleep 2s
