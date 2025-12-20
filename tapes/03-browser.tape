# AgentCore Browser Demo
# Cloud browser automation for research

Output recordings/03-browser.gif
Output recordings/03-browser.mp4

Source tapes/_settings.tape

# Title
Type "# AgentCore Browser Demo"
Enter
Type "# Cloud Browser Automation"
Enter
Sleep 1s

# Navigate
Type "cd examples/browser-demo"
Enter
Sleep 500ms

Type "ls -la"
Enter
Sleep 1s

# Run the demo (shows concepts)
Type "echo ''"
Enter
Type "echo '🌐 Running Browser Demo...'"
Enter
Sleep 500ms

Type "uv run python browser_demo.py 2>&1 | head -80"
Enter
Sleep 5s

# Show LangGraph tool pattern
Type "echo ''"
Enter
Type "echo '🤖 Browser as LangGraph Tool:'"
Enter
Sleep 500ms

Type "grep -A 25 'browse_and_extract' browser_demo.py"
Enter
Sleep 3s

Type "echo ''"
Enter
Type "echo '✅ Browse any page from your agent!'"
Enter
Sleep 2s
