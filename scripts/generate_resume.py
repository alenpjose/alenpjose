from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    KeepTogether,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
PUBLIC_PDF = ROOT / "public" / "resume.pdf"
ARCHIVE_PDF = ROOT / "output" / "pdf" / "alen-jose-resume.pdf"

INK = colors.HexColor("#1b1813")
BODY = colors.HexColor("#453f34")
MUTED = colors.HexColor("#766f62")
ACCENT = colors.HexColor("#c24a1e")
PAPER = colors.HexColor("#ece7dd")
ALT = colors.HexColor("#e4ddd0")
LINE = colors.HexColor("#cbc3b3")
WHITE = colors.HexColor("#f5f1e9")


def make_styles():
    styles = getSampleStyleSheet()
    return {
        "name": ParagraphStyle(
            "Name",
            parent=styles["Normal"],
            fontName="Helvetica-Bold",
            fontSize=22,
            leading=24,
            textColor=WHITE,
            spaceAfter=4,
        ),
        "headline": ParagraphStyle(
            "Headline",
            parent=styles["Normal"],
            fontName="Helvetica",
            fontSize=9,
            leading=13,
            textColor=colors.HexColor("#c8c0b2"),
            spaceAfter=0,
        ),
        "contact": ParagraphStyle(
            "Contact",
            parent=styles["Normal"],
            fontName="Helvetica",
            fontSize=8.5,
            leading=12,
            textColor=WHITE,
        ),
        "section": ParagraphStyle(
            "Section",
            parent=styles["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=9,
            leading=11,
            textColor=ACCENT,
            spaceBefore=12,
            spaceAfter=7,
            uppercase=True,
        ),
        "summary": ParagraphStyle(
            "Summary",
            parent=styles["Normal"],
            fontName="Helvetica",
            fontSize=9.2,
            leading=13.6,
            textColor=BODY,
            spaceAfter=5,
        ),
        "role": ParagraphStyle(
            "Role",
            parent=styles["Heading3"],
            fontName="Helvetica-Bold",
            fontSize=11.2,
            leading=13.5,
            textColor=INK,
            spaceAfter=2,
        ),
        "meta": ParagraphStyle(
            "Meta",
            parent=styles["Normal"],
            fontName="Helvetica",
            fontSize=8.2,
            leading=11,
            textColor=MUTED,
            spaceAfter=5,
        ),
        "body": ParagraphStyle(
            "Body",
            parent=styles["Normal"],
            fontName="Helvetica",
            fontSize=8.5,
            leading=12.2,
            textColor=BODY,
            spaceAfter=4,
        ),
        "bullet": ParagraphStyle(
            "Bullet",
            parent=styles["Normal"],
            fontName="Helvetica",
            fontSize=8.4,
            leading=11.8,
            leftIndent=11,
            firstLineIndent=-8,
            bulletIndent=1,
            textColor=BODY,
            spaceAfter=3,
        ),
        "scope_value": ParagraphStyle(
            "ScopeValue",
            parent=styles["Normal"],
            fontName="Helvetica-Bold",
            fontSize=10.5,
            leading=12,
            textColor=INK,
            alignment=TA_LEFT,
        ),
        "scope_label": ParagraphStyle(
            "ScopeLabel",
            parent=styles["Normal"],
            fontName="Helvetica",
            fontSize=6.8,
            leading=9,
            textColor=MUTED,
            alignment=TA_LEFT,
        ),
        "skill_head": ParagraphStyle(
            "SkillHead",
            parent=styles["Normal"],
            fontName="Helvetica-Bold",
            fontSize=8.2,
            leading=10.4,
            textColor=INK,
            spaceAfter=3,
        ),
        "skill_body": ParagraphStyle(
            "SkillBody",
            parent=styles["Normal"],
            fontName="Helvetica",
            fontSize=7.6,
            leading=10.3,
            textColor=BODY,
        ),
        "footer": ParagraphStyle(
            "Footer",
            parent=styles["Normal"],
            fontName="Helvetica",
            fontSize=6.8,
            leading=9,
            textColor=MUTED,
        ),
    }


S = make_styles()


def p(text, style="body"):
    return Paragraph(text, S[style])


def bullet(text):
    return Paragraph(f"• {text}", S["bullet"])


def section(title):
    return [
        Paragraph(title.upper(), S["section"]),
        Table([[""]], colWidths=[7.35 * inch], rowHeights=[0.01 * inch], style=[
            ("BACKGROUND", (0, 0), (-1, -1), LINE),
            ("LINEBELOW", (0, 0), (-1, -1), 0.5, LINE),
        ]),
        Spacer(1, 0.05 * inch),
    ]


def header():
    left = [
        Paragraph("ALEN P. JOSE", S["name"]),
        Paragraph(
            "PRODUCTION MANAGER  |  ADDITIVE MANUFACTURING  |  DIGITAL OPERATIONS & APPLIED AI",
            S["headline"],
        ),
    ]
    right = Paragraph(
        "Toronto, ON, Canada<br/>"
        "(416) 876-1830<br/>"
        "alenpjose@gmail.com<br/>"
        "alenpjose.ca<br/>"
        "linkedin.com/in/alenpjose  |  github.com/alenpjose",
        S["contact"],
    )
    table = Table([[left, right]], colWidths=[4.3 * inch, 3.05 * inch])
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), INK),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("LEFTPADDING", (0, 0), (0, 0), 18),
                ("RIGHTPADDING", (0, 0), (0, 0), 10),
                ("TOPPADDING", (0, 0), (-1, -1), 15),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 15),
                ("LEFTPADDING", (1, 0), (1, 0), 10),
                ("RIGHTPADDING", (1, 0), (1, 0), 18),
            ]
        )
    )
    return table


