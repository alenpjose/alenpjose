"use client";

import { useState } from "react";
import Image from "next/image";

const navItems = [
  ["01", "Introduction", "top"],
  ["02", "Progression", "progression"],
  ["03", "Systems", "systems"],
  ["04", "Projects", "projects"],
  ["05", "About", "about"],
] as const;

type SystemCase = {
  number: string;
  status: string;
  title: string;
  situation: string;
  response: string;
  approach: string;
  outcome: string;
  media: "control" | "maintenance" | "traveller";
};

type Project = {
  status: string;
  title: string;
  text: string;
  note: string;
  stack: string;
  media: "utility" | "rolodex" | null;
  links: Array<{
    label: string;
    href: string;
  }>;
};

const systemCases: SystemCase[] = [
  {
    number: "01",
    status: "Deployed workflow",
    title: "Production intake and workflow control",
    situation:
      "Production growth exceeded what disconnected lists and informal communication could reliably manage. Orders, parts, processing steps, ownership and status needed to remain connected from intake through shipment.",
    response:
      "Structured lists first validated the information model. An AI-assisted web MVP then mapped how parts, builds, reprints, required actions and role-based status changes should relate, while a SharePoint-based system provided an interim implementation. That work became the basis for direct ownership of the platform decision. Available options were vetted against the operating needs, the best fit was selected and deployment was led end to end, including rollout, team training and workflow standardization.",
    approach:
      "Workflow mapping · related order, part and build records · controlled status changes · role-based views · SharePoint interim implementation · buy-versus-build evaluation",
    outcome:
      "The operation gained clearer status ownership, earlier visibility of stalled work, stronger part traceability and more consistent handoffs and quality checkpoints. The platform decision was grounded in a tested workflow, then carried through implementation, user adoption and standardized use.",
    media: "control",
  },
  {
    number: "02",
    status: "Operational framework",
    title: "Maintenance and error traceability",
    situation:
      "Part failures and equipment issues became harder to reconstruct as relevant information remained distributed across machine activity, build history, maintenance records and staff knowledge.",
    response:
      "A SharePoint-based framework connected individual devices with machine use, builds, parts, error events, maintenance history and technician actions. Point-of-work entry preserved what happened, where it happened and what had already been tried.",
    approach:
      "Asset-centred records · QR-linked entry · structured error capture · maintenance history · technician notes and images · corrective-action traceability",
    outcome:
      "The connected history improved accountability, failure reconstruction, root-cause investigation and maintenance planning. It also created a more credible data foundation for earlier intervention and future condition-based analysis—without claiming predictive maintenance.",
    media: "maintenance",
  },
  {
    number: "03",
    status: "Working internal tool",
    title: "Slip Maker and digital shop traveller",
    situation:
      "Preparing documentation for batches of small parts required manual screenshots, useful view selection, specification entry, purchase-order review and final document assembly. A single package could take about 20 minutes.",
    response:
      "A controlled tool generated multiple part views, connected them with purchase-order information, used self-hosted language-model inference to interpret relevant requirements and assembled a structured document for human review.",
    approach:
      "Deterministic document workflow · generated part imagery · AI-assisted information extraction · self-hosted model integration · structured output · human verification",
    outcome:
      "Preparation fell from roughly 20 minutes to a few minutes. The workflow reduced repetitive entry, improved document consistency, preserved clearer production context and temporarily served as a digital shop traveller while a broader platform was evaluated.",
    media: "traveller",
  },
];

