# AgentCore Memory Demo
# Cross-session conversation persistence

Output recordings/01-memory.gif
Output recordings/01-memory.mp4

Source tapes/_settings.tape

# Title
Type "# AgentCore Memory Demo"
Enter
Type "# Cross-session conversation persistence"
Enter
Sleep 1s

# Navigate to demo
Type "cd examples/memory-demo"
Enter
Sleep 500ms

# Show the structure
Type "ls -la"
Enter
Sleep 1s

# Show key parts of the code
Type "echo ''"
Enter
Type "echo '📝 Key Memory Operations:'"
Enter
Sleep 500ms

Type "head -50 memory_demo.py | tail -30"
Enter
Sleep 2s

# Show memory creation code
Type "echo ''"
Enter
Type "echo '🆕 Creating Memory:'"
Enter
Type "grep -A 15 'create_memory' memory_demo.py | head -20"
Enter
Sleep 2s

# Show memory save/load
Type "echo ''"
Enter
Type "echo '💾 Saving to Memory:'"
Enter
Type "grep -A 8 'create_event' memory_demo.py | head -10"
Enter
Sleep 2s

# Run the demo
Type "echo ''"
Enter
Type "echo '🚀 Running Memory Demo...'"
Enter
Sleep 500ms

Type "uv run python memory_demo.py 2>&1 | head -60"
Enter
Sleep 4s

Type "echo ''"
Enter
Type "echo '✅ Memory enables cross-session context!'"
Enter
Sleep 2s