def capabilities_table():
    data = [
        [
            Paragraph(
                "<b>Manufacturing leadership</b><br/>Production planning, capacity and WIP control, labor coordination, maintenance readiness, quality, inventory and delivery recovery",
                S["skill_body"],
            ),
            Paragraph(
                "<b>Additive manufacturing</b><br/>Application discovery, DFAM, process and material selection, build strategy, post-processing and HP MJF field service",
                S["skill_body"],
            ),
            Paragraph(
                "<b>Digital operations & applied AI</b><br/>Workflow mapping, data-model design, platform deployment, Python automation, retrieval, deterministic validation and human review",
                S["skill_body"],
            ),
        ],
    ]
    table = Table(data, colWidths=[2.45 * inch] * 3)
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), ALT),
                ("BOX", (0, 0), (-1, -1), 0.6, LINE),
                ("INNERGRID", (0, 0), (-1, -1), 0.4, LINE),
                ("LEFTPADDING", (0, 0), (-1, -1), 10),
                ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                ("TOPPADDING", (0, 0), (-1, -1), 9),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]
        )
    )
    return table


def role_block(title, dates, employer, intro, bullets):
    story = [
        p(title, "role"),
        p(f"{dates}  |  {employer}", "meta"),
    ]
    if intro:
        story.append(p(intro, "body"))
    story.extend(bullet(item) for item in bullets)
    return story


def skills_table():
    entries = [
        (
            "Production operations",
            "Master scheduling, capacity and WIP control, labor deployment, delivery recovery, materials, inventory and maintenance readiness.",
        ),
        (
            "Additive processes",
            "HP MJF, Formlabs SLS/SLA, Markforged CFF, FDM, application discovery, DFAM, build strategy and HP field service.",
        ),
        (
            "Post-processing",
            "Powder removal, bead blasting, vapor smoothing, dyeing, painting, assembly, finishing control and inspection.",
        ),
        (
            "Software and applied AI",
            "Python, Next.js, Supabase, SharePoint, Power Automate, Office 365, Odoo, self-hosted language-model inference, embeddings, retrieval, deterministic validation and human-reviewed workflows.",
        ),
        (
            "Engineering",
            "SolidWorks, Solid Edge, FEA, topology optimization, fixture design, technical documentation and manufacturability review.",
        ),
        (
            "Operating methods",
            "5S, Kanban-style flow, Kaizen, root-cause analysis, PDCA, SOP development, preventive maintenance and visual management.",
        ),
    ]
    cells = []
    for title, body in entries:
        cells.append([[p(title, "skill_head")], [p(body, "skill_body")]])
    rows = [
        [
            Table(cells[i], colWidths=[3.35 * inch]),
            Table(cells[i + 1], colWidths=[3.35 * inch]),
        ]
        for i in range(0, len(cells), 2)
    ]
    table = Table(rows, colWidths=[3.67 * inch, 3.67 * inch])
    table.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("BOX", (0, 0), (-1, -1), 0.5, LINE),
                ("INNERGRID", (0, 0), (-1, -1), 0.5, LINE),
                ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#f1ece3")),
                ("LEFTPADDING", (0, 0), (-1, -1), 10),
                ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                ("TOPPADDING", (0, 0), (-1, -1), 7),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
            ]
        )
    )
    return table


