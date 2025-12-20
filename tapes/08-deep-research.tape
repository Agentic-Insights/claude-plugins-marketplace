# Deep Research Agent Demo
# Complete AgentCore Showcase

Output recordings/08-deep-research.gif
Output recordings/08-deep-research.mp4

Source tapes/_settings.tape

Set PlaybackSpeed 1.5

# Title
Type "# Deep Research Agent"
Enter
Type "# Complete AgentCore Showcase"
Enter
Sleep 1s

# Navigate
Type "cd examples/deep-research-agent"
Enter
Sleep 500ms

Type "ls -la"
Enter
Sleep 1s

# Show architecture from README
Type "echo ''"
Enter
Type "echo '🏗️ Architecture - All Primitives Combined:'"
Enter
Sleep 500ms

Type "grep -A 20 'Architecture' README.md | head -25"
Enter
Sleep 3s

# Show primitives table
Type "echo ''"
Enter
Type "echo '📦 AgentCore Primitives Used:'"
Enter
Sleep 500ms

Type "grep -A 10 'Primitive | Purpose' README.md"
Enter
Sleep 2s

# Show the agent code
Type "echo ''"
Enter
Type "echo '🤖 Agent Implementation:'"
Enter
Sleep 500ms

Type "head -80 agent.py | tail -50"
Enter
Sleep 3s

# Show tools
Type "echo ''"
Enter
Type "echo '🔧 Available Tools:'"
Enter
Sleep 500ms

Type "grep -A 5 '@tool' agent.py | head -30"
Enter
Sleep 2s

# Show graph nodes
Type "echo ''"
Enter
Type "echo '📊 LangGraph Nodes:'"
Enter
Sleep 500ms

Type "grep 'add_node' agent.py"
Enter
Sleep 2s

# Interactive demo hint
Type "echo ''"
Enter
Type "echo '🎮 Interactive Mode:'"
Enter
Type "echo '   uv run python agent.py --interactive'"
Enter
Sleep 1s

Type "echo ''"
Enter
Type "echo '🚀 Deploy to AgentCore:'"
Enter
Type "echo '   agentcore configure -e agent.py --region us-east-1'"
Enter
Type "echo '   agentcore launch'"
Enter
Sleep 1s

Type "echo ''"
Enter
Type "echo '✅ Production-grade research agent with all primitives!'"
Enter
Sleep 2s
