# Verification report — 22 October 2026

Environment: managed Linux, Node 24.19.0, pnpm 11.25.0. This report distinguishes executed checks from checks that still need a browser or another host.

| Check | Result | Evidence / scope |
| --- | --- | --- |
| Locked dependency installation | Passed | Installer completed after dependency pruning; repository lockfile retained |
| Strict TypeScript | Passed | `tsc --noEmit`, including application and tests |
| Automated validation/API/database tests | 16 passed, 0 failed | Node test runner, real SQLite migration and actual repository SQL |
| Production build | Passed | Vinext completed client, RSC, SSR, and Worker stages; all application/API routes listed |
| Local D1 schema migration | Passed | Wrangler applied the committed table and two indexes |
| Required assets / performance budgets | Passed | 30 referenced WebP files, illustrations, fonts, favicon and OG image; all raster images below 150 kB |
| Browser interaction and responsive visual QA | Unverified | Managed preview was unavailable; browser acquisition was blocked. No alternate browser path was used |
| HTTP suite against running application | Not executed | Supervisor reported a preview URL but the server was not reachable; reproducible script included |
| Lighthouse, real Core Web Vitals | Not measured | No scores are claimed |
| Independent Windows and Cloudflare account | Not executed | Portable setup and standalone deployment steps provided, not claimed as host-tested |
| Sites deployment and public access | Verified | Native publication succeeded; public visitor access was enabled on 22 October 2026. This does not verify browser interactions |

## Test coverage

1. Valid fields and normalized whitespace/email.
2. Required name, email, and message.
3. Invalid email, phone, and service rejection.
4. Minimum/maximum input bounds.
5. Optional phone and Unicode message support.
6. Malformed payloads and invalid request keys.
7. Complete persisted field values, including the full message.
8. Retry returns the same reference without another record.
9. Five-inquiry rate limit and retry behavior at the limit.
10. Rate-limit isolation and rolling-window expiry.
11. Cross-origin write rejection before storage.
12. Honeypot, malformed JSON, and unsupported content type rejection.
13. Streaming size limit with and without Content-Length.
14. No record written on validation errors.
15. Retryable database error without false success.
16. Duplicate conflict behavior in the atomic repository operation.

## Three structured review passes

**1 — Architecture and code quality.** Reviewed page templates, server/client boundaries, shared validation, schema, and portable scripts. Removed unused starter UI dependencies/components. Replaced an unavailable icon export. Fixed TypeScript response types. No external source implementation was copied.

**2 — Functionality and integration.** Executed the handler against a real SQLite database using the committed migration and production repository statements. Verified complete message persistence, idempotency, validation, rate limits, and unavailable-storage behavior. Applied the migration to local D1. Added an HTTP workflow script for running-server checks. Browser-level navigation, dialogs, maps, and successful form submission remain unverified in this environment.

**3 — Performance, security, and delivery.** Reviewed parameterized SQL, indexed rate queries, atomic writes, origin/size checks, non-sensitive logs, error states, image dimensions and priorities, reduced motion, keyboard focus, and deployment inputs. Fixed CSS import order and supplied local fonts. Changed text on peach surfaces to ink for approximately 6.26:1 text contrast. Converted 1,238,577 bytes of original raster assets to 655,602 bytes of WebP (47.1% smaller). The hero image is 24,570 bytes. This is an asset-size improvement, not a measured end-user loading speed or Lighthouse score.

## Remaining verification

Use `pnpm setup:local`, `pnpm dev`, and `pnpm test:http http://localhost:5173` on a reachable local server. Inspect all seven pages at 375, 768, and 1440 pixels; test mobile navigation, keyboard/Tab order, Escape and focus restoration for dialogs, contact validation/failure/success, and click-to-load maps. Check Chrome, Firefox, and Safari. Run a production Lighthouse audit and check deployed `/api/health` plus an actual D1 insert before collecting real leads. OpenStreetMap requires internet access and was not verified here. No email delivery exists or is claimed.
