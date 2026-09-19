import { api, apiRaw, toQuery } from "../lib/api";

export const authService = {
  register: (payload) => api("/user/register", { method: "POST", body: JSON.stringify(payload) }),
  login: (payload) => api("/user/login", { method: "POST", body: JSON.stringify(payload) }),
  me: () => api("/user/me"),
  updateProfile: (payload) => api("/user/profile", { method: "PUT", body: JSON.stringify(payload) }),
  changePassword: (payload) => api("/user/change-password", { method: "PUT", body: JSON.stringify(payload) }),
  getAddresses: () => api("/user/addresses"),
  addAddress: (payload) => api("/user/addresses", { method: "POST", body: JSON.stringify(payload) }),
  updateAddress: (id, payload) => api(`/user/addresses/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
  deleteAddress: (id) => api(`/user/addresses/${id}`, { method: "DELETE" }),
};

export const productService = {
  list: (params) => apiRaw(`/products${toQuery(params)}`),
  get: (id) => api(`/products/${id}`),
  adminList: (params) => apiRaw(`/admin/products${toQuery(params)}`),
  adminGet: (id) => api(`/admin/products/${id}`),
  adminCreate: (payload) => api("/admin/products", { method: "POST", body: JSON.stringify(payload) }),
  adminUpdate: (id, payload) => api(`/admin/products/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
  adminDelete: (id) => api(`/admin/products/${id}`, { method: "DELETE" }),
  approve: (id) => api(`/admin/products/${id}/approve`, { method: "PUT", body: JSON.stringify({}) }),
  reject: (id, reason) => api(`/admin/products/${id}/reject`, { method: "PUT", body: JSON.stringify({ reason }) }),
  toggleActive: (id) => api(`/admin/products/${id}/toggle-active`, { method: "PATCH", body: JSON.stringify({}) }),
  vendorList: (params) => apiRaw(`/vendor/products${toQuery(params)}`),
  vendorGet: (id) => api(`/vendor/products/${id}`),
  vendorCreate: (payload) => api("/vendor/products", { method: "POST", body: JSON.stringify(payload) }),
  vendorUpdate: (id, payload) => api(`/vendor/products/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
  vendorDelete: (id) => api(`/vendor/products/${id}`, { method: "DELETE" }),
  vendorStock: (id, stock) => api(`/vendor/products/${id}/stock`, { method: "PATCH", body: JSON.stringify({ stock }) }),
};

export const categoryService = {
  list: () => api("/categories"),
  adminList: () => api("/admin/category"),
  create: (payload) => api("/admin/category", { method: "POST", body: JSON.stringify(payload) }),
  update: (id, payload) => api(`/admin/category/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
  remove: (id) => api(`/admin/category/${id}`, { method: "DELETE" }),
};

export const orderService = {
  create: (payload) => api("/orders", { method: "POST", body: JSON.stringify(payload) }),
  myOrders: (params) => apiRaw(`/user/orders${toQuery(params)}`),
  myOrder: (id) => api(`/user/orders/${id}`),
  cancelMine: (id) => api(`/user/orders/${id}/cancel`, { method: "PUT", body: JSON.stringify({}) }),
  adminList: (params) => apiRaw(`/admin/orders${toQuery(params)}`),
  adminGet: (id) => api(`/admin/orders/${id}`),
  adminStatus: (id, payload) => api(`/admin/orders/${id}/status`, { method: "PUT", body: JSON.stringify(payload) }),
  vendorList: (params) => apiRaw(`/vendor/orders${toQuery(params)}`),
  vendorStatus: (id, status) => api(`/vendor/orders/${id}/status`, { method: "PUT", body: JSON.stringify({ status }) }),
};

export const couponService = {
  validate: (code, subtotal) => api("/coupons/validate", { method: "POST", body: JSON.stringify({ code, subtotal }) }),
  list: () => api("/admin/coupon"),
  create: (payload) => api("/admin/coupon", { method: "POST", body: JSON.stringify(payload) }),
  update: (id, payload) => api(`/admin/coupon/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
  remove: (id) => api(`/admin/coupon/${id}`, { method: "DELETE" }),
};

export const reviewService = {
  forProduct: (productId, params) => apiRaw(`/products/${productId}/reviews${toQuery(params)}`),
  create: (payload) => api("/reviews", { method: "POST", body: JSON.stringify(payload) }),
  vendorReviews: () => api("/vendor/reviews"),
  moderate: (id, payload) => api(`/admin/review/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
};

export const wishlistService = {
  get: () => api("/wishlist"),
  add: (productId) => api("/wishlist", { method: "POST", body: JSON.stringify({ productId }) }),
  remove: (productId) => api(`/wishlist/${productId}`, { method: "DELETE" }),
  check: (productId) => api(`/wishlist/check/${productId}`),
};

export const dashboardService = {
  admin: () => api("/admin/dashboard"),
  adminAnalytics: (days = 30) => api(`/admin/analytics?days=${days}`),
  vendor: () => api("/vendor/dashboard"),
  vendorAnalytics: (days = 30) => api(`/vendor/analytics?days=${days}`),
};

export const vendorService = {
  vendors: (params) => apiRaw(`/admin/vendors${toQuery(params)}`),
  vendorDetails: (id) => api(`/admin/users/${id}`),
  updateVendor: (id, payload) => api(`/admin/users/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
  profile: () => api("/vendor/profile"),
  updateProfile: (payload) => api("/vendor/profile", { method: "PUT", body: JSON.stringify(payload) }),
};

export const customerService = {
  customers: (params) => apiRaw(`/admin/customers${toQuery(params)}`),
  customerDetails: (id) => api(`/admin/users/${id}`),
  updateCustomer: (id, payload) => api(`/admin/users/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
  deleteCustomer: (id) => api(`/admin/users/${id}`, { method: "DELETE" }),
};
