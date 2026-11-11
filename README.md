# Vrundavan Construction — website

Static site (HTML, CSS, jQuery/GSAP) with full-screen video storytelling, AJAX page transitions and project galleries.

- `index.html`, `solutions.html` (Services), `process.html`, `about.html`, `contact.html`, `terms-and-conditions.html`
- `project/<id>.html` — one page per project (all projects are listed on each)
- `_fragments/` — page sections served to the in-site AJAX page loader (the static-hosting equivalent of the original server's partial responses)
- `assets/` — CSS, JS, fonts (Albert Sans, Montserrat, Roboto), images, background videos, company-profile PDF

Deployed on Vercel as a static site (`vercel.json`: no build step, clean URLs).

Run locally: `npx serve .` then open http://localhost:3000

The previous React/Vite version of the site is preserved on the `legacy-react-site` branch.

Note: the contact form posts to `/contact-form`, which needs a backend (e.g. a serverless function or form service) before it can deliver messages.
