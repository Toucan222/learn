```markdown
# TutorBase

Modern tutoring management platform.

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env.local` and configure:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   NEXT_PUBLIC_DEMO_MODE=true
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```
4. Run development server:
   ```bash
   npm run dev
   ```

## Demo Credentials

Admin:
- Email: admin@tutorbase.demo
- Password: demo123

Teacher:
- Email: sarah.j@tutorbase.demo
- Password: demo123

Family:
- Email: john.smith@example.com
- Password: demo123

## Features

- Advanced Scheduling
- Room Management
- Billing & Invoicing
- Teacher Payroll
- Data Migration
- Multi-Brand Support

## Deployment

1. Configure Netlify:
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Environment variables from `.env.example`

2. Deploy:
   ```bash
   git push
   ```
```
