# AgentCore Runtime Demo
# Serverless LangGraph deployment

Output recordings/07-runtime.gif
Output recordings/07-runtime.mp4

Source tapes/_settings.tape

# Title
Type "# AgentCore Runtime Demo"
Enter
Type "# Serverless LangGraph Deployment"
Enter
Sleep 1s

# Navigate
Type "cd examples/runtime-demo"
Enter
Sleep 500ms

Type "ls -la"
Enter
Sleep 1s

# Show the agent code
Type "echo ''"
Enter
Type "echo '🤖 Agent Code Pattern:'"
Enter
Sleep 500ms

Type "head -60 agent.py"
Enter
Sleep 3s

# Show deployment workflow
Type "echo ''"
Enter
Type "echo '🚀 Deployment Workflow:'"
Enter
Sleep 500ms

Type "grep -A 20 'Step 1: Configure' README.md | head -25"
Enter
Sleep 2s

# Show CLI commands
Type "echo ''"
Enter
Type "echo '⚡ CLI Commands:'"
Enter
Sleep 500ms

Type "echo '  agentcore configure -e agent.py --region us-east-1'"
Enter
Sleep 500ms
Type "echo '  agentcore launch'"
Enter
Sleep 500ms
Type 'echo '\''  agentcore invoke {"prompt": "Hello"}'\'''
Enter
Sleep 500ms
Type "echo '  agentcore destroy'"
Enter
Sleep 1s

# Run locally
Type "echo ''"
Enter
Type "echo '🖥️ Running Locally...'"
Enter
Sleep 500ms

Hide
Type "timeout 3 uv run python agent.py 2>&1 || true"
Enter
Sleep 4s
Show

Type "echo 'Server started on :8080'"
Enter
Sleep 500ms

Type "echo ''"
Enter
Type "echo '✅ Deploy agents with one command!'"
Enter
Sleep 2s
