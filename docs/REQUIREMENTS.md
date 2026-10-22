# Requirements and scope

Reference: https://www.frontendmentor.io/challenges/designo-multipage-website-G48K6rfUT

The challenge is an HTML/CSS/JavaScript multipage creative agency website: seven pages across five page templates. It allows implementation tools of choice. No framework, database, authentication, or email service is mandated by the reference. React and TypeScript are engineering choices for this implementation; Cloudflare Workers and D1 extend the contact form with actual server-side persistence, as requested in the supplied full-stack brief.

| Page | Route | Functionality |
| --- | --- | --- |
| Home | `/` | Hero, service navigation, studio values, contact call to action |
| Web design | `/web-design` | Six projects, keyboard-accessible project dialog, service links |
| App design | `/app-design` | Five projects and project dialogs |
| Graphic design | `/graphic-design` | Three projects and project dialogs |
| Company | `/about` | Studio story, responsive photography, country links |
| Locations | `/locations` | Three offices, phone/email links, optional interactive maps |
| Contact | `/contact` | Required name/email/message, optional phone, service choice, field errors, durable submission |

Shared requirements: responsive desktop/tablet/mobile layouts, interactive hover states, consistent navigation, keyboard access, reduced motion, and clear validation for empty required fields and invalid email. The implementation uses the original Designo palette, Jost typography, challenge illustrations, project artwork, and responsive photo assets. Small editorial details and copy are original; paid Figma/Sketch files were not supplied, so pixel-level comparison to those files has not been performed.

Additional full-stack work: server validation, D1 schema/migration, atomic rate limits, duplicate protection, error states, a readiness endpoint, automated API/database tests, CI, deployment/source packaging, and local setup documentation. No account, admin dashboard, payment feature, or third-party email delivery is required or included. The contact UI explicitly states that messages are stored and no email is sent. Office contacts are fictional challenge content.
