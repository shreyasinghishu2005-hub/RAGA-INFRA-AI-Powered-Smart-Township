# Implementation Plan: Raga Infra Smart Township

## Overview

Build the full-stack Next.js 14 application in phases, starting with the public website (fixes the Vercel 404), then authentication and dashboards, then IoT simulation and AI features. Each phase produces deployable, working code. TypeScript throughout.

## Tasks

- [ ] 1. Bootstrap Next.js project and configure tooling
  - Initialize Next.js 14 app with App Router, TypeScript, TailwindCSS, and Shadcn UI in the workspace root
  - Install all dependencies: `next`, `react`, `typescript`, `tailwindcss`, `@clerk/nextjs`, `prisma`, `@prisma/client`, `framer-motion`, `recharts`, `leaflet`, `@types/leaflet`, `react-leaflet`, `zod`, `react-hook-form`, `@hookform/resolvers`, `openai`, `fast-check`, `vitest`, `@vitejs/plugin-react`, `@testing-library/react`
  - Configure `tailwind.config.ts`, `tsconfig.json`, `next.config.ts`
  - Add `vitest.config.ts` with jsdom environment
  - Create `app/globals.css` with Tailwind directives and CSS custom properties for the design system (deep navy, gold, green palette)
  - Create `app/layout.tsx` root layout with `ClerkProvider`
  - _Requirements: 1.5, 2.4_

- [ ] 2. Set up Prisma schema and database
  - Create `prisma/schema.prisma` with all models from the design: `User`, `Enquiry`, `Booking`, `VisitorPass`, `Alert`, `SensorReading`, `MaintenanceTicket`, `Bill`, `GovService`, `AuditLog` and all enums
  - Create `lib/prisma.ts` Prisma client singleton
  - Run `prisma generate`
  - Create seed script `prisma/seed.ts` with sample data for all roles and zones
  - _Requirements: 17.4_

  - [ ]* 2.1 Write property test for reference number uniqueness
    - **Property 4: Reference numbers are unique across all creation events**
    - **Validates: Requirements 2.2, 8.2, 11.2**
    - `// Feature: raga-infra-smart-township, Property 4: Reference numbers are globally unique`

- [ ] 3. Clerk authentication and middleware
  - Create `middleware.ts` using Clerk `authMiddleware` that protects all `/dashboard/*` and `/api/*` routes except public API endpoints
  - Create `app/(auth)/sign-in/[[...sign-in]]/page.tsx` and `sign-up` equivalent using Clerk components
  - Create `lib/auth.ts` with `requireRole(auth, roles[])` helper that throws 403 if the user's `publicMetadata.role` is not in the allowed list
  - Create `app/api/webhooks/clerk/route.ts` to sync Clerk user creation/update events to the `User` table in PostgreSQL
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6_

  - [ ]* 3.1 Write property test for authentication rejection
    - **Property 1: Unauthenticated requests are rejected**
    - **Validates: Requirements 1.2, 1.3**
    - `// Feature: raga-infra-smart-township, Property 1: Unauthenticated requests return 401`

  - [ ]* 3.2 Write property test for role-based access enforcement
    - **Property 2: Role-based access enforcement**
    - **Validates: Requirements 1.4, 1.7**
    - `// Feature: raga-infra-smart-township, Property 2: Wrong-role requests return 403`

- [ ] 4. Checkpoint — Project boots and auth works
  - Ensure `npm run dev` starts without errors, Clerk sign-in page renders at `/sign-in`, and the middleware redirects unauthenticated requests to sign-in
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 5. Public website layout and navigation
  - Create `app/(public)/layout.tsx` with a responsive `Navbar` component (logo, nav links, mobile hamburger menu) and `Footer`
  - Create `components/public/Navbar.tsx` using Shadcn `Sheet` for mobile drawer; links: Home, About, Master Plan, Map, Gallery, Amenities, Pricing, IT Park, Schools, Hospitals, Contact
  - Apply Framer Motion `AnimatePresence` page transitions in the public layout
  - Ensure responsive display from 320px to 2560px
  - _Requirements: 2.1, 2.6_

