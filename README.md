# Impulse Next.js Boilerplate

A production-ready Next.js boilerplate with authentication, database integration, and modern tooling.

## Features

-   🔐 Authentication with Better Auth
-   📨 Email service with Resend
-   🗄️ PostgreSQL with Drizzle ORM
-   📝 Redis for caching
-   🎨 Tailwind CSS with AlignUI tokens
-   🌙 Dark mode support
-   🔍 SEO optimized
-   📱 Responsive design
-   🚀 Performance optimized
-   ⚡ Edge-ready
-   🔥 Trigger.dev for no timeout jobs
-   📊 PostHog for analytics
-   🛡️ Arcjet for rate limiting and bot protection
-   🎲 Flags for A/B testing

## Prerequisites

-   Node.js 18+
-   pnpm
-   Docker (for local development)

## Local Development Setup

1. Clone the repository:

```bash
git clone https://github.com/your-username/impulse-boilerplate.git
cd impulse-boilerplate
```

2. Install dependencies:

```bash
pnpm install
```

3. Copy the environment variables:

```bash
cp .env.example .env
```

4. Start the local services with Docker:

```bash
docker-compose up -d
```

5. Run database migrations:

```bash
pnpm migrate
```

6. Start the development server:

```bash
pnpm dev
```

## Environment Variables

Before deploying, you'll need to set up the following environment variables:

| Variable                   | Description                  |
| -------------------------- | ---------------------------- |
| `BETTER_AUTH_SECRET`       | Secret key for Better Auth   |
| `BETTER_AUTH_URL`          | Better Auth deployment URL   |
| `RESEND_API_KEY`           | API key from Resend          |
| `RESEND_FROM_EMAIL`        | Sender email address         |
| `DATABASE_URL`             | PostgreSQL connection string |
| `UPSTASH_REDIS_REST_URL`   | Upstash Redis REST URL       |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis REST token     |
| `ARCJET_API_KEY`           | Arcjet API key               |
| `NEXT_PUBLIC_POSTHOG_KEY`  | PostHog API key              |
| `NEXT_PUBLIC_POSTHOG_HOST` | PostHog host URL             |
| `TRIGGER_SECRET_KEY`       | Trigger API key              |
| `FLAGS_SECRET`             | Flags secret key             |

## Deployment

### Deploying to Vercel

1. Create accounts and get credentials for:

    - [Vercel](https://vercel.com) (Deployment)
    - [Neon](https://neon.tech) (PostgreSQL)
    - [Upstash](https://upstash.com) (Redis)
    - [Resend](https://resend.com) (Email)
    - [Trigger.dev](https://trigger.dev) (Background jobs)
    - [Arcjet](https://arcjet.com) (Rate limiting and bot protection)
    - [PostHog](https://posthog.com) (Analytics)

2. Push your code to GitHub

3. Import your repository in Vercel:

    - Go to [Vercel Dashboard](https://vercel.com/new)
    - Select your repository
    - Choose "Next.js" as framework preset

4. Configure environment variables in Vercel:

    - Add all variables from your `.env` file
    - Update `DATABASE_URL` with your Neon connection string
    - Update Redis credentials from Upstash
    - Add your Resend API key

5. Deploy:
    - Vercel will automatically build and deploy your application
    - The build command includes database migrations (`pnpm migrate`)

### Deploying to Railway

1. Create a Railway account and install the CLI:

```bash
npm i -g @railway/cli
```

2. Initialize Railway:

```bash
railway login
railway init
```

3. Create necessary services:

    - Add a PostgreSQL database
    - Add a Redis instance
    - Link your GitHub repository

4. Configure environment variables:

    - Go to your project settings
    - Add all variables from `.env`
    - Railway will automatically inject database credentials

5. Deploy your application:

```bash
railway up
```

## Database Migrations

-   Generate migrations:

```bash
pnpm generate
```

-   Apply migrations:

```bash
pnpm migrate
```

-   View database schema:

```bash
pnpm studio
```

## Additional Configuration

### Email Templates

Email templates are located in the `emails/` directory. Customize them according to your needs.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is proprietary software. All rights reserved.

### Permitted Use

-   Personal, non-commercial use
-   Educational purposes
-   Code review and learning

### Prohibited Use

-   Commercial use without explicit permission
-   Distribution or modification of the source code
-   Use in commercial products or services
-   Sublicensing or reselling

For commercial licensing inquiries, please contact: support@impulse.com
