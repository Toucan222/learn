```markdown
# Deployment Guide

## Prerequisites
- Netlify account
- Supabase project
- Domain (optional)

## Steps

1. Environment Setup
   - Copy all variables from `.env.example`
   - Add to Netlify environment variables
   - Configure Supabase URL and anon key

2. Build Configuration
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: 16.x

3. Domain Setup (Optional)
   - Add custom domain in Netlify
   - Configure DNS settings
   - Enable HTTPS

4. Post-Deployment
   - Verify demo mode
   - Test all credentials
   - Check mobile responsiveness
   - Verify data migration
```
