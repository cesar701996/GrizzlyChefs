# Grizzly Chefs homepage concept

A redesign concept for the [Grizzly Chefs](https://grizzlychefs.com) homepage
(food delivery, catering and meal plans in Berkeley, CA), prepared by Cesar Cruz.

This is a design concept, not the live site. Items shown with a dashed
**To confirm** pill (hours, address, email, delivery area, some prices) are
placeholders until the owner confirms the details. Every "Order" and menu link
goes to the real pages on grizzlychefs.com.

## What it fixes

- A clear headline saying who Grizzly Chefs is, where it delivers and how fast
- One address, one email and one set of hours everywhere (placeholders until confirmed)
- All links stay on grizzlychefs.com
- Contact in the menu, tap-to-call phone number
- Meal plan prices shown up front
- Real food photos with descriptive alt text, and every photo shown whole (nothing cut off)
- An hours block that never cuts off or overlaps on phones
- No leftover template text, demo products or stray characters
- Fewer third-party widgets for a faster page

## Run it locally

Needs Node.js 20 or newer.

```bash
npm install
npm run dev      # local preview at http://localhost:5173
npm run build    # production build in dist/
```

## Live site

https://cesar701996.github.io/GrizzlyChefs/

Every push to `main` rebuilds the site and publishes it to the `gh-pages`
branch, which GitHub Pages serves (Settings → Pages → Deploy from a branch →
`gh-pages`). The workflow is in `.github/workflows/deploy.yml`.

The page carries `noindex` so search engines don't confuse it with the real site.

## Built with

React 19, Vite and Tailwind CSS v4. All page content is in `src/App.tsx`;
colors and button styles are in `src/styles.css`; photos are in `public/images/`.
Photos and logo belong to Grizzly Chefs.
