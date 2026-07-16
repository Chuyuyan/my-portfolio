// data/work.ts — Case studies (the "Work" section of the site).
// Every project is presented as an engineering case study following one template:
// Problem → Constraints → My role → Architecture → Key engineering decisions →
// Tradeoffs → Outcome → Reflection.

/** A single engineering decision, shown as Decision → Why → Tradeoff. */
export type Decision = {
  /** The choice, stated plainly. */
  decision: string;
  /** The reasoning — why this was the right call given the problem. */
  why: string;
  /** What it cost — the thing deliberately given up in return. */
  tradeoff: string;
};

export type WorkSection = {
  heading: string;
  body?: string;
  bullets?: string[];
  /** Structured Decision → Why → Tradeoff cards (used by "Key engineering decisions"). */
  decisions?: Decision[];
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
  /** Low-saturation accent color that gives each case study its own identity. */
  accent: "blue" | "amber" | "violet" | "emerald";
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
    accent: "blue",
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
        heading: "The constraints",
        bullets: [
          "PHI cannot leak — but clinician and clinic information must be preserved, so naive redaction over-deletes exactly the context reviewers need.",
          "LLM output is non-deterministic, yet downstream agents depend on stable contracts and a QA tool can't give different answers on reruns.",
          "Azure APIs impose rate limits, so a fan-out of agents can't just hammer the endpoint.",
          "OCR output is structurally inconsistent, including broken table layouts that later stages can't trust.",
        ],
      },
      {
        heading: "My role",
        body: "I co-designed the end-to-end platform with one teammate, and independently designed and implemented the document-processing and recommendation-generation components — Agents 1 and 4. That covers everything from raw ingestion and PHI handling through to the grounded recommendations a reviewer actually reads.",
      },
      {
        heading: "Architecture",
        body: "A staged pipeline: ingest via Azure Document Intelligence → identity-anchored PHI redaction (Microsoft Presidio combined with header-derived identity resolution, fuzzy name matching, and ownership-aware rules) → table reconstruction to rebuild structured layouts → a rate-limit-aware parallel evaluation stage → RAG-grounded recommendations → a final structured QA report for human review.",
        showDiagram: true,
      },
      {
        heading: "Key engineering decisions",
        decisions: [
          {
            decision: "Identity-anchored PHI redaction instead of generic NER.",
            why: "Off-the-shelf named-entity recognition stripped the clinician and clinic context reviewers actually need while still missing patient aliases. I built worker identity from structured headers, then combined Presidio with fuzzy matching and ownership-aware rules so the system knows whose data it's looking at.",
            tradeoff:
              "More moving parts and slower to tune than a single model call — accepted because precision and auditability matter more than convenience when PHI is on the line.",
          },
          {
            decision: "Fan agents out through a rate-limit-aware ThreadPoolExecutor.",
            why: "A naive parallel fan-out would trip Azure's rate limits and a sequential one was too slow. Bounded, limit-aware concurrency cut recommendation-stage latency up to 5× while keeping output stable under load.",
            tradeoff:
              "Added scheduling and back-pressure complexity instead of simple sequential calls, in exchange for the throughput a pilot needs.",
          },
          {
            decision: "Rebuild table structure in its own stage rather than trusting raw OCR downstream.",
            why: "OCR table layouts were inconsistent, and letting that leak into later agents made them fragile. Isolating reconstruction hands every downstream agent a stable, predictable contract.",
            tradeoff:
              "One more stage to maintain — but contract changes never ripple into existing agents.",
          },
          {
            decision: "Anchor every recommendation to retrieved source text.",
            why: "A QA tool nobody can audit won't be trusted in healthcare. Grounding lets a reviewer trace each claim back to the evidence instead of taking the model's word for it.",
            tradeoff:
              "Retrieval and citation add latency and engineering overhead versus free-form generation — worth it for reviewability.",
          },
        ],
      },
      {
        heading: "Tradeoffs",
        bullets: [
          "Precision over recall on redaction: the system would rather keep a borderline token and flag it than silently delete context a reviewer needs.",
          "Determinism over model creativity: outputs are constrained and grounded, which costs some fluency but makes reruns trustworthy.",
          "Human-in-the-loop by design — the platform produces reviewable recommendations, not autonomous decisions. Slower than full automation, but the only responsible default in clinical QA.",
          "Tuned for the demo-to-pilot path over generality: the pipeline is fitted to this report format, and broadening it is deliberate future work.",
        ],
      },
      {
        heading: "Outcome",
        bullets: [
          "60+ real clinical reports used in internal testing.",
          "Completed an internal leadership demo; preparing for pilot.",
          "Up to 5× reduction in recommendation-stage latency.",
          "Reduced dependence on manual QA review.",
        ],
      },
      {
        heading: "Reflection",
        body: "Reliable AI systems come less from choosing one perfect model and more from designing the contracts, fallbacks, evaluations, and human-review boundaries around imperfect components. In healthcare AI the model is the easy part — trust comes from the boring stages around it: correct redaction, deterministic outputs, and evidence you can point back to.",
      },
    ],
  },
  {
    slug: "investment-time-machine",
    title: "Investment Time Machine",
    kicker: "Product Design · Interactive Learning · Finance",
    accent: "amber",
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
        heading: "The constraints",
        bullets: [
          "It has to feel like a game, not homework — no finance jargon in the core loop.",
          "Hide profit-and-loss during play, or players judge decisions by outcome — the exact bias the product fights.",
          "Learning has to transfer to real investing, and complexity must increase gradually.",
          "It's a learning experience, not financial advice: no stock tips, no expected returns, no promise of beating the market.",
        ],
      },
      {
        heading: "My role",
        body: "Solo project — I designed the product and built all of it: the content model, a pure unit-tested game engine, and the React UI. The interesting work was less about code and more about deciding what the experience needed to make a beginner curious enough to begin.",
      },
      {
        heading: "Architecture",
        body: "Content, engine, and presentation are deliberately separated. Game content (a 3-day AI-boom campaign and the motivation library) lives in JSON; a pure, unit-tested engine computes portfolio math, decision-quality scoring, and a behavioral \"Investor DNA\" vector; a React UI renders it. The core loop: relive a historical event → decide under fog-of-war (three competing signals plus a planted red herring) → tap one motivation that silently carries a seven-trait fingerprint → repeat for three days → Decision Autopsy.",
      },
      {
        heading: "Key engineering decisions",
        decisions: [
          {
            decision: "Make the player uncover evidence instead of being lectured.",
            why: "The audience that most needs this is allergic to courses; learning that feels earned keeps them curious enough to continue.",
            tradeoff:
              "Slower to teach a given concept than just stating it, and harder to author — but retention and motivation are the whole point.",
          },
          {
            decision: "Carry decisions forward as a persistent portfolio rather than resetting each round.",
            why: "Choices only feel weighty when they have downstream consequences the player has to live with.",
            tradeoff:
              "More state to manage and balance than independent puzzles, at the benefit of genuine stakes.",
          },
          {
            decision: "Score decision quality in the Decision Autopsy, not whether the trade paid off.",
            why: "Outcome bias is the exact failure the product fights; rewarding good process even when it loses is what breaks it.",
            tradeoff:
              "Less immediately satisfying than a P&L number, but it teaches the right lesson.",
          },
          {
            decision: "Fake the engine on purpose — decision-quality as a lookup table, alternate timelines hardcoded.",
            why: "To a first-time player it's indistinguishable from a real engine, and it lets me validate the emotional truth of the loop before investing in the hard modeling.",
            tradeoff:
              "Doesn't generalize beyond the authored scenario yet — deliberate: build the real engine only if the bet lands.",
          },
        ],
      },
      {
        heading: "Tradeoffs",
        bullets: [
          "A believable first experience over engine generality — the simulation is scripted, not a true market model, and that's a conscious sequencing choice.",
          "Hid profit-and-loss during play even though it dampens the obvious dopamine, because showing it would reinforce the exact bias the product exists to correct.",
          "Behavioral instrumentation over content volume — one tight 3-day campaign instrumented deeply beats a large shallow one for proving the loop changes behavior.",
          "Scoped as an educational simulation, not advice: no tips, no expected returns — which limits 'usefulness' claims but keeps it honest and safe.",
        ],
      },
      {
        heading: "Outcome",
        bullets: [
          "Playable end-to-end prototype with the core loop fully implemented.",
          "Deployed as a web experience anyone can try.",
          "User testing planned; next focus is discovery, pacing, and decision depth.",
        ],
      },
      {
        heading: "Reflection",
        body: "Product delivery matters as much as product intent — financial education only works when users feel curious enough to begin. And the moat was never the content; it's the behavioral data plus a loop that can actually prove someone changed, so instrument it from day one even if you don't show it yet.",
      },
    ],
  },
  {
    slug: "code-search",
    title: "Code Search & Developer Tooling",
    kicker: "Developer Tools · Search · Full Stack",
    accent: "violet",
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
        heading: "The constraints",
        bullets: [
          "Serve 1,000+ concurrent users on infrastructure that had to stay cheap.",
          "Index 2,000+ repositories and 50k+ code chunks, with incremental updates rather than full rebuilds.",
          "Multi-tenant: each team's code isolated and access-controlled.",
          "LLM API cost had to be controlled or the whole thing was unaffordable.",
        ],
      },
      {
        heading: "My role",
        body: "Software Engineering Intern at Dingke Medical Technology. I built the hybrid search infrastructure end-to-end — the retrieval pipeline, the multi-tenant API layer, and the deployment — serving it to real internal engineering teams.",
      },
      {
        heading: "Architecture",
        body: "A hybrid retrieval pipeline built on Flask REST APIs: a user query fans out to keyword retrieval (ripgrep) and semantic retrieval (a FAISS IndexFlatIP vector index over code embeddings), the results are merged and re-ranked, and the top evidence is handed to a multi-provider LLM orchestration layer for analysis. Multi-tenant storage uses SQLite + SQLAlchemy with JWT and RBAC over 20+ endpoints.",
        showDiagram: true,
      },
      {
        heading: "Key engineering decisions",
        decisions: [
          {
            decision: "Combine ripgrep keyword search with a FAISS vector index instead of picking one.",
            why: "Keyword search misses semantically related code and vector search misses exact identifiers; merging and re-ranking both improved retrieval accuracy 60% over keyword alone.",
            tradeoff:
              "Two retrieval paths plus a ranking layer to maintain rather than one — worth it for the accuracy gain.",
          },
          {
            decision: "Add response caching and exponential-backoff retries across multiple LLM providers.",
            why: "LLM cost would have made the feature unaffordable at 1,000+ users; orchestration cut API cost 40% and absorbed provider failures.",
            tradeoff:
              "Caching introduces staleness and cache-invalidation complexity, accepted in exchange for affordability and resilience.",
          },
          {
            decision: "Update the FAISS index incrementally rather than rebuilding it.",
            why: "Full rebuilds over 2,000+ repos would block live search; incremental updates keep the index fresh without downtime.",
            tradeoff:
              "More bookkeeping and edge cases around partial updates than a simple periodic full rebuild.",
          },
          {
            decision: "Surface results where developers already work.",
            why: "A tool that forces a context switch doesn't get used; meeting developers in the editor is what drove adoption.",
            tradeoff:
              "Editor integration is more constrained and finicky than a standalone web UI.",
          },
        ],
      },
      {
        heading: "Tradeoffs",
        bullets: [
          "SQLite + SQLAlchemy over a heavier database to keep infrastructure cheap — fine at current scale, a known ceiling if tenants or write volume grow.",
          "FAISS IndexFlatIP (exact search) for ranking quality over approximate-nearest-neighbor speed, accepting higher query cost at this corpus size.",
          "Retrieval accuracy and cost control over latency micro-optimization — the right call for an internal tool, revisitable if it went user-facing at large scale.",
        ],
      },
      {
        heading: "Outcome",
        bullets: [
          "Indexed 2,000+ repositories and 50k+ code chunks.",
          "60% improvement in retrieval accuracy over keyword-only search.",
          "Served 1,000+ concurrent users at 99.9% uptime (Docker + Gunicorn + Nginx).",
          "40% reduction in LLM API cost.",
        ],
      },
      {
        heading: "Reflection",
        body: "Hybrid retrieval beats clever single-method search in the real world, and most of the engineering effort in an \"AI feature\" is actually cost control, caching, and multi-tenancy — not the model call itself. Developer tools are also most valuable when they fit an existing workflow instead of forcing users into a separate interface.",
      },
    ],
  },
  {
    slug: "hospital-automation",
    title: "Hospital Integration Automation",
    kicker: "Automation · Healthcare Ops · Reliability",
    accent: "emerald",
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
        heading: "The constraints",
        bullets: [
          "Internal web interfaces were unstable and not built for automation.",
          "Each record spanned 20–30 heterogeneous fields needing type conversion and validation.",
          "Data integrity was non-negotiable — this ran in production at a Grade III Class A hospital.",
        ],
      },
      {
        heading: "My role",
        body: "R&D Assistant Intern at Kangyu Medical. I built the OCR and automation pipelines for low-quality medical documents, including the migration tool described here, and owned its reliability in a live hospital environment.",
      },
      {
        heading: "Architecture",
        body: "Python + Selenium WebDriver drove the intranet UI through authentication and dynamic forms, feeding a data-transformation pipeline that validated schemas and converted types before writing to the target platform. Configurable multi-threading with exponential-backoff retry, per-field validation, and rollback kept throughput high without sacrificing correctness.",
      },
      {
        heading: "Key engineering decisions",
        decisions: [
          {
            decision: "Validate every field and support rollback on every record, before optimizing throughput.",
            why: "In a Grade III Class A hospital a bad write is dangerous; correctness had to be structural, not best-effort. Guardrails first still cut processing time 73% (45s → 12s per record).",
            tradeoff:
              "Per-record validation and rollback add overhead versus fire-and-forget writes — non-negotiable given the stakes.",
          },
          {
            decision: "Make thread count configurable rather than fixed.",
            why: "The same tool had to run gently on a fragile intranet and aggressively on a stable one; hard-coding either would break the environment or waste it.",
            tradeoff:
              "Pushes a tuning decision onto the operator instead of being fully automatic.",
          },
          {
            decision: "Log every record's path as structured JSON.",
            why: "Auditability is what made staff trust an automated tool touching patient data; every migration can be traced and explained.",
            tradeoff:
              "More log volume and logging discipline than plain print statements — paid back the first time something needed investigating.",
          },
        ],
      },
      {
        heading: "Tradeoffs",
        bullets: [
          "UI automation (Selenium) over a proper integration because the intranet exposed no API — reliable but inherently brittle to UI changes, a conscious 'meet the system where it is' tradeoff.",
          "Data integrity over maximum throughput: the system runs as fast as it safely can, not as fast as it possibly could.",
          "Built for this hospital's forms and workflow first; generalizing to other deployments is deliberate future work.",
        ],
      },
      {
        heading: "Outcome",
        bullets: [
          "Migrated 800+ patient records at 99.5% data integrity.",
          "Lifted throughput from ~30 to 200 records per day.",
          "73% reduction in per-record processing time.",
        ],
      },
      {
        heading: "Reflection",
        body: "Automation in a high-stakes environment is mostly about failure handling, not the happy path. The rollback and validation layers were what made anyone trust it enough to run in production.",
      },
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
