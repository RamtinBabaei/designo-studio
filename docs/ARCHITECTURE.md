# Architecture decisions

## Request and rendering model

React 19 + TypeScript use App Router conventions through Cloudflare Vinext/Vite. Most page content is server-rendered. Client components are limited to navigation, progressive motion, project dialogs, maps, and the contact form. Route splitting keeps project-detail interactions away from the home page bundle. Shared design tokens and responsive CSS provide a coherent design system. Ink-colored text on the original peach background improves readability over the reference white text (approximately 6.26:1 contrast); Tailwind's base layer is available without a heavy UI kit.

## Contact workflow

`ContactForm → POST /api/contact → shared validation → repository → D1`

Validation is shared between browser and server. The server remains authoritative. The response reports success only after a durable insert or a previously successful idempotent request. Errors preserve the browser's draft. The field `message` is bound explicitly from input to schema, SQL, and the persistence test. No HTML is rendered from user input and no publicly readable submissions endpoint exists.

The database uses one table because there are no users, projects to administer, or relational business entities. Its UUID primary key identifies the record. A unique request ID prevents double submissions. A compound `(ip_hash, created_at)` index supports the rolling submission limit. A single `INSERT ... SELECT ... ON CONFLICT` bounds concurrent writes; limits are five stored submissions per fifteen minutes per hashed IP. The trusted Cloudflare IP header is hashed; local development shares a fallback key. There is no raw IP column. This is a lightweight abuse control rather than a CAPTCHA or a distributed attack defense.

Records contain a name, email, optional phone, selected service, full message, request key, hashed network identifier, and creation timestamp. They persist until the operator removes them. Decide on a retention policy and customer privacy wording before collecting real leads. The demo asks visitors to use sample data.

## Security and resilience

Same-origin browser writes, cross-site request rejection, a 12 kB streaming body limit, bounded fields, a honeypot, parameterized SQL, no-store API responses, no public data reader, and logs containing only event codes/reference IDs. The repository has no runtime schema creation. D1 schema changes are committed migrations and production migrations are applied by Sites. SQL tests execute the actual migration and the actual repository statement against SQLite; deployed D1 itself is a separate environment.

No authentication is added to the public-facing application flow. The published Sites preview is owner-private by default. There is no administrative data reader requiring extra roles. The health endpoint checks schema availability without exposing records or errors.

## Performance

Self-hosted WOFF2 fonts, WebP images, explicit image dimensions, eager priority only for the hero and first project row, lazy lower-page imagery, CSS transitions on opacity/transform, reduced-motion support, and click-to-load external maps. The site needs no image API, font CDN, or map key during normal browsing. OpenStreetMap is the only optional third-party runtime content, loaded after interaction.

The production asset budget checks each raster image is below 150 kB. Lighthouse/Core Web Vitals are targets, not claimed scores. Browser QA and a measured Lighthouse run are still required before describing the result as fully audited or production approved.
