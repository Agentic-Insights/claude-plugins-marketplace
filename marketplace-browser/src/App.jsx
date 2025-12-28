import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { loadMarketplace } from './data/marketplaceLoader'
import { PluginCard } from './components/PluginCard'
import { PluginDetail } from './components/PluginDetail'
import { History } from './pages/History'
import { Inspector } from './pages/Inspector'
import './App.css'

function Marketplace() {
  const [marketplace, setMarketplace] = useState(null)
  const [selectedPlugin, setSelectedPlugin] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadMarketplace()
      .then(data => {
        setMarketplace(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const categories = marketplace?.plugins
    ? [...new Set(marketplace.plugins.map(p => p.category).filter(Boolean))]
    : []

  const filteredPlugins = marketplace?.plugins?.filter(plugin => {
    const matchesSearch = !searchQuery ||
      plugin.searchTerms?.includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory ||
      plugin.category === selectedCategory
    return matchesSearch && matchesCategory
  }) || []

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center font-mono">
          <div className="text-[var(--ai-green)] text-sm mb-4">
            <span className="opacity-60">$</span> loading marketplace<span className="cursor-blink"></span>
          </div>
          <div className="w-48 h-px bg-[var(--ai-border)] mx-auto overflow-hidden">
            <div className="h-full bg-[var(--ai-green)] animate-pulse" style={{width: '60%'}}></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center font-mono">
          <p className="text-red-500 text-sm mb-2">ERROR: Failed to load marketplace</p>
          <p className="text-[var(--ai-gray-500)] text-xs">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section - Research Station */}
      <header className="border-b border-[var(--ai-border)] bg-[var(--ai-card)] relative">
        {/* Grid overlay */}
        <div className="absolute inset-0 research-grid opacity-50"></div>

        <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
          {/* Station Header Bar */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--ai-border)]">
            <div className="flex items-center gap-6">
              <div className="font-mono text-xs tracking-wider">
                <span className="text-[var(--ai-green)] status-live">●</span>
                <span className="text-[var(--ai-gray-500)] ml-2">CODEBASECONTEXT.ORG</span>
              </div>
              <div className="hidden md:block h-4 w-px bg-[var(--ai-border)]"></div>
              <div className="hidden md:block font-mono text-xs text-[var(--ai-gray-700)]">
                RESEARCH STATION v2.0
              </div>
            </div>
            <div className="flex items-center gap-4 font-mono text-xs">
              <a href="https://agenticinsights.com" target="_blank" rel="noopener noreferrer"
                 className="text-[var(--ai-gray-500)] hover:text-[var(--ai-green)] transition-colors">
                [CONSULTING]
              </a>
              <a href="https://github.com/agentic-insights" target="_blank" rel="noopener noreferrer"
                 className="text-[var(--ai-gray-500)] hover:text-[var(--ai-green)] transition-colors">
                [GITHUB]
              </a>
            </div>
          </div>

          {/* Main Hero: Station Identity + Intro */}
          <div className="mb-10 reveal">
            <div className="font-mono text-[var(--ai-gray-700)] text-xs mb-3 tracking-widest">
              ╭─ STATION.INIT ─────────────────────────────────────╮
            </div>
            <h1 className="text-5xl md:text-6xl font-bold font-mono tracking-tight text-white mb-2">
              <span className="text-[var(--ai-green)] glow-green">Foundry</span>
            </h1>
            <p className="text-lg text-[var(--ai-gray-300)] max-w-2xl leading-relaxed mb-4">
              SOTA moves fast. This is my working knowledge base—tracking what actually works in AI-native development as standards emerge, shift, and sometimes vanish. I document patterns, test new tools, and publish what survives contact with real projects.
            </p>
            <div className="font-mono text-[var(--ai-gray-700)] text-xs tracking-widest">
              ╰──────────────────────────────────────────────────────╯
            </div>
          </div>

          {/* Research Domains Grid */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="font-mono text-xs text-[var(--ai-gray-500)] uppercase tracking-widest">
                Research Domains
              </div>
              <div className="flex-1 h-px bg-[var(--ai-border)]"></div>
              <div className="font-mono text-xs text-[var(--ai-gray-700)]">
                7 ACTIVE
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Domain: Context Engineering - PRIMARY */}
              <Link to="/history" className="domain-card bg-black p-5 group block">
                <div className="flex items-start justify-between mb-3">
                  <div className="font-mono text-xs text-[var(--ai-gray-700)] tracking-wider">01</div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[var(--ai-green)] text-[10px] status-live">●</span>
                    <span className="font-mono text-[10px] text-[var(--ai-green)]">CORE</span>
                  </div>
                </div>
                <h3 className="font-mono text-base font-semibold text-white group-hover:text-[var(--ai-green)] transition-colors mb-2">
                  Context Engineering
                </h3>
                <p className="text-xs text-[var(--ai-gray-500)] leading-relaxed mb-3">
                  Claude Code plugins, subagents, and skills. The scaffolding that shapes how agents reason. Where I spend most of my time.
                </p>
                <div className="font-mono text-[10px] text-[var(--ai-gray-700)] space-y-0.5">
                  <div>├─ Claude Agent SDK</div>
                  <div>├─ Skills Spec</div>
                  <div>├─ AGENTS.md</div>
                  <div>└─ Plugin Development</div>
                </div>
              </Link>

              {/* Domain: Agent Evals */}
              <div className="domain-card bg-black p-5 group">
                <div className="flex items-start justify-between mb-3">
                  <div className="font-mono text-xs text-[var(--ai-gray-700)] tracking-wider">02</div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-yellow-500 text-[10px] status-building">●</span>
                    <span className="font-mono text-[10px] text-[var(--ai-gray-700)]">BUILD</span>
                  </div>
                </div>
                <h3 className="font-mono text-base font-semibold text-white group-hover:text-[var(--ai-green)] transition-colors mb-2">
                  Agent Evals
                </h3>
                <p className="text-xs text-[var(--ai-gray-500)] leading-relaxed mb-3">
                  Multi-model benchmarks before you commit to a stack. Testing Claude, Gemini, Grok, and open models on identical tasks. Reproducible evidence, not vibes.
                </p>
                <div className="font-mono text-[10px] text-[var(--ai-gray-700)] space-y-0.5">
                  <div>├─ Claude / Gemini / Grok</div>
                  <div>├─ Open Models (Ollama)</div>
                  <div>└─ Eval Frameworks</div>
                </div>
              </div>

              {/* Domain: Vision & Comprehension */}
              <a href="https://dreamgen.agenticinsights.com" target="_blank" rel="noopener noreferrer"
                 className="domain-card bg-black p-5 group block">
                <div className="flex items-start justify-between mb-3">
                  <div className="font-mono text-xs text-[var(--ai-gray-700)] tracking-wider">03</div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[var(--ai-green)] text-[10px] status-live">●</span>
                    <span className="font-mono text-[10px] text-[var(--ai-green)]">LIVE</span>
                  </div>
                </div>
                <h3 className="font-mono text-base font-semibold text-white group-hover:text-[var(--ai-green)] transition-colors mb-2">
                  Vision & Comprehension
                </h3>
                <p className="text-xs text-[var(--ai-gray-500)] leading-relaxed mb-3">
                  PDF analysis for underwriters. BAML for structured extraction. Docling and IBM chart models. Plus DreamGen and Flux on local hardware.
                </p>
                <div className="font-mono text-[10px] text-[var(--ai-gray-700)] space-y-0.5">
                  <div>├─ BAML / Docling</div>
                  <div>├─ IBM Chart Models</div>
                  <div>└─ DreamGen / Flux</div>
                </div>
              </a>

              {/* Domain: Voice / Audio */}
              <div className="domain-card bg-black p-5 group">
                <div className="flex items-start justify-between mb-3">
                  <div className="font-mono text-xs text-[var(--ai-gray-700)] tracking-wider">04</div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-yellow-500 text-[10px] status-building">●</span>
                    <span className="font-mono text-[10px] text-[var(--ai-gray-700)]">BUILD</span>
                  </div>
                </div>
                <h3 className="font-mono text-base font-semibold text-white group-hover:text-[var(--ai-green)] transition-colors mb-2">
                  Voice Lab
                </h3>
                <p className="text-xs text-[var(--ai-gray-500)] leading-relaxed mb-3">
                  Real-time voice pipelines on local hardware. VAPI integrations, IndexTTS on RTX-4090, pipecat for production infrastructure.
                </p>
                <div className="font-mono text-[10px] text-[var(--ai-gray-700)] space-y-0.5">
                  <div>├─ VAPI (production)</div>
                  <div>├─ IndexTTS / VibeVoice</div>
                  <div>└─ Pipecat Infrastructure</div>
                </div>
              </div>
            </div>

            {/* Research Domains Grid - Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {/* Domain: Computer Use */}
              <a href="https://github.com/killerapp/ms-fara" target="_blank" rel="noopener noreferrer"
                 className="domain-card bg-black p-5 group block">
                <div className="flex items-start justify-between mb-3">
                  <div className="font-mono text-xs text-[var(--ai-gray-700)] tracking-wider">05</div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-orange-500 text-[10px]">●</span>
                    <span className="font-mono text-[10px] text-orange-500">EXPERIMENTAL</span>
                  </div>
                </div>
                <h3 className="font-mono text-base font-semibold text-white group-hover:text-[var(--ai-green)] transition-colors mb-2">
                  Computer Use
                </h3>
                <p className="text-xs text-[var(--ai-gray-500)] leading-relaxed mb-3">
                  Browser automation via vision models. Forked Microsoft's Fara for local experimentation. Agent-controlled interfaces.
                </p>
                <div className="font-mono text-[10px] text-[var(--ai-gray-700)] space-y-0.5">
                  <div>├─ Fara (forked)</div>
                  <div>├─ Browser Automation</div>
                  <div>└─ Vision-Driven Control</div>
                </div>
              </a>

              {/* Domain: AWS Agentcore */}
              <div className="domain-card bg-black p-5 group">
                <div className="flex items-start justify-between mb-3">
                  <div className="font-mono text-xs text-[var(--ai-gray-700)] tracking-wider">06</div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-orange-500 text-[10px]">●</span>
                    <span className="font-mono text-[10px] text-orange-500">EXPERIMENTAL</span>
                  </div>
                </div>
                <h3 className="font-mono text-base font-semibold text-white group-hover:text-[var(--ai-green)] transition-colors mb-2">
                  AWS Agentcore
                </h3>
                <p className="text-xs text-[var(--ai-gray-500)] leading-relaxed mb-3">
                  Exploring Bedrock-native agent patterns. Updated frequently as the service evolves. Expect breaking changes.
                </p>
                <div className="font-mono text-[10px] text-[var(--ai-gray-700)] space-y-0.5">
                  <div>├─ Bedrock Integration</div>
                  <div>├─ Agentcore Patterns</div>
                  <div>└─ Breaking Changes Log</div>
                </div>
              </div>

              {/* Domain: Red Team / Security */}
              <div className="domain-card bg-black p-5 group">
                <div className="flex items-start justify-between mb-3">
                  <div className="font-mono text-xs text-[var(--ai-gray-700)] tracking-wider">07</div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-red-500 text-[10px]">●</span>
                    <span className="font-mono text-[10px] text-red-500">SECURITY</span>
                  </div>
                </div>
                <h3 className="font-mono text-base font-semibold text-white group-hover:text-[var(--ai-green)] transition-colors mb-2">
                  Red Team
                </h3>
                <p className="text-xs text-[var(--ai-gray-500)] leading-relaxed mb-3">
                  Prompt injection research. AI-based pen-testing with Strix. Grey-hat security for agents heading to production.
                </p>
                <div className="font-mono text-[10px] text-[var(--ai-gray-700)] space-y-0.5">
                  <div>├─ Strix <span className="text-[var(--ai-gray-500)]">(private)</span></div>
                  <div>├─ Prompt Injection</div>
                  <div>└─ Jailbreak Research</div>
                </div>
              </div>
            </div>
          </div>

          {/* Skills Context + Quick Install */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 border border-[var(--ai-border)] bg-black p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="font-mono text-xs text-[var(--ai-gray-500)] uppercase tracking-widest">
                  Why Skills?
                </div>
                <a href="https://agentskills.io" target="_blank" rel="noopener noreferrer"
                   className="font-mono text-[10px] text-[var(--ai-green)] hover:underline">
                  agentskills.io →
                </a>
              </div>
              <p className="text-sm text-[var(--ai-gray-300)] leading-relaxed mb-4">
                Skills are the current state-of-the-art for packaging domain knowledge. Portable instructions, scripts, and references that agents can invoke on demand. As of Dec 2025, the spec is being adopted beyond Anthropic—Cursor, Windsurf, and others are following.
              </p>
              <p className="text-xs text-[var(--ai-gray-500)] leading-relaxed">
                This is how I build context engineering projects now. The plugins below are skill-based, designed for Claude Code but increasingly cross-platform. Each encodes real consulting patterns into reusable, shareable knowledge. <span className="text-[var(--ai-green)]">PRs welcome</span>—if you've found a better pattern, open an issue or submit it.
              </p>
            </div>

            {/* Quick Install */}
            <div className="border border-[var(--ai-border)] bg-black p-6 glow-green-box">
              <div className="font-mono text-xs text-[var(--ai-gray-500)] uppercase tracking-widest mb-4">
                Quick Install
              </div>
              <div className="font-mono text-xs text-[var(--ai-gray-700)] mb-2">
                # Add marketplace to Claude Code
              </div>
              <div className="flex items-center gap-2">
                <code className="text-[var(--ai-green)] font-mono text-xs flex-1 break-all">
                  /plugin marketplace add agentic-insights/foundry
                </code>
              </div>
              <button
                onClick={() => navigator.clipboard.writeText('/plugin marketplace add agentic-insights/foundry')}
                className="mt-4 w-full px-3 py-2 bg-[var(--ai-green)] hover:bg-[var(--ai-green-dim)] text-black font-mono text-xs font-semibold transition-colors"
              >
                COPY COMMAND
              </button>
            </div>
          </div>

          {/* External Links Bar */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 py-4 border-t border-[var(--ai-border)] font-mono text-xs">
            <span className="text-[var(--ai-gray-700)]">LINKS:</span>
            <a href="https://agentskills.io" target="_blank" rel="noopener noreferrer"
               className="text-[var(--ai-gray-500)] hover:text-[var(--ai-green)] transition-colors">
              agentskills.io
            </a>
            <a href="https://agents.md" target="_blank" rel="noopener noreferrer"
               className="text-[var(--ai-gray-500)] hover:text-[var(--ai-green)] transition-colors">
              agents.md
            </a>
            <a href="https://github.com/killerapp" target="_blank" rel="noopener noreferrer"
               className="text-[var(--ai-gray-500)] hover:text-[var(--ai-green)] transition-colors">
              killerapp <span className="text-[var(--ai-gray-700)]">(archives)</span>
            </a>
            <Link to="/inspect" className="text-[var(--ai-gray-500)] hover:text-[var(--ai-green)] transition-colors ml-auto">
              Marketplace Inspector [β] →
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content - Marketplace */}
      <main id="marketplace" className="max-w-7xl mx-auto px-6 py-12 scroll-mt-4">
        {/* Marketplace Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <h2 className="font-mono text-2xl font-bold text-white">
              <span className="text-[var(--ai-green)]">#</span> Marketplace
            </h2>
            <div className="flex-1 h-px bg-[var(--ai-border)]"></div>
            <a href="#marketplace" className="font-mono text-xs text-[var(--ai-gray-700)] hover:text-[var(--ai-green)] transition-colors">
              [permalink]
            </a>
          </div>
          <p className="text-sm text-[var(--ai-gray-500)] max-w-2xl">
            Claude Code plugins built on the <a href="https://agentskills.io" target="_blank" rel="noopener noreferrer" className="text-[var(--ai-green)] hover:underline">Agent Skills</a> specification. Install via <code className="text-[var(--ai-gray-300)]">/plugin marketplace add</code>.
          </p>
        </div>

        {/* Section Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="font-mono text-xs text-[var(--ai-gray-500)] uppercase tracking-widest">
            Plugin Inventory
          </div>
          <div className="flex-1 h-px bg-[var(--ai-border)]"></div>
          <div className="font-mono text-xs text-[var(--ai-gray-700)]">
            {filteredPlugins.length} AVAILABLE
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--ai-gray-700)] font-mono text-xs">grep</span>
            <input
              type="text"
              placeholder="search plugins..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-4 py-3 bg-black border border-[var(--ai-border)] text-white placeholder-[var(--ai-gray-500)] font-mono text-sm focus:outline-none focus:border-[var(--ai-green)] transition-colors"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 text-xs font-mono font-medium transition-colors uppercase tracking-wider ${
                !selectedCategory
                  ? 'bg-[var(--ai-green)] text-black'
                  : 'bg-black text-[var(--ai-gray-500)] border border-[var(--ai-border)] hover:border-[var(--ai-green)]/50 hover:text-[var(--ai-gray-300)]'
              }`}
            >
              ALL
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-xs font-mono font-medium transition-colors uppercase tracking-wider ${
                  selectedCategory === category
                    ? 'bg-[var(--ai-green)] text-black'
                    : 'bg-black text-[var(--ai-gray-500)] border border-[var(--ai-border)] hover:border-[var(--ai-green)]/50 hover:text-[var(--ai-gray-300)]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Plugin Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPlugins.map(plugin => (
            <PluginCard
              key={plugin.name}
              plugin={plugin}
              onSelect={setSelectedPlugin}
            />
          ))}
        </div>

        {filteredPlugins.length === 0 && (
          <div className="text-center py-12 text-[var(--ai-gray-500)] font-mono">
            <p className="text-sm mb-2">No plugins found</p>
            <p className="text-xs">Try adjusting your search or filter</p>
          </div>
        )}
      </main>

      {/* Footer - Station Terminal */}
      <footer className="border-t border-[var(--ai-border)] py-10 mt-12 bg-black relative">
        <div className="absolute inset-0 research-grid opacity-30"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Station ID */}
            <div>
              <div className="font-mono text-xs text-[var(--ai-gray-700)] mb-3 tracking-widest">
                ┌─ STATION ──────
              </div>
              <div className="font-mono text-sm text-[var(--ai-green)] mb-2">Foundry</div>
              <p className="text-[var(--ai-gray-500)] text-xs mb-3">
                Personal research station and living knowledge base. Tracking what works in AI-native development. Contributions welcome—open a PR or file an issue.
              </p>
              <a href="https://codebasecontext.org" target="_blank" rel="noopener noreferrer"
                 className="text-[var(--ai-green)] hover:underline text-xs font-mono">
                codebasecontext.org →
              </a>
            </div>

            {/* GitHub Orgs */}
            <div>
              <div className="font-mono text-xs text-[var(--ai-gray-700)] mb-3 tracking-widest">
                ├─ REPOS ────────
              </div>
              <ul className="space-y-1.5 font-mono text-xs">
                <li>
                  <a href="https://github.com/agentic-insights" target="_blank" rel="noopener noreferrer"
                     className="text-[var(--ai-gray-300)] hover:text-[var(--ai-green)] transition-colors">
                    agentic-insights
                  </a>
                  <span className="text-[var(--ai-gray-700)]"> prod</span>
                </li>
                <li>
                  <a href="https://github.com/killerapp" target="_blank" rel="noopener noreferrer"
                     className="text-[var(--ai-gray-300)] hover:text-[var(--ai-green)] transition-colors">
                    killerapp
                  </a>
                  <span className="text-[var(--ai-gray-700)]"> archive</span>
                </li>
                <li>
                  <a href="https://github.com/agentskills" target="_blank" rel="noopener noreferrer"
                     className="text-[var(--ai-gray-300)] hover:text-[var(--ai-green)] transition-colors">
                    agentskills
                  </a>
                  <span className="text-[var(--ai-gray-700)]"> spec</span>
                </li>
              </ul>
            </div>

            {/* Research Domains */}
            <div>
              <div className="font-mono text-xs text-[var(--ai-gray-700)] mb-3 tracking-widest">
                ├─ DOMAINS ──────
              </div>
              <ul className="space-y-1.5 font-mono text-xs">
                <li className="flex items-center gap-2">
                  <span className="text-[var(--ai-green)] status-live">●</span>
                  <Link to="/history" className="text-[var(--ai-gray-300)] hover:text-[var(--ai-green)] transition-colors">
                    Context Engineering
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[var(--ai-green)] status-live">●</span>
                  <a href="https://dreamgen.agenticinsights.com" target="_blank" rel="noopener noreferrer"
                     className="text-[var(--ai-gray-300)] hover:text-[var(--ai-green)] transition-colors">
                    Vision & Comprehension
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-500">●</span>
                  <span className="text-[var(--ai-gray-500)]">Red Team</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-orange-500">●</span>
                  <span className="text-[var(--ai-gray-500)]">+4 more</span>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <div className="font-mono text-xs text-[var(--ai-gray-700)] mb-3 tracking-widest">
                └─ RESOURCES ────
              </div>
              <ul className="space-y-1.5 font-mono text-xs">
                <li>
                  <Link to="/history" className="text-[var(--ai-gray-300)] hover:text-[var(--ai-green)] transition-colors">
                    History
                  </Link>
                </li>
                <li>
                  <Link to="/inspect" className="text-[var(--ai-gray-300)] hover:text-[var(--ai-green)] transition-colors">
                    Inspector [β]
                  </Link>
                </li>
                <li>
                  <a href="https://agentskills.io" target="_blank" rel="noopener noreferrer"
                     className="text-[var(--ai-gray-300)] hover:text-[var(--ai-green)] transition-colors">
                    Agent Skills Spec
                  </a>
                </li>
                <li>
                  <a href="https://agents.md" target="_blank" rel="noopener noreferrer"
                     className="text-[var(--ai-gray-300)] hover:text-[var(--ai-green)] transition-colors">
                    AGENTS.md
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-[var(--ai-border)] pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="font-mono text-xs text-[var(--ai-gray-700)]">
              Apache-2.0 · <a href="https://agenticinsights.com" target="_blank" rel="noopener noreferrer"
                              className="hover:text-[var(--ai-gray-500)]">Agentic Insights</a>
            </div>
            <div className="font-mono text-xs text-[var(--ai-gray-700)]">
              <span className="text-[var(--ai-green)]">▲</span> STATION.ONLINE
            </div>
          </div>
        </div>
      </footer>

      {/* Plugin Detail Modal */}
      {selectedPlugin && (
        <PluginDetail
          plugin={selectedPlugin}
          onClose={() => setSelectedPlugin(null)}
        />
      )}
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Marketplace />} />
        <Route path="/history" element={<History />} />
        <Route path="/inspect" element={<Inspector />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
