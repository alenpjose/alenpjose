# Design QA

## Evidence

- Reference: `C:\Users\Owner\AppData\Local\Temp\codex-clipboard-45a655e1-6452-47c3-920d-7784287065d4.png` (1774 x 913), showing the Rolodex portrait screenshot letterboxed inside an oversized dark frame.
- Reference: `C:\Users\Owner\OneDrive\Pictures\Screenshots\Screenshot 2026-08-30 202340.png` (1801 x 567), showing the UtilityOps secondary screenshots cropped into narrow columns.
- Source assets: `public/assets/rolodex-mobile.jpg` (742 x 1536), `public/assets/utilityops-dashboard.jpg` (1536 x 752), `public/assets/utilityops-readiness-report.jpg` (1536 x 756), and `public/assets/utilityops-assistant.jpg` (1536 x 705).
- Implementation: browser captures from `http://127.0.0.1:43118/projects/rolodex` and `http://127.0.0.1:43118/projects/utilityops-readiness` at 1440 x 1000 and 390 x 844. Captures were inspected directly during QA.

## Required fidelity surfaces

- Preserve the existing typography, spacing system, colours, borders, copy, and project-page structure.
- Present the Rolodex asset at its natural portrait ratio without a wide dark frame or distortion.
- Present every UtilityOps screenshot at its natural ratio without cropping.
- Keep the gallery readable on both desktop and mobile.

## Findings and corrections

1. **P1, Rolodex media:** The portrait asset inherited the wide project-media treatment, producing large dark side bars. Added portrait-specific sizing, transparent background, and intrinsic-height rendering. Verified at 480 px wide on desktop and 342.7 px wide on mobile; rendered ratio matches the source ratio.
2. **P1, UtilityOps gallery:** A three-column layout and fixed-height cropping cut off the two secondary screenshots. Changed the lead image to span the full gallery width and placed the remaining images in two equal columns using intrinsic heights. Verified all three rendered ratios against their source ratios.
3. **P2, mobile gallery:** Two columns left the screenshots too small on narrow screens. Changed the gallery to one column below 600 px and verified a 342.7 px image width at a 390 x 844 viewport.

## Validation

- Desktop visual review: passed.
- Mobile visual review: passed.
- Image aspect-ratio checks: passed.
- Browser console warnings and errors: none.
- Production build and static route generation: passed.

Final result: passed.
