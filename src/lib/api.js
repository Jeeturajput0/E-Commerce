export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
export const API_BASE = API_URL.replace(/\/api\/?$/, "");
export const IMAGEKIT_URL_ENDPOINT = import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT || "";
export const IMAGEKIT_PUBLIC_KEY = import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY || "";

// Resolve a stored image path/URL to a displayable URL.
// Handles ImageKit absolute URLs, legacy /uploads/... paths, and plain filenames.
export const resolveImage = (value, fallback = "/logo.jpg") => {
  if (!value) return fallback;
  if (typeof value === "object") value = value.url || value.image || "";
  if (!value) return fallback;
  if (/^https?:\/\//i.test(value) || value.startsWith("data:") || value.startsWith("blob:")) return value;
  if (value.startsWith("/")) return `${API_BASE}${value}`;
  return `${API_BASE}/${value}`;
};

export const authHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const handleUnauthorized = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("userdetails");
  if (!["/login", "/register", "/"].includes(window.location.pathname)) {
    window.location.href = "/login";
  }
};

export const api = async (path, options = {}) => {
  const isFormData = options.body instanceof FormData;
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...authHeaders(),
      ...options.headers,
    },
  });
  // Backend always returns JSON (404 handler included). Guard anyway.
  const body = await response.json().catch(() => ({}));
  if (response.status === 401 && !options.skipAuthRedirect) {
    handleUnauthorized();
  }
  if (!response.ok || body.success === false) {
    throw new Error(body.message || `Request failed (${response.status})`);
  }
  return body.data !== undefined ? body.data : body;
};

// Raw call that also returns pagination/meta alongside data
export const apiRaw = async (path, options = {}) => {
  const isFormData = options.body instanceof FormData;
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...authHeaders(),
      ...options.headers,
    },
  });
  const body = await response.json().catch(() => ({}));
  if (response.status === 401 && !options.skipAuthRedirect) {
    handleUnauthorized();
  }
  if (!response.ok || body.success === false) {
    throw new Error(body.message || `Request failed (${response.status})`);
  }
  return body;
};

export const toQuery = (params = {}) => {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "" || value === "All") return;
    search.set(key, String(value));
  });
  const query = search.toString();
  return query ? `?${query}` : "";
};
