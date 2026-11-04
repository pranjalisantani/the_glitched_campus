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