def project_table():
    projects = [
        (
            "Slip Maker and Digital Shop Traveller",
            "Working internal tool",
            "Built a deterministic document pipeline that generates part views, connects purchase-order information and uses self-hosted language-model inference to extract relevant requirements. Mandatory human review keeps interpretation inside a controlled workflow. Reduced package preparation from approximately 20 minutes to a few minutes.",
        ),
        (
            "UtilityOps Readiness Assistant",
            "Learning build | Public repository",
            "Built a source-grounded readiness assistant to study embeddings, retrieval, deterministic validation, citations and controlled language-model interpretation. Known-rule checks and retrieved evidence identify missing documents, blockers and required actions in synthetic work-order packages.",
        ),
        (
            "Production Intake and Workflow Control",
            "Deployed workflow",
            "Modelled order, part, build, reprint and status relationships through an AI-assisted web MVP, then used the validated requirements to assess available platforms. Selected and deployed the best-fitting system end to end, including configuration, rollout, team training and standardized use.",
        ),
        (
            "Maintenance and Error Traceability",
            "Operational framework",
            "Designed an asset-centred SharePoint framework connecting equipment use, builds, parts, error events, maintenance history and technician actions. Improved failure reconstruction, root-cause investigation and maintenance planning without claiming predictive-maintenance capability.",
        ),
    ]
    rows = []
    for title, status, description in projects:
        rows.append(
            [
                Paragraph(
                    f"<b>{title}</b><br/><font color='#c24a1e' size='7'>{status.upper()}</font>",
                    S["body"],
                ),
                p(description, "body"),
            ]
        )
    table = Table(rows, colWidths=[2.3 * inch, 5.04 * inch])
    table.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("BOX", (0, 0), (-1, -1), 0.5, LINE),
                ("INNERGRID", (0, 0), (-1, -1), 0.5, LINE),
                ("LEFTPADDING", (0, 0), (-1, -1), 10),
                ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ]
        )
    )
    return table


def education_table():
    rows = [
        [
            p("Mechanical Engineering Technology: Design", "skill_head"),
            p("2018 - 2020 | Centennial College | High Honours", "skill_body"),
        ],
        [
            p("Bachelor of Engineering - Mechanical Engineering", "skill_head"),
            p("2013 - 2017 | MG University | WES Canadian equivalency", "skill_body"),
        ],
    ]
    table = Table(rows, colWidths=[3.25 * inch, 4.09 * inch])
    table.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("BOX", (0, 0), (-1, -1), 0.5, LINE),
                ("INNERGRID", (0, 0), (-1, -1), 0.5, LINE),
                ("LEFTPADDING", (0, 0), (-1, -1), 9),
                ("RIGHTPADDING", (0, 0), (-1, -1), 9),
                ("TOPPADDING", (0, 0), (-1, -1), 7),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
            ]
        )
    )
    return table


def footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(LINE)
    canvas.setLineWidth(0.5)
    canvas.line(0.58 * inch, 0.43 * inch, 7.92 * inch, 0.43 * inch)
    canvas.setFont("Helvetica", 6.8)
    canvas.setFillColor(MUTED)
    canvas.drawRightString(7.92 * inch, 0.25 * inch, f"Page {doc.page}")
    canvas.restoreState()


