# Live recording: memory
Output "/home/vaskin/projects/agentcore-lg/recordings/live-memory.gif"
Output "/home/vaskin/projects/agentcore-lg/recordings/live-memory.mp4"

Set Width 1200
Set Height 676
Set FontSize 16
Set FontFamily "JetBrainsMono Nerd Font"
Set LineHeight 1.3
Set Theme "Dracula"
Set Padding 15
Set Margin 10
Set MarginFill "#282a36"
Set BorderRadius 8
Set WindowBar Colorful
Set TypingSpeed 30ms
Set Framerate 30
Set Shell bash


Type "cd /home/vaskin/projects/agentcore-lg/examples/memory-demo"
Enter
Sleep 500ms

Type "cat memory_demo.py | head -50"
Enter
Sleep 3s

Type "uv run python memory_demo.py"
Enter
Sleep 15s