- [ ] 6. Public Home page (`app/(public)/page.tsx`)
  - Build `HeroSection` with animated tagline ("AI Powered Smart Township"), background video/image overlay, and two CTA buttons: "Explore Township" and "Book a Visit"
  - Build `ZoneHighlights` section showing 6 zone cards (Residential, Commercial, IT Park, Schools, Hospitals, Eco/Solar) with icons and brief descriptions using Framer Motion stagger animation
  - Build `StatsBar` component displaying key numbers: 300 Acres, 11 Zones, 5000+ Units, 30-Acre Solar Farm
  - Build `AmenitiesPreview` strip with icons for key amenities
  - _Requirements: 2.1_

- [ ] 7. Public informational pages
  - `app/(public)/about/page.tsx` — Township story, vision, location near Mahindra SEZ, timeline
  - `app/(public)/master-plan/page.tsx` — Static master plan image with zone legends and annotations
  - `app/(public)/gallery/page.tsx` — Image grid with lightbox (use `yet-another-react-lightbox`)
  - `app/(public)/amenities/page.tsx` — Amenities grid with category filters
  - `app/(public)/it-park/page.tsx` — IT Park features, office specs, connectivity
  - `app/(public)/schools/page.tsx` — School 1 and School 2 information cards
  - `app/(public)/hospitals/page.tsx` — Three hospital cards with department lists
  - `app/(public)/pricing/page.tsx` — Pricing tiers for residential and commercial units
  - `app/(public)/contact/page.tsx` — Contact form wired to `/api/enquiries`
  - _Requirements: 2.1_

- [ ] 8. Enquiry and booking API + forms
  - Create `lib/validators/enquiry.ts` Zod schema: `name`, `email`, `phone`, `message`, `type` (all required)
  - Create `lib/validators/booking.ts` Zod schema for residential and commercial bookings
  - Create `app/api/enquiries/route.ts` POST handler: validate with Zod, persist `Enquiry`, return `{ referenceNo }`
  - Create `app/api/bookings/residential/route.ts` and `app/api/bookings/commercial/route.ts`
  - Create `components/public/BookingForm.tsx` using `react-hook-form` + Zod resolver; show field-level errors inline; show success toast with reference number on submit
  - Wire `app/(public)/booking/residential/page.tsx` and `commercial/page.tsx` to `BookingForm`
  - _Requirements: 2.2, 2.7_

  - [ ]* 8.1 Write property test for validation rejecting incomplete forms
    - **Property 3: Validation rejects incomplete form submissions**
    - **Validates: Requirements 2.7, 17.7**
    - `// Feature: raga-infra-smart-township, Property 3: POST with missing fields returns 400`

- [ ] 9. Live Township Map page
  - Create `components/public/TownshipMap.tsx` as a dynamic import (`next/dynamic`, `ssr: false`) using `react-leaflet`
  - Add zone polygon overlays using GeoJSON with color-coded fills: Residential (blue), Commercial (orange), IT Park (purple), Schools (green), Hospitals (red), Solar Farm (yellow), Water Plant (cyan)
  - Add custom markers with popups for key landmarks
  - Use OpenStreetMap tiles (no token required): `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`
  - Center map on township coordinates (use a representative location near Mahindra SEZ, Chennai)
  - Wire to `app/(public)/map/page.tsx`
  - _Requirements: 2.3_

