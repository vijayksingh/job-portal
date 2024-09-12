# Job Portal Project

This project is a modern job portal application built with Next.js and React, showcasing a range of frontend development skills and best practices.

## Tech Stack

Next.js: React framework for server-side rendering and routing
React: JavaScript library for building user interfaces
TypeScript: Typed superset of JavaScript for improved developer experience
Tailwind CSS: Utility-first CSS framework for rapid UI development
Shadcn UI: Component library built on top of Tailwind CSS
Radix UI: Unstyled, accessible components for building high-quality design systems
Zod: TypeScript-first schema validation library
React Hook Form: Performant, flexible and extensible forms with easy-to-use validation
Lucide React: Beautiful & consistent icon pack

## Architecture

The project follows a component-based architecture, leveraging Next.js App Router for efficient routing and server-side rendering capabilities.
Key Components:

1. Authentication:
   Custom login page with role selection (Freelancer/Employer)
   Mock authentication system (can be easily replaced with a real backend)

2. Freelancer Section:
   Profile management with skill selection
   Job listing page with filtering capabilities
   Quick apply functionality
3. Employer Section:
   Job posting form with file upload
   Job management dashboard

4. Shared Components:
   Reusable UI components (buttons, cards, inputs, etc.)
   Toast notifications for user feedback

### Data Flow:

- Client-side state management using React hooks
- Form handling and validation with React Hook Form and Zod
- API routes for mock data (easily extendable to real backend)

## Project Structure

```
/app
  /(auth)
    /login
  /freelancer
    /profile
    /jobs
  /employer
    /post-job
    /manage-jobs
/components
  /ui
/hooks
/lib
/types
```

## Features

- Responsive design
- Dark mode support
- Accessibility-first approach using Radix UI primitives
- Type-safe development with TypeScript
- Efficient form handling and validation
- Mock data integration (ready for real API integration)

## Development Practices

- ESLint for code linting
- Prettier for code formatting
- Husky for pre-commit hooks
- Commitizen for standardized commit messages
- Lint-staged for running linters on staged files

## Getting Started

```bash
npm install
npm run dev
```
