import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/common/Button";
import Table from "../../../components/common/Table";
import { api } from "../../../lib/api";
import { StatusBadge } from "../../admin/shared/adminShared";
import { sectionTitleClass } from "../constants";
const VendorProducts = () => { const [products, setProducts] = useState([]), [error, setError] = useState(""); const load = () => api("/vendor/products").then(setProducts).catch((e) => setError(e.message)); useEffect(load, []); const remove = async (id) => { if (!confirm("Delete this product?")) return; try { await api(`/vendor/products/${id}`, { method: "DELETE" }); load(); } catch (e) { setError(e.message); } }; return <div className="space-y-4"><div className="flex justify-between"><h2 className={sectionTitleClass}>My Products</h2><Link to="/vendor/dashboard/add-product"><Button>Add Product</Button></Link></div>{error && <p className="text-red-600">{error}</p>}<Table headers={["Product", "Category", "Price", "Stock", "Status", "Action"]} rows={products.map((p) => [p.name, p.category?.name, `$${p.saleprice}`, p.quantity, <StatusBadge value={p.approvalStatus}/>, <Button key={p._id} variant="ghost" className="text-red-600" onClick={() => remove(p._id)}>Delete</Button>])} emptyMessage="You have no products yet." /></div>; };
export default VendorProducts;