- [ ] 10. AI Chatbot widget and API
  - Create `lib/openai.ts` with OpenAI client and a `chatWithTownship(messages)` function using GPT-4o with a system prompt describing the township
  - Create `app/api/ai/chat/route.ts` POST handler: accept `{ messages: ChatMessage[] }`, call OpenAI, return `{ message: string }`
  - Create `components/public/ChatWidget.tsx` — floating chat bubble button that opens a slide-up chat panel; sends messages to `/api/ai/chat`; renders assistant responses with streaming if possible
  - Wire to `app/(public)/chatbot/page.tsx` as a full-page chat view
  - Also embed `ChatWidget` as floating widget in the public layout
  - _Requirements: 2.5_

  - [ ]* 10.1 Write property test for AI chatbot responses
    - **Property 11: AI chatbot returns non-empty responses**
    - **Validates: Requirements 2.5**
    - `// Feature: raga-infra-smart-township, Property 11: Non-empty query returns non-empty message`

- [ ] 11. Checkpoint — Public website complete and deployable
  - All public pages render, booking forms work, map displays, chatbot responds
  - Ensure all tests pass. This resolves the Vercel 404 issue.

- [ ] 12. Dashboard shell and role-based routing
  - Create `app/dashboard/layout.tsx` with a collapsible sidebar (`DashboardShell`) that shows nav items based on the user's Clerk `publicMetadata.role`
  - Create `components/dashboard/DashboardShell.tsx` with sidebar navigation, top header with user avatar, notification bell, and logout button
  - Add `app/dashboard/page.tsx` that reads the user's role and redirects to the appropriate dashboard route
  - Create all 12 dashboard page files as stubs: `super-admin`, `township`, `security`, `hospital`, `school`, `resident`, `company`, `government`, `solar`, `water`, `ai-command`, `analytics`
  - _Requirements: 15.1, 1.4_

- [ ] 13. IoT simulation SSE stream
  - Create `lib/mock-iot.ts` with a `generateSensorSnapshot()` function that returns a realistic snapshot of all sensor types: power_kw, water_flow, temperature, smoke, motion, gas, flood, solar_kw, battery_pct, aqi, heart_rate, door_status for ~20 named zones/devices
  - Create `app/api/iot/stream/route.ts` as an SSE endpoint using `ReadableStream`; emits a new sensor snapshot every 3 seconds; each event is `data: <JSON>\n\n`
  - Create `components/dashboard/IoTStreamConsumer.tsx` — a React hook `useIoTStream()` that subscribes to the SSE endpoint via `EventSource`, parses events, and returns the latest sensor state map
  - _Requirements: 3.1, 3.5, 5.3_

- [ ] 14. Alerts API
  - Create `app/api/alerts/route.ts`:
    - GET: return paginated alerts filtered by status/severity/type (requires Township_Manager+ role)
    - POST: create a new alert (internal use by sensor processing)
    - PATCH `app/api/alerts/[id]/route.ts`: acknowledge an alert; write `AuditLog` entry
  - Create `lib/alerts.ts` with `createAlert(data)` helper used by threshold-checking logic
  - Create `components/dashboard/AlertFeed.tsx` — live scrolling feed of recent alerts with severity color-coding, timestamp, and acknowledge button
  - _Requirements: 3.2, 3.6, 3.7_

  - [ ]* 14.1 Write property test for sensor threshold alert creation
    - **Property 5: Sensor threshold crossing creates an alert**
    - **Validates: Requirements 3.2, 5.2**
    - `// Feature: raga-infra-smart-township, Property 5: Out-of-threshold reading creates Alert record`

- [ ] 15. AI Command Center dashboard (`dashboard/ai-command/page.tsx`)
  - Build the page with four sections:
    1. **KPI Cards row** — Recharts `RadialBarChart` or `AreaChart` cards for Energy (kW), Water (L/hr), Security Score, Health Index, Green Index; data from `useIoTStream()`
    2. **Digital Twin map** — Leaflet map showing township zones with color overlays that change based on live sensor status (green=ok, amber=warning, red=alert)
    3. **Alert Feed** — `AlertFeed` component showing last 20 alerts
    4. **Sensor Status Grid** — `SensorStatusGrid` showing all devices with online/offline/triggered status
  - Add "Generate AI Report" button that calls `/api/ai/report` and displays the result in a modal
  - _Requirements: 3.1, 3.3, 3.4, 3.5, 3.8_

