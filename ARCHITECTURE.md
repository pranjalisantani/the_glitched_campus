# THE GLITCHED CAMPUS // Architecture Documentation

---

## 1. System Overview

THE GLITCHED CAMPUS architecture cleanly decouples presentation and business logic into two autonomous tiers:

```
+-------------------------------------------------------------+
|                  FRONTEND TIER (Port 3000)                  |
|  Next.js 16 (App Router) + React 19 + TypeScript + Tailwind |
|                                                             |
|  [ AuthContext ]  <-- Session & Profile State               |
|  [ Live Polling ] <-- 8-second refresh for stage statuses    |
|  [ Pages ]        <-- /, /login, /dashboard, /stage/1-5,    |
|                       /admin                                |
+------------------------------+------------------------------+
                               | HTTP REST APIs (JSON / Bearer JWT)
+------------------------------v------------------------------+
|                   BACKEND TIER (Port 5000)                  |
|  Node.js + Express 4 + TypeScript Engine                    |
|                                                             |
|  [ Middleware ]   <-- requireAuth, requireAdmin,            |
|                       requireStageOpen                      |
|  [ Routers ]      <-- /api/auth, /api/stages,               |
|                       /api/stage1-5, /api/admin             |
|  [ Domain Logic ] <-- Score calculation, Attempt tracking,  |
|                       Hint deduction, Continuity gate       |
|  [ Store Layer ]  <-- IStore (PersistentFileStore / Supabase) |
+-------------------------------------------------------------+
```

---

## 2. Repository Structure & Module Organization

The codebase is organized as a unified monorepo cleanly separating client-side presentation, server-authoritative API routing, storage adapters, and test suites:

```
the-glitched-campus/
|-- frontend/                       # Next.js 16 App Router Client Application
|   |-- src/
|   |   |-- app/                    # App Router pages & API routes
|   |   |   |-- admin/              # Admin dashboard, RBAC tabs, test mode, and admin login
|   |   |   |-- dashboard/          # Participant command dashboard & live stage status
|   |   |   |-- stage/              # Interactive challenge stages:
|   |   |   |   |-- 1/              # Stage 1: Security Assessment Quiz (tab/clipboard supervision)
|   |   |   |   |-- 2/              # Stage 2: Cryptographic Decode & Encode (attempt limits, hints)
|   |   |   |   |-- 3/              # Stage 3: Incident Dataset EDA (one-time lock, authorized DL)
|   |   |   |   |-- 4/              # Stage 4: Static Defensive Prototype (problem selection)
|   |   |   |   `-- 5/              # Stage 5: Dynamic Security Application (continuity link)
|   |   |   |-- stages/             # Stage Map visual overview route (and stage aliases)
|   |   |   |-- login/              # Participant team authentication
|   |   |   |-- register/           # Participant team onboarding (1 to 5 members)
|   |   |   `-- globals.css         # Cyber-forensics design system & theme tokens
|   |   |-- components/             # Reusable UI components (Navbar, StageMap, Modals, Panels)
|   |   |-- context/                # AuthContext: JWT session management, user clearance & refresh
|   |   `-- lib/                    # API client with exponential backoff, timeouts, freeze checks
|   |-- public/                     # Static assets (cyber hero graphics, icons)
|   `-- package.json
|-- backend/                        # Express API & Tournament Engine
|   |-- src/
|   |   |-- config/                 # Environment validation & fail-safe JWT secret handling
|   |   |-- data/                   # Initial seeds: stages, questions, challenges, dataset metadata
|   |   |-- middleware/             # JWT auth, RBAC clearance, stage gates, competition freeze
|   |   |-- routes/                 # Express route controllers:
|   |   |   |-- authRoutes.ts       # Registration, login, team profile
|   |   |   |-- stageRoutes.ts      # Stage 1-5 submission, attempt, hint, download endpoints
|   |   |   |-- adminRoutes.ts      # Administrative CRUD, team matrix, audit logs, overrides
|   |   |   `-- adminTestRoutes.ts  # Admin Test Mode isolated sandbox endpoints
|   |   |-- store/                  # IStore interface, PersistentFileStore, SupabaseStore, MemoryStore
|   |   |-- test/                   # 49 automated integration, security, RBAC & persistence tests
|   |   |-- types/                  # Unified domain interfaces, DTOs, and RBAC permission models
|   |   |-- utils/                  # Dataset storage security, lexical & canonical path containment
|   |   |-- scripts/                # resetAdminPassword.ts, seedDatasetFiles.ts
|   |   `-- index.ts                # Application bootstrap, CORS, router mounting & graceful shutdown
|   |-- storage/
|   |   |-- data/                   # Persistent runtime state (atomic JSON files: teams, stages, progress)
|   |   `-- test_data/              # Isolated test directory (auto-purged during test runs)
|   |-- data/datasets/              # Forensic sample & competition datasets (CSV/JSON)
|   `-- package.json
|-- .env.example                    # Root example environment configuration
|-- ARCHITECTURE.md                 # System architecture and data flow documentation
|-- REQUIREMENTS.md                 # Full functional and non-functional specifications
|-- SETUP.md                        # Detailed local setup, deployment, and troubleshooting guide
`-- package.json                    # Workspace orchestration scripts (concurrent dev, test, build)
```

---

## 3. Data Access Layer & Extensibility

The data layer is abstracted behind the TypeScript interface `IStore`:

```typescript
export interface IStore {
  // Teams & Authentication
  createTeam(team: Omit<Team, 'id' | 'createdAt'>): Promise<Team>;
  findTeamByEmail(email: string): Promise<Team | null>;
  findTeamByName(name: string): Promise<Team | null>;
  findTeamById(id: string): Promise<Team | null>;
  getAllTeams(): Promise<Team[]>;

