# PhysioFlow — Physiotherapy · Yoga · Pilates

A modern website for a physiotherapy practice that combines clinical treatment with yoga and Pilates courses. Built with **Vue 3** and **PocketBase**. Features a dark purple theme, dynamic course dates, a photo gallery, and a contact form — all managed through PocketBase's built-in admin UI without touching code.

---

## Stack

- **Frontend** — Vue 3 + Vite + TypeScript + Tailwind CSS + PocketBase JS SDK
- **Backend** — [PocketBase](https://pocketbase.io) (single self-hosted binary, SQLite, built-in admin UI)

---

## Quick Start (Docker)

```bash
docker compose up --build
```

Open `http://localhost:8090` for the site and `http://localhost:8090/_/` to set up your admin account. Migrations run automatically on first start and create all collections with sample course data.

---

## Sections

| Section | Description |
|---|---|
| **Hero** | Animated floating orbs, gradient headline, key stats |
| **About** | Two-column bio section with feature highlights |
| **Courses** | Fetches upcoming courses from PocketBase — shows date, location, price, and spots remaining |
| **Gallery** | Fetches images from PocketBase — hover overlay, click-to-lightbox |
| **Contact** | Form that posts directly to PocketBase with success/error state |

---

## Managing Content

All content is managed through the PocketBase admin panel at `http://127.0.0.1:8090/_/` — no code changes needed.

### Collections

**`courses`**
| Field | Type | Description |
|---|---|---|
| `title` | text | Course name |
| `description` | text | Short description |
| `date` | text | Date in `YYYY-MM-DD` format |
| `time` | text | e.g. `09:00 – 17:00` |
| `location` | text | City name |
| `address` | text | Full street address |
| `max_participants` | number | Maximum seats |
| `current_participants` | number | Seats already taken |
| `price` | number | Price (numeric) |
| `currency` | text | e.g. `CHF`, `EUR` |
| `is_active` | bool | Only active courses appear on the site |

**`gallery`**
| Field | Type | Description |
|---|---|---|
| `title` | text | Optional caption |
| `description` | text | Optional description shown in lightbox |
| `image` | file | Upload JPG, PNG, or WebP |
| `display_order` | number | Lower numbers appear first |

**`contact_messages`** — read-only for visitors, viewable in the admin panel.

---

## Configuration

To point the frontend at a different PocketBase URL (e.g. in production), create a `.env` file in `frontend/`:

```env
VITE_POCKETBASE_URL=https://your-pocketbase-domain.com
```

---

## Docker

The recommended way to run in production. A single container serves both the frontend and the PocketBase API — no Nginx or reverse proxy needed.

**How it works:** the multi-stage Dockerfile builds the Vue app, downloads the PocketBase binary, and drops the built frontend into `pb_public/`. PocketBase natively serves that folder as static files.

```
GET /          → frontend (Vue SPA)
GET /api/...   → PocketBase REST API
GET /_/        → PocketBase admin UI
```

### Build & run

```bash
# With Docker Compose (recommended)
docker compose up --build

# Or plain Docker
docker build -t physio-lisa .
docker run -p 8090:8090 -v physio_data:/pb/pb_data physio-lisa
```

Then open `http://localhost:8090` — the site and admin panel are both available.

### Data persistence

The `pb_data` Docker volume keeps the database, uploaded photos, and logs alive across container restarts. Back up this volume before any destructive operations.

---

## Development

Run the frontend and PocketBase separately for a faster dev loop:

```bash
# Terminal 1 — PocketBase
cd pocketbase
./download.sh   # first time only
./start.sh      # http://127.0.0.1:8090

# Terminal 2 — Frontend (hot reload)
cd frontend
npm install     # first time only
npm run dev     # http://localhost:5173
```

`frontend/.env.development` points the SDK at `http://127.0.0.1:8090` automatically. In Docker, the SDK falls back to `window.location.origin` since both run on the same port.

---

## Production (without Docker)

1. Build the frontend:
   ```bash
   cd frontend && npm run build
   ```
2. Copy `dist/` into `pocketbase/pb_public/`.
3. Run `./pocketbase serve --http=0.0.0.0:8090`.

PocketBase serves the static files directly — no separate web server required.