- [ ] 16. AI Report API
  - Create `app/api/ai/report/route.ts` POST: accept `{ dateRange }`, query last 24hr `Alert` and `SensorReading` records, build a structured prompt, call GPT-4o, return `{ report: string }`
  - Requires `TOWNSHIP_MANAGER` or higher role
  - _Requirements: 3.8, 15.5_

- [ ] 17. Security dashboard (`dashboard/security/page.tsx`)
  - Build sections:
    1. **Entry Log table** — list of recent `VisitorPass` uses and sensor-triggered entries with timestamp and gate ID
    2. **Camera feeds placeholder grid** — 6 placeholder camera feed cards (static placeholder images labeled by zone)
    3. **Alert panel** — security-type alerts from `AlertFeed`
    4. **SOS button** — large red button that calls POST `/api/alerts` with `type=SECURITY, severity=CRITICAL`
  - Create `app/api/visitors/route.ts`:
    - POST: create `VisitorPass` with unique `qrCode` (use `crypto.randomUUID()`), send confirmation (log to console for now)
    - GET: list passes for the authenticated resident's `hostId`
  - _Requirements: 4.2, 4.5, 4.7, 4.9_

  - [ ]* 17.1 Write property test for visitor pass QR uniqueness
    - **Property 6: Visitor pass QR codes are unique**
    - **Validates: Requirements 4.2**
    - `// Feature: raga-infra-smart-township, Property 6: All generated QR codes are unique`

- [ ] 18. Resident dashboard (`dashboard/resident/page.tsx`)
  - Build sections:
    1. **Utility consumption cards** — electricity kWh and water L from mock IoT data
    2. **Outstanding bill** — fetch from `GET /api/billing` and display amount + Pay button
    3. **Active visitor passes** — list with QR code display using `qrcode.react`
    4. **Maintenance tickets** — list of open tickets with status badges
    5. **Raise Complaint form** — modal form that POSTs to `/api/maintenance`
    6. **Authorize Visitor Pass form** — modal form that POSTs to `/api/visitors`
  - Create `app/api/maintenance/route.ts` POST: validate, create `MaintenanceTicket`, return `{ referenceNo }`
  - Create `app/api/billing/route.ts` GET: return current month's bill for the authenticated resident
  - _Requirements: 8.1, 8.2, 8.3, 8.4_

- [ ] 19. Solar and Water dashboards
  - `dashboard/solar/page.tsx`: Recharts `AreaChart` for solar production (kW) over time, `GaugeChart`/`RadialBar` for battery %, cards for daily yield (kWh), grid export (kW), carbon savings (kg CO₂). Data from `useIoTStream()` solar fields.
  - `dashboard/water/page.tsx`: Cards for purification throughput (L/hr), distribution pressure (bar), tank levels (%). Leak event list from Alert feed filtered to `type=WATER`. Recharts `LineChart` for 24hr water flow trend.
  - _Requirements: 6.1, 6.4, 6.6_

- [ ] 20. Hospital dashboard (`dashboard/hospital/page.tsx`)
  - Build sections:
    1. **Bed availability table** — three hospitals with department-wise capacity bars using Recharts `BarChart`
    2. **Emergency Monitoring panel** — active cases list with triage level and elapsed time
    3. **Ambulance GPS panel** — Leaflet map with ambulance markers (mock positions)
    4. **AI Diagnosis Assistant** — symptom input form that POSTs to `/api/ai/diagnosis`
  - Create `app/api/ai/diagnosis/route.ts` POST: accept `{ symptoms: string[] }`, call GPT-4o, return ranked differential diagnosis list
  - Create `app/api/hospital/route.ts` GET/POST for bed availability and case management
  - _Requirements: 9.1, 9.3, 9.5_