def build(output_path):
    output_path.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(
        str(output_path),
        pagesize=letter,
        rightMargin=0.58 * inch,
        leftMargin=0.58 * inch,
        topMargin=0.48 * inch,
        bottomMargin=0.55 * inch,
        title="Alen P. Jose - Resume",
        author="Alen P. Jose",
        subject="Manufacturing Leadership, Additive Manufacturing and Applied AI Systems",
    )

    story = [
        header(),
        Spacer(1, 0.16 * inch),
        *section("Professional profile"),
        p(
            "Production Manager and mechanical engineer with 5+ years of experience across additive-manufacturing applications, field service, production operations and digital workflow development. Leads a multi-technology additive-manufacturing operation and four production staff. Combines floor-level operating judgment with practical software and AI-assisted systems, including deterministic document automation, self-hosted language-model inference, retrieval and human-reviewed decision support.",
            "summary",
        ),
        Spacer(1, 0.09 * inch),
        capabilities_table(),
        *section("Professional experience"),
        *role_block(
            "Production Manager",
            "July 2026 - Present",
            "Designfusion Inc. | Toronto, ON",
            None,
            [
                "Direct production priorities and master scheduling across a multi-technology additive-manufacturing operation, coordinating work from build preparation through finishing, inspection and shipment.",
                "Lead four production staff across machine operation, post-processing and quality activities, reallocating work as priorities and equipment availability change.",
                "Control capacity, WIP, materials, maintenance windows, quality risks and delivery recovery, making stalled work and resource constraints visible earlier.",
                "Vet production-management platforms against mapped operating requirements, select the best-fitting option and lead deployment end to end, including rollout, team training and workflow standardization.",
                "Lead structured problem solving across equipment, process and delivery disruptions, converting recurring issues into maintenance actions, documented procedures and operating-system improvements.",
            ],
        ),
        Spacer(1, 0.09 * inch),
        *role_block(
            "Application Specialist",
            "January 2021 - June 2026",
            "Designfusion Inc. | Toronto, ON",
            None,
            [
                "Translated customer requirements into viable additive applications through feasibility review, DFAM, material and process selection, build strategy and implementation support.",
                "Guided external engineering and design teams on manufacturability, part consolidation, assembly simplification and practical additive adoption.",
                "Investigated recurring failures and high prototyping costs for an automotive manufacturer, realigning functional requirements, process selection and design guidance to reduce wasted iteration and improve confidence in further applications.",
                "Performed certified HP MJF field service, equipment troubleshooting and recovery planning, connecting machine behaviour with application requirements, production consequences and customer needs.",
                "Managed production planning, equipment readiness, materials, maintenance coordination, post-processing, quality and delivery recovery across a multi-technology additive operation.",
                "Introduced Kanban-style WIP control, shop travellers and SharePoint and Power Automate workflows connecting order, part and build status to improve visibility, accountability and cross-team coordination.",
            ],
        ),
        PageBreak(),
        *section("Selected systems work"),
        project_table(),
        *section("Technical depth"),
        skills_table(),
        *section("Education"),
        education_table(),
        *section("Certifications & professional development"),
        skills_table_for_credentials(),
    ]

    doc.build(story, onFirstPage=footer, onLaterPages=footer)


def skills_table_for_credentials():
    rows = [
        [
            p("HP Multi Jet Fusion - Field Service Engineer", "skill_head"),
            p("Certified SolidWorks Associate (CSWA)", "skill_head"),
        ],
        [
            p("Data Science Foundations - DSI, University of Toronto", "skill_body"),
            p("AI Agents Fundamentals - Hugging Face", "skill_body"),
        ],
        [
            p("Introduction to Artificial Intelligence - IBM / Coursera", "skill_body"),
            p("Generative AI: Introduction and Applications - IBM / Coursera", "skill_body"),
        ],
    ]
    table = Table(rows, colWidths=[3.67 * inch, 3.67 * inch])
    table.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("BOX", (0, 0), (-1, -1), 0.5, LINE),
                ("INNERGRID", (0, 0), (-1, -1), 0.5, LINE),
                ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#f1ece3")),
                ("LEFTPADDING", (0, 0), (-1, -1), 10),
                ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ]
        )
    )
    return table


if __name__ == "__main__":
    build(PUBLIC_PDF)
    ARCHIVE_PDF.parent.mkdir(parents=True, exist_ok=True)
    ARCHIVE_PDF.write_bytes(PUBLIC_PDF.read_bytes())
    print(PUBLIC_PDF)
