// src/config.js

// Use environment variable if available, otherwise fallback to localhost (for local dev)
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";