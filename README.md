# Youth United — Thapar NGO Society

React application for the Youth United Thapar NGO Society website, with an optional FastAPI backend.

## Development

Install and start the frontend:

```bash
npm install
npm start
```

Start the backend in a second terminal on Windows PowerShell:

```powershell
backend\.venv\Scripts\Activate.ps1
uvicorn backend.main:app --reload
```

The frontend currently submits the join application directly to Supabase. The backend is a separate foundation for future server-side validation, notifications, or privileged operations; do not submit the same form through both paths.

## Production Build

```bash
npm run build
```

`build/` is generated output. Do not edit it manually.

## Project Structure

```
backend/              FastAPI application and Python dependencies
public/               Browser-served static files
  images/home/        Home page imagery
  images/events/      Event imagery
  team/faculty/       Faculty portraits
  team/faces/         Executive team portraits
  yu-logo.png         Favicon, manifest icon, and navigation logo
src/
  components/layout/  Navbar, footer, loader, and layout concerns
  components/sections Page sections and reusable section-level UI
  components/ui/      Small reusable controls and presentation primitives
  constants/          Branding and media path constants
  context/            React context providers
  data/               Static event, member, navigation, and content data
  hooks/              Custom React hooks
  lib/                External service clients such as Supabase
  pages/              Route-level page components
  styles/             Global variables, animations, and base styles
  utils/              Pure helper functions
scripts/              Build and asset-processing utilities
docs/                 Asset audits and project maintenance notes
```

## Media Rules

- Put browser-served images in the relevant `public/` subdirectory.
- Reference static media with the existing absolute `/images/...` or `/team/...` URL convention.
- Keep media paths centralized in `src/constants/media.js` when an image is shared by multiple components.
- Keep event and member-specific paths with their data records.
- Before removing or renaming an image, search `src/`, `public/index.html`, and `public/manifest.json` for every reference.
- Never edit `build/`, `node_modules/`, or `backend/.venv/` as source files.
- Run `npm run build` after asset or path changes.

See [docs/asset-inventory.md](docs/asset-inventory.md) for the current usage audit and cleanup candidates.

## Environment Variables

Create a local `.env` file for the frontend:

```env
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

Never expose a Supabase service-role key in frontend code or commit secrets.

## Tech Stack

- React 18
- React Router v6
- FastAPI and Uvicorn for the optional backend
- Supabase for the current application form database
- Font Awesome via `@fortawesome/react-fontawesome`
- Google Fonts: Cormorant Garamond and DM Sans
