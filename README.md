# HealthHands website

Home healthcare website for HealthHands, Kolkata. Built with Next.js 16 (App Router, Cache Components), Tailwind CSS 4, shadcn/ui (Base UI), TanStack Form and Zod.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Command          | What it does                  |
| ---------------- | ----------------------------- |
| `npm run dev`    | Start the development server  |
| `npm run build`  | Production build              |
| `npm run start`  | Serve the production build    |
| `npm run lint`   | Lint and format check (Biome) |

## Where things live

- `src/content/site.ts`: all site content (services, prices, areas, reviews, FAQs, contact details). Items marked `CONFIRM` are drafts the client must verify before launch.
- `src/lib/enquiry-schema.ts`: Zod rules for the booking form, shared by the browser and the server.
- `src/app/actions.ts`: server action that validates and forwards booking requests.
- `src/components/ui/`: shadcn components. Add more with `npx shadcn@latest add <name>`.
- `src/app/globals.css`: colour tokens for light and dark mode.

## Environment variables

| Variable                            | Purpose                                                       |
| ----------------------------------- | ------------------------------------------------------------- |
| `LEAD_WEBHOOK_URL`                  | Where booking requests are sent (lead sheet or CRM webhook)   |
| `NEXT_PUBLIC_GA_ID`                 | Google Analytics 4 measurement ID                             |
| `NEXT_PUBLIC_GOOGLE_ADS_ID`         | Google Ads tag ID                                             |
| `NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL` | Google Ads conversion label for form submissions              |
| `NEXT_PUBLIC_META_PIXEL_ID`         | Meta Pixel ID                                                 |

Tracking scripts only load when their ID is set. Without `LEAD_WEBHOOK_URL`, booking requests are only logged to the server console in development.
