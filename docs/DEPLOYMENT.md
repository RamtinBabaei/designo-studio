# Deployment

## Supported hosted workflow

Sites builds this Vinext application into a Cloudflare Worker and static client assets. `.openai/hosting.json` declares `d1: "DB"`; hosting provisions the actual database and applies the committed Drizzle migrations before publication. The published portfolio demo is publicly accessible at https://designo-studio.shaficp.chatgpt.site. New Sites start private by default. Source control and site publishing are separate from ordinary GitHub pushes.

For a new deployment outside this exact Site, create a new Site through Sites and let its workflow set the new identity. Do not reuse another Site's project ID or credentials.

## GitHub source and CI

Create an empty GitHub repository, then in the extracted source folder:

```sh
git init
git add .
git commit -m "Build Designo full-stack studio website"
git branch -M main
git remote add origin https://github.com/RamtinBabaei/YOUR-REPOSITORY.git
git push -u origin main
```

Replace `YOUR-REPOSITORY` with the repository you created. Never commit `.env`, `.dev.vars`, credentials, local database files, `node_modules`, `.wrangler`, or `.sites-runtime`. The included CI workflow runs locked installation, type checks, unit/integration tests, asset checks, and a production build. It does not claim to deploy the application.

## Independent Cloudflare Workers deployment

This option requires your own Cloudflare account and D1 resource. Follow these steps deliberately; they are deployment instructions, not actions performed by the delivered local setup.

1. Run `pnpm exec wrangler login` and `pnpm exec wrangler d1 create designo-inquiries`. Retain the actual returned database ID.
2. Build with `pnpm build`. The generated Worker is `dist/server/index.js`; static assets are under `dist/client`.
3. Create a separate **root** `wrangler.production.json` using the template below. Replace the database ID with the real value. This standalone config is for ordinary Cloudflare hosting; preserve the Sites manifest for Sites hosting.
4. Run `pnpm exec wrangler d1 migrations apply DB --remote --config wrangler.production.json` to apply the SQL migrations. Wrangler's bookkeeping is separate from the local migration helper.
5. Run `pnpm exec wrangler deploy --config wrangler.production.json`. Verify `/api/health`, submit a sample inquiry, and check the remote record before using it for real leads.

```json
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "designo-studio",
  "main": "dist/server/index.js",
  "compatibility_date": "2026-05-15",
  "compatibility_flags": ["nodejs_compat"],
  "assets": {"directory": "dist/client", "binding": "ASSETS"},
  "d1_databases": [{
    "binding": "DB",
    "database_name": "designo-inquiries",
    "database_id": "REPLACE_WITH_ACTUAL_D1_DATABASE_ID",
    "migrations_dir": "drizzle"
  }]
}
```

Inspect the generated Worker filename before deploying if you upgrade Vinext or the Cloudflare plugin. Independent Cloudflare deployment and Windows execution were not performed in this environment. The Sites deployment is verified separately in the test report.

## Operating the form

Inquiries are durable database records, not emails. Use an authenticated operator tool such as the Cloudflare D1 console to inspect records. Do not add an unauthenticated GET endpoint exposing personal data. To use the site for real business, replace fictional office details, establish data retention/privacy rules, and add a verified notification provider if email is required. Notification delivery needs separate credentials, domain verification, retries, and end-to-end testing.
