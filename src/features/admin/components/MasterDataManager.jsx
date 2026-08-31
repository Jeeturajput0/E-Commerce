import { Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/common/Button";
import Modal from "../../../components/common/Modal";
import Table from "../../../components/common/Table";
import { api } from "../../../lib/api";
import { StatusBadge } from "../shared/adminShared";

const getImageUrl = (img) => {
  if (!img) return "/logo.jpg";
  if (img.startsWith("http://") || img.startsWith("https://") || img.startsWith("data:")) return img;
  const baseUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace("/api", "") : "http://localhost:3000";
  return `${baseUrl}${img}`;
};

export const masterConfigs = {
  category: {
    title: "Categories",
    fields: [
      ["name", "Category name"],
      ["image", "Image"],
    ],
  },
  brand: {
    title: "Brands",
    fields: [["name", "Brand name"]],
    categories: true,
  },
  size: { title: "Sizes", fields: [["name", "Size name"]], categories: true },
  color: {
    title: "Colors",
    fields: [
      ["name", "Color name"],
      ["hexCode", "Hex code"],
    ],
    active: true,
  },
  banner: {
    title: "Banners",
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
    fields: [
      ["code", "Coupon code"],
      ["discountValue", "Discount value", "number"],
      ["minimumAmount", "Minimum amount", "number"],
      ["expiryDate", "Expiry date", "date"],
    ],
    active: true,
  },
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
      setItems(data);
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

  const headers = isCategory
    ? ["Image", "Category Name", "Actions"]
    : [
        resource === "color" ? "Color" : config.title.slice(0, -1),
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
        <div key={`${item._id}-actions`} className="flex gap-2 items-center">
          <Button
            variant="secondary"
            className="px-3 py-1 text-xs flex items-center gap-1"
            onClick={() => setViewingItem(item)}
          >
            <Eye className="h-3.5 w-3.5" />
            View
          </Button>
          <Button
            variant="ghost"
            className="px-3 py-1 text-xs"
            onClick={() => navigate(`/admin/dashboard/${resource}/${item._id}/edit`)}
          >
            Edit
          </Button>
          <Button
            variant="ghost"
            className="px-3 py-1 text-xs text-rose-600"
            onClick={() => remove(item._id)}
          >
            Delete
          </Button>
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
      <div key={`${item._id}-actions`} className="flex gap-2 items-center">
        <Button
          variant="secondary"
          className="px-3 py-1 text-xs flex items-center gap-1"
          onClick={() => setViewingItem(item)}
        >
          <Eye className="h-3.5 w-3.5" />
          View
        </Button>
        <Button
          variant="secondary"
          className="px-3 py-1 text-xs"
          onClick={() => navigate(`/admin/dashboard/${resource}/${item._id}/edit`)}
        >
          Edit
        </Button>
        <Button
          variant="ghost"
          className="px-3 py-1 text-xs text-rose-600"
          onClick={() => remove(item._id)}
        >
          Delete
        </Button>
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
        <Button onClick={() => navigate(`/admin/dashboard/${resource}/add`)}>
          Add {config.title.slice(0, -1)}
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
          title={`${config.title.slice(0, -1)} Details`}
          description={`Viewing details for ${viewingItem.name || viewingItem.title || viewingItem.code}`}
          isOpen={Boolean(viewingItem)}
          onClose={() => setViewingItem(null)}
        >
          <div className="space-y-4 pt-2">
            {(viewingItem.image || viewingItem.logo) && (
              <div className="flex justify-center">
                <img
                  src={getImageUrl(viewingItem.image || viewingItem.logo)}
                  alt={viewingItem.name || viewingItem.title}
                  className="h-40 w-40 rounded-xl object-cover border"
                />
              </div>
            )}
            <div className="space-y-2 text-sm">
              {viewingItem.name && <p><span className="font-semibold">Name:</span> {viewingItem.name}</p>}
              {viewingItem.title && <p><span className="font-semibold">Title:</span> {viewingItem.title}</p>}
              {viewingItem.description && <p><span className="font-semibold">Description:</span> {viewingItem.description}</p>}
              {viewingItem.code && <p><span className="font-semibold">Code:</span> {viewingItem.code}</p>}
              {viewingItem.categories && viewingItem.categories.length > 0 && (
                <p>
                  <span className="font-semibold">Categories:</span>{" "}
                  {viewingItem.categories.map((c) => c.name || c).join(", ")}
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
