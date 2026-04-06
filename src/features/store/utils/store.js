export const slugifyCategory = (value = "") =>
  value.toLowerCase().trim().replace(/&/g, "and").replace(/\s+/g, "-");

export const findCategoryBySlug = (categories = [], slug = "") =>
  categories.find((category) => slugifyCategory(category.name) === slug);

export const getCategoryNameFromSlug = (categories = [], slug = "") =>
  findCategoryBySlug(categories, slug)?.name || "All";

export const getProductImage = (product, index = 0) =>
  product?.images?.[index] || product?.images?.[0] || "";
