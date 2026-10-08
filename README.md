# Visit Cambodia

Lightweight bilingual Cambodia tourism platform built with Astro 6 + Supabase + Vercel.

## Stack

- Astro 6 / TypeScript
- Supabase PostgreSQL
- Supabase Auth for admin sessions
- Supabase Storage for production media
- Vercel adapter
- Existing Visit Cambodia visual system, with Battambang for Khmer and Arimo/Oswald for English

## Development

Use Node.js 24 (see .nvmrc).

1. Copy .env.example to .env.
2. Set the Supabase publishable key for project votiwwvilkrabcrcrkzy.
3. Run npm install once after the stack migration to generate the new lockfile.
4. Run npm run dev.

The public site is rendered primarily as Astro HTML. Interactive behavior is limited to small client-side scripts/islands.

## Production

- npm run check
- npm run build
- npm run preview

The app deploys with the Vercel Astro adapter. Public pages can be prerendered; authenticated admin routes remain request-time and are not globally cached.

## Routes

Public routes use /en/... and /km/....

Admin uses /admin with Supabase Auth and role-based access through PostgreSQL RLS.

## Supabase

Project: cambo-turism
Ref: votiwwvilkrabcrcrkzy
URL: https://votiwwvilkrabcrcrkzy.supabase.co

Core public tables:

- provinces
- places
- province_guides
- place_guides

Admin tables:

- admin_users
- admin_audit_log

RLS is enabled on all exposed application tables.

## Migration status

The legacy Next.js + MySQL runtime has been removed from the migration branch. The current branch is the replacement architecture and is intended to preserve the existing visual DNA while reducing runtime complexity and client JavaScript.

The previous MySQL schema and runtime are not part of the active application. Supabase migrations under supabase/migrations are the source of truth for the production database schema.

Before production cutover, create the first admin user in Supabase Auth and link it in admin_users, then verify Vercel environment variables and media storage.
