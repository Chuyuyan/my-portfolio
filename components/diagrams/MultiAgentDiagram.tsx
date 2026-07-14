const boxBase =
  "rounded-lg border px-3 py-2 text-center text-xs sm:text-sm font-medium leading-tight";
const neutralBox =
  boxBase +
  " bg-slate-50 dark:bg-gray-900/60 border-slate-200 dark:border-gray-700 text-slate-700 dark:text-slate-200";
const accentBox =
  boxBase +
  " bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-900 text-blue-800 dark:text-blue-200";
const finalBox =
  boxBase +
  " bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-200";

function Sub({ children }: { children: React.ReactNode }) {
  return (
    <span className="mt-0.5 block text-[10px] font-normal text-slate-500 dark:text-slate-400">
      {children}
    </span>
  );
}

function Arrow({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5 py-1 text-slate-400 dark:text-slate-500">
      {label && <span className="text-[10px] uppercase tracking-wide">{label}</span>}
      <span className="text-base leading-none">↓</span>
    </div>
  );
}

export default function MultiAgentDiagram() {
  return (
    <figure className="not-prose my-5 rounded-xl border border-slate-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/40 p-4 sm:p-6">
      <figcaption className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        Architecture — Multi-Agent Clinical Report QA
      </figcaption>

      <div
        className="mx-auto flex w-full flex-col items-stretch"
        style={{ maxWidth: "30rem" }}
      >
        <div className={neutralBox}>
          Unstructured Clinical Report
          <Sub>ingested via Azure Document Intelligence</Sub>
        </div>

        <Arrow label="redact" />
        <div className={accentBox}>
          PHI Redaction
          <Sub>Presidio · identity resolution · fuzzy match · ownership rules</Sub>
        </div>

        <Arrow label="restore" />
        <div className={neutralBox}>
          Table Reconstruction
          <Sub>rebuild structured layout · backward-compatible</Sub>
        </div>

        <Arrow label="fan-out · ThreadPoolExecutor" />
        <div className={accentBox}>
          Multi-Agent Evaluation
          <Sub>parallel · rate-limit-aware · deterministic · up to 5× faster</Sub>
        </div>

        <Arrow label="RAG grounding" />
        <div className={accentBox}>
          Grounded Recommendations
          <Sub>retrieval-augmented, evidence-linked</Sub>
        </div>

        <Arrow />
        <div className={finalBox}>Structured QA Report</div>
      </div>
    </figure>
  );
}
