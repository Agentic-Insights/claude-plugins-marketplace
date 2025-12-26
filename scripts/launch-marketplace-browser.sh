#!/bin/bash
# Launch Marketplace Browser - lints and displays plugins with Agent Skills spec compliance

set -e

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SCRIPTS_DIR="$REPO_ROOT/scripts"
PORT=${1:-8000}

echo "🔍 Marketplace Linter & Browser"
echo "================================"
echo ""

# Step 1: Run linter
echo "📊 Running linter to analyze plugins..."
uv run "$SCRIPTS_DIR/marketplace-linter.py"

if [ ! -f "$REPO_ROOT/.cache/marketplace-lint.json" ]; then
    echo "❌ Linter failed - no output generated"
    exit 1
fi

echo ""
echo "✅ Linting complete!"
echo ""

# Step 2: Start server
echo "🚀 Starting browser on http://localhost:$PORT/scripts/marketplace-browser.html"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

cd "$REPO_ROOT"
python3 -m http.server "$PORT"