- [ ] 21. School dashboard (`dashboard/school/page.tsx`)
  - Build sections:
    1. **Attendance summary** — daily rate cards for School 1 and School 2
    2. **Transport map** — Leaflet map with school bus markers (mock GPS positions)
    3. **Recent absence notifications log** — table of absent students and notification status
  - Create `app/api/school/route.ts` GET/POST for attendance records
  - _Requirements: 10.1, 10.2_

- [ ] 22. Government portal dashboard (`dashboard/government/page.tsx`)
  - Build sections:
    1. **Service application form** — dropdown for service type (Birth Certificate, Property Tax, NOC, Complaint), form fields, submit button
    2. **My Applications table** — status badge (RECEIVED, IN_PROGRESS, RESOLVED), ticket ID, last updated
    3. **Announcements panel** — list of published announcements
  - Create `app/api/government/route.ts` POST: create `GovService`, return `{ ticketId }`; PATCH: update status and write `AuditLog`
  - _Requirements: 11.1, 11.2, 11.3, 11.4_

- [ ] 23. Analytics dashboard (`dashboard/analytics/page.tsx`)
  - Build a multi-tab analytics view:
    1. **Energy tab** — Recharts `ComposedChart` showing 7-day energy consumption + solar production + demand forecast
    2. **Water tab** — 7-day water consumption trend + leak events count
    3. **Security tab** — bar chart of alert counts by type and zone
    4. **Health tab** — elder care alert trend
    5. **AI Insights tab** — text summary from `/api/ai/report` output
  - _Requirements: 15.4, 13.3, 13.6_

- [ ] 24. Super Admin and Township Manager dashboards
  - `dashboard/super-admin/page.tsx`: Platform-wide stats (total users by role, total alerts today, system health indicators), links to all other dashboards, audit log table (paginated `AuditLog` records)
  - `dashboard/township/page.tsx`: Township-wide KPI overview (energy, water, security, eco indices), alert feed, quick-action buttons (generate report, send announcement)
  - Add "Export Report" button on both dashboards that calls a PDF/CSV export endpoint (return a simple CSV of alerts for MVP)
  - _Requirements: 15.1, 15.3, 15.6_

- [ ] 25. Elder care health alert logic
  - Create `app/api/sensors/route.ts` POST endpoint for ingesting wearable health readings
  - In the route handler, after persisting the `SensorReading`, check if `heart_rate < 45 || heart_rate > 130` and call `createAlert()` with `type=HEALTH, severity=CRITICAL`
  - Similarly trigger HEALTH alert on fall event (`type=FALL`)
  - Create `components/dashboard/ElderCarePanel.tsx` showing last 7-day heart rate trend using Recharts `LineChart`
  - Embed `ElderCarePanel` in the Resident dashboard
  - _Requirements: 7.1, 7.2, 7.4, 7.5_

  - [ ]* 25.1 Write property test for health out-of-bounds alert creation
    - **Property 7: Health out-of-bounds readings create health alerts**
    - **Validates: Requirements 7.2, 7.4**
    - `// Feature: raga-infra-smart-township, Property 7: Heart rate out-of-bounds creates CRITICAL HEALTH Alert`

- [ ] 26. Audit logging middleware
  - Create `lib/audit.ts` with `writeAuditLog(userId, action, recordType, recordId, details?)` that inserts to `AuditLog`
  - Wrap all privileged mutations in alert create/update, government service update, user management, and billing payment routes with `writeAuditLog`
  - _Requirements: 1.6, 17.3, 15.6_

  - [ ]* 26.1 Write property test for audit log on privileged mutations
    - **Property 9: Privileged mutations produce audit log entries**
    - **Validates: Requirements 17.3, 15.6**
    - `// Feature: raga-infra-smart-township, Property 9: Every privileged mutation creates an AuditLog entry`

