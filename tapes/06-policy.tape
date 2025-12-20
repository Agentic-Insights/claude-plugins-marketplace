# AgentCore Policy Demo
# Natural language to Cedar authorization

Output recordings/06-policy.gif
Output recordings/06-policy.mp4

Source tapes/_settings.tape

# Title
Type "# AgentCore Policy Demo"
Enter
Type "# Cedar Authorization Rules"
Enter
Sleep 1s

# Navigate
Type "cd examples/policy-demo"
Enter
Sleep 500ms

Type "ls -la"
Enter
Sleep 1s

# Show Cedar policy examples from README
Type "echo ''"
Enter
Type "echo '📜 Cedar Policy Patterns:'"
Enter
Sleep 500ms

Type "grep -A 30 'Cedar Policy Patterns' README.md | head -35"
Enter
Sleep 3s

# Show the test script
Type "echo ''"
Enter
Type "echo '🧪 Policy Test Flow:'"
Enter
Sleep 500ms

Type "head -50 test_policy.py"
Enter
Sleep 3s

# Show natural language examples
Type "echo ''"
Enter
Type "echo '🗣️ Natural Language → Cedar:'"
Enter
Sleep 500ms

Type "grep -A 5 'Natural Language to Cedar' README.md"
Enter
Sleep 2s

Type "echo ''"
Enter
Type "echo '✅ Write policies in plain English!'"
Enter
Sleep 2s
