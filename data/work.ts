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

/** A single headline metric, shown as a big number + label card. */
export type Metric = {
  /** The number or short value, e.g. "5×" or "99.9%". */
  value: string;
  /** What it measures, e.g. "Lower latency". */
  label: string;
};

/** A dimension of difficulty, shown as a labelled card (used by "Why this is difficult"). */
export type ChallengeCard = {
  title: string;
  note: string;
};

/** A before/after comparison that shows the value of a decision at a glance. */
export type Comparison = {
  before: { label: string; points: string[] };
  after: { label: string; points: string[] };
};

/** A single step in a repeatable loop, shown as a numbered vertical flow. */
export type FlowStep = {
  step: string;
  detail: string;
};

export type WorkSection = {
  heading: string;
  body?: string;
  bullets?: string[];
  /** Structured Decision → Why → Tradeoff cards (used by "Key engineering decisions"). */
  decisions?: Decision[];
  /** Big number + label cards (used by "Outcome"). */
  metrics?: Metric[];
  /** Labelled difficulty cards (used by "Why this is difficult"). */
  cards?: ChallengeCard[];
  /** A before/after comparison block. */
  comparison?: Comparison;
  /** A numbered vertical flow (used by "The playable loop"). */
  flow?: FlowStep[];
  /** Render the case study's architecture diagram inside this section. */
  showDiagram?: boolean;
};

