# AgentCore Code Interpreter Demo
# Sandboxed code execution

Output recordings/04-code-interpreter.gif
Output recordings/04-code-interpreter.mp4

Source tapes/_settings.tape

# Title
Type "# AgentCore Code Interpreter Demo"
Enter
Type "# Sandboxed Code Execution"
Enter
Sleep 1s

# Navigate
Type "cd examples/code-interpreter-demo"
Enter
Sleep 500ms

Type "ls -la"
Enter
Sleep 1s

# Run the demo
Type "echo ''"
Enter
Type "echo '💻 Running Code Interpreter Demo...'"
Enter
Sleep 500ms

Type "uv run python code_interpreter_demo.py 2>&1 | head -90"
Enter
Sleep 5s

# Show LangGraph integration
Type "echo ''"
Enter
Type "echo '🤖 LangGraph Integration:'"
Enter
Sleep 500ms

Type "grep -A 20 'execute_python' code_interpreter_demo.py"
Enter
Sleep 3s

Type "echo ''"
Enter
Type "echo '✅ Execute code safely in your agents!'"
Enter
Sleep 2s
