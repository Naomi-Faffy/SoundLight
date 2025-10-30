# AGENTS.md - SoundLight Project Guide

## Build/Test Commands
- **No build tools**: This is a static HTML/CSS/JS website - no compilation needed
- **Testing**: Open `index.html` in a browser to test
- **Lint**: No linters configured - manual code review

## Architecture
- **Simple static website**: Single-page application with sections
- **Files**: `index.html` (structure), `styles.css` (styling), `script.js` (interactivity)
- **External dependencies**: Google Fonts (Playfair Display, Montserrat), Font Awesome 6.4.0
- **No backend**: Pure frontend, form submission is simulated client-side

## Code Style
- **CSS**: BEM-like naming (`.section-title`, `.car-card`, `.glass-card`), CSS custom properties in `:root`
- **Colors**: Uses brand palette (`--exquisite-green: #30A848`, `--luxury-navy: #1C355E`)
- **JavaScript**: Vanilla ES6+, event-driven, no frameworks
- **Naming**: kebab-case for CSS classes, camelCase for JS variables/functions
- **Comments**: Minimal; section headers in CSS/JS
- **Layout**: CSS Grid for collections, Flexbox for navigation/sections
- **Responsive**: Mobile-first breakpoints at 480px, 768px, 1200px

## Notes
- Forms are client-side only (no actual submission)
- Uses glass morphism design pattern heavily
- Intersection Observer for scroll animations
