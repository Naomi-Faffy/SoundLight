3D Image Gallery — SoundLight

Overview

This project contains a responsive 3D image gallery implemented with plain HTML, CSS, and JavaScript.
The gallery displays 9 images arranged in a horizontal 3D arc. The center image is emphasized. Users
can navigate via arrows, swipe (mobile), or keyboard (left/right). The gallery also supports autoplay
with pause-on-hover and touch.

Files changed/added

- index.html — gallery markup (9 slides) and ARIA announcer for accessibility.
- styles.css — caption styling, radial vignette to enhance depth, responsive transform adjustments.
- script.js — circular carousel logic, autoplay (pause-on-hover/touch), keyboard navigation, and accessibility announcements.
- README.md — this file.

How to use

1. Place your images in the project folder named exactly as `image1.jpg` through `image9.jpg` or edit the `src` attributes in `index.html` to point to your image paths.
2. Open `index.html` in a browser to view.

Optional: run a local static server (recommended for mobile testing and swipe/touch events):

PowerShell (Windows):

```powershell
# from project root
python -m http.server 8000
# then open http://localhost:8000 in your browser
```

Customizing

- To change autoplay speed, adjust `autoplayDelay` in `script.js` (milliseconds).
- Caption content is in `index.html` inside each `.caption` element.
- Transform distances and rotation angles live in `styles.css` (`.left-*` and `.right-*` classes) and can be tuned for different visual styles.

Accessibility

- The gallery includes a hidden announcer (`#carousel-announcer`) that can be used to announce which image is now centered (screen readers). The JS updates this value when the center image changes.
- Keyboard navigation: left/right arrows.

Next improvements

- Add optional autoplay controls (play/pause button).
- Add lazy-loading with progressive image loading for better performance.
- Add captions as links to detail pages or lightbox modal.

If you want me to tune the transform values to match the Dribbble reference even more closely, I can iterate quickly — tell me which aspect to emphasize (deeper curve, stronger rotation, closer spacing, or larger center scale).