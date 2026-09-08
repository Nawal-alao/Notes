<p align="center">
  <img src="static/favicon.ico" width="80" alt="Orbit logo" />
</p>

<h1 align="center">Orbit</h1>

<p align="center">
  <strong>Your thoughts, encrypted. Zero-knowledge note-taking app.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/sveltekit-2.x-ff3e00?logo=svelte" alt="SvelteKit" />
  <img src="https://img.shields.io/badge/tailwind-3.x-06b6d4?logo=tailwindcss" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/supabase-2.x-3ecf8e?logo=supabase" alt="Supabase" />
  <img src="https://img.shields.io/badge/license-MIT-green" alt="License" />
</p>

---

## Overview

Orbit is a **privacy-first** note-taking application built with SvelteKit and Supabase. Every note is encrypted end-to-end using **AES-256-GCM** with a user-derived master key. Supabase never sees your plaintext — only you can decrypt your data.

## Features

- **End-to-end encryption** — AES-256-GCM with PBKDF2 key derivation (600k iterations)
- **Zero-knowledge architecture** — the server only stores opaque ciphertext
- **Offline-ready PWA** — installable, works without connection via IndexedDB (Dexie)
- **Real-time sync** — Supabase Realtime keeps devices in sync
- **Markdown support** — write and render rich notes
- **Version history** — encrypted revision history per note (up to 20 revisions)
- **Dark, polished UI** — Plus Jakarta Sans + JetBrains Mono, custom obsidian palette
- **Row-level security** — Supabase RLS policies enforce per-user data isolation

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | SvelteKit 2 |
| Styling | Tailwind CSS 3 |
| Language | JavaScript |
| Backend | Supabase (Auth + PostgreSQL + Realtime) |
| Encryption | Web Crypto API (AES-256-GCM, PBKDF2) |
| Local storage | Dexie / IndexedDB |
| Icons | Lucide Svelte |
| Build | Vite 5 |

## Getting Started

### Prerequisites

- Node.js >= 18
- A [Supabase](https://supabase.com) project

### Install

```bash
git clone https://github.com/Nawal-alao/Orbit.git
cd Orbit
npm install
```

### Environment

Create a `.env` file at the project root:

```env
PUBLIC_SUPABASE_URL=https://your-project.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Then run the `schema.sql` against your Supabase database to create the required tables and RLS policies.

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

Output is a static site (via `adapter-static`) — deployable to GitHub Pages, Netlify, Vercel, etc.

## Security Model

```
User passphrase
      │
      ▼
  PBKDF2 (600k iterations, SHA-256)
      │
      ▼
  AES-256-GCM key
      │
      ▼
  Encrypt / Decrypt note content
```

- The master key is derived client-side and **never leaves the browser**
- Each note is encrypted with a unique random 12-byte IV
- Supabase stores only ciphertext, IVs, and metadata (tags, timestamps)
- Row-Level Security ensures users can only access their own rows

## Project Structure

```
src/
├── app.html              # Shell
├── app.css               # Global styles
├── lib/
│   ├── supabase.js       # Supabase client
│   ├── notes.js          # CRUD + encryption helpers
│   ├── markdown.js       # Markdown renderer
│   ├── stores/
│   │   └── encryption.js # Key derivation + crypto utilities
│   ├── ConfirmDialog.svelte
│   ├── CreateNoteButton.svelte
│   └── Toast.svelte
└── routes/
    ├── +layout.svelte
    ├── +page.svelte
    ├── login/            # Auth flow
    ├── unlock/           # Master-key entry
    └── notes/            # Note editor + list
```

## License

[MIT](https://opensource.org/licenses/MIT)
