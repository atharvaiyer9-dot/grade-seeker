# GradeTrack

GradeTrack is an original, responsive student grade dashboard built with Next.js. It currently uses realistic demo data and never requests or stores student-information-system credentials.

## Run locally

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality checks

```bash
pnpm test
pnpm lint
pnpm build
```

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel, select **Add New → Project** and import the repository.
3. Vercel detects the included Next.js app. Leave the build command as `pnpm build` and click **Deploy**.

No environment variables are required for the demo. When a real authorized data source is added, keep its credentials in Vercel's encrypted Environment Variables settings rather than committing them to the repository.

## Stack

- Next.js + React + TypeScript
- Tailwind CSS
- Recharts and Lucide icons
- Vitest and ESLint
