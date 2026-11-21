// Resolve a /img/... path; the single-file build injects window.__IMG with data URIs.
export const img = (p) => (globalThis.__IMG && globalThis.__IMG[p]) || p
