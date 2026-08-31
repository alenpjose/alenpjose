import type { ProjectEntry } from "./types";

export const projectEntries: ProjectEntry[] = [
  {
    slug: "utilityops-readiness",
    title: "UtilityOps Readiness",
    summary:
      "A source-grounded learning build exploring deterministic readiness checks, retrieval, citations, and controlled language-model interpretation.",
    status: "Paused learning build",
    featured: true,
    hasDetailPage: true,
    topics: ["Retrieval", "Deterministic checks", "Citations", "Human review"],
    evidenceLevel: "Public repository using synthetic demonstration data",
    aiInvolvement:
      "I defined the problem, data flow, examples, and tests. AI assistance contributed substantially to the architecture and code.",
    revisionDate: "2026-08-30",
    currentLimits:
      "This is not a deployed utility platform and does not demonstrate utility-industry operating experience.",
    nextTest:
      "Build a deliberate evaluation set measuring whether blockers, sources, and readiness decisions are identified consistently.",
    repository: "https://github.com/alenpjose/UtilityOps_Readiness",
    media: {
      kind: "gallery",
      sources: [
        "/assets/utilityops-dashboard.jpg",
        "/assets/utilityops-readiness-report.jpg",
        "/assets/utilityops-assistant.jpg",
      ],
      alt: "UtilityOps interfaces using synthetic work-order data",
      caption: "Learning-build interface with synthetic demonstration data",
    },
    sections: [
      {
        paragraphs: [
          "UtilityOps was created to test an idea about what AI could contribute in an operational environment. It does not come from professional utility-industry experience and is not presented as a deployed utility platform.",
          "I defined the problem, data flow, synthetic work-order examples, and test cases. AI assistance contributed substantially to the technical architecture and code. The application examines indexed records, applies deterministic checks where known rules can answer the question, and uses retrieved information with a language model where notes or document context require interpretation.",
          "The demonstration used external model services because the data was synthetic and stronger indexing was needed than the local models available to me could provide. Testing included three distinct work-order cases, including one with a less obvious blocker embedded in the source documents that the system needed to identify.",
          "The project helped me work with retrieval, embeddings, structured answers, citations, deterministic validation, context limits, and hallucination risk. Prompt changes, repeated extraction tests, deterministic loops where possible, and removal of unnecessary context were used to improve output behaviour.",
          "UtilityOps is available in a public GitHub repository with instructions for running it. It is currently paused. A meaningful next step would be a more deliberate evaluation set that measures whether blockers, supporting sources, and readiness decisions are identified consistently.",
        ],
      },
    ],
  },
  {
    slug: "rolodex",
    title: "Rolodex",
    summary:
      "A working invite-only MVP for recording, connecting, searching, and sharing ideas and reference material.",
    status: "Working invite-only MVP",
    featured: false,
    hasDetailPage: true,
    topics: ["Knowledge systems", "Information design", "Next.js", "Supabase"],
    evidenceLevel: "Live MVP tested by a small invited group",
    aiInvolvement:
      "AI assistance produced much of the implementation. The current application has no active AI feature.",
    revisionDate: "2026-08-30",
    currentLimits:
      "The application remains invite-only, and AI-supported connections have not been implemented.",
    nextTest: "Improve safety and code robustness before testing AI-supported connections.",
    media: {
      kind: "image",
      src: "/assets/rolodex-mobile.jpg",
      alt: "Rolodex mobile interface with idea, reference, and task capture options",
      caption: "Working invite-only MVP",
    },
    sections: [
      {
        paragraphs: [
          "Rolodex began with a problem I repeatedly noticed in digital media: ideas and interesting material accumulate without an effective way to connect or develop them. The project is intended for people who want a central repository for ideas, resources, and the relationships between them.",
          "The current MVP can record text, links, PDFs, documents, and images. Users can search, share, attach items, cross-connect records, and fork instances. It is live on Vercel and has been shared with a small number of invited test users.",
          "I defined and guided each function, interface element, page, and interaction. AI coding assistance produced much of the implementation. The functioning application does not currently use AI for search, summaries, or connections.",
          "The data structure has been prepared with future AI-supported capabilities in mind, but AI integration will follow only after the codebase has stronger safety and robustness. Version one currently provides the intended core workflow.",
        ],
      },
    ],
  },
  {
    slug: "shop-floor-readiness-signals",
    title: "Shop-floor readiness signals",
    summary:
      "An active hardware experiment exploring how local signals could make completed machine cycles visible where personnel are present.",
    status: "Active hardware experiment",
    featured: false,
    hasDetailPage: false,
    topics: ["Raspberry Pi", "Sensors", "Local signals", "Human factors"],
    evidenceLevel: "Idea and hardware trials",
    aiInvolvement:
      "Initial behaviour is expected to be deterministic. Visual models may be explored later where fixed signals are insufficient.",
    revisionDate: "2026-08-30",
    currentLimits: "The sensing method, reliability, and operator value remain to be tested.",
    nextTest: "Validate one machine-state signal through a complete operating cycle.",
    sections: [],
  },
  {
    slug: "present",
    title: "Present",
    summary:
      "An early human-centred concept exploring how AI might help with a deeply difficult problem affecting ordinary people.",
    status: "Early concept",
    featured: false,
    hasDetailPage: false,
    topics: ["Human-centred concept", "Accessible interaction"],
    evidenceLevel: "Notes and requirements only",
    aiInvolvement: "AI is intended to be part of a future concept; no product exists today.",
    revisionDate: "2026-08-30",
    currentLimits: "It has not been built, tested, clinically reviewed, or validated.",
    nextTest: "Revisit the problem definition and safety requirements before prototyping.",
    sections: [],
  },
];

export function getProjectEntry(slug: string) {
  return projectEntries.find((entry) => entry.slug === slug && entry.hasDetailPage);
}
