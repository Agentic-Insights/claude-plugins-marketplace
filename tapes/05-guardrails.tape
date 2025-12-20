# AgentCore Guardrails Demo
# Production safety and prompt injection protection

Output recordings/05-guardrails.gif
Output recordings/05-guardrails.mp4

Source tapes/_settings.tape

# Title
Type "# AgentCore Guardrails Demo"
Enter
Type "# Production Safety Controls"
Enter
Sleep 1s

# Navigate
Type "cd examples/guardrails-demo"
Enter
Sleep 500ms

Type "ls -la"
Enter
Sleep 1s

# Run the demo
Type "echo ''"
Enter
Type "echo '🛡️ Running Guardrails Demo...'"
Enter
Sleep 500ms

Type "uv run python guardrails_demo.py 2>&1 | head -100"
Enter
Sleep 5s

# Show multi-layer defense
Type "echo ''"
Enter
Type "echo '🔒 Multi-Layer Defense Strategy:'"
Enter
Sleep 500ms

Type "grep -A 25 'Multi-Layer Defense' guardrails_demo.py"
Enter
Sleep 3s

Type "echo ''"
Enter
Type "echo '✅ Block prompt injections automatically!'"
Enter
Sleep 2s
