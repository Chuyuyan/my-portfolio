export type Experience = {
    company: string;   // 公司
    role: string;      // 职位
    time: string;      // 起止时间
    location?: string; // 地点（可选）
    points: string[];  // 要点（子弹点）
    link?: string;     // 公司/项目链接（可选）
  };
  
  export const experience: Experience[] = [
    {
      company: "Suzhou Dingke Medical Technology",
      role: "Software Engineer Intern",
      time: "2025.10 – 2026.01",
      location: "Suzhou / Remote",
      points: [
        "Built automation tools with Python + Selenium for data collection.",
        "Designed Flask APIs to serve crawled patent & scholar data (JSONL).",
        "Implemented role-based access (guest/paid) and WeChat Mini Program integration.",
      ],
    },
    {
      company: "Personal Project — Patent & Scholar Assistant",
      role: "Full-stack Developer",
      time: "2024 – Now",
      points: [
        "Next.js + Tailwind 前端、Flask 后端、Selenium 爬虫、JSONL 存储。",
        "实现 PDF 缓存展示、智能摘要（DeepSeek）、收藏/历史记录、分页加载。",
        "计划接入部署（Nginx + Gunicorn）与公网域名，优化可用性与可靠性。",
      ],
      link: "https://github.com/your/repo"
    }
  ];
  