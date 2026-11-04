# THE GLITCHED CAMPUS // Setup & Deployment Guide

---

## 1. Prerequisites

Ensure your development environment meets the following specifications:
- **Operating System**: Windows, macOS, or Linux
- **Node.js**: v18.0.0 or later (v24.20.0 recommended)
- **npm**: v9.0.0 or later (v11.19.0 recommended)

---

## 2. Workspace Setup

### 2.1 Clone & Navigate to Repository
```bash
git clone <repository-url>
cd the-glitched-campus
```

### 2.2 Install Dependencies
Install dependencies for both frontend and backend modules:
```bash
# Backend dependencies
npm install --prefix backend

# Frontend dependencies
npm install --prefix frontend

# Root dependencies (concurrently)
npm install
```

### 2.3 Seed Competition Datasets (Stage 3)
Populate or verify the 10 synthetic collegiate forensic datasets under `backend/data/datasets/` for Stage 3 Exploratory Data Analysis:
```bash
npm run seed:datasets
```

---

## 3. Environment Configuration

Copy the example environment configurations:
```bash
# Root
cp .env.example .env

# Backend
cp backend/.env.example backend/.env

# Frontend
cp frontend/.env.example frontend/.env.local
```

### Backend Variables (`backend/.env`):
| Variable | Default Value | Description |
|---|---|---|
| `PORT` | `5000` | Port for Express API |
| `CLIENT_ORIGIN` | `http://localhost:3000` | CORS allowed origin |
| `JWT_SECRET` | `replace_with_a_long_random_secret` | JWT signing secret (min 32 chars; e.g. `openssl rand -hex 32`) |
| `ADMIN_EMAIL` | `admin@example.local` | Initial administrator account email |
| `ADMIN_PASSWORD` | `[PLACEHOLDER: Strong password set by operator]` | Initial administrator password (must be strong; never commit) |
| `SUPABASE_URL` | `https://your-project-ref.supabase.co` | Optional: Supabase project URL for cloud persistence |
| `SUPABASE_SERVICE_ROLE_KEY` | `[PLACEHOLDER: Service role secret]` | Optional: Supabase service role key |

### Frontend Variables (`frontend/.env.local`):
| Variable | Default Value | Description |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | `http://localhost:5000/api` | Base URL for backend HTTP APIs |

---

## 4. Running the Platform Locally

### Start Both Services Concurrently
From the workspace root:
```bash
npm run dev
```

### Or Run in Separate Terminals:
- **Terminal 1 (Backend API)**:
  ```bash
  npm run dev:backend
  ```
  The API will start at **http://localhost:5000**.

- **Terminal 2 (Frontend Client)**:
  ```bash
  npm run dev:frontend
  ```
  The Next.js application will start at **http://localhost:3000**.

---

## 5. Verification & Testing

### 5.1 Run Automated Backend Integration Tests
Execute the comprehensive test suite verifying authentication, stage gating, quiz scoring, attempt limits, and Stage 4/5 continuity:
```bash
npm run test:backend
```
Expected output: 49 tests passing with 0 failures across 4 test suites.

### 5.2 Build Production Bundles
Verify that both projects compile cleanly for production:
```bash
# Build backend
npm run build:backend

# Build frontend (on Windows with Node 24: clean .next and run Webpack: cd frontend && npx next build --webpack)
npm run build:frontend
```

---

## 6. Account Management & Local Access Guidance

- **Administrator Portal (`/admin`)**:
  - Administrator access requires the credentials defined in your local `backend/.env` file (`ADMIN_EMAIL` and `ADMIN_PASSWORD`).
  - Maintain strong, confidential passwords; do not reuse default credentials in production environments.
  - For local JSON storage password resets, execute the verified interactive recovery utility:
    ```bash
    npx tsx backend/src/scripts/resetAdminPassword.ts
    ```
- **Participant Access (`/login` / `/register`)**:
  - **Registration (`/register`)**: New teams register by providing a unique team name, contact email, secure password (minimum 6 characters), and 1 to 5 team member names.
  - **Authentication (`/login`)**: Teams log in using either their registered email address or team name along with their password to receive a signed JWT session and access the participant dashboard (`/dashboard`).
