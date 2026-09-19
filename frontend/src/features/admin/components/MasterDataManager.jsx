import { Eye, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/common/Button";
import IconButton from "../../../components/common/IconButton";
import Modal from "../../../components/common/Modal";
import Table from "../../../components/common/Table";
import { api, resolveImage } from "../../../lib/api";
import { StatusBadge } from "../shared/adminShared";

const getImageUrl = (img) => resolveImage(img);

export const masterConfigs = {
  category: {
    title: "Categories",
    singular: "Category",
    fields: [
      ["name", "Category name"],
      ["description", "Description"],
      ["image", "Image"],
    ],
  },
  brand: {
    title: "Brands",
    singular: "Brand",
    fields: [
      ["name", "Brand name"],
      ["image", "Image"],
    ],
    categories: true,
  },
  size: { title: "Sizes", singular: "Size", fields: [["name", "Size name"]], categories: true },
  color: {
    title: "Colors",
    singular: "Color",
    fields: [
      ["name", "Color name"],
      ["hexCode", "Hex code"],
    ],
    active: true,
  },
  banner: {
    title: "Banners",
    singular: "Banner",
    fields: [
      ["title", "Title"],
      ["description", "Description"],
      ["image", "Image"],
      ["link", "Link URL"],
    ],
    active: true,
  },
  offer: {
    title: "Offers",
    singular: "Offer",
    fields: [
      ["title", "Title"],
      ["description", "Description"],
      ["discount", "Discount"],
      ["startDate", "Start date", "date"],
      ["endDate", "End date", "date"],
    ],
    active: true,
  },
  coupon: {
    title: "Coupons",
    singular: "Coupon",
    fields: [
      ["code", "Coupon code"],
      ["description", "Description"],
      ["discountValue", "Discount value", "number"],
      ["minimumAmount", "Minimum order amount", "number"],
      ["maximumDiscount", "Maximum discount cap", "number"],
      ["usageLimit", "Usage limit (0 = unlimited)", "number"],
      ["expiryDate", "Expiry date", "date"],
    ],
    active: true,
  },
};

// Singular resource key -> plural dashboard path (sidebar + routes use plural)
export const masterListPath = {
  category: "categories",
  brand: "brands",
  size: "sizes",
  color: "colors",
  banner: "banners",
  offer: "offers",
  coupon: "coupons",
};

// Plural URL param (or legacy singular) -> singular resource key
export const toMasterKey = (value = "") => {
  const map = {
    categories: "category",
    brands: "brand",
    sizes: "size",
    colors: "color",
    banners: "banner",
    offers: "offer",
    coupons: "coupon",
    blog: "offer",
  };
  if (map[value]) return map[value];
  if (masterConfigs[value]) return value;
  return value.endsWith("s") ? value.slice(0, -1) : value;
};

export const masterBase = (resource) => ({
  ...(resource === "coupon" ? { discountType: "percentage" } : {}),
  isActive: true,
  categories: [],
});

const MasterDataManager = ({ resource }) => {
  const config = masterConfigs[resource];
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [viewingItem, setViewingItem] = useState(null);
  const navigate = useNavigate();

  const load = async () => {
    setLoading(true);
    try {
      const data = await api(`/admin/${resource}`);
      const list = data?.data || data?.items || data;
      setItems(Array.isArray(list) ? list : []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [resource]);

  const remove = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    try {
      await api(`/admin/${resource}/${id}`, { method: "DELETE" });
      load();
    } catch (e) {
      setError(e.message);
    }
  };

  const isCategory = resource === "category";
  const listPath = `/admin/dashboard/${masterListPath[resource] || resource}`;

  if (!config) {
    return (
      <div className="space-y-4">
        <h2 className="font-display text-2xl font-semibold text-primary-600">Unknown page</h2>
        <p className="text-sm text-slate-500">No management page found for "{resource}".</p>
      </div>
    );
  }

  const headers = isCategory
    ? ["Image", "Category Name", "Description", "Actions"]
    : [
        resource === "color" ? "Color" : config.singular,
        ...(config.categories ? ["Categories"] : []),
        ...(config.active ? ["Status"] : []),
        "Actions",
      ];

  const rows = items.map((item) => {
    if (isCategory) {
      return [
        <img
          key={`cat-img-${item._id}`}
          src={getImageUrl(item.image)}
          alt={item.name}
          className="h-10 w-10 rounded-lg object-cover border"
        />,
        <span key={`cat-name-${item._id}`} className="font-semibold text-slate-900 dark:text-slate-100">
          {item.name}
        </span>,
        <span key={`cat-desc-${item._id}`} className="max-w-[260px] truncate text-sm text-slate-500" title={item.description || ""}>
          {item.description || "—"}
        </span>,
        <div key={`${item._id}-actions`} className="flex items-center gap-1.5">
          <IconButton
            title="View details"
            onClick={() => setViewingItem(item)}
          >
            <Eye className="h-4 w-4" />
          </IconButton>
          <IconButton
            title="Edit item"
            tone="primary"
            onClick={() => navigate(`${listPath}/${item._id}/edit`)}
          >
            <Pencil className="h-4 w-4" />
          </IconButton>
          <IconButton
            title="Delete item"
            tone="danger"
            onClick={() => remove(item._id)}
          >
            <Trash2 className="h-4 w-4" />
          </IconButton>
        </div>,
      ];
    }

    return [
      resource === "color" ? (
        <span className="flex items-center gap-2" key={item._id}>
          <i
            className="h-5 w-5 rounded-full border"
            style={{ background: item.hexCode }}
          />
          {item.name} ({item.hexCode})
        </span>
      ) : (
        item.name || item.title || item.code
      ),
      ...(config.categories
        ? [
            item.categories
              ?.map((category) => category.name || category)
              .join(", ") || "No categories",
          ]
        : []),
      ...(config.active
        ? [
            <StatusBadge
              key={`${item._id}-status`}
              value={item.isActive ? "Active" : "Inactive"}
            />,
          ]
        : []),
      <div key={`${item._id}-actions`} className="flex items-center gap-1.5">
        <IconButton
          title="View details"
          onClick={() => setViewingItem(item)}
        >
          <Eye className="h-4 w-4" />
        </IconButton>
          <IconButton
            title="Edit item"
            tone="primary"
            onClick={() => navigate(`${listPath}/${item._id}/edit`)}
          >
          <Pencil className="h-4 w-4" />
        </IconButton>
        <IconButton
          title="Delete item"
          tone="danger"
          onClick={() => remove(item._id)}
        >
          <Trash2 className="h-4 w-4" />
        </IconButton>
      </div>,
    ];
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-semibold text-primary-600">
            {config.title}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Manage your {config.title.toLowerCase()}.
          </p>
        </div>
        <Button onClick={() => navigate(`${listPath}/add`)}>
          Add {config.singular}
        </Button>
      </div>
      {error && (
        <p className="rounded-xl bg-rose-50 p-3 text-rose-700">{error}</p>
      )}
      {loading ? (
        <p>Loading {config.title.toLowerCase()}...</p>
      ) : (
        <Table
          headers={headers}
          rows={rows}
          emptyMessage={`No ${config.title.toLowerCase()} found.`}
        />
      )}

      {viewingItem && (
        <Modal
          title={`${config.singular} Details`}
          description={`Viewing details for ${viewingItem.name || viewingItem.title || viewingItem.code}`}
          isOpen={Boolean(viewingItem)}
          onClose={() => setViewingItem(null)}
        >
          <div className="space-y-4 pt-2">
            {viewingItem.image && (
              <div className="flex justify-center">
                <img
                  src={getImageUrl(viewingItem.image)}
                  alt={viewingItem.name || viewingItem.title}
                  className="h-40 w-40 rounded-xl object-cover border"
                />
              </div>
            )}
            <div className="space-y-2 text-sm">
              {config.fields
                .filter(([key]) => key !== "image")
                .map(([key, label]) => {
                  const raw = viewingItem[key];
                  if (raw === undefined || raw === "" || raw === null) return null;
                  const text = Array.isArray(raw) ? raw.map((c) => c?.name || c).join(", ") : String(raw);
                  if (!text) return null;
                  return (
                    <p key={key}>
                      <span className="font-semibold">{label}:</span> {text}
                    </p>
                  );
                })}
              {viewingItem.categories && viewingItem.categories.length > 0 && (
                <p>
                  <span className="font-semibold">Categories:</span>{" "}
                  {viewingItem.categories.map((c) => c.name || c).join(", ")}
                </p>
              )}
              {viewingItem.isActive !== undefined && (
                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  <StatusBadge value={viewingItem.isActive ? "Active" : "Inactive"} />
                </p>
              )}
            </div>
            <div className="flex justify-end pt-2">
              <Button variant="secondary" onClick={() => setViewingItem(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default MasterDataManager;
