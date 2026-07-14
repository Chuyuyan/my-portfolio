export type Experience = {
    company: string;   // 公司
    role: string;      // 职位
    time: string;      // 起止时间
    location?: string; // 地点（可选）
    points: string[];  // 要点（子弹点）
    link?: string;     // 公司/项目链接（可选）
    diagram?: "arthur"; // 架构图（可选）
  };

  export const experience: Experience[] = [
    {
      company: "Arthur Health",
      role: "AI Agent Developer",
      time: "May 2026 – August 2026",
      location: "Toronto, Canada",
      diagram: "arthur",
      points: [
        "Co-architected an end-to-end multi-agent platform that automates clinical report quality assurance, transforming unstructured reports into structured evaluations and RAG-grounded recommendations.",
        "Designed an identity-anchored PHI redaction system combining Microsoft Presidio with header-derived identity resolution, fuzzy name matching, and ownership-aware rules to remove patient identifiers while preserving clinician and clinic information.",
        "Built a rate-limit-aware parallel execution pipeline using ThreadPoolExecutor, reducing recommendation latency by up to 5× while ensuring deterministic output under concurrent execution.",
        "Designed a table reconstruction algorithm that restored structured report layouts from Azure Document Intelligence output, enabling reliable downstream evaluation with backward compatibility.",
      ],
    },
    {
      company: "Dingke Medical Technology",
      role: "Software Engineering Intern",
      time: "September 2025 – December 2025",
      location: "Suzhou, China",
      points: [
        "Designed a hybrid code search pipeline combining keyword retrieval (ripgrep) and FAISS-based semantic search, returning top-6 ranked code evidence with improved precision.",
        "Built a scalable FAISS IndexFlatIP vector index supporting thousands to tens of thousands of code chunks (384-d embeddings), with disk persistence, incremental updates, and optional in-memory privacy mode.",
        "Developed a unified multi-LLM orchestration layer supporting DeepSeek, OpenAI, Anthropic, and Qwen, with response caching, automatic retries, and configurable streaming workflows for code analysis tasks.",
      ],
    },
    {
      company: "Kangyu Medical Devices",
      role: "Software R&D Intern",
      time: "January 2025 – April 2025",
      location: "Shijiazhuang, China",
      points: [
        "Built a fully automated PDF metadata extraction pipeline processing 800 academic papers, extracting titles, authors, publication years, and venues into structured Excel outputs.",
        "Implemented robust PDF parsing and OCR workflows with image preprocessing (noise reduction and enhancement) to reliably handle heterogeneous formats and low-quality scans.",
        "Eliminated manual data curation, reducing processing time from 2 minutes per document to near-zero manual effort.",
      ],
    }
  ];
