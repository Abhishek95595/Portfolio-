---
name: ui-ux-pro
description: Production-ready UI/UX design and engineering principles for modern, accessible, responsive, and visually consistent web interfaces. Automatically activate when working on UI design, UX improvements, frontend development, landing pages, dashboards, mobile interfaces, web applications, design systems, component design, responsive layouts, visual redesigns, or accessibility improvements.
---

# UI/UX Pro Skill & Engineering Guidelines

This skill provides comprehensive instructions for designing and building production-quality, accessible, and responsive user interfaces.

---

## 1. Design Quality & Aesthetics
- **Modern & Polished**: Build clean, modern, and production-ready interfaces tailored to the product domain.
- **Visual Consistency**: Ensure consistent padding, margin, font sizes, color palettes, and component shapes across all views.
- **Avoid Generic AI Aesthetics**: Avoid overuse of generic AI design tropes such as heavy neon glow, aggressive backdrop glassmorphism, unconstrained radial gradients, and flashy unmotivated keyframe animations that hurt usability.

---

## 2. User Experience (UX) Engineering
Before implementing any screen or component, analyze and address:
- **User Intent & Goal**: What primary task is the user completing on this screen?
- **Information Hierarchy**: Place critical content and primary CTAs in high-prominence zones; secondary actions must remain subtle.
- **Complete Application States**:
  - **Loading States**: Skeletons or contextual spinners to prevent layout shifts.
  - **Empty States**: Helpful messaging with actionable next steps.
  - **Error & Success States**: Clear inline validation and toast/alert feedback.
- **Interactivity**: Support intuitive touch targets (minimum 44x44px for mobile) and smooth keyboard navigation.

---

## 3. Visual Design System Rules
- **Typography**: Establish a clean typographic hierarchy (e.g., display, h1-h4, body, caption) with appropriate line heights.
- **Spacing & Alignment**: Use a consistent spacing scale (e.g., 4px / 8px / 16px / 24px / 32px / 48px grid).
- **Color Systems**: Define coherent neutral, primary, accent, surface, border, and state (success, warning, danger) tokens.
- **Borders & Shadows**: Maintain consistent border radii (e.g., 6px, 8px, 12px) and subtle, elevation-based drop shadows.
- **Iconography**: Use consistent, accessible icons with clear semantic purpose.

---

## 4. Design System Compliance & Reuse
- **Inspect First**: Always inspect the existing project for pre-existing UI libraries, CSS variables, tokens, or custom component wrappers before adding new code.
- **Token Reuse**: Reuse existing color tokens, typography styles, button variants, and layout containers.
- **System Creation**: If no design system exists in the project, define a lightweight, cohesive set of CSS variables or design tokens prior to building multiple screens.

---

## 5. Responsive Design Across All Viewports
- **Multi-Device Support**: Verify layouts for mobile (<640px), tablet (640px–1024px), desktop (1024px–1440px), and wide monitors (>1440px).
- **Layout Adaptability**: Adapt navigation (e.g., hamburger/bottom navigation on mobile vs. topbar/sidebar on desktop), multi-column grids, table structures, and modal dialogs appropriately rather than simply scaling down desktop views.

---

## 6. Accessibility (A11y) Standards
- **Color Contrast**: Ensure text satisfies WCAG AA contrast ratios (minimum 4.5:1 for normal text, 3:1 for large text).
- **Semantic HTML**: Use semantic tags (`<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`, `<button>`, `<input>`).
- **Keyboard & Focus**: Ensure standard tab order, visible focus rings, and proper keyboard execution.
- **ARIA & Labels**: Include descriptive `aria-label`, `alt` attributes for images, and explicit form control labeling.

---

## 7. Implementation & Code Quality
- **Component Architecture**: Keep components modular, focused, and reusable without introducing duplicate UI blocks.
- **Dependency Hygiene**: Prefer clean Vanilla CSS, standard Tailwind, or modern web standard primitives over unnecessary third-party packages.
- **Verification**: Run existing lint, build, or test scripts (`npm run build`, `npm run lint`) to confirm clean execution with zero runtime console errors.

---

## 8. 21st.dev MCP Integration
When the `21st` MCP server is enabled:
- Use `21st` tools (`search`, `get_component`) to explore component patterns, modern design benchmarks, and code structures.
- Do not blindly paste external components; adapt all fetched components to match the project established design system, color palette, and code architecture.
