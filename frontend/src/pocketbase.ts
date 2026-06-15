import PocketBase from 'pocketbase'

// In dev, VITE_POCKETBASE_URL is set via .env.development.
// In production (Docker), the frontend is served by PocketBase itself — same origin.
const POCKETBASE_URL = import.meta.env.VITE_POCKETBASE_URL || window.location.origin

export const pb = new PocketBase(POCKETBASE_URL)
