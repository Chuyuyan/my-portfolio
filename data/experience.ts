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
      company: "Dingke Medical Technology",
      role: "Software Engineering Intern",
      time: "September 2025 – December 2025",
      location: "",
      points: [
        "Designed a hybrid code search pipeline combining keyword retrieval (ripgrep) and FAISS-based semantic search, returning top-6 ranked code evidence with improved precision.",
        "Built a scalable FAISS IndexFlatIP vector index supporting thousands to tens of thousands of code chunks (384-d embeddings), with disk persistence, incremental updates, and optional in-memory privacy mode.",
        "Developed a unified multi-LLM orchestration layer supporting DeepSeek, OpenAI, Anthropic, and Qwen, with response caching, automatic retries, and configurable streaming workflows for code analysis tasks.",
      ],
      link: "https://github.com/yourname"
    },
    {
      company: "Kangyu Medical Devices",
      role: "Research and Development Assistant Intern",
      time: "June 2025 – April 2025",
      location: "",
      points: [
        "Built a fully automated PDF metadata extraction pipeline processing 800 academic papers, extracting titles, authors, publication years, and venues into structured Excel outputs.",
        "Implemented robust PDF parsing and OCR workflows with image preprocessing (noise reduction and enhancement) to reliably handle heterogeneous formats and low-quality scans.",
        "Eliminated manual data curation, reducing processing time from 2 minutes per document to near-zero manual effort.",
      ],
    }
  ];
  