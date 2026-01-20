# Data Migration Plan: Portfolio → MongoDB + Cloudinary

## 1. Architecture Overview
- Admin/Content Repo (private): Owns canonical content and seeds MongoDB + uploads assets to Cloudinary.
- API Service (read-only, public): Serves normalized JSON from MongoDB; transforms assets to CDN URLs.
- Portfolio Client (this repo): Fetches data, hydrates stores, and renders components/windows.

## 2. Data Model (MongoDB)
Use collections with stable IDs (string UUIDs). Keep UI-only state in client.

- items
  - id: string
  - name: string
  - kind: "file" | "folder"
  - fileType: "txt" | "img" | "pdf" | "url" | "fig"
  - iconUrl: string
  - position: string (e.g., "top-10 left-10")
  - href?: string (for url/fileType=url)
  - refs?: object
    - imageUrl?: string (Cloudinary URL)
    - subtitle?: string
    - description?: string[]
  - meta?: object (tags, createdAt)

- locations
  - id: string
  - type: "work" | "about" | "resume" | "trash" | ...
  - name: string
  - iconUrl: string
  - kind: "folder"
  - children: string[] (item ids)

- windows
  - key: "finder" | "resume" | "safari" | "photos" | "terminal" | "txtfile" | "imgfile"
  - defaults: object (content defaults)
  - ui: { width?: number, height?: number, position?: string }
  - meta?: object

- settings
  - navLinks: [{ id, title, href }]
  - dockApps: [{ id, title, iconUrl, windowKey? }]
  - socials, techstack, etc.

- blogPosts/photos (optional)
  - Standard document shapes with assetRefs to Cloudinary.

Notes:
- Store only Cloudinary public URLs or public IDs in MongoDB; derive transformed URLs in API.
- Avoid storing client-only state (isOpen, zIndex) in MongoDB.

## 3. Repositories
- Content Repo (Private)
  - Structure:
    - /content/items/*.json
    - /content/locations/*.json
    - /content/windows/*.json
    - /assets/* (source files to upload)
  - Tooling:
    - Seed scripts:
      - Upload assets to Cloudinary, capture public IDs/URLs.
      - Validate JSON via Zod/JSON Schema.
      - Upsert documents to MongoDB with versioning.
    - CI:
      - On push to main: run validation + seed → deploy API (if needed).

- API Repo (Public)
  - Runtime: Node (Express/Fastify) or Next/Vercel API routes.
  - Responsibilities:
    - Read-only endpoints to serve normalized data.
    - Enforce projection, pagination, caching headers (ETag/Cache-Control).
    - Map Cloudinary public IDs to optimized CDN URLs (e.g., width, format=auto).
  - Hosting: Vercel, Render, Fly.io, or Deno Deploy.

## 4. API Endpoints
All responses include version and lastModified.

- GET /locations
  - Returns all root locations with populated children (items with minimal fields).

- GET /items/:id
  - Returns full payload for an item (for Finder lazy load).
  - Include refs.description, refs.subtitle, refs.imageUrl, href.

- GET /windows
  - Returns window metadata (defaults and UI config).

- GET /settings
  - Returns navLinks, dockApps, socials, techstack.

- Optional:
  - GET /search?q=... (server-side search among items/names)
  - GET /assets/resolve?publicId=... (if you prefer resolving Cloudinary URLs server-side)

Headers:
- Cache-Control: public, max-age=60, stale-while-revalidate=600
- ETag: content hash
- Use If-None-Match in client.

## 5. Client Integration (This Repo)
- Bootstrap:
  - On app load, fetch /locations and /settings.
  - Hydrate Zustand stores:
    - location store: set locations tree.
    - window store: keep WINDOW_CONFIG locally for UI state (isOpen, zIndex), but enrich with API window metadata.

- Lazy loading:
  - Finder:
    - When opening a file (txt/img/pdf/url/fig), fetch GET /items/:id.
    - Write data into windows.[fileKey].data, then openWindow(fileKey).

- Caching:
  - In-memory cache (Map) keyed by endpoint + params.
  - Use ETag for SWR-style refresh; fall back to cached data if offline.

- Failure handling:
  - If API fails:
    - Fall back to local constants subset (minimal content to keep UI usable).
    - Display a toast/banner for degraded mode.

## 6. Security
- Public API:
  - Read-only, no write endpoints.
  - Rate limiting (per IP).
  - Input validation for query params.
  - CORS restrictive (only your domain) if feasible.

- Content Repo → MongoDB:
  - Use service account with write-only to necessary collections.
  - Store secrets in CI with environment variables.
  - Validate and sanitize content before writing.

## 7. Versioning & Release Strategy
- MongoDB documents include:
  - contentVersion (semver or timestamp)
  - lastModified

- Client:
  - Sends If-Modified-Since/If-None-Match; respects 304 to avoid downloads.
  - Feature flag to lock to specific contentVersion for reproducible deploys.

- Rollback:
  - Keep previous snapshot (e.g., tagged contentVersion).
  - Re-seed script can roll back to last known good state.

## 8. Migration Phases
- Phase 1 (Low risk):
  - Move settings (nav, dockApps, socials, techstack) + photos/blog.
  - Client fetches /settings, replace local constants.

- Phase 2:
  - Move locations + items.
  - Finder starts lazy loading item details from /items/:id.

- Phase 3:
  - Move window metadata (defaults/ui) to API.
  - Keep WINDOW_CONFIG’s UI state (isOpen, zIndex) client-only.

- Validation checkpoints:
  - After each phase, run integration tests in client to ensure Finder and window rendering works.

## 9. Cloudinary Usage
- Folders:
  - portfolio/images, portfolio/pdfs
- Naming:
  - Deterministic public IDs (e.g., items/<id>)
- Transformations:
  - Auto format and quality: f_auto,q_auto
  - Sizes: w_1200 for full-width, w_400 for thumbnails
- Access:
  - Store public IDs or secure URLs in MongoDB.
  - API constructs URLs with desired transformations to reduce client logic.

## 10. Observability & Maintenance
- Monitoring:
  - API logs (structured), error tracking (Sentry), metrics (p95 latency).
- Backups:
  - MongoDB backups (Atlas built-in).
  - Asset backups inherent to Cloudinary; keep originals in Content Repo.
- Content workflow:
  - PR-based changes in Content Repo with preview seeding to a staging database and staging API.
  - Manual approve to deploy to prod.

## 11. Checklist
- Create Content Repo with JSON schemas and seed scripts.
- Provision MongoDB Atlas cluster (dev/stage/prod).
- Set up Cloudinary account and folders.
- Build API with endpoints and validation.
- Instrument caching headers and ETag.
- Client: integrate bootstrap + lazy-loading flows, caches, and fallbacks.
- Phase migrations with tests and monitoring.