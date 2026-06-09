// src/config.js

// Use environment variable if available, otherwise fallback to the deployed backend API prefix
export const API_URL = (import.meta.env.VITE_API_URL || "https://finance-dashboard-backend-6i92.onrender.com/api/v1").replace(/\/$/, "");