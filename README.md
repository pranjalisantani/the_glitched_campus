<div align="center">

# THE GLITCHED CAMPUS
### Incident Response Matrix // 2026

An orchestrated, five-stage cybersecurity tournament platform bridging incident triage, cryptographic analysis, forensic exploratory data analysis, and defensive systems engineering.

[![Next.js](https://img.shields.io/badge/Next.js-16.4.2-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3.0-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-20.18.0-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.21.2-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)

<p align="center">
  <a href="https://github.com/pranjalisantani/the_glitched_campus">
    <img src="https://img.shields.io/badge/GitHub-Repository-00f5ff?style=flat-square&logo=github&logoColor=black" alt="GitHub Repository" />
  </a>
  <a href="SETUP.md">
    <img src="https://img.shields.io/badge/Documentation-Setup_Guide-a855f7?style=flat-square&logo=bookstack&logoColor=white" alt="Setup Guide" />
  </a>
  <a href="ARCHITECTURE.md">
    <img src="https://img.shields.io/badge/Documentation-Architecture-00ffa3?style=flat-square&logo=diagram-project&logoColor=black" alt="Architecture" />
  </a>
  <a href="REQUIREMENTS.md">
    <img src="https://img.shields.io/badge/Specification-Requirements-ffb703?style=flat-square&logo=checklist&logoColor=black" alt="Requirements" />
  </a>
</p>

</div>

---

<div align="center">
  <img src="frontend/public/images/glitched_campus_hero.jpg" alt="The Glitched Campus Incident Response Matrix Interface" width="100%" style="border-radius: 8px; border: 1px solid rgba(0, 245, 255, 0.2);" />
  <p align="center"><em>The Glitched Campus &mdash; Atmospheric Cyber-Forensics Operations Interface</em></p>
</div>

---

## Executive Overview

Collegiate hackathons and security competitions typically rely on fragmented systems: forms for quizzes, disconnected terminals for capture-the-flag exercises, and loose slide decks for defensive prototypes. This fragmentation obscures live team standing, burdens coordinators, and fails to model how real-world security operation centers (SOCs) triage and remediate multi-phase security incidents.

**THE GLITCHED CAMPUS (TGC)** solves this by unifying technical assessment, cryptographic payload decoding, forensic telemetry analysis, and defensive systems design into a single authoritative platform. Teams advance through five sequential stages while event organizers supervise tournament pacing, monitor telemetry, and enforce competition integrity from a real-time command portal.

---

## The 5-Stage Tournament Journey

The tournament simulates an evolving campus network breach across five tightly coupled phases:

| Stage | Operation Code | Domain | Description & Mechanics |
|:---:|:---|:---|:---|
| **01** | **Bit Blitz** | Security Fundamentals | Supervised technical assessment covering network protocols, forensic principles, and incident triage. Features client-side supervision (blur/tab detection) and server-side scoring. |
| **02** | **Cipher Strike** | Cryptographic Analysis | Interactive cyber terminal challenges decoding Base64, Hexadecimal, and substitution payloads. Enforces maximum 3 attempts per challenge with progressive hint score penalties. |
| **03** | **Data Breach Triage** | Forensic Incident EDA | Teams explore realistic collegiate telemetry datasets (traffic logs, RADIUS authentication audits). Features one-time team dataset selection and authenticated offline dataset retrieval. |
| **04** | **System Blueprint** | Defensive Architecture | Teams select a specific security problem statement and submit an architectural defensive prototype specification establishing the blueprint for Stage 5. |
| **05** | **Security Prototype** | Dynamic Application Defense | Teams engineer and deliver a functional defensive application that directly implements their Stage 4 architecture, preserving strict stage-to-stage continuity. |

---

## Core Capabilities & Platform Differentiators

- **Progressive Tournament Continuity**: Architectural selections and forensic findings in earlier phases directly govern what teams must deliver in Stage 5, eliminating isolated, throwaway challenges.
- **Dual-Perspective Architecture**:
  - **Participant Portal (`/dashboard`, `/stages`)**: Live cyber-forensics stage map, interactive terminal shells, encrypted challenge views, and attempt tracking.
  - **Administrator Operations Console (`/admin`)**: Global tournament freeze switch, dynamic stage availability controls (`LOCKED`, `OPEN`, `CLOSED`), score overrides, team roster management, and tamper-evident audit logs.
- **Authoritative Server Evaluation**: Challenge keys, attempt limits, hint penalties, and stage gating rules are validated server-side. Sensitive challenge answers are never exposed to the client.
- **Dual-Storage Engine Portability**: Features an abstracted storage layer (`IStore`) that dynamically connects to hosted **Supabase PostgreSQL** when cloud credentials are provided, or seamlessly falls back to an atomic local filesystem store (**PersistentFileStore**) for zero-dependency offline environments.
- **Admin Test Mode**: Isolated administrative sandbox enabling organizers to simulate participant submissions, verify challenge grading, and validate tournament transitions without polluting live event records.

---

## System Architecture

```
+---------------------------------------------------------------------------------------+
|                              CLIENT TIER (Next.js 16 / Port 3000)                      |
|   App Router  |  React 19  |  Tailwind CSS v4  |  Lucide Icons  |  AuthContext         |
|                                                                                       |
|   [/]               [/dashboard]         [/stages]         [/stage/1-5]     [/admin]  |
|   Hero & Briefing   Mission Telemetry    Visual Stage Map  Challenges       Operations|
+-------------------------------------------+-------------------------------------------+
                                            |
                                            | HTTP REST / JSON (Bearer JWT Authorization)
                                            v
+---------------------------------------------------------------------------------------+
|                              SERVER TIER (Node.js 20 / Express 4 / Port 5000)          |
|   Middleware Pipeline:  requireAuth  |  requireAdmin  |  requireStageOpen  |  freezeGuard|
|                                                                                       |
|   /api/auth         /api/stages          /api/stage[1-5]   /api/admin       /api/admin/test|
|   JWT Session       Gating & Metas       Submissions/Hints Admin Operations Sandbox Runner |
+-------------------------------------------+-------------------------------------------+
                                            |
                                            | Storage Provider Interface (IStore)
                                            v
+-------------------------------------------+-------------------------------------------+
|   SUPABASE STORE (Production)             |   PERSISTENT FILE STORE (Local / Fallback)|
|   Hosted PostgreSQL Database              |   Atomic JSON Storage                     |
|   - teams, team_members, stages           |   - backend/storage/data/persistentStore.json|
|   - submissions, hints_used, audit_logs   |   - Automatic memory synchronization          |
+---------------------------------------------------------------------------------------+
```

---

## Technology Stack

| Layer | Technology | Version | Purpose |
|:---|:---|:---|:---|
| **Frontend Framework** | [Next.js](https://nextjs.org/) | `16.4.2` | App Router architecture, server-rendered layouts, dynamic routing |
| **UI Library** | [React](https://react.dev/) | `19.3.0` | Reactive component interfaces, interactive terminals, stage maps |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | `5.x` | End-to-end type safety, unified DTO contracts, RBAC clearance models |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | `4.x` | Cyberpunk/forensics theme, scanline animations, responsive layout |
| **Icons** | [Lucide React](https://lucide.dev/) | `^1.16.0` | Clean tactical symbology and interface iconography |
| **Server Runtime** | [Node.js](https://nodejs.org/) | `20.18.0` | Event-driven backend execution environment |
| **API Framework** | [Express](https://expressjs.com/) | `4.21.2` | REST API routing, rate limiting, request validation |
| **Security & Auth** | `jsonwebtoken` / `bcryptjs` | `^9.0.2` / `^3.0.2` | Signed JWT session tokens and salted password hashing |
| **Database** | [Supabase](https://supabase.com/) / [PostgreSQL](https://www.postgresql.org/) | `@supabase/supabase-js ^2.118.0` | Cloud relational persistence with schema migrations |
| **Local Persistence** | Atomic JSON File Storage | Custom Engine | File-backed zero-dependency tournament persistence |
| **Orchestration** | `concurrently` | `^9.2.5` | Simultaneous frontend and backend development execution |

---

## Quickstart & Local Setup

### Prerequisites
- **Node.js**: `v20.x` or `v18.x` (`v20.18.0` recommended; matches `.node-version`)
- **npm**: `v9.x` or higher

### 1. Clone the Repository
```bash
git clone https://github.com/pranjalisantani/the_glitched_campus.git
cd the_glitched_campus
```

### 2. Configure Environment Files
Create local configuration files from the provided templates:
```bash
# Backend configuration
cp backend/.env.example backend/.env

# Frontend configuration
cp frontend/.env.example frontend/.env.local
```

### 3. Install Dependencies
Install dependencies across both workspaces using existing lockfiles:
```bash
npm run install:all
```
*(Or install individually: `npm ci`, `npm ci --prefix backend`, and `npm ci --prefix frontend`)*

### 4. Start Development Servers
Run both backend (port 5000) and frontend (port 3000) concurrently:
```bash
npm run dev
```

- **Participant Interface**: [http://localhost:3000](http://localhost:3000)
- **Administrator Portal**: [http://localhost:3000/admin](http://localhost:3000/admin)
- **Backend API Gateway**: [http://localhost:5000/api](http://localhost:5000/api)

---

## Environment Configuration

### Backend (`backend/.env`)

| Variable | Default Value | Description |
|:---|:---|:---|
| `PORT` | `5000` | Port for the Express API server |
| `CLIENT_ORIGIN` | `http://localhost:3000` | Allowed origin for CORS client requests |
| `JWT_SECRET` | `replace_with_a_long_random_secret` | Secret key used to sign and verify participant JWTs (min 32 chars) |
| `ADMIN_EMAIL` | `admin@example.local` | Email address for initial administrator account provisioning |
| `ADMIN_PASSWORD` | `[Configured by operator]` | Secure password for initial administrator account |
| `SUPABASE_URL` | `https://your-project.supabase.co` | *(Optional)* Supabase instance URL for hosted PostgreSQL persistence |
| `SUPABASE_SERVICE_ROLE_KEY` | `[Service role secret]` | *(Optional)* Supabase service role key for database operations |
| `DATA_STORE_TYPE` | `[Auto-detected]` | *(Optional)* Force store engine: `supabase`, `file`, or `memory` |

### Frontend (`frontend/.env.local`)

| Variable | Default Value | Description |
|:---|:---|:---|
| `NEXT_PUBLIC_API_URL` | `http://localhost:5000/api` | Base URL used by the frontend to communicate with backend APIs |

---

## Available Workspace Scripts

The root `package.json` provides unified workspace commands:

| Command | Action |
|:---|:---|
| `npm run dev` | Launch both backend and frontend development servers concurrently |
| `npm run dev:frontend` | Start Next.js frontend dev server (`next dev -p 3000`) |
| `npm run dev:backend` | Start Express backend dev server with hot reload (`tsx watch src/index.ts`) |
| `npm run build` | Build both backend (`tsc`) and frontend (`next build`) production bundles |
| `npm run build:frontend` | Compile frontend production bundle *(On Windows/Node 24, run `cd frontend && npx next build --webpack`)* |
| `npm run build:backend` | Compile backend TypeScript to `backend/dist` |
| `npm run start:frontend` | Start production Next.js server on port 3000 |
| `npm run start:backend` | Start production backend server from `backend/dist/index.js` |
| `npm run lint` | Run ESLint and TypeScript checks across frontend and backend |
| `npm run test:backend` | Execute automated backend integration test suites (49 passing tests) |
| `npm run test:supabase` | Test live Supabase connection using configured credentials |
| `npm run seed:datasets` | Seed challenge datasets into local storage |

---

## Verified Deployment Architecture

- **Backend**: Configured for persistent container or VM hosting via [render.yaml](render.yaml) (`the-glitched-campus-backend` Node.js web service).
- **Frontend**: Configured for Next.js App Router deployment (e.g. Vercel).
- **Production Persistence**: Mount a persistent volume at `backend/storage` when using `PersistentFileStore`, or connect `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` to run against hosted PostgreSQL.

---

## Documentation Directory

For in-depth operational procedures, architectural specifications, and challenge design:

- **[SETUP.md](SETUP.md)**: Local installation, Windows Webpack notes, credential recovery script usage, and troubleshooting guide.
- **[ARCHITECTURE.md](ARCHITECTURE.md)**: Detailed component architecture, data flow diagrams, security boundaries, and storage abstraction layers.
- **[REQUIREMENTS.md](REQUIREMENTS.md)**: Full functional specifications, scoring rules, attempt policies, and continuity constraints.

---

<div align="center">
  <sub>THE GLITCHED CAMPUS &bull; Modular Incident Response &amp; Tournament Operations Platform &bull; 2026</sub>
</div>
