const slugify = (value) =>
  String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const getPagination = (query, defaults = { page: 1, limit: 12, maxLimit: 100 }) => {
  let page = parseInt(query.page, 10);
  let limit = parseInt(query.limit, 10);
  if (!Number.isFinite(page) || page < 1) page = defaults.page;
  if (!Number.isFinite(limit) || limit < 1) limit = defaults.limit;
  limit = Math.min(limit, defaults.maxLimit);
  return { page, limit, skip: (page - 1) * limit };
};

const paginatedResponse = (data, total, page, limit) => ({
  items: data,
  pagination: {
    total,
    page,
    limit,
    pages: Math.max(1, Math.ceil(total / limit)),
    hasNext: page * limit < total,
    hasPrev: page > 1,
  },
});

const parseStringArray = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value.map(String).map((s) => s.trim()).filter(Boolean);
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) return parsed.map(String).map((s) => s.trim()).filter(Boolean);
  } catch {
    // fall through to CSV split
  }
  return String(value)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
};

module.exports = { slugify, getPagination, paginatedResponse, parseStringArray };
