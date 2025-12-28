# VHS documentation: https://github.com/charmbracelet/vhs
#
# Demo: Installing Agentic Insights Foundry plugins in Claude Code
#

Output ../output/install.gif
Output ../output/install.mp4

Set Shell "bash"
Set FontFamily "Ubuntu Mono"
Set Theme "Catppuccin Mocha"
Set FontSize 14
Set Width 1000
Set Height 700
Set Padding 20
Set TypingSpeed 50ms
Set PlaybackSpeed 1.0

# Step 1: Start Claude Code
Type "claude"
Enter
Sleep 4s

# Step 2: Add the Agentic Insights foundry marketplace
Type "/plugin marketplace add agentic-insights/foundry"
Sleep 500ms
Enter
Sleep 3s

# Step 3: Open plugin browser
Type "/plugin"
Sleep 500ms
Enter
Sleep 2s

# Step 4: Navigate and select a plugin
Tab
Tab
Sleep 2s
Down
Down
Sleep 4s
Enter
Sleep 5s

# Step 5: Navigate back and select another
Down
Down
Sleep 1.5s
Enter
Sleep 3s

# Step 6: Go up and confirm
Up
Up
Sleep 1.5s
Enter
Sleep 7s

# Step 7: Exit cleanly
Ctrl+C
Ctrl+C
Sleep 2s
