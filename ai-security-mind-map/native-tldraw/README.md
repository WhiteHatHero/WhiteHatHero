# Native tldraw embed — staged replacement

This is the **actual tldraw renderer**, not the SVG/HTML reconstruction currently in `../viewer.html`. It opens Jordan Warren's original `.tldr` document, runs tldraw's official file parser/migration, displays the real shapes, connectors, text, and drawing fonts, and sets the editor to read-only so visitors can't change the work.

## Install and test

```sh
cd ai-security-mind-map/native-tldraw
npm install
npm run dev
```

Use the original source file at `public/AI_Security_Mind_Map.tldr`. To update the board later, replace that file with the newly exported .tldr file — **do not convert it to SVG/HTML**.

## Production / licensing (required)

As of tldraw SDK 4+, public production use requires a valid tldraw license key (trial, hobby, or commercial as appropriate). Obtain one at https://tldraw.dev/pricing. Configure `VITE_TLDRAW_LICENSE_KEY` in the build environment (for example, via `.env.local`) and build with `npm run build`. The key is intentionally shipped to the client and tldraw permits this. Never bypass SDK licensing. A license must cover `jordanwarren.org`.

## Deploy on the actual portfolio domain

Deploy `dist/` at **https://jordanwarren.org/ai-security/viewer/** (canonical trailing slash; redirect `/ai-security/viewer` there). This requires access to the portfolio hosting project; simply pushing to GitHub does not update the ChatGPT Sites project.

Embed the live native viewer into the portfolio's `/ai-security/` page:

```html
<iframe
  title="Jordan Warren's original tldraw AI security mind map"
  src="/ai-security/viewer/"
  loading="lazy"
  style="width:100%;height:75vh;min-height:620px;border:0;border-radius:12px"
  allow="fullscreen"
></iframe>
<a href="/ai-security/viewer/" target="_blank" rel="noopener">Open full-screen mind map</a>
```

Keep a direct `Download .tldr` and `View original on GitHub` link to establish provenance. Keep the other site design intact; **remove the old custom SVG viewer** only after the native viewer loads and is confirmed on the real domain.

## Status

Staged proposal only. Not deployed or merged. Production runtime/browser rendering and licensing still need verification. The existing `../viewer.html` and live site remain untouched.
