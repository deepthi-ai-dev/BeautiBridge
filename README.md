## BeautiBridge

Next.js 15 App Router project for BeautiBridge.

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Copy env file:

```bash
copy .env.example .env
```

3. Initialize the database and Prisma client:

```bash
npm run db:init
```

4. Start the app:

```bash
npm run dev
```

## Required environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | Yes | PostgreSQL database connection string |
| `NEXT_PUBLIC_APP_URL` | Yes | Public app URL used for callbacks |
| `AUTH_SECRET` | Yes | Auth.js secret for signing/encrypting auth tokens |
| `AUTH_GOOGLE_ID` | Optional | Google OAuth client ID |
| `AUTH_GOOGLE_SECRET` | Optional | Google OAuth client secret |

If Google OAuth variables are not set, email/password authentication still works and Google sign-in is disabled in UI with a friendly message.

## Verification commands

```bash
npm run lint
npm run typecheck
npm run build
```
