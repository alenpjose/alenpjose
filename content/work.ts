import type { WorkEntry } from "./types";

export const workEntries: WorkEntry[] = [
  {
    slug: "additive-application-judgment",
    title: "Additive application judgment",
    summary:
      "Understanding the operating problem, establishing realistic expectations, and connecting design, process, material, and production decisions.",
    status: "Professional practice",
    role: "Application discovery, technical direction, DFAM, validation, and production planning",
    featured: true,
    topics: ["Application discovery", "DFAM", "Process selection", "Production planning"],
    evidenceLevel: "Generalized professional experience",
    confidentialityNote:
      "This is a generalized account of work performed across multiple customer applications. Proprietary application details are excluded.",
    aiInvolvement: "None. The work is based on engineering and production judgment.",
    revisionDate: "2026-08-30",
    sections: [
      {
        paragraphs: [
          "This case study explains how I approach additive applications and why access to a printer is not enough to create a successful result. The goal is to show the judgment involved in understanding an application, selecting a suitable process, guiding the design, and developing a production plan that can be repeated reliably.",
          "I begin by understanding the problem from mechanical, logistical, and financial perspectives. This helps narrow the technology and material requirements before design decisions become fixed. Customers do not always explain the full application context or the assumptions behind a request, so I use formally trained SPIN Selling methods and technical investigation to bring the important factors forward.",
          "Once a process is selected, DFAM becomes critical. Designers need to understand how their requirements translate into a physical part and where the selected technology has strengths or limitations. Sample parts and concept validation help establish a baseline for expectations, particularly when someone is comparing additive results with traditional manufacturing or an earlier experience with entry-level FDM.",
          "Technical direction and the production plan matter because the printer alone does not determine the outcome. As in traditional manufacturing, build setup, orientation, nesting, support strategy, processing, cleaning, finishing, handling, and inspection can affect the result in different ways.",
        ],
      },
      {
        heading: "Questions I consider",
        questions: [
          "Can the design be nested, supported, washed, sintered, cured, or finished reliably?",
          "Which dimensions or surfaces require inspection?",
          "How will material behaviour affect the result?",
          "Does the quantity suit the process?",
          "Can the production team repeat the work without relying on undocumented knowledge?",
        ],
      },
      {
        heading: "A generalized application example",
        paragraphs: [
          "Across several manufacturing applications, customers had initially limited their options because earlier FDM experience shaped what they expected from additive manufacturing. In one recurring type of assembly-line application, warping and dimensional problems were caused by a combination of technology selection, design gaps, and print setup.",
          "I helped improve the existing FDM application temporarily through print optimization, then facilitated evaluation of HP MJF through concept validation, design input, sample production, and continued customer education. The customer helped clarify the operating requirements and the assumptions behind the original decision. My production team executed the plan developed for the application.",
          "The result was a more successful part and a transition away from a project that was close to being abandoned. Improved confidence in the application also supported wider consideration of additive manufacturing.",
        ],
      },
    ],
  },
  {
    slug: "production-workflow-control",
    title: "Production workflow control",
    summary:
      "Mapping production requirements, validating them through working tools, and leading selection and deployment of a suitable operating platform.",
    status: "Deployed workflow",
    role: "Workflow mapping, system design, evaluation, configuration, migration, training, and ownership",
    featured: false,
    topics: ["Production systems", "Odoo", "SharePoint", "Workflow design"],
    evidenceLevel: "Deployed professional system",
    confidentialityNote:
      "The public description remains intentionally high-level because the detailed workflow reflects internal company operations.",
    aiInvolvement:
      "AI-assisted coding supported prototype development. No language model controlled or interpreted the production workflow.",
    revisionDate: "2026-08-30",
    media: {
      kind: "video",
      src: "/assets/control-system-walkthrough.mp4",
      poster: "/assets/control-system-poster.jpg",
      alt: "Reconstructed additive manufacturing control system walkthrough",
      caption: "Interface reconstruction using non-sensitive demonstration records",
    },
    sections: [
      {
        paragraphs: [
          "As production grew, managing orders through email, phone calls, pen-and-paper notes, and Excel became increasingly difficult. The goal of this work was to understand what information production needed, how records should relate, and which system could support the workflow without losing the operating detail required on the floor.",
          "I mapped the workflow and designed the information model, record relationships, status logic, user needs, and rollout approach. A SharePoint-based system was used in production and became a practical benchmark for understanding what the operation required. AI coding tools also helped me explore how the workflow could be represented in a web application. AI was used to plan and create that prototype, not to make production decisions.",
          "The production workflow remained deterministic and human-controlled. The systems were used to validate requirements before available platforms were compared. I researched the options, selected Odoo as the suitable platform, configured it, migrated the required information, trained the production department, led the rollout, and retained ownership of how the process was used.",
          "The deployed system made part tracking more efficient, centralized order-level communication, improved shift handovers through recorded information, and made nesting more reliable by organizing parts around deadlines and returning scrapped parts to the print queue.",
        ],
      },
    ],
  },
  {
    slug: "maintenance-error-traceability",
    title: "Maintenance and error traceability",
    summary:
      "Connecting machine use, print history, errors, maintenance, and technician actions so defects can be traced before they create further loss.",
    status: "Operational framework",
    role: "System design, SharePoint implementation, rollout, and production ownership",
    featured: false,
    topics: ["Traceability", "Maintenance", "Root-cause investigation", "SharePoint"],
    evidenceLevel: "Working professional framework",
    aiInvolvement: "None. Entry, filtering, and investigation are manual and human-led.",
    revisionDate: "2026-08-30",
    currentLimits: "The framework depends on structured manual entry and monitoring.",
    nextTest:
      "Connect to the order-tracking system through available APIs so relevant action points can be created automatically.",
    media: {
      kind: "diagram",
      src: "/assets/maintenance-reliability-system.svg",
      alt: "Relationship model connecting equipment with error, usage, build, and maintenance histories",
      caption: "Conceptual workflow with no equipment records shown",
    },
    sections: [
      {
        paragraphs: [
          "When a print defect or machine error occurred, technicians could not always determine which machine or build had produced the part, who had started it, or what recent errors and maintenance activity were associated with the equipment. The goal was to preserve enough history to investigate a problem before it created further loss.",
          "I designed and built a connected SharePoint framework covering print history, machine use, error events, maintenance history, and technician actions. QR-linked entry allowed production-floor personnel to record information at the relevant equipment. The system is used across the production floor.",
          "If a part is found to have a print defect, technicians can trace it back to the machine and build associated with it. That history allows the equipment to be checked before the same condition affects more parts. The system supports faster investigation and better use of material and production time.",
          "The framework relies on structured records, manual entry, filtering, and human investigation. It does not use AI or claim predictive maintenance. A future improvement would connect it with the order-tracking system through available APIs so relevant action points can be created automatically.",
        ],
      },
    ],
  },
  {
    slug: "slip-maker",
    title: "Slip Maker",
    summary:
      "A bounded local-LLM workflow that turns purchase-order information and part files into a reviewed, printable production document.",
    status: "Working internal tool",
    role: "Workflow design, implementation, testing, packaging, and rollout",
    featured: false,
    topics: ["Local LLM", "Document automation", "Structured output", "Human review"],
    evidenceLevel: "Deployed internal tool",
    aiInvolvement:
      "Llama 3.2 performs bounded local extraction. AI assistance also contributed to coding and packaging the application.",
    revisionDate: "2026-08-30",
    currentLimits:
      "Extraction still requires human confirmation, particularly when document structure or language varies.",
    sections: [
      {
        paragraphs: [
          "Slip Maker was built to reduce the time required to create a production document from purchase-order information and part files. The workflow needed to be faster without allowing model output to move directly into production without review.",
          "The tool accepts purchase-order sheets and STL files. A locally hosted Llama 3.2 model running through Ollama extracts relevant order information from the purchase order. Ordinary code generates part thumbnails, structures the information, and produces a printable Excel document after manual confirmation or correction.",
          "I designed and implemented the workflow. AI assistance contributed to writing the software and packaging it as a Windows executable. The application itself uses the language model only for bounded information extraction. Document generation, structure, user confirmation, and production decisions remain deterministic or human-controlled.",
          "During use with French documents, the model occasionally placed part-level information in the wrong column or misread quantity information. A manual override was added so production staff could correct the output before generating the document. The tool reduced normal preparation time from approximately 20 minutes to approximately 2 minutes per document, including review and correction.",
          "Slip Maker was used by production-floor staff and temporarily supported the digital shop-traveller workflow before the broader production platform replaced that function. It remains available when the document-generation need occurs.",
        ],
      },
    ],
  },
];

export function getWorkEntry(slug: string) {
  return workEntries.find((entry) => entry.slug === slug);
}
