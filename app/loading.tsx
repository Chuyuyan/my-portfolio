/* app/loading.tsx */
import { Bodoni_Moda } from "next/font/google";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden bg-black text-white bg-grid animate-fadeIn">
      {/* 背景滚动大字 */}
      <div className="absolute left-0 top-1/2 w-[240%] -translate-y-1/2 select-none">
        <div className={`marquee whitespace-nowrap leading-none ${bodoni.className}`}>
          <span className="mx-8 text-[23vw] font-normal tracking-[-0.06em] text-white">
            AI · DESIGN · CODE · AUTOMATION · CREATIVITY ·
          </span>
          <span className="mx-8 text-[23vw] font-normal tracking-[-0.06em] text-white">
            AI · DESIGN · CODE · AUTOMATION · CREATIVITY ·
          </span>
        </div>
      </div>

      {/* 🌌 自动移动的蓝紫色光团（在网格上、头像下） */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="moving-glow" />
      </div>

      {/* 居中头像 */}
      <div className="relative z-10 grid min-h-screen place-items-center">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="absolute -inset-8 rounded-full bg-white/10 blur-2xl animate-glow" />

            {/* 放大的头像 */}
            <img
              src="/avatar.jpg"
              alt="Profile"
              className="relative z-10 h-64 w-64 rounded-full object-cover ring-1 ring-white/20 animate-float"
              draggable={false}
            />
          </div>

          {/* 底部 Loading 文案 */}
          <p className="absolute bottom-8 text-xs uppercase tracking-[0.3em] text-neutral-400">
            Loading…
          </p>
        </div>
      </div>

      {/* 局部样式 */}
      <style>{`
        .bg-grid {
          position: relative;
          background-color: #000;
        }
        .bg-grid::before {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          background-image:
            linear-gradient(to right, rgba(160,160,160,0.18) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(160,160,160,0.18) 1px, transparent 1px);
          background-size: 40px 40px;
          opacity: 0.7;
          z-index: -1; /* 网格保持在最底层 */
        }

        /* 🌌 蓝紫色移动光团（加强呼吸感 + 拖尾 + 提速） */
        .moving-glow {
          position: absolute;
          width: 460px;
          height: 460px;
          top: 8%;
          left: 6%;
          background: radial-gradient(circle at center,
            rgba(120,170,255,0.50),
            rgba(160,120,255,0.0) 65%);
          filter: blur(10px);
          mix-blend-mode: screen;
          animation: glowMove 7s ease-in-out infinite alternate; /* 更快 */
        }

        /* 拖尾：一个更大的、透明度更低的虚光跟着动 */
        .moving-glow::after {
          content: "";
          position: absolute;
          inset: -40px;
          background: radial-gradient(circle at center,
            rgba(90,140,255,0.18),
            rgba(120,80,255,0.0) 70%);
          filter: blur(26px);
          opacity: 0.9;
        }

        @keyframes glowMove {
          0% {
            transform: translate3d(0, 0, 0) scale(0.9);
          }
          50% {
            transform: translate3d(45%, 25%, 0) scale(1.3);
          }
          100% {
            transform: translate3d(15%, 55%, 0) scale(1.1);
          }
        }

        @keyframes fadeIn {
          0% { opacity: 0; transform: scale(1.04); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn { animation: fadeIn 1s ease-out forwards; }

        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .marquee { animation: marquee 14s linear infinite; }

        @keyframes float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .animate-float { animation: float 3.8s ease-in-out infinite; }

        @keyframes glow {
          0%,100% { opacity:.25; }
          50% { opacity:.55; }
        }
        .animate-glow { animation: glow 3.6s ease-in-out infinite; }
      `}</style>
    </div>
  );
}