const projects: Project[] = [
  {
    status: "Public Repository · Learning Build",
    title: "UtilityOps Manager",
    text:
      "A source-grounded readiness checker built to learn embeddings, retrieval, retrieval-augmented generation, deterministic validation and controlled language-model interpretation. Given a synthetic work-order package, it identifies missing documents, blockers, required actions and reasons the work should not yet be released.",
    note:
      "Deterministic rules handle known checks; retrieved evidence and model interpretation support an explicit human decision. It is a learning build, not a deployed utility platform.",
    stack: "Retrieval · deterministic checks · citations · human review",
    media: "utility",
    links: [
      {
        label: "GitHub repository ↗",
        href: "https://github.com/alenpjose/UtilityOps_Readiness",
      },
    ],
  },
  {
    status: "Active MVP",
    title: "Rolodex",
    text:
      "An operational knowledge system exploring three connected layers: ideas, conversations and events; resources and context; and actions and commitments. The aim is to connect people, documents, decisions, tasks and follow-ups without forcing every organization into the same rigid interface.",
    note:
      "A live MVP exists. The project is actively developing and is not presented as a complete enterprise platform.",
    stack: "Next.js · Supabase · authentication · context design",
    media: "rolodex",
    links: [
      {
        label: "Open live MVP ↗",
        href: "https://rolodex-woad.vercel.app/",
      },
    ],
  },
  {
    status: "Planned Experiment",
    title: "Shop-floor readiness signals",
    text:
      "A planned low-cost automation experiment using Raspberry Pi, simple sensors, machine-state signals and local notifications to indicate when a process is complete, a machine becomes available or an operator intervention is required.",
    note:
      "The sensing method, reliability, failure modes and operator value still need to be tested. This project is planned, not deployed.",
    stack: "Raspberry Pi · sensors · local messaging · human factors",
    media: null,
    links: [],
  },
  {
    status: "Early Human-Centred Concept",
    title: "Present",
    text:
      "A concept exploring how voice and visual journals, routines, reminiscence and caregiver coordination might help people remain connected to familiar people, places and events.",
    note:
      "Present is an early concept outside the industrial work. It has not been clinically validated and makes no medical-effectiveness claim.",
    stack: "Memory support · accessible interaction · caregiver context",
    media: null,
    links: [],
  },
];

function ProjectMedia({ type }: { type: "utility" | "rolodex" | null }) {
  if (type === "utility") {
    return (
      <figure className="project-media utility-gallery">
        <div className="gallery-grid">
          <Image
            className="gallery-primary"
            src="/assets/utilityops-dashboard.jpg"
            alt="UtilityOps dashboard showing synthetic work orders grouped by readiness status"
            width={1536}
            height={752}
            sizes="(max-width: 899px) calc(100vw - 72px), 45vw"
            unoptimized
          />
          <Image
            src="/assets/utilityops-readiness-report.jpg"
            alt="UtilityOps readiness report using synthetic work-order data"
            width={1536}
            height={756}
            sizes="(max-width: 899px) 35vw, 18vw"
            unoptimized
          />
          <Image
            src="/assets/utilityops-assistant.jpg"
            alt="UtilityOps source-grounded assistant using synthetic work-order data"
            width={1536}
            height={705}
            sizes="(max-width: 899px) 35vw, 18vw"
            unoptimized
          />
        </div>
        <figcaption>Learning-build interface · synthetic demonstration data</figcaption>
      </figure>
    );
  }

  if (type === "rolodex") {
    return (
      <figure className="project-media rolodex-media">
        <Image
          src="/assets/rolodex-mobile.jpg"
          alt="Rolodex mobile home screen with idea, tidbit and task capture options"
          width={742}
          height={1536}
          sizes="(max-width: 899px) calc(100vw - 72px), 45vw"
          unoptimized
        />
        <figcaption>Active MVP · mobile interface</figcaption>
      </figure>
    );
  }

  return null;
}

function ControlMedia() {
  return (
    <figure className="evidence-visual video-visual">
      <video
        controls
        preload="metadata"
        playsInline
        poster="/assets/control-system-poster.jpg"
        aria-label="Reconstructed additive manufacturing control system walkthrough"
      >
        <source src="/assets/control-system-walkthrough.mp4" type="video/mp4" />
      </video>
      <figcaption>
        Interface reconstruction · non-sensitive demonstration records
      </figcaption>
    </figure>
  );
}

function MaintenanceMedia() {
  return (
    <figure className="evidence-visual maintenance-media">
      <Image
        src="/assets/maintenance-reliability-system.svg"
        alt="Conceptual relationship model connecting a device with error, usage, build and maintenance histories"
        width={960}
        height={840}
        sizes="(max-width: 760px) calc(100vw - 72px), (max-width: 1100px) 42vw, 45vw"
        unoptimized
      />
      <figcaption>Conceptual workflow · no equipment records shown</figcaption>
    </figure>
  );
}

function TravellerMedia() {
  return (
    <figure
      className="evidence-visual process-visual"
      aria-label="Conceptual digital shop traveller workflow"
    >
      <figcaption>Conceptual workflow · synthetic document structure</figcaption>
      <div className="process-nodes traveller-nodes">
        {["Part views", "PO context", "Extract", "Structure", "Review", "Traveller"].map(
          (step, index) => (
            <div key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{step}</strong>
            </div>
          ),
        )}
      </div>
      <p>
        Language-model interpretation sits inside a deterministic document flow.
        Production staff review the result before it is used.
      </p>
    </figure>
  );
}

