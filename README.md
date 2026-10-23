# Deload

Deload is a playful, frontend-only marketing site for website building and social media management. It is a React single-page website built with Vite, plain CSS, Framer Motion, and Lucide icons.

## Run locally

Install dependencies and start the Vite development server:

```sh
npm install
npm run dev
```

To create and preview the production build:

```sh
npm run build
npm run preview
```

## Change the agency contact details

Edit [src/data/config.js](src/data/config.js). It contains the agency name, contact email, original Google Form URL, and embedded Google Form URL. If you replace the form, update both URL endings: the regular link should open the form page, and the embedded link should use `?embedded=true`.

The contact section and footer read the email from this file. Every project CTA opens the same form dialog.

## Add real portfolio samples later

The two arrays in [src/data/samples.js](src/data/samples.js) are intentionally empty. Add only real work that Deload is allowed to show. The gallery reads these arrays automatically and keeps its friendly empty state whenever an array has no items.

Video item shape:

```js
{
  id: 'short-campaign-01',
  title: 'Campaign short',
  type: 'video',
  src: '/samples/campaign-short.mp4',
  thumbnail: '/samples/campaign-short-poster.jpg',
}
```

Design item shape:

```js
{
  id: 'carousel-01',
  title: 'Launch carousel',
  type: 'image',
  src: '/samples/launch-carousel.jpg',
  thumbnail: '/samples/launch-carousel.jpg',
  alt: 'A colorful launch carousel designed for a client',
}
```

Put local portfolio assets in `public/samples/` and use paths beginning with `/samples/`. A video uses the browser's built-in controls. A design image uses its `alt` text, with the title as a backup.

## Deploy

### Vercel

1. Push the project to a Git repository.
2. Import the repository in Vercel.
3. Keep the default Vite settings: build command `npm run build`, output directory `dist`.
4. Deploy. Vercel serves the static build; there is no backend to configure.

### Netlify

1. Import the Git repository in Netlify.
2. Set the build command to `npm run build` and publish directory to `dist`.
3. Deploy the site.

### GitHub Pages

GitHub Pages can host the static output. For a repository URL that includes the repository name in its path, set Vite's `base` option in `vite.config.js` to `'/repository-name/'`, then add a GitHub Actions workflow that runs `npm ci`, `npm run build`, and publishes `dist`. A custom domain hosted at the root can use Vite's default base path.

## Project map

- `src/components/` contains reusable pieces such as the shared form dialog and navigation.
- `src/sections/` contains the content blocks that make up the single page.
- `src/data/` contains the editable contact settings and sample arrays.
- `src/styles/global.css` contains the design tokens, layout, responsive rules, and reduced-motion styles.
- `context.txt` is the chronological project memory. Read it before future work and append a changelog entry after changes.
- `LEARNING.md` is a concept-by-concept guide for learning the React and frontend techniques used here.

Google Forms controls its own embedded content and may prevent framing in some browser conditions. The dialog therefore always includes a link to open the regular form in a new tab.
