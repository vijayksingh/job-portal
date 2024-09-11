## TODO

- [x] Setup Github Project
- [ ] Update Read Final (Interview Ready)
- [x] Setup Husky
- [x] Setup Eslint
- [x] Setup Prettier
- [x] Setup Commitlint
- [ ] Setup Commitizen
- [ ] Setup Standard Version
- [ ] Setup Tailwindcss
- [ ] Setup Zod
- [ ] Setup React Hook Form
- [ ] Setup React Toastify

Excellent choice! Incorporating shadcn/ui components will help streamline our UI development process and ensure a consistent, modern look for our application. Let's update our plan to include shadcn/ui:

1. Frontend Architecture:
   - Next.js with TypeScript (already set up)
   - Next.js App Router for navigation
   - Tailwind CSS for styling
   - shadcn/ui for component library
   - React Hook Form for form management
   - Zod for schema validation
   - React Toastify for notifications

Revised Scope of Work:

1. Setup and Configuration:

   - [ ] Setup Tailwindcss
   - [ ] Setup shadcn/ui
   - [ ] Setup Zod
   - [ ] Setup React Hook Form
   - [ ] Setup React Toastify

2. Authentication:

   - Implement login page with user type selection (Freelancer/Employer)
   - Create mock authentication API route
   - Set up context for user authentication state
   - Use shadcn/ui components for form inputs and buttons

3. Freelancer Section:

   - User Profile:
     - Create profile page with skill selection (use shadcn/ui Select component)
     - Implement GitHub integration
     - Add form validations using Zod and React Hook Form
   - Job Listing Page:
     - Develop page with mocked data (10K+ job postings)
     - Implement filtering by skill set and min. salary per hour (use shadcn/ui Slider and Select components)
     - Add quick-apply functionality (use shadcn/ui Button component)

4. Employer Section:

   - Job Posting:
     - Create job posting form with required fields (use shadcn/ui form components)
     - Implement file upload for job description document (max 16KB)
   - Job Management:
     - Create page to view posted jobs (use shadcn/ui Table component)
     - Display number of applications per job
     - Allow viewing applicant profiles

5. Data Management:

   - Create mock data for jobs, users, and applications
   - Set up Next.js API routes for all required endpoints

6. UI/UX (Stretch Goals):
   - Implement responsive design (leveraging shadcn/ui's built-in responsiveness)
   - Add dark mode theming (using shadcn/ui's theming capabilities)

Implementation Strategy:

1. Set up Tailwind CSS, shadcn/ui, Zod, React Hook Form, and React Toastify.

   - For shadcn/ui, follow their Next.js setup guide and install necessary components as we go.

2. Implement the authentication flow with mock API routes, using shadcn/ui components for the login form.

3. Create the basic layout and navigation structure using Next.js App Router and shadcn/ui components (like Layout, Navbar, etc.).

4. Develop the Freelancer section:

   - Implement user profile page with GitHub integration, using shadcn/ui form components.
   - Create job listing page with filtering and quick-apply functionality, incorporating shadcn/ui components for a polished look.

5. Develop the Employer section:

   - Create job posting form using shadcn/ui form components.
   - Implement job management page with shadcn/ui Table component.

6. Set up mock data and API routes for jobs, applications, and user profiles.

7. Implement responsive design and dark mode, leveraging shadcn/ui's built-in capabilities.

8. Conduct testing and bug fixes.

By incorporating shadcn/ui, we'll be able to create a more polished and consistent UI more quickly. The library's components are built on top of Radix UI primitives and styled with Tailwind, which aligns perfectly with our tech stack. This will allow us to focus more on the functionality and user experience of the application while ensuring a high-quality, accessible UI.
