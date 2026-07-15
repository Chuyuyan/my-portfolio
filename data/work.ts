// data/work.ts — Case studies (the "Work" section of the site).
// Each project is presented as a product case study following one template:
// Problem → My role → Constraints → Architecture → Key decisions → Impact → Reflection.

export type WorkSection = {
  heading: string;
  body?: string;
  bullets?: string[];
  /** Render the case study's architecture diagram inside this section. */
  showDiagram?: boolean;
};

export type CaseStudy = {
  slug: string;
  /** Short internal title (nav, cards). */
  title: string;
  /** Big product-style one-liner shown on the card and case-study hero. */
  tagline: string;
  /** One-sentence "what it is". */
  summary: string;
  /** Category label shown above the title (e.g. "Healthcare AI"). */
  kicker: string;
  year: string;
  role?: string;
  /** Current status, e.g. "Playable prototype" or "Deployed in production". */
  status?: string;
  tech: string[];
  diagram?: "code-search" | "arthur";
  liveUrl?: string;
  repoUrl?: string;
  /** Ordered narrative sections. */
  sections: WorkSection[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "clinical-report-qa",
    title: "Arthur Health QAS",
    kicker: "AI Systems · Healthcare · Platform Engineering",
    tagline:
      "A multi-agent platform that turns unstructured clinical reports into structured, evidence-grounded quality reviews.",
    summary:
      "An end-to-end quality-assurance platform that ingests messy clinical documents, strips patient identifiers, and runs parallel LLM agents to produce grounded, reviewable recommendations.",
    year: "2026",
    role: "AI Agent Developer · Arthur Health",
    status: "Internal demo completed · preparing for pilot",
    tech: [
      "Python",
      "Multi-Agent LLMs",
      "Microsoft Presidio",
      "Azure Document Intelligence",
      "RAG",
      "ThreadPoolExecutor",
    ],
    diagram: "arthur",
    sections: [
      {
        heading: "The problem",
        body: "Clinical assessment reports require manual quality review, but the existing workflow is expensive, inconsistent, and can't check every rubric criterion or catch contradictions between sections. Reports arrive as unstructured documents full of protected health information (PHI), and there's no reliable way to evaluate their quality at scale without a human reading every one.",
      },
      {
        heading: "My role",
        body: "I co-designed the end-to-end platform with one teammate, and independently designed and implemented the document-processing and recommendation-generation components — Agents 1 and 4. That covers everything from raw ingestion and PHI handling through to the grounded recommendations a reviewer actually reads.",
      },
      {
        heading: "The constraints",
        bullets: [
          "PHI cannot leak — but clinician and clinic information must be preserved, so naive redaction over-deletes exactly the context reviewers need.",
          "LLM output is non-deterministic, yet downstream agents depend on stable contracts and a QA tool can't give different answers on reruns.",
          "Azure APIs impose rate limits, so a fan-out of agents can't just hammer the endpoint.",
          "OCR output is structurally inconsistent, including broken table layouts that later stages can't trust.",
        ],
      },
      {
        heading: "Architecture",
        body: "A staged pipeline: ingest via Azure Document Intelligence → identity-anchored PHI redaction (Microsoft Presidio combined with header-derived identity resolution, fuzzy name matching, and ownership-aware rules) → table reconstruction to rebuild structured layouts → a rate-limit-aware parallel evaluation stage → RAG-grounded recommendations → a final structured QA report for human review.",
        showDiagram: true,
      },
      {
        heading: "Key engineering decisions",
        bullets: [
          "Identity-anchored PHI redaction — generic NER stripped clinician info and missed patient aliases, so I built worker identity from structured headers, then combined Presidio with fuzzy matching and ownership-aware rules. Tradeoff: favour precision and auditability over aggressive redaction.",
          "Rate-limit-aware parallel execution — fanned agents out through a ThreadPoolExecutor that respects provider limits, cutting recommendation-stage latency up to 5× while keeping output deterministic under concurrency.",
          "Table reconstruction as a separate, backward-compatible stage — rebuilt structured layouts rather than trusting raw OCR downstream, so contract changes never break existing agents.",
          "Grounded recommendations — every recommendation is anchored to retrieved source text, so a reviewer can trace each claim back to evidence instead of trusting the model.",
        ],
      },
      {
        heading: "Impact",
        bullets: [
          "60+ real clinical reports used in internal testing.",
          "Completed an internal leadership demo; preparing for pilot.",
          "Up to 5× reduction in recommendation-stage latency.",
          "Reduced dependence on manual QA review.",
        ],
      },
      {
        heading: "What I learned",
        body: "Reliable AI systems come less from choosing one perfect model and more from designing the contracts, fallbacks, evaluations, and human-review boundaries around imperfect components. In healthcare AI the model is the easy part — trust comes from the boring stages around it: correct redaction, deterministic outputs, and evidence you can point back to.",
      },
    ],
  },
  {
    slug: "investment-time-machine",
    title: "Investment Time Machine",
    kicker: "Product Design · Interactive Learning · Finance",
    tagline:
      "A playable learning experience that helps beginners build confidence through discovery, evidence, and their own decisions.",
    summary:
      "An educational simulation — a pixel-art game where you relive real market history, decide under genuine uncertainty, then a Decision Autopsy reveals the behavioral biases you couldn't see in the moment. Not financial advice; a learning experience.",
    year: "2026",
    role: "Solo — design & engineering",
    status: "Playable prototype · iterating on discovery & engagement",
    tech: ["React", "Vite", "JavaScript", "Canvas", "localStorage", "Pure engine + tests"],
    repoUrl: "https://github.com/Chuyuyan",
    sections: [
      {
        heading: "The problem",
        body: "Many beginners know they should start investing, but fear and complexity stop them from taking the first step. And when they do start, they don't fail on facts — they fail on behavior: FOMO, panic-selling, overconfidence. Traditional courses teach concepts, yet the people who most need help are allergic to courses, and nobody ever shows them their own behavior.",
      },
      {
        heading: "My role",
        body: "Solo project — I designed the product and built all of it: the content model, a pure unit-tested game engine, and the React UI. The interesting work was less about code and more about deciding what the experience needed to make a beginner curious enough to begin.",
      },
      {
        heading: "The constraints",
        bullets: [
          "It has to feel like a game, not homework — no finance jargon in the core loop.",
          "Hide profit-and-loss during play, or players judge decisions by outcome — the exact bias the product fights.",
          "Learning has to transfer to real investing, and complexity must increase gradually.",
          "It's a learning experience, not financial advice: no stock tips, no expected returns, no promise of beating the market.",
        ],
      },
      {
        heading: "Architecture",
        body: "Content, engine, and presentation are deliberately separated. Game content (a 3-day AI-boom campaign and the motivation library) lives in JSON; a pure, unit-tested engine computes portfolio math, decision-quality scoring, and a behavioral \"Investor DNA\" vector; a React UI renders it. The core loop: relive a historical event → decide under fog-of-war (three competing signals plus a planted red herring) → tap one motivation that silently carries a seven-trait fingerprint → repeat for three days → Decision Autopsy.",
      },
      {
        heading: "Key engineering decisions",
        bullets: [
          "Discovery-first gameplay — the player uncovers evidence instead of being lectured, so learning feels earned rather than assigned.",
          "Portfolio as a persistent consequence — decisions carry forward, so choices have weight instead of resetting each round.",
          "Reflection evaluates process, not outcome — the Decision Autopsy scores the quality of the decision, not whether it happened to pay off, breaking outcome bias.",
          "Faked the engine on purpose — decision-quality is a lookup table and alternate timelines are hardcoded scenarios, indistinguishable to a first-time player. Ship the emotional truth first; build the real engine only if the bet lands.",
        ],
      },
      {
        heading: "Impact",
        bullets: [
          "Playable end-to-end prototype with the core loop fully implemented.",
          "Deployed as a web experience anyone can try.",
          "User testing planned; next focus is discovery, pacing, and decision depth.",
        ],
      },
      {
        heading: "What I learned",
        body: "Product delivery matters as much as product intent — financial education only works when users feel curious enough to begin. And the moat was never the content; it's the behavioral data plus a loop that can actually prove someone changed, so instrument it from day one even if you don't show it yet.",
      },
    ],
  },
  {
    slug: "code-search",
    title: "Code Search & Developer Tooling",
    kicker: "Developer Tools · Search · Full Stack",
    tagline:
      "A hybrid code search system combining semantic retrieval, AST indexing, and in-editor workflows.",
    summary:
      "A production hybrid search platform combining keyword and vector retrieval over thousands of repositories, served to 1,000+ concurrent users with multi-tenant security.",
    year: "2025",
    role: "Software Engineering Intern · Dingke Medical Technology",
    status: "Production · serving internal engineering teams",
    tech: ["Python", "Flask", "FAISS", "ripgrep", "SQLAlchemy", "JWT / RBAC", "Docker", "Nginx"],
    diagram: "code-search",
    sections: [
      {
        heading: "The problem",
        body: "Developers waste time navigating fragmented repositories, switching between keyword search, documentation, and code structure. Keyword search misses code that's semantically related but lexically different, and a large organization has thousands of repositories nobody can navigate by memory. People needed to ask questions by meaning and get ranked, relevant code back.",
      },
      {
        heading: "My role",
        body: "Software Engineering Intern at Dingke Medical Technology. I built the hybrid search infrastructure end-to-end — the retrieval pipeline, the multi-tenant API layer, and the deployment — serving it to real internal engineering teams.",
      },
      {
        heading: "The constraints",
        bullets: [
          "Serve 1,000+ concurrent users on infrastructure that had to stay cheap.",
          "Index 2,000+ repositories and 50k+ code chunks, with incremental updates rather than full rebuilds.",
          "Multi-tenant: each team's code isolated and access-controlled.",
          "LLM API cost had to be controlled or the whole thing was unaffordable.",
        ],
      },
      {
        heading: "Architecture",
        body: "A hybrid retrieval pipeline built on Flask REST APIs: a user query fans out to keyword retrieval (ripgrep) and semantic retrieval (a FAISS IndexFlatIP vector index over code embeddings), the results are merged and re-ranked, and the top evidence is handed to a multi-provider LLM orchestration layer for analysis. Multi-tenant storage uses SQLite + SQLAlchemy with JWT and RBAC over 20+ endpoints.",
        showDiagram: true,
      },
      {
        heading: "Key engineering decisions",
        bullets: [
          "Hybrid keyword + semantic retrieval — combined ripgrep and FAISS instead of picking one, and hybrid ranking improved retrieval accuracy by 60% over keyword alone.",
          "Cost-aware LLM orchestration — response caching and exponential-backoff retries across multiple providers cut API cost by 40%.",
          "Incremental AST indexing — incremental FAISS updates so re-indexing never blocked live search.",
          "In-editor workflow — surfaced results where developers already work rather than forcing them into a separate interface.",
          "Production hardening — Docker behind Gunicorn + Nginx on an Alibaba Cloud Linux VM, reaching 99.9% uptime.",
        ],
      },
      {
        heading: "Impact",
        bullets: [
          "Indexed 2,000+ repositories and 50k+ code chunks.",
          "60% improvement in retrieval accuracy over keyword-only search.",
          "Served 1,000+ concurrent users at 99.9% uptime.",
          "40% reduction in LLM API cost.",
        ],
      },
      {
        heading: "What I learned",
        body: "Hybrid retrieval beats clever single-method search in the real world, and most of the engineering effort in an \"AI feature\" is actually cost control, caching, and multi-tenancy — not the model call itself. Developer tools are also most valuable when they fit an existing workflow instead of forcing users into a separate interface.",
      },
    ],
  },
  {
    slug: "hospital-automation",
    title: "Hospital Integration Automation",
    kicker: "Automation · Healthcare Ops · Reliability",
    tagline:
      "Freeing patient data trapped in isolated hospital intranets — reliably, at production scale.",
    summary:
      "A Selenium automation system that migrates structured patient data from an isolated hospital intranet into third-party platforms, deployed in production at a Grade III Class A hospital.",
    year: "2025",
    role: "R&D Assistant Intern · Kangyu Medical",
    status: "Deployed in production",
    tech: ["Python", "Selenium WebDriver", "Multi-threading", "Schema validation", "JSON logging"],
    sections: [
      {
        heading: "The problem",
        body: "Patient data was trapped inside an isolated hospital intranet, and staff re-entered it by hand into third-party case-management platforms — slow, error-prone, and unscalable. In healthcare, a transcription error isn't just annoying, it's dangerous.",
      },
      {
        heading: "My role",
        body: "R&D Assistant Intern at Kangyu Medical. I built the OCR and automation pipelines for low-quality medical documents, including the migration tool described here, and owned its reliability in a live hospital environment.",
      },
      {
        heading: "The constraints",
        bullets: [
          "Internal web interfaces were unstable and not built for automation.",
          "Each record spanned 20–30 heterogeneous fields needing type conversion and validation.",
          "Data integrity was non-negotiable — this ran in production at a Grade III Class A hospital.",
        ],
      },
      {
        heading: "Architecture",
        body: "Python + Selenium WebDriver drove the intranet UI through authentication and dynamic forms, feeding a data-transformation pipeline that validated schemas and converted types before writing to the target platform. Configurable multi-threading with exponential-backoff retry, per-field validation, and rollback kept throughput high without sacrificing correctness.",
      },
      {
        heading: "Key engineering decisions",
        bullets: [
          "Guardrails over raw speed — validation and rollback on every record, and it still cut processing time by 73% (45s → 12s per record).",
          "Configurable concurrency — the same tool could run gently on a fragile intranet or aggressively on a stable one.",
          "Structured JSON logging — every record's path was auditable, which is what made anyone trust it in production.",
        ],
      },
      {
        heading: "Impact",
        bullets: [
          "Migrated 800+ patient records at 99.5% data integrity.",
          "Lifted throughput from ~30 to 200 records per day.",
          "73% reduction in per-record processing time.",
        ],
      },
      {
        heading: "What I learned",
        body: "Automation in a high-stakes environment is mostly about failure handling, not the happy path. The rollback and validation layers were what made anyone trust it enough to run in production.",
      },
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
