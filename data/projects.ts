export type Project = {
  title: string;
  description: string;
  tech: string[];
  link?: string;
  details?: string;
  features?: string[];
  challenges?: string[];
  image?: string;
};

export const projects: Project[] = [
  {
    title: "Hospital Integration Automation",
    description:
      "Built automation scripts to transfer structured patient data from isolated hospital intranet systems into third-party case management platforms.",
    tech: ["Python", "Selenium", "Internal Web Systems"],
    details:
      "Built a production-grade automation system to transfer structured patient data from isolated hospital intranet systems into third-party case management platforms. Designed robust Selenium-based workflows to handle authentication, dynamic form structures, and unstable internal web interfaces. Automated per-patient data entry involving 20–30 structured fields, supporting both historical case migration and ongoing intake. The system processed over 800 patient records and increased throughput from ~30 manual entries per day to over 200 automated entries per day, significantly reducing manual effort and operational errors.",
    features: [
      "Automated per-patient workflows with 20–30 structured fields",
      "Processed 800+ patient records across historical and ongoing cases",
      "Increased throughput from ~30 records/day (manual) to 200 records/day",
      "Robust error handling and data validation",
      "Seamless integration with hospital intranet systems",
    ],
    challenges: [
      "Navigating complex hospital intranet interfaces",
      "Handling structured field mapping with high accuracy",
      "Managing large volumes of historical patient data",
      "Ensuring data integrity and HIPAA compliance",
      "Optimizing automation for reliability and speed",
    ],
  },
  {
    title: "Academic Paper Metadata Extraction Platform",
    description:
      "Designed a fully automated pipeline to extract structured metadata from large collections of academic PDFs.",
    tech: ["Python", "OCR", "PDF Parsing", "Data Pipelines"],
    details:
      "Designed and implemented a fully automated document intelligence pipeline to extract structured metadata from large collections of academic PDFs. Built robust PDF parsing workflows capable of handling heterogeneous document formats and degraded scans. Integrated selective OCR with image preprocessing, applying OCR only to documents where native text extraction failed. The pipeline processed 1,000+ academic papers and generated structured datasets containing titles, authors, publication years, and venues, reducing manual curation by tens of hours.",
    features: [
      "Processed 1,000+ research papers with mixed formats and scan quality",
      "Combined native PDF parsing with selective OCR (10–30% of documents)",
      "Generated clean Excel datasets for downstream analysis and review",
      "Automatic format detection and quality assessment",
      "Batch processing capabilities for large document collections",
    ],
    challenges: [
      "Handling diverse PDF formats and quality levels",
      "Optimizing OCR usage to balance accuracy and processing time",
      "Extracting structured data from unstructured academic content",
      "Managing computational resources for large-scale processing",
      "Ensuring metadata extraction accuracy across different paper styles",
    ],
  },
  {
    title: "AI-Assisted Semantic Code Search Platform",
    description:
      "Built a production-style code analysis system combining keyword search and vector-based semantic retrieval.",
    tech: ["Python", "Flask", "FAISS", "Embeddings", "LLM APIs"],
    details:
      "Built a production-style AI-assisted code analysis platform combining keyword-based search with vector-based semantic retrieval. Designed a hybrid retrieval pipeline integrating traditional text search with embedding-based similarity search using FAISS. Implemented code chunking, indexing, and ranking strategies to surface high-quality context for downstream analysis. Developed a unified multi-LLM orchestration layer supporting multiple providers, with response caching, retry logic, and configurable workflows, enabling scalable semantic code understanding across large repositories.",
    features: [
      "Implemented FAISS-based vector indexing for thousands of code chunks",
      "Designed a hybrid retrieval pipeline with ranking and evidence selection",
      "Integrated multiple LLM providers with caching and retry mechanisms",
      "Semantic code search using vector embeddings",
      "Real-time code analysis and ranking",
    ],
    challenges: [
      "Scaling vector indexing for large codebases",
      "Designing effective hybrid retrieval strategies",
      "Managing LLM API costs and latency",
      "Implementing robust caching and retry logic",
      "Balancing search relevance with performance",
    ],
  },
  {
    title: "Post-meeting Collaboration & Document Workflows",
    description:
      "Designed internal tooling to support post-meeting collaboration, enabling structured discussion, centralized document uploads, and organized follow-up workflows to reduce information loss and improve team coordination.",
    tech: ["Python", "Web Workflows", "Internal Systems"],
    details:
      "An internal collaboration platform that streamlines post-meeting workflows by providing structured discussion threads, centralized document management, and automated follow-up task tracking. The system significantly reduces information loss and improves team coordination across distributed teams.",
    features: [
      "Structured discussion threads for meeting follow-ups",
      "Centralized document upload and organization system",
      "Automated workflow tracking and task assignment",
      "Reduced information loss through systematic documentation",
      "Improved team coordination across distributed teams",
    ],
    challenges: [
      "Designing intuitive workflow structures",
      "Ensuring document accessibility and organization",
      "Balancing automation with user flexibility",
      "Integrating with existing team communication tools",
      "Maintaining system performance with growing document volumes",
    ],
  },
  {
    title: "Access Control & User Identity Systems",
    description:
      "Built user identity and access control mechanisms to manage feature permissions, usage tracking, and protected API access across backend services and full-stack applications.",
    tech: ["Backend APIs", "User Identity", "Permission Control"],
    details:
      "A comprehensive access control system that manages user authentication, authorization, and feature-level permissions across multiple backend services and full-stack applications. The system provides fine-grained access control with usage tracking and secure API protection.",
    features: [
      "User identity management and authentication",
      "Feature-level permission control",
      "Usage tracking and analytics",
      "Protected API access mechanisms",
      "Cross-service authorization integration",
    ],
    challenges: [
      "Designing scalable permission models",
      "Ensuring secure API access across services",
      "Managing complex authorization logic",
      "Balancing security with user experience",
      "Implementing efficient usage tracking systems",
    ],
  },
  {
    title: "Academic & Patent Data Ingestion Pipelines",
    description:
      "Developed automated data ingestion pipelines to collect, parse, and structure academic papers and patent records from external sources for downstream analysis and retrieval.",
    tech: ["Data Pipelines", "Web Automation", "Document Processing"],
    details:
      "Automated data collection and processing system that ingests academic papers and patent records from multiple external sources. The pipeline handles data collection, parsing, structuring, and normalization to prepare data for downstream analysis and retrieval systems.",
    features: [
      "Automated data collection from multiple sources",
      "Robust parsing and data extraction",
      "Data structuring and normalization",
      "Support for academic papers and patent records",
      "Integration with downstream analysis systems",
    ],
    challenges: [
      "Handling diverse data formats and structures",
      "Ensuring data quality and completeness",
      "Managing large-scale data ingestion",
      "Dealing with rate limits and API constraints",
      "Normalizing data from heterogeneous sources",
    ],
  },
];
  