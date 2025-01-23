# Auto-Improving Landing Page System

A Next.js application that implements an auto-evolving landing page system with A/B testing capabilities and AI-driven improvements.

## Features

- 🤖 **Auto-Evolution**: Landing page components that automatically improve based on user interactions
- 🧪 **A/B Testing**: Built-in system for testing different variants of components
- 📊 **Analytics Integration**: Comprehensive tracking with PostHog
- 🎨 **Interactive Components**: 
  - Animated penguin-themed hero section
  - Celebratory thank you page with confetti effects
  - Snow particle animations
- 🔄 **Component Evolution System**:
  - Performance tracking
  - Automatic variant generation
  - Multi-armed bandit optimization

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Database**: PostgreSQL with Drizzle ORM
- **Testing**: Vitest + Playwright
- **Analytics**: PostHog
- **Caching**: Redis
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Type Safety**: TypeScript

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/Farx1/autocorrectP.git
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up your environment variables:
   ```bash
   cp .env.example .env
   ```

4. Set up the database:
   ```bash
   pnpm db:push
   ```

5. Run the development server:
   ```bash
   pnpm dev
   ```

## Testing

- Run unit tests:
  ```bash
  pnpm test
  ```

- Run end-to-end tests:
  ```bash
  pnpm test:e2e
  ```

## Project Structure

- `/app` - Next.js app router pages
- `/components` - React components
  - `/evolving` - Auto-improving components
- `/db` - Database schema and configurations
- `/lib` - Utility functions and services
- `/types` - TypeScript type definitions
- `/tests` - Test files
- `/docs` - Project documentation

## Documentation

- [Landing Page System Overview](docs/LANDING_PAGE_SYSTEM.md)
- [Detailed Process](docs/DETAILED_PROCESS.md)

## Contributing

Feel free to submit issues and enhancement requests!
