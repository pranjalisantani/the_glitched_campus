# THE GLITCHED CAMPUS

> A modular, five-stage cybersecurity tournament platform bridging incident triage, cryptographic analysis, and defensive engineering.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=flat&logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4-black?style=flat&logo=express)](https://expressjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat&logo=tailwind-css)](https://tailwindcss.com/)

[GitHub Repository](https://github.com/pranjalisantani/the_glitched_campus2) · [Setup Guide](SETUP.md) · [Architecture](ARCHITECTURE.md)

---

## Why This Project?

Collegiate hackathons and cybersecurity competitions frequently rely on disconnected platforms: multiple-choice forms on one service, standalone challenges on another, and offline design prompts shared via documents. This fragmentation increases administrative overhead, hinders real-time competition oversight, and fails to model how security teams investigate and remediate multi-phase incidents.

**THE GLITCHED CAMPUS** unifies technical evaluation, cryptographic triage, exploratory data analysis, and software defense into a single, cohesive tournament platform. Participating teams tackle an evolving simulated breach across five sequential stages, while organizers maintain real-time operational control through a centralized administrative dashboard.

---

## What the Platform Does

THE GLITCHED CAMPUS orchestrates a simulated incident response tournament where teams investigate an active collegiate breach. The platform manages team progression through five sequential phases—transitioning participants from threat identification to full-stack defensive engineering:

| Stage | Focus Area | Participant Journey |
| :---: | :--- | :--- |
| **01** | **Security Fundamentals** | Teams assess core security concepts, network protocols, and incident response fundamentals in a guided assessment interface. |
| **02** | **Cryptographic Analysis** | Participants analyze and decode obfuscated artifacts, ciphers, and encoded forensic payloads within cyber terminal containers. |
| **03** | **Incident Dataset EDA** | Teams explore realistic campus operational telemetry and incident datasets to identify anomalies, trends, and breach indicators. |
| **04** | **Defensive Architecture** | Teams select and design a tactical defensive workflow, establishing the architectural foundation for their response system. |
| **05** | **Dynamic Application Defense** | Teams build a functional defensive application that implements their Stage 4 architecture, maintaining strict continuity from concept to code. |

---

## Key Differentiators

- **Progressive Tournament Continuity**: Unlike disconnected challenges, architectural and analytical choices made in early stages directly define the implementation deliverables in the final engineering phase.
- **Dual-Perspective Platform**: Built for both sides of the event—participants navigate an immersive, real-time stage map, while event organizers manage live stage availability and participant progress through a dedicated operational portal.
- **Controlled Competition Pacing**: Organizers can open, lock, or pause stage access across the tournament to coordinate live hackathon schedules and synchronize team transitions.

---

## Technology Stack & Why

| Technology | Purpose | Rationale |
| :--- | :--- | :--- |
| **Next.js** | Client Framework | Enables high-performance App Router navigation, fast server rendering, and scalable frontend routing. |
| **React** | User Interface | Powers interactive tournament components, live stage maps, and dynamic participant forms. |
| **TypeScript** | Type Safety | Enforces contract safety across domain models, API payloads, and state transitions between tiers. |
| **Tailwind CSS** | Styling System | Delivers a consistent cyber-forensics dark mode interface with rapid utility-first responsiveness. |
| **Node.js** | Server Runtime | Provides an efficient, event-driven runtime suitable for concurrent participant requests and real-time operations. |
| **Express** | REST API Engine | Delivers lightweight, predictable routing and middleware handling for all tournament endpoints. |
| **Supabase / PostgreSQL** | Database Persistence | Offers optional enterprise-grade relational storage when cloud persistence is required beyond local files. |
| **Automated Testing** | Quality Assurance | Validates tournament rules, authentication boundaries, and data integrity before live deployment. |

---

## Documentation & Exploration

Detailed technical documentation and operational guides are maintained in dedicated repository documents:

- **[Setup Guide](SETUP.md)**: Local development setup, environment variables, verified build commands, and troubleshooting.
- **[Architecture Documentation](ARCHITECTURE.md)**: System design, repository module organization, data flow diagrams, and storage abstraction.

---

**THE GLITCHED CAMPUS** — Turning cybersecurity education into an orchestrated, realistic incident response experience.
