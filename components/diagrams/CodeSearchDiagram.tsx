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

function Arrow({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5 py-1 text-slate-400 dark:text-slate-500">
      {label && <span className="text-[10px] uppercase tracking-wide">{label}</span>}
      <span className="text-base leading-none">↓</span>
    </div>
  );
}

export default function CodeSearchDiagram() {
  return (
    <figure className="not-prose my-5 rounded-xl border border-slate-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/40 p-4 sm:p-6">
      <figcaption className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        Architecture — Hybrid Code Search
      </figcaption>

      <div
        className="mx-auto flex w-full flex-col items-stretch"
        style={{ maxWidth: "28rem" }}
      >
        <div className={accentBox}>User Query</div>
        <Arrow label="fan-out" />

        <div className="grid grid-cols-2 gap-3">
          <div className={neutralBox}>
            Keyword Search
            <span className="mt-0.5 block text-[10px] font-normal text-slate-500 dark:text-slate-400">
              ripgrep
            </span>
          </div>
          <div className={neutralBox}>
            Semantic Search
            <span className="mt-0.5 block text-[10px] font-normal text-slate-500 dark:text-slate-400">
              FAISS · 384-d embeddings
            </span>
          </div>
        </div>

        <Arrow label="fuse" />
        <div className={accentBox}>
          Hybrid Ranking
          <span className="mt-0.5 block text-[10px] font-normal text-blue-600/80 dark:text-blue-300/80">
            top-6 code evidence
          </span>
        </div>

        <Arrow label="context" />
        <div className={accentBox}>
          Multi-LLM Orchestration
          <span className="mt-0.5 block text-[10px] font-normal text-blue-600/80 dark:text-blue-300/80">
            DeepSeek · OpenAI · Anthropic · Qwen — cache + retry
          </span>
        </div>

        <Arrow />
        <div className={finalBox}>Ranked Code Answer</div>
      </div>

      <p className="mt-4 text-center text-[11px] text-slate-400 dark:text-slate-500">
        Indexed offline: code chunking → FAISS IndexFlatIP (disk-persisted, incremental)
      </p>
    </figure>
  );
}
