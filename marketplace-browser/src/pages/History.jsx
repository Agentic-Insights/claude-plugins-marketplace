import { Link } from 'react-router-dom'

export function History() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-[var(--ai-border)] bg-[var(--ai-card)]">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <Link to="/" className="text-[var(--ai-green)] hover:underline text-sm mb-4 inline-block font-mono">
            ← cd /foundry
          </Link>
          <div className="font-mono text-[var(--ai-gray-500)] text-sm mb-2">
            <span className="text-[var(--ai-green)]">$</span> cat HISTORY.md
          </div>
          <h1 className="text-3xl font-bold font-mono mb-4">The Context Engineering Journey</h1>
          <p className="text-lg text-[var(--ai-gray-300)]">
            From .context.md to AGENTS.md to Skills — the evolution of AI context standards
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Timeline */}
        <div className="space-y-12">

          {/* Codebase Context */}
          <section className="relative pl-8 border-l-2 border-[var(--ai-green)]/30">
            <div className="absolute -left-[5px] top-0 w-2 h-2 bg-[var(--ai-green)]"></div>
            <div className="mb-2">
              <span className="text-[var(--ai-green)] text-sm font-mono">2023-2024</span>
            </div>
            <h2 className="text-xl font-bold font-mono text-white mb-4">Codebase Context & .context.md</h2>
            <p className="text-[var(--ai-gray-300)] mb-6 leading-relaxed text-sm">
              It started with a simple observation: AI coding assistants were missing crucial context.
              They could read code, but they couldn't understand <em>why</em> decisions were made,
              what conventions to follow, or how the pieces fit together.
            </p>
            <p className="text-[var(--ai-gray-300)] mb-6 leading-relaxed text-sm">
              The <strong className="text-white">.context.md</strong> specification was born — a way to embed rich,
              structured context directly in your codebase. Not just for humans, but specifically
              designed for AI consumption.
            </p>

            <div className="bg-black border border-[var(--ai-border)] p-6 mb-6">
              <h3 className="text-sm font-mono font-semibold text-white mb-4 uppercase tracking-wider">Videos & Talks</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-[var(--ai-green)] hover:underline flex items-center gap-2 text-sm font-mono">
                    <span className="text-red-500">▶</span>
                    Introduction to Codebase Context (Coming Soon)
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[var(--ai-green)] hover:underline flex items-center gap-2 text-sm font-mono">
                    <span className="text-red-500">▶</span>
                    Austin LangChain Meetup: Context Engineering (Coming Soon)
                  </a>
                </li>
              </ul>
            </div>

            <div className="bg-black border border-[var(--ai-border)] p-6">
              <h3 className="text-sm font-mono font-semibold text-white mb-4 uppercase tracking-wider">Resources</h3>
              <ul className="space-y-2 text-sm font-mono">
                <li>
                  <a href="https://github.com/Agentic-Insights/codebase-context-spec" target="_blank" rel="noopener noreferrer" className="text-[var(--ai-green)] hover:underline">
                    → Original Codebase Context Specification
                  </a>
                </li>
                <li>
                  <a href="https://codebasecontext.org" target="_blank" rel="noopener noreferrer" className="text-[var(--ai-green)] hover:underline">
                    → codebasecontext.org (legacy docs)
                  </a>
                </li>
              </ul>
            </div>
          </section>

          {/* AGENTS.md */}
          <section className="relative pl-8 border-l-2 border-[var(--ai-green)]/30">
            <div className="absolute -left-[5px] top-0 w-2 h-2 bg-[var(--ai-green)]"></div>
            <div className="mb-2">
              <span className="text-[var(--ai-green)] text-sm font-mono">2024</span>
            </div>
            <h2 className="text-xl font-bold font-mono text-white mb-4">AGENTS.md — Industry Adoption</h2>
            <p className="text-[var(--ai-gray-300)] mb-6 leading-relaxed text-sm">
              The ideas from .context.md gained traction. Anthropic, OpenAI, and others began
              adopting similar patterns. The community standardized on <strong className="text-white">AGENTS.md</strong> —
              a simpler, more focused format for agent instructions.
            </p>
            <p className="text-[var(--ai-gray-300)] mb-6 leading-relaxed text-sm">
              AGENTS.md became the de facto standard for telling AI agents how to work in your
              codebase. Claude Code, Cursor, Windsurf, and others now look for these files automatically.
            </p>

            <div className="bg-black border border-[var(--ai-border)] p-6">
              <h3 className="text-sm font-mono font-semibold text-white mb-4 uppercase tracking-wider">Resources</h3>
              <ul className="space-y-2 text-sm font-mono">
                <li>
                  <a href="https://agents.md" target="_blank" rel="noopener noreferrer" className="text-[var(--ai-green)] hover:underline">
                    → agents.md — The Standard
                  </a>
                </li>
                <li>
                  <a href="https://docs.anthropic.com/en/docs/claude-code/memory#agentsmd" target="_blank" rel="noopener noreferrer" className="text-[var(--ai-green)] hover:underline">
                    → Claude Code AGENTS.md Documentation
                  </a>
                </li>
              </ul>
            </div>
          </section>

          {/* Agent Skills */}
          <section className="relative pl-8 border-l-2 border-[var(--ai-green)]/30">
            <div className="absolute -left-[5px] top-0 w-2 h-2 bg-[var(--ai-green)]"></div>
            <div className="mb-2">
              <span className="text-[var(--ai-green)] text-sm font-mono">2025</span>
            </div>
            <h2 className="text-xl font-bold font-mono text-white mb-4">Agent Skills — Portable Capabilities</h2>
            <p className="text-[var(--ai-gray-300)] mb-6 leading-relaxed text-sm">
              The next evolution: <strong className="text-white">Skills</strong>. Not just static context, but portable,
              reusable capabilities that agents can invoke. Skills combine instructions, scripts,
              reference materials, and assets into shareable packages.
            </p>
            <p className="text-[var(--ai-gray-300)] mb-6 leading-relaxed text-sm">
              The <a href="https://agentskills.io" target="_blank" rel="noopener noreferrer" className="text-[var(--ai-green)] hover:underline">Agent Skills specification</a> is
              an open standard — supported by Claude Code, and designed for cross-platform compatibility.
            </p>

            <div className="bg-black border border-[var(--ai-border)] p-6">
              <h3 className="text-sm font-mono font-semibold text-white mb-4 uppercase tracking-wider">Resources</h3>
              <ul className="space-y-2 text-sm font-mono">
                <li>
                  <a href="https://agentskills.io" target="_blank" rel="noopener noreferrer" className="text-[var(--ai-green)] hover:underline">
                    → agentskills.io — The Specification
                  </a>
                </li>
                <li>
                  <a href="https://github.com/agentskills/agentskills" target="_blank" rel="noopener noreferrer" className="text-[var(--ai-green)] hover:underline">
                    → skills-ref validator tool
                  </a>
                </li>
                <li>
                  <Link to="/#marketplace" className="text-[var(--ai-green)] hover:underline">
                    → Foundry Marketplace — Skills in Action
                  </Link>
                </li>
              </ul>
            </div>
          </section>

          {/* Philosophy */}
          <section className="mt-16 bg-black border border-[var(--ai-border)] p-8">
            <h2 className="text-xl font-bold font-mono text-white mb-6">The Philosophy</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-mono font-semibold text-[var(--ai-green)] mb-2 uppercase tracking-wider">Context over Prompting</h3>
                <p className="text-[var(--ai-gray-500)] text-sm">
                  Rich, structured context beats clever prompt tricks. Give agents the information
                  they need upfront.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-mono font-semibold text-[var(--ai-green)] mb-2 uppercase tracking-wider">Open Standards</h3>
                <p className="text-[var(--ai-gray-500)] text-sm">
                  Portable formats that work across tools and vendors. No lock-in, no proprietary formats.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-mono font-semibold text-[var(--ai-green)] mb-2 uppercase tracking-wider">Consulting-Grade</h3>
                <p className="text-[var(--ai-gray-500)] text-sm">
                  Production patterns from real client engagements. Battle-tested, not theoretical.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-mono font-semibold text-[var(--ai-green)] mb-2 uppercase tracking-wider">Evidence over Claims</h3>
                <p className="text-[var(--ai-gray-500)] text-sm">
                  Test it, measure it, prove it works. No hype, just results.
                </p>
              </div>
            </div>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--ai-border)] py-8 mt-12 bg-[var(--ai-card)]">
        <div className="max-w-4xl mx-auto px-6 text-center text-[var(--ai-gray-500)] text-sm font-mono">
          <p>
            <Link to="/#marketplace" className="text-[var(--ai-green)] hover:underline">
              ← Back to Foundry Marketplace
            </Link>
          </p>
        </div>
      </footer>
    </div>
  )
}