---

## 7. Production Deployment Guidance

The platform is designed to deploy across modern hosting infrastructure:

### 7.1 Frontend Deployment (e.g. Vercel)
- Deploy the `frontend/` directory as a Next.js App Router application.
- Set the root directory to `frontend` in your hosting platform settings.
- Configure environment variable:
  - `NEXT_PUBLIC_API_URL`: The public URL of your deployed backend service (e.g., `https://api.yourdomain.com/api`).
- Ensure the production build uses standard Next.js build or `npx next build --webpack` if building in a Windows CI runner.

### 7.2 Backend Deployment (Persistent Container / VM)
- Deploy the `backend/` directory as a Node.js service (e.g. Render, Railway, Fly.io, AWS EC2, or VPS).
- Configure all required environment variables in your hosting provider's dashboard:
  - `PORT`, `CLIENT_ORIGIN` (set to your frontend's production domain), `JWT_SECRET`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD`.
- **Storage Persistence**:
  - If using the default `PersistentFileStore`, mount a persistent volume at `backend/storage` to guarantee tournament progress, admin mutations, and audit logs survive container restarts.
  - If using `SupabaseStore`, configure `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` to persist data directly to your hosted PostgreSQL instance.

---

## 8. Operational Security & Credential Checklist

Before hosting a live tournament, verify the following operational security controls:

1. **Strong JWT Secret**:
   - In production (`NODE_ENV=production`), the backend enforces that `JWT_SECRET` is defined, at least 32 characters long, and does not match sample defaults.
   - Generate a strong secret via: `openssl rand -hex 32`.
2. **Confidential Administrator Credentials**:
   - Set strong, unpredictable credentials for `ADMIN_EMAIL` and `ADMIN_PASSWORD`. Never commit these values to source control.
   - If credentials need to be reset in an active deployment using file storage, use the recovery script:
     ```bash
     npx tsx backend/src/scripts/resetAdminPassword.ts
     ```
3. **CORS Restriction**:
   - Set `CLIENT_ORIGIN` strictly to the domain where the participant frontend is served. Do not use wildcards (`*`) in production.
4. **Authoritative State Guard**:
   - Quiz answer keys, decode challenge solutions, and stage lock rules are evaluated strictly on the server. Clients receive only the minimal state required for the active session.

---

## 9. Comprehensive Troubleshooting Guide

| Issue | Root Cause | Remediation |
| :--- | :--- | :--- |
| **`NETWORK_ERROR` / Unable to connect to server** | Backend API service is offline, stopped, or unreachable. | Verify that `npm run dev:backend` (or the production backend service) is active on port 5000 and that `NEXT_PUBLIC_API_URL` in `frontend/.env.local` points to `http://localhost:5000/api`. |
| **CORS Error on API requests** | `CLIENT_ORIGIN` does not match the frontend origin. | Update `CLIENT_ORIGIN` in `backend/.env` to match the frontend host URL (e.g., `http://localhost:3000` or your deployed production domain). |
| **Administrator bootstrap skipped** | `ADMIN_EMAIL` or `ADMIN_PASSWORD` not supplied in environment. | Ensure both variables are defined in `backend/.env` if you want an initial administrator account automatically provisioned on server startup. |
| **Stage 403 Forbidden / Stage Locked** | The requested stage status is currently `LOCKED` or `CLOSED`. | An administrator must log in to the Admin Portal (`/admin`) and open the stage via the Stage Controls tab. |
| **Competition Frozen modal displayed** | Global competition freeze is engaged platform-wide. | The primary administrator can disengage the freeze toggle from the Admin Console header. |
| **Frontend build failure on Windows (Turbopack / EPERM)** | Turbopack child-process IPC disconnect on Node 24, or filesystem locking on `.next`. | Delete `frontend/.next` if stale handles exist, then run the verified Webpack build command: `cd frontend && npx next build --webpack`. |
