# PhysioFlow — Physiotherapy · Yoga · Pilates

A modern website for a physiotherapy practice that combines clinical treatment with yoga and Pilates courses. Built with **Vue 3** and **PocketBase**. Features a dark purple theme, dynamic course dates, a photo gallery, and a contact form — all managed through PocketBase's built-in admin UI without touching code.

---

## Stack

- **Frontend** — Vue 3 + Vite + TypeScript + Tailwind CSS + PocketBase JS SDK
- **Backend** — [PocketBase](https://pocketbase.io) (single self-hosted binary, SQLite, built-in admin UI)

---

## Getting Started

### 1. Start PocketBase

```bash
cd pocketbase
./download.sh   # downloads the PocketBase binary for your OS/arch
./start.sh      # starts the server on http://127.0.0.1:8090
```

On first start, open `http://127.0.0.1:8090/_/` to create your admin account. Migrations run automatically and will:

- Create the `courses`, `gallery`, and `contact_messages` collections
- Seed 4 sample courses in Swiss cities

### 2. Start the frontend

```bash
cd frontend
npm install
npm run dev     # runs on http://localhost:5173
```

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

## Production

1. Build the frontend:
   ```bash
   cd frontend && npm run build
   ```
   The `dist/` folder can be served by any static host (Nginx, Caddy, etc.).

2. Run PocketBase on your server and expose it via a reverse proxy.

3. Make sure your reverse proxy allows CORS from your frontend domain, or configure it in the PocketBase admin under **Settings → Application**.