function CaseMedia({ type }: { type: SystemCase["media"] }) {
  if (type === "control") return <ControlMedia />;
  if (type === "maintenance") return <MaintenanceMedia />;
  return <TravellerMedia />;
}

function LearningModel() {
  return (
    <figure className="operating-model" aria-label="Alen's learning approach">
      <figcaption>How I learn</figcaption>
      <div>
        <span>01</span>
        <strong>Work close to the process</strong>
        <small>See the real sequence, handoffs and constraints before naming the solution.</small>
      </div>
      <div>
        <span>02</span>
        <strong>Build to test assumptions</strong>
        <small>Use a prototype to expose missing relationships, weak logic and user needs.</small>
      </div>
      <div>
        <span>03</span>
        <strong>Choose what should last</strong>
        <small>Evaluate whether to improve, buy or build—and stay honest about the limits.</small>
      </div>
    </figure>
  );
}

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <div className="site-shell">
      <aside className="rail" aria-label="Primary navigation">
        <a className="brand" href="#top">
          <strong>ALEN</strong>
          <span>Manufacturing systems</span>
        </a>
        <p className="rail-role">
          Production Manager
          <br />
          Toronto, Canada
        </p>
        <nav className="rail-nav">
          {navItems.map(([number, label, id]) => (
            <a href={`#${id}`} key={id}>
              <span>{number}</span>
              {label}
            </a>
          ))}
        </nav>
        <div className="rail-actions">
          <a className="button accent" href="/resume.pdf" download="Alen-P-Jose-Resume.pdf">
            Download résumé ↓
          </a>
          <a className="button outline-dark" href="#contact">
            Contact ↗
          </a>
        </div>
      </aside>

      <header className="mobile-header">
        <a className="brand" href="#top" onClick={() => setOpen(false)}>
          <strong>ALEN</strong>
          <span>Manufacturing systems</span>
        </a>
        <button
          className="menu-button"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Menu"}{" "}
          <span aria-hidden="true">{open ? "×" : "☰"}</span>
        </button>
        <nav id="mobile-nav" className={`mobile-nav${open ? " open" : ""}`}>
          {navItems.map(([number, label, id]) => (
            <a href={`#${id}`} key={id} onClick={() => setOpen(false)}>
              <span>{number}</span>
              {label}
            </a>
          ))}
          <a href="/resume.pdf" download="Alen-P-Jose-Resume.pdf">
            Résumé ↓
          </a>
          <a href="#contact" onClick={() => setOpen(false)}>
            Contact ↗
          </a>
        </nav>
      </header>

      <main>
        <section id="top" className="hero section">
          <p className="eyebrow">Hi, I&apos;m Alen P. Jose · Toronto</p>
          <div className="hero-grid">
            <div>
              <h1>Building manufacturing systems that work on the floor.</h1>
              <p className="hero-copy">
                I&apos;m a mechanical engineer and Production Manager who grew from
                working directly with additive-manufacturing equipment to helping
                customers adopt the technology—and then building the workflows,
                teams and operating systems around production.
              </p>
              <p className="hero-copy hero-welcome">
                This portfolio follows that progression through problems solved,
                systems built and independent projects still being explored. It is
                also an invitation to connect with people doing useful, meaningful
                work.
              </p>
              <div className="hero-actions">
                <a className="button primary" href="#progression">
                  Follow the progression ↘
                </a>
                <a className="button outline" href="#systems">
                  View operational systems →
                </a>
              </div>
            </div>
            <aside className="hero-context" aria-label="Current professional focus">
              <span>Current role</span>
              <strong>Production Manager</strong>
              <p>
                Leading a multi-technology additive-manufacturing operation across
                priorities, people, equipment readiness, quality and delivery.
              </p>
              <span className="context-label">Current direction</span>
              <p>
                Practical software, automation and AI-assisted tools built around
                real operational constraints—not technology for its own sake.
              </p>
            </aside>
          </div>
          <div className="capability-strip" aria-label="Professional summary">
            <div>
              <strong>Mechanical</strong>
              <span>Engineering foundation</span>
            </div>
            <div>
              <strong>Additive</strong>
              <span>Applications + field service</span>
            </div>
            <div>
              <strong>Production</strong>
              <span>Leadership + operating control</span>
            </div>
            <div>
              <strong>Digital</strong>
              <span>Workflow + practical AI tools</span>
            </div>
          </div>
        </section>

        <section id="progression" className="section">
          <p className="eyebrow">02 · Career progression</p>
          <h2>Responsibility widened with the problems that needed solving.</h2>
          <p className="section-lead">
            The path began with mechanical analysis, moved through equipment and
            customer applications, and grew into ownership of the production system
            around the technology.
          </p>

          <div className="progression-list" role="list" aria-label="Career progression">
            <article role="listitem">
              <div className="career-index">
                <span>01</span>
                <strong>Jul 2026 — Present</strong>
              </div>
              <div className="progression-heading">
                <span>Production leadership</span>
                <h3>Production Manager</h3>
                <p>Designfusion Inc. · Toronto</p>
              </div>
              <div className="progression-copy">
                <p>
                  The title is recent; the operating scope developed over several
                  years. Increasing production demand pulled the role into priorities,
                  scheduling, resource coordination, team training, equipment
                  readiness, maintenance planning, materials, quality, delivery
                  recovery and the systems used to control the work.
                </p>
                <p>
                  A technical customer requirement can be discussed with sales,
                  translated into production instructions, explained to operators and
                  carried back to management as a resource or investment decision.
                  The workflows came from observing real sequences, failure points,
                  handoffs and information needs on the floor.
                </p>
              </div>
            </article>

            <article role="listitem">
              <div className="career-index">
                <span>02</span>
                <strong>Jan 2021 — Jun 2026</strong>
              </div>
              <div className="progression-heading">
                <span>Applications + field service</span>
                <h3>Applications Specialist</h3>
                <p>Designfusion Inc. · Toronto</p>
              </div>
              <div className="progression-copy">
                <p>
                  Printer troubleshooting and customer site visits often revealed a
                  larger issue than the immediate service call: the wrong technology,
                  incomplete requirements, designs that ignored process constraints or
                  opportunities the customer had not yet recognized.
                </p>
                <p>
                  The role developed into application discovery, process and material
                  selection, DFAM guidance, feasibility assessment, sample development
                  and customer education, connecting a requested part with what the
                  customer actually needed and what the technology could reliably do.
                </p>
                <aside className="career-example">
                  <strong>Anonymized automotive application</strong>
                  <p>
                    A manufacturer faced expensive prototyping and recurring part
                    failures. Investigation showed that function, design assumptions
                    and the selected process were misaligned. The problem was not simply
                    that a printer
                    was underperforming. Clarifying the requirements, selecting a more
                    suitable additive process and guiding the design toward that process
                    reduced wasted iteration, improved technical decisions and built
                    confidence to consider further applications.
                  </p>
                  <blockquote>
                    Additive manufacturing is not a universal answer for every urgent
                    part. Successful adoption requires the right application, design,
                    material and process, not merely access to a printer.
                  </blockquote>
                </aside>
              </div>
            </article>

            <article role="listitem">
              <div className="career-index">
                <span>03</span>
                <strong>Jan — Apr 2020</strong>
              </div>
              <div className="progression-heading">
                <span>Engineering research foundation</span>
                <h3>Student Researcher</h3>
                <p>Centennial College · ARIES Lab</p>
              </div>
              <div className="progression-copy">
                <p>
                  An industry-sponsored project connected to a leading aerospace
                  manufacturer applied mechanical-engineering principles to an advanced
                  additive-manufacturing problem. The work focused mainly on structured
                  technical documentation, alongside topology-optimization support and
                  confirmation of finite-element-analysis calculations.
                </p>
                <p>
                  This included reviewing design assumptions, checking FEA results
                  against calculations, documenting analytical and simulated behaviour,
                  and supporting physical-validation planning and the design of test
                  fixtures or jigs. The project introduced both the capabilities and
                  constraints of advanced additive manufacturing and shaped the direction
                  of the work that followed.
                </p>
              </div>
            </article>
          </div>
        </section>

        <section id="systems" className="work section">
          <p className="eyebrow">03 · Systems built from operational needs</p>
          <h2>Floor-level problems translated into workable systems.</h2>
          <p className="section-lead">
            Each case began with an operating constraint. The response was selected,
            prototyped or deployed according to what the work required—not according
            to which technology was most fashionable.
          </p>
          <p className="confidentiality-inline">
            Professional case studies are generalized to protect customer, employer
            and operational information. Diagrams and interfaces may be reconstructed
            or use synthetic data.
          </p>
          <div className="work-grid">
            {systemCases.map((item) => (
              <article className="work-card" key={item.number}>
                <CaseMedia type={item.media} />
                <div className="card-body">
                  <div className="card-topline">
                    <p className="card-meta">
                      <span>{item.number}</span>
                      Operational case study
                    </p>
                    <span className="status-label">{item.status}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <dl className="case-details">
                    <div>
                      <dt>Situation</dt>
                      <dd>{item.situation}</dd>
                    </div>
                    <div>
                      <dt>Response</dt>
                      <dd>{item.response}</dd>
                    </div>
                    <div>
                      <dt>Technical approach</dt>
                      <dd>{item.approach}</dd>
                    </div>
                    <div>
                      <dt>What changed</dt>
                      <dd>{item.outcome}</dd>
                    </div>
                  </dl>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="lab section">
          <p className="eyebrow">04 · Independent projects and current interests</p>
          <h2>Learning in public, with the maturity made clear.</h2>
          <p className="section-lead">
            These projects show where the work is developing next. Some are usable
            prototypes; others remain experiments or concepts. None is presented as
            more mature than it is.
          </p>
          <div className="project-grid">
            {projects.map((item, index) => (
              <article key={item.title}>
                <ProjectMedia type={item.media} />
                <div className="project-topline">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span className="maturity-label">{item.status}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <p className="project-note">{item.note}</p>
                <small>{item.stack}</small>
                {item.links.length > 0 && (
                  <div className="project-links">
                    {item.links.map((link) => (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        key={link.href}
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="about section">
          <LearningModel />
          <div className="about-copy">
            <p className="eyebrow">05 · About</p>
            <h2>For the love of learning.</h2>
            <p>
              I learn best by building, testing assumptions and staying close to the
              real process. That usually means understanding why a workflow fails,
              finding what already exists and rebuilding only the part that does not
              fit.
            </p>
            <p>
              Mechanical engineering gave me a foundation in physical systems.
              Additive manufacturing made the trade-offs immediate: design, material,
              process, maintenance and human judgment all affect the outcome. Software,
              automation and AI now extend that work, but the operating problem still
              comes first.
            </p>
            <p>
              I prefer human oversight where decisions carry real consequences, and I
              try to be precise about what a tool can do, what remains untested and
              what I have not yet mastered. Curiosity reaches beyond manufacturing,
              but usefulness remains the standard.
            </p>
            <div className="credentials">
              <div>
                <span>Engineering</span>
                <strong>Bachelor of Engineering, Mechanical Engineering</strong>
                <small>MG University · WES Canadian equivalency</small>
              </div>
              <div>
                <span>Mechanical design</span>
                <strong>Mechanical Engineering Technology: Design</strong>
                <small>Centennial College · High Honours</small>
              </div>
              <div>
                <span>Technical credentials</span>
                <strong>HP MJF Field Service Engineer · CSWA</strong>
                <small>Equipment service and mechanical design foundations</small>
              </div>
              <div>
                <span>Professional development</span>
                <strong>Data Science Foundations</strong>
                <small>DSI, University of Toronto</small>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="contact dark section">
          <p className="eyebrow">Contact</p>
          <h2>Let&apos;s connect around work worth doing.</h2>
          <p className="section-lead">
            I&apos;m interested in conversations with people building capable
            organizations, improving real production systems and applying technology
            responsibly to meaningful technical or operational problems.
          </p>
          <p className="contact-themes">
            Manufacturing leadership · additive applications · operational system
            design · digital manufacturing · practical automation · industrial AI
          </p>
          <div className="contact-grid">
            <div>
              <span>Location</span>
              <p>Toronto, Canada</p>
            </div>
            <div>
              <span>Email</span>
              <a href="mailto:alenpjose@gmail.com">alenpjose@gmail.com</a>
            </div>
            <div>
              <span>LinkedIn</span>
              <a
                href="https://www.linkedin.com/in/alenpjose"
                target="_blank"
                rel="noreferrer"
              >
                in/alenpjose ↗
              </a>
            </div>
            <div>
              <span>GitHub</span>
              <a
                href="https://github.com/alenpjose"
                target="_blank"
                rel="noreferrer"
              >
                github.com/alenpjose ↗
              </a>
            </div>
            <div>
              <span>Résumé</span>
              <a href="/resume.pdf" download="Alen-P-Jose-Resume.pdf">
                Download PDF ↓
              </a>
            </div>
          </div>
        </section>
        <footer>
          <span>ALEN / MANUFACTURING SYSTEMS</span>
          <div className="footer-links">
            <a href="#top">Back to top ↑</a>
          </div>
        </footer>
      </main>
    </div>
  );
}