- [ ] 27. High-consumption alert logic
  - In `app/api/billing/route.ts`, after fetching the current month's consumption, query the 3 prior months' average
  - If current value exceeds 1.2× the average, call `createAlert()` with a consumption warning
  - _Requirements: 8.7_

  - [ ]* 27.1 Write property test for high-consumption alert threshold
    - **Property 8: High-consumption alert threshold is respected**
    - **Validates: Requirements 8.7**
    - `// Feature: raga-infra-smart-township, Property 8: Consumption > 1.2x average triggers alert`

- [ ] 28. Eco dashboard and green index
  - Add an `Eco` tab or `dashboard/ai-command/page.tsx` section showing:
    - Green Index score (0–100) — computed from AQI, noise level, recycling rate mock values
    - AQI card, noise level (dB) card, waste recycling rate (%)
    - EV charging station status grid (mock data)
    - Tree plantation counter, green coverage (ha), carbon sequestration (kg CO₂)
  - Pull all values from `useIoTStream()` eco fields
  - _Requirements: 6.7, 16.1, 16.6_

- [ ] 29. Network infrastructure dashboard section
  - Add a "Network" section to the Super Admin dashboard showing:
    - A simplified topology table listing node type, ID, zone, status (online/offline), uptime %, bandwidth (mock values)
    - Alert if any node is offline (driven by mock IoT stream)
  - _Requirements: 14.1, 14.2, 14.4_

- [ ] 30. Company dashboard (`dashboard/company/page.tsx`)
  - Build sections:
    1. **Meeting Room Booking** — calendar/time-slot picker, availability check via GET `/api/bookings?type=MEETING_ROOM&date=X`, book via POST
    2. **Parking slot availability** — grid of IT Park parking slots from mock data
    3. **Footfall analytics** — Recharts `BarChart` of mock commercial zone visitor counts
  - Add conflict detection in `app/api/bookings/route.ts`: if overlapping `MEETING_ROOM` booking exists, return HTTP 409 with availability suggestion
  - _Requirements: 12.1, 12.3, 12.4_

- [ ] 31. Checkpoint — All dashboards functional
  - All 12 dashboard routes render for their respective roles, SSE stream updates KPIs live, alerts are created and displayed
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 32. Data integrity and security hardening
  - Ensure all API routes use Prisma (parameterized queries only — no raw SQL string interpolation)
  - Add `X-Content-Type-Options`, `X-Frame-Options`, and `Content-Security-Policy` headers in `next.config.ts` `headers()` config
  - Add input validation to every remaining API route that accepts a body using the appropriate Zod schema
  - Add rate-limit tracking for failed login attempts using an in-memory `Map<ip, {count, windowStart}>` in middleware; return 429 after 10 failures within 5 minutes
  - _Requirements: 17.1, 17.2, 17.4, 17.5, 17.7_

  - [ ]* 32.1 Write property test for brute-force IP blocking
    - **Property 10: Brute-force IP blocking**
    - **Validates: Requirements 17.5**
    - `// Feature: raga-infra-smart-township, Property 10: >10 failed attempts within 5min triggers 429`

- [ ] 33. Final checkpoint — Full platform review
  - Run `npm run build` and verify zero TypeScript errors and zero build warnings
  - Run all Vitest tests: `npx vitest --run`
  - Verify Vercel deployment succeeds with all public pages returning 200 and `/dashboard` redirecting to sign-in for unauthenticated users
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP (core functionality works without them)
- Start the dev server manually: `npm run dev`
- Deploy: push to main branch — Vercel auto-deploys
- Set required environment variables in Vercel dashboard: `DATABASE_URL`, `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, `CLERK_WEBHOOK_SECRET`, `OPENAI_API_KEY`
- IoT real-time uses SSE (no separate WebSocket server needed for Vercel)
- All charts use Recharts (no third-party chart service, no API keys)
- Maps use Leaflet + OpenStreetMap (no Mapbox token needed)