export type CaseStudy = {
  slug: string;
  /** Short internal title (nav, cards). */
  title: string;
  /** Big product-style one-liner shown on the work index card. */
  tagline: string;
  /** The soul of the project — "what makes this interesting", led with on the case-study hero. */
  angle: string;
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
    angle: "Making unreliable AI reliable enough for healthcare.",
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
        body: "Clinical documents look structured — until they aren't. Tables break, names surface in unexpected places, and one wrong redaction can remove the wrong person. Yet every report still needs quality review — manual, expensive, inconsistent, and impossible to do at scale.",
      },
      {
        heading: "Why this is difficult",
        cards: [
          {
            title: "Sensitive data",
            note: "PHI must be stripped — but clinician and clinic context has to survive, so naive redaction deletes exactly what reviewers need.",
          },
          {
            title: "Messy documents",
            note: "OCR output is structurally inconsistent, with broken tables that later stages can't trust.",
          },
          {
            title: "Non-deterministic LLMs",
            note: "Models answer differently on reruns, yet downstream agents need stable contracts and a QA tool can't contradict itself.",
          },
          {
            title: "Clinical safety",
            note: "Every recommendation has to trace back to evidence a human reviewer can audit.",
          },
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
        heading: "PHI redaction: before vs. after",
        comparison: {
          before: {
            label: "Generic PHI detection",
            points: [
              "Wrong person removed",
              "Clinic phone number stripped",
              "Patient nickname missed",
            ],
          },
          after: {
            label: "Identity anchoring",
            points: [
              "Only the correct worker removed",
              "Clinic context preserved",
              "Aliases matched and handled",
            ],
          },
        },
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
        metrics: [
          { value: "60+", label: "Clinical reports tested" },
          { value: "5×", label: "Lower latency" },
          { value: "Pilot", label: "Preparing to deploy" },
          { value: "Human", label: "Review preserved" },
        ],
      },
      {
        heading: "Reflection",
        body: "Reliable AI isn't built by choosing one perfect model. It's built by designing the contracts, guardrails, and review process around imperfect ones — correct redaction, deterministic outputs, evidence you can point back to.",
      },
    ],
  },
  {
    slug: "investment-time-machine",
    title: "Investment Time Machine",
    kicker: "Interactive Learning · Behavioral Design · Historical Markets",
    accent: "amber",
    tagline:
      "A playable historical market experience where beginners investigate real companies, allocate limited capital, live through the COVID crash, and reflect on how they made decisions.",
    angle: "Teaching investing by changing behavior — not by teaching knowledge.",
    summary:
      "A playable capital-allocation experiment built around real companies, prices, and market events from 2019 to 2021 — investigate, allocate $10,000, advance through history, and reflect on how you decided. A learning experience, not financial advice.",
    year: "2026",
    role: "Solo — design & engineering",
    status: "Playable Prototype",
    tech: ["React", "Vite", "JavaScript", "SVG", "State machine", "Static site"],
    repoUrl: "https://github.com/Chuyuyan/investment-time-machine",
    sections: [
      {
        heading: "The problem",
        body: "I knew I should start investing. I just never felt ready. The barrier was never missing information — it was the fear of making the wrong call with real money, and never having a safe place to practice uncertainty, tradeoffs, and position sizing before the stakes got real.",
      },
      {
        heading: "Why a game?",
        body: "Delivering the idea mattered as much as developing it. A course could explain valuation or diversification, but it wouldn't necessarily reduce the emotional resistance that stops someone from starting. A game creates curiosity, gives decisions consequences, and lets players learn through action rather than instruction.",
        cards: [
          {
            title: "Curiosity before instruction",
            note: "Players begin by exploring real companies, so the motivation to learn comes from wanting to know — not from being told.",
          },
          {
            title: "Tradeoffs before theory",
            note: "Limited capital forces real choices, so diversification and position sizing are felt before they're ever named.",
          },
          {
            title: "Reflection before grading",
            note: "The experience ends by mirroring how you decided, not by scoring whether you won.",
          },
        ],
      },
      {
        heading: "My role",
        body: "Solo project — I designed the experience and built the whole prototype: the content model, the state machine that drives the loop, the behavioral reflection, and the React UI. The interesting work was less about code and more about deciding what the experience needed to make a beginner curious enough to begin.",
      },
      {
        heading: "The playable loop",
        body: "The core is short and repeatable — the same handful of actions, played across six real moments in market history.",
        flow: [
          {
            step: "Investigate",
            detail:
              "Explore five real companies — historical prices, valuation labels, real news, and public sentiment from that moment.",
          },
          {
            step: "Allocate capital",
            detail:
              "Start with $10,000. Place capital into companies or deliberately keep cash — every buy competes for limited money.",
          },
          {
            step: "Advance time",
            detail:
              "Move to the next of six real moments from January 2019 to December 2021, including the COVID crash.",
          },
          {
            step: "See market consequences",
            detail:
              "The market answers loudly — real prices move, and your portfolio reacts to what actually happened.",
          },
          {
            step: "Reflect",
            detail:
              "A behavioral mirror shows reallocation frequency, biggest concentration, and how you behaved during the crash.",
          },
        ],
      },
      {
        heading: "What makes it difficult",
        cards: [
          {
            title: "Real data without hindsight",
            note: "Prices and news are real, but the interface can't reveal what happens next — the player has to decide the way people actually did, without knowing the ending.",
          },
          {
            title: "Outcomes without grading",
            note: "The market shows consequences, but the design deliberately avoids a win/lose score that would reward luck over judgment.",
          },
          {
            title: "Capital is finite",
            note: "With only $10,000, every buy competes with another — scarcity is what turns clicks into genuine tradeoffs.",
          },
          {
            title: "History must stay emotionally engaging",
            note: "The events already happened, so the challenge is making a known past feel uncertain, tense, and worth living through.",
          },
        ],
      },
      {
        heading: "Key product decisions",
        decisions: [
          {
            decision: "One era, not an endless simulator.",
            why: "Anchoring to a single 2019–2021 market era with real events lets me design tension, pacing, and lessons deliberately — an endless random simulator would dilute all three.",
            tradeoff:
              "Less replay variety and no 'infinite' market, in exchange for a tighter, more meaningful first experience.",
          },
          {
            decision: "Show money throughout.",
            why: "Money is the emotional core of investing; keeping cash and portfolio value visible at all times preserves the exact feelings — hesitation, greed, fear — the experience is trying to surface.",
            tradeoff:
              "A visible balance invites outcome-chasing, so the reflection has to work harder to redirect attention from score to behavior.",
          },
          {
            decision: "Reflect behavior instead of scoring decisions.",
            why: "The goal is self-awareness, not a leaderboard. Showing how you allocated, concentrated, and reacted during the crash teaches more than telling someone they 'won' or 'lost'.",
            tradeoff:
              "Less immediately gratifying than a P&L score, and harder to design — but it's what makes the lesson stick.",
          },
        ],
      },
      {
        heading: "Engineering implementation",
        body: "The prototype is a self-contained React single-page application with no backend. Historical prices, events, company context, and news are encoded locally, so the experience is deterministic, fast, and deployable as a static site.",
        bullets: [
          "A React state machine drives the three phases: intro → trade → reflect.",
          "A local historical dataset holds real split-adjusted prices, valuation labels, news, and sentiment for each moment.",
          "Transaction and portfolio state track every buy, sell, and cash position through the era.",
          "Behavioral metrics — reallocation count, biggest concentration, crash-time behavior — are derived from the player's own actions.",
          "SVG sparklines render each company's price history inline.",
          "Animated number transitions bring portfolio changes to life.",
          "The whole thing ships as a CSP-safe static site.",
        ],
      },
      {
        heading: "Outcome",
        metrics: [
          { value: "$10,000", label: "Starting capital" },
          { value: "5", label: "Real companies" },
          { value: "6", label: "Historical market moments" },
          { value: "2019–2021", label: "One complete market era" },
        ],
        body: "The current prototype is fully playable and deployed. My next focus is making discovery, pacing, and decision depth more engaging before expanding to additional eras.",
      },
      {
        heading: "Reflection",
        body: "Educational products fail when they optimize only for what users should learn. The harder problem is designing an experience people are willing to enter, continue, and reflect on. Here, gameplay isn't decoration around the lesson — it is the delivery mechanism.",
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
    angle: "Helping developers find intent, not just files.",
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
        body: "You know the function exists. You just can't remember what it's called, or which of two thousand repos it lives in. Keyword search only finds the words you already know — not the code you're actually looking for. People needed to search by meaning and get ranked, relevant code back.",
      },
      {
        heading: "Why this is difficult",
        cards: [
          {
            title: "Meaning vs. keywords",
            note: "The code you want is often lexically different from the words you'd search for.",
          },
          {
            title: "Scale",
            note: "2,000+ repositories and 50k+ code chunks — far past what anyone navigates by memory.",
          },
          {
            title: "Multi-tenant",
            note: "Each team's code has to stay isolated and access-controlled.",
          },
          {
            title: "Cost",
            note: "LLM calls at 1,000+ concurrent users have to stay affordable, or the tool dies.",
          },
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
        metrics: [
          { value: "2,000+", label: "Repos indexed" },
          { value: "60%", label: "Better retrieval" },
          { value: "1,000+", label: "Concurrent users" },
          { value: "99.9%", label: "Uptime" },
        ],
      },
      {
        heading: "Reflection",
        body: "Most of the engineering in an \"AI feature\" is cost control, caching, and multi-tenancy — not the model call. And a developer tool only earns its keep when it fits the workflow people already have.",
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
    angle: "Replacing repetitive clinical workflows without disrupting operations.",
    summary:
      "A Selenium automation system that migrates structured patient data from an isolated hospital intranet into third-party platforms, deployed in production at a Grade III Class A hospital.",
    year: "2025",
    role: "Software R&D Intern · Kangyu Medical",
    status: "Deployed in production",
    tech: ["Python", "Selenium WebDriver", "Multi-threading", "Schema validation", "JSON logging"],
    sections: [
      {
        heading: "The problem",
        body: "The data existed. It was just trapped — locked inside a hospital intranet with no API, re-typed by hand into another system, one record at a time. In a hospital, a typo isn't a nuisance; it's a risk to a patient.",
      },
      {
        heading: "Why this is difficult",
        cards: [
          {
            title: "No API",
            note: "Data was locked behind an unstable intranet UI never built for automation.",
          },
          {
            title: "Heterogeneous records",
            note: "Each record spanned 20–30 fields needing type conversion and validation.",
          },
          {
            title: "Zero tolerance",
            note: "A single bad write in a Grade III Class A hospital is dangerous, not just annoying.",
          },
        ],
      },
      {
        heading: "My role",
        body: "Software R&D Intern at Kangyu Medical. I built the OCR and automation pipelines for low-quality medical documents, including the migration tool described here, and owned its reliability in a live hospital environment.",
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
        metrics: [
          { value: "800+", label: "Records migrated" },
          { value: "99.5%", label: "Data integrity" },
          { value: "73%", label: "Faster per record" },
          { value: "30→200", label: "Records per day" },
        ],
      },
      {
        heading: "Reflection",
        body: "Automation in a high-stakes environment is mostly failure handling, not the happy path. The rollback and validation layers are what earned enough trust to run in production.",
      },
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
