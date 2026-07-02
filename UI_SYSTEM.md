# UI System

Overview
- Tailwind CSS-driven design system with a dark fintech theme applied by default.
- Key style tokens and configuration live in `tailwind.config.ts`.

Components and usage
- `components/site-header.tsx`, `site-footer.tsx`, and `page-shell.tsx` provide consistent page framing.
- `components/metrics-summary.tsx` renders metric cards used across dashboard and analysis results.
- Chart wrappers in `charts/` provide focused props and consistent color palettes.
- `components/theme-toggle.tsx` manages theme preference persistence in `localStorage`.

Accessibility
- Inputs are standard HTML inputs where possible; ensure `label` associations and ARIA attributes are present when adding new form controls.

Layout Notes
- The Builder form uses compact cards and grid systems; prefer existing utility classes and avoid adding conflicting global CSS.