  // Stage Controls
  getAllStages(): Promise<StageConfig[]>;
  getStage(stageId: StageId): Promise<StageConfig | null>;
  updateStageStatus(stageId: StageId, status: StageStatus): Promise<StageConfig>;

  // Stage 1 (Quiz)
  getQuizQuestions(isAdmin: boolean): Promise<QuizQuestion[] | QuizQuestionParticipant[]>;
  submitQuiz(teamId: string, teamName: string, answers: Record<string, string>): Promise<QuizSubmission>;
  logTabFocusEvent(log: Omit<TabFocusLog, 'id' | 'timestamp'>): Promise<TabFocusLog>;

  // Stage 2 (Decode & Encode)
  getDecodeChallenges(isAdmin: boolean, teamId?: string): Promise<DecodeChallenge[] | DecodeChallengeParticipant[]>;
  unlockHint(teamId: string, teamName: string, challengeId: string): Promise<...>;
  submitChallengeAttempt(teamId: string, teamName: string, challengeId: string, answer: string): Promise<...>;

  // Stage 3 (Datasets)
  getDatasets(): Promise<DatasetMetadata[]>;
  selectDataset(teamId: string, teamName: string, datasetId: string): Promise<TeamDatasetSelection>;

  // Stage 4 & 5 (Problems & Continuity)
  getProblemStatements(): Promise<ProblemStatement[]>;
  selectProblemStatement(teamId: string, teamName: string, problemId: string): Promise<TeamProblemSelection>;
  getTeamProblemSelection(teamId: string): Promise<TeamProblemSelection | null>;
}
```

The platform provides three modular implementations of `IStore`:
- **`PersistentFileStore`**: Default production-ready persistence engine storing data as atomic JSON records under `backend/storage/data`. Ensures tournament state and audit logs survive server restarts without requiring external database infrastructure.
- **`SupabaseStore`**: Enterprise PostgreSQL integration via Supabase, automatically activated when valid `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` credentials are provided in the environment.
- **`MemoryStore`**: Lightweight in-memory storage holding collections in volatile Maps and arrays for development and testing.

Automated unit and integration test suites run against an isolated test directory (`backend/storage/test_data`) or in-memory state to guarantee zero pollution of live tournament records or production databases.

---

## 4. Security & Access Boundaries

1. **Password Encryption**: All passwords hashed using `bcryptjs` with 10 salt rounds prior to storage.
2. **Authorization Guards**:
   - `requireAuth`: Verifies JWT signature and extracts user claims.
   - `requireAdmin`: Validates that `req.user.role === 'admin'`.
   - `requireStageOpen(stageId)`: Intercepts participant requests; rejects with `403 STAGE_LOCKED` or `403 STAGE_CLOSED` if stage is not active. Admins pass through.
3. **Information Disclosure Prevention**:
   - `QuizQuestion.correctOptionId` is explicitly stripped before returning questions to participants.
   - Stage 1 quiz submissions compute score on the server, but the participant response only returns receipt confirmation.
   - Stage 2 submissions return only `{ isCorrect, attemptsRemaining, isLockedOut, message }` without leaking overall marks.
4. **Stage 3 Dataset Isolation & Path Traversal Shielding**:
   - Participants may download only the specific forensic dataset selected by their team; unselected downloads return `403 Forbidden` (`DATASET_ACCESS_UNAUTHORIZED`).
   - Dataset path resolution enforces strict filename validation (rejecting traversal markers `..`, `/`, and `\`), lexical and canonical realpath containment against `backend/data/datasets`, and regular file checks. Missing files return `404 Not Found` without creating placeholder files.
