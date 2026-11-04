# THE GLITCHED CAMPUS

> An immersive, five-stage collegiate cybersecurity and digital forensics tournament platform orchestrating real-time incident triage from assessment to dynamic application defense.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green?style=flat&logo=node.js)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Tests](https://img.shields.io/badge/Tests-49%20Passing-brightgreen?style=flat)](https://github.com/pranjalisantani/the_glitched_campus2)

[Quick Start](#quick-start) · [Competition Flow](#competition-flow) · [Architecture](ARCHITECTURE.md) · [Setup Guide](SETUP.md) · [System Requirements](REQUIREMENTS.md)

---

## Overview

**THE GLITCHED CAMPUS** simulates a compromised collegiate infrastructure where participating teams take on the role of forensic incident responders investigating security anomalies across campus systems.

Designed for hackathons, CTFs, and cybersecurity tournaments, the platform combines server-authoritative knowledge checks, cryptographic decoding, exploratory data analysis, defensive UI prototyping, and full-stack dynamic engineering. Built with a decoupled Next.js 16 frontend and Express 4 backend, it equips tournament organizers with real-time telemetry, granular RBAC, and emergency freeze controls.

---

## Interface Preview

> **Note on Interface Assets**: Production UI captures can be placed in `frontend/public/screenshots/`. The application features an interactive cyber-forensics dark mode interface with real-time status matrix polling, cyber terminal decoders, and a dedicated administrative operations center.

---

## Competition Flow

The tournament progresses sequentially through five server-guarded stages:

| Stage | Name | Core Mechanics & Scoring |
| :---: | :--- | :--- |
| **01** | **Security Assessment Quiz** | 10 multiple-choice questions on security fundamentals. Evaluated server-side (10 marks max) with anti-cheat tab-focus and clipboard tracking, atomic duplicate submission shielding, and zero answer leakage. |
| **02** | **Cryptographic Decode & Encode** | Obfuscated strings (Base64, ROT13, Hex) in terminal containers. Strict 3-attempt limit per challenge. Optional hints deduct 2 marks from a 50-mark stage maximum; evaluation returns status without exposing scores. |
| **03** | **Forensic Dataset EDA** | 10 synthetic collegiate incident datasets (CSV). Teams lock into one dataset. Enforces strict participant download isolation (teams can only download their selected dataset) and canonical path traversal shielding. |
| **04** | **Static Defensive Prototype** | Architectural UI/UX problem statements for defensive workflows. One-time selection lock establishes the continuity anchor for the final stage. |
| **05** | **Dynamic Security Application** | Full-stack implementation requirements pulling the assigned problem directly from the backend to guarantee strict continuity with Stage 4. |

---

## Key Capabilities

### Participant Experience
- **Team-Centric Authentication**: One account per team (1 to 5 members) with `bcryptjs` password encryption (10 salt rounds) and signed JWT session tokens.
- **Interactive Stage Map**: Live status matrix reflecting stage availability (`LOCKED`, `OPEN`, `CLOSED`) and active completion states, polling every 8 seconds.
- **Server-Guarded Privacy**: Answer keys and scoring formulas are evaluated exclusively on the server. Clients receive only the minimal state required.
- **Competition Freeze Shield**: Platform-wide visual lock overlay that instantly blocks mutations when an administrator toggles an emergency freeze.

### Administrative Control Center
- **Role-Based Access Control (RBAC)**: Distinguishes Primary Administrators from Event Admins with granular permissions (`manage_teams`, `manage_stage1-4`, `manage_submissions`, `view_audit_logs`).
- **Dynamic Stage Gates**: Real-time administrative toggles to lock, open, or close stages during the tournament.
- **Admin Test Mode**: Isolated sandbox environment enabling organizers to verify locked or open stages without altering live scores or records.
- **Telemetry & Overrides**: Centralized team matrix, score overrides, sanctioned stage re-selections, and immutable timestamped audit logging.

### Platform Security & Integrity
- **Strict Dataset Isolation**: Participants cannot access unselected or cross-team datasets (`403 DATASET_ACCESS_UNAUTHORIZED`).
- **Filesystem Hardening**: Strict filename validation, extension allowlists (`.csv`, `.json`), and canonical realpath containment against directory traversal. Missing files return 404 without placeholder generation.
- **Concurrency Protection**: In-flight atomic locks prevent duplicate submissions during network retry spikes.

---

## Technology Stack

| Layer | Components |
| :--- | :--- |
| **Frontend** | [Next.js](https://nextjs.org/) 16 (App Router), [React](https://react.dev/) 19, [TypeScript](https://www.typescriptlang.org/) 5, [Tailwind CSS](https://tailwindcss.com/) 4, [Lucide React](https://lucide.dev/) |
| **Backend** | [Node.js](https://nodejs.org/) (v18+), [Express](https://expressjs.com/) 4, [TypeScript](https://www.typescriptlang.org/) 5, `tsx`, `bcryptjs`, `jsonwebtoken`, `cors` |
| **Storage Engine** | Modular `IStore` interface: `PersistentFileStore` (atomic JSON persistence under `backend/storage/data`), `SupabaseStore` (PostgreSQL), and `MemoryStore` (ephemeral) |
| **Testing** | Node.js native test runner (`node --test` / `tsx --test`) with 49 automated integration and security tests across 4 test suites |
| **Tooling** | `concurrently` for synchronized local development |

---

## Quick Start

### 6.1 Clone & Install
```bash
# Clone the repository
git clone https://github.com/pranjalisantani/the_glitched_campus2.git
cd the_glitched_campus2

# Install root, backend, and frontend dependencies
npm run install:all
```

### 6.2 Configure Environment
```bash
cp .env.example .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local
```

### 6.3 Seed Datasets & Start Development
```bash
# Populate or verify the 10 synthetic competition datasets (Stage 3)
npm run seed:datasets

# Start both backend (port 5000) and frontend (port 3000) concurrently
npm run dev
```

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:5000/api](http://localhost:5000/api)
- **Health Check**: [http://localhost:5000/api/health](http://localhost:5000/api/health)

*For step-by-step instructions, administrative password recovery, and configuration options, see [SETUP.md](SETUP.md).*

---

## Testing & Build Verification

The repository includes 49 automated tests across 4 suites covering authentication boundaries, stage gating, score calculations, attempt limits, dataset download isolation, and RBAC policies:

```bash
# Run the automated backend test suite
npm run test:backend

# Run frontend & backend linting
npm run lint

# Build backend service for production
npm run build:backend

# Build frontend client for production (on Windows with Node 24, use Webpack flag)
cd frontend && npx next build --webpack
```

---

## Architecture

THE GLITCHED CAMPUS decouples client-side presentation from server-authoritative tournament logic. The Next.js 16 frontend communicates with the Express 4 backend via authenticated REST APIs carrying Bearer JWTs. Storage is abstracted through an `IStore` interface defaulting to atomic local JSON records (`PersistentFileStore`) requiring zero external database configuration, with optional enterprise Supabase PostgreSQL support. Automated test suites execute against isolated storage (`backend/storage/test_data`) to guarantee zero production state pollution.

For complete sequence diagrams, directory trees, and security models, see [ARCHITECTURE.md](ARCHITECTURE.md).

---

## Documentation

| Guide | Scope |
| :--- | :--- |
| **[SETUP.md](SETUP.md)** | Step-by-step local environment setup, environment variable reference, production deployment guidelines, and comprehensive troubleshooting guide. |
| **[ARCHITECTURE.md](ARCHITECTURE.md)** | System topology, repository module organization, data access abstraction (`IStore`), and security access boundaries. |
| **[REQUIREMENTS.md](REQUIREMENTS.md)** | Complete functional requirements, non-functional constraints, scoring formulas, and stage progression rules. |

---

## Deployment Topology

The platform supports containerized or edge hosting:

- **Frontend (Edge / Vercel)**: Next.js App Router deployed with `NEXT_PUBLIC_API_URL` pointing to the backend API origin.
- **Backend (Node.js Service)**: Node.js service (e.g., Render, Railway, Fly.io, AWS EC2, or VPS) with `PORT`, `CLIENT_ORIGIN`, and `JWT_SECRET` configured. Mount a persistent volume at `backend/storage` when using file-backed persistence.
- **Cloud Database (Optional)**: Set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` to enable managed PostgreSQL storage via Supabase.

*Note: Deployment configurations should be tested and sized according to participant volume. See [SETUP.md](SETUP.md) for production operational guidance.*
