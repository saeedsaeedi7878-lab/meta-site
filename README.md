# MetaTest public website

Independent Next.js site for the MetaTest landing page. It does not share code with the application served at `/app`.

```bash
npm install
npm run dev
```

Production:

```bash
npm run build
npm start
```

Checks:

```bash
npx tsc --noEmit
npm run lint
```

The site listens on [http://localhost:3000](http://localhost:3000). Calls to action open `https://metatest.app/app/`.

Public routes: `/`, `/about`, `/faq`, `/blog`, `/blog/[slug]`, `/contact`.

Fonts and Lordicon load through `/hosted`, a same-origin proxy to `https://metatest.app`. Run `npm start` after `npm run build` so that route is available. The font files and animation JSON are not stored in this repository.
