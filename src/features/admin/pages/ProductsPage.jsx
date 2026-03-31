import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Edit3, Grid2x2, List, Plus, Search, Trash2 } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { AdminButton, AdminCard, AdminInput, AdminModal, SectionTitle, StatusBadge } from "@/features/admin/components/AdminPrimitives";
import { useAdminDashboard } from "@/features/admin/context/AdminDashboardContext";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
const categoryOptions = ["All", "Laptop", "Camera", "Mobile", "Wearables", "Tablet", "Audio"];
export default function ProductsPage() {
    const { products, gridView, setGridView, addProduct, deleteProduct } = useAdminDashboard();
    const [searchParams, setSearchParams] = useSearchParams();
    const initialCategory = searchParams.get("category") || "All";
    const initialRelatedProduct = Number(searchParams.get("relatedTo") || 0);
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState(initialCategory);
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [selectedProductId, setSelectedProductId] = useState(initialRelatedProduct);
    const [form, setForm] = useState({
        name: "",
        price: "",
        stock: "",
        category: "Laptop",
        image: products[0]?.image ?? "",
    });
    useEffect(() => {
        const nextCategory = searchParams.get("category") || "All";
        const nextRelatedProduct = Number(searchParams.get("relatedTo") || 0);
        setCategory(nextCategory);
        setSelectedProductId(nextRelatedProduct);
    }, [searchParams]);
    const filtered = useMemo(() => products.filter((product) => {
        const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase());
        const matchesCategory = category === "All" || product.category === category;
        return matchesQuery && matchesCategory;
    }), [products, query, category]);
    const selectedProduct = useMemo(() => products.find((product) => product.id === selectedProductId) ?? null, [products, selectedProductId]);
    const relatedProducts = useMemo(() => {
        if (!selectedProduct)
            return [];
        return products.filter((product) => product.category === selectedProduct.category && product.id !== selectedProduct.id);
    }, [products, selectedProduct]);
    const perPage = 4;
    const paginated = filtered.slice((page - 1) * perPage, page * perPage);
    const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
    const updateParams = (nextCategory, relatedTo) => {
        const params = new URLSearchParams();
        if (nextCategory !== "All")
            params.set("category", nextCategory);
        if (relatedTo)
            params.set("relatedTo", String(relatedTo));
        setSearchParams(params);
    };
    const submitProduct = () => {
        addProduct({
            name: form.name,
            price: Number(form.price),
            stock: Number(form.stock),
            category: form.category,
            image: form.image,
        });
        setOpen(false);
        setForm({ name: "", price: "", stock: "", category: "Laptop", image: products[0]?.image ?? "" });
    };
    return (<div className="space-y-8">
      <SectionTitle eyebrow="Inventory" title="Products management" description="Search, filter, and manage catalog items with a premium storefront-style presentation." action={<AdminButton onClick={() => setOpen(true)} className="rounded-2xl gradient-primary text-primary-foreground">
            <Plus size={18}/>
            Add Product
          </AdminButton>}/>

      <AdminCard className="p-4 sm:p-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-1 flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18}/>
              <AdminInput value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products..." className="pl-11"/>
            </div>
            <select value={category} onChange={(event) => {
            setCategory(event.target.value);
            setPage(1);
            updateParams(event.target.value, selectedProductId || undefined);
        }} className="h-11 rounded-xl border border-border/60 bg-background/70 px-4 text-sm">
              {categoryOptions.map((option) => (<option key={option}>{option}</option>))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setGridView(true)} className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${gridView ? "border-primary bg-primary/10 text-primary" : "border-border/60"}`}>
              <Grid2x2 size={18}/>
            </button>
            <button type="button" onClick={() => setGridView(false)} className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${!gridView ? "border-primary bg-primary/10 text-primary" : "border-border/60"}`}>
              <List size={18}/>
            </button>
          </div>
        </div>
      </AdminCard>

      {gridView ? (<div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {paginated.map((product) => (<motion.div key={product.id} whileHover={{ y: -6 }} className="group">
              <AdminCard className="overflow-hidden border-border/50 p-0 cursor-pointer" onClick={() => {
                    setSelectedProductId(product.id);
                    updateParams(product.category, product.id);
                }}>
                <div className="relative h-52 overflow-hidden">
                  <img src={product.image} alt={product.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent"/>
                  <div className="absolute right-3 top-3 flex gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <button type="button" className="rounded-full bg-white/90 p-2 text-slate-900 shadow-lg" onClick={(event) => event.stopPropagation()}>
                      <Edit3 size={14}/>
                    </button>
                    <button type="button" onClick={(event) => {
                    event.stopPropagation();
                    deleteProduct(product.id);
                }} className="rounded-full bg-black p-2 text-primary shadow-lg">
                      <Trash2 size={14}/>
                    </button>
                  </div>
                </div>
                <div className="space-y-3 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-base font-semibold">{product.name}</h3>
                      <p className="text-xs text-muted-foreground">{product.category}</p>
                    </div>
                    <StatusBadge tone={product.stock > 10 ? "success" : "warning"} className="px-2.5 py-1 text-[11px]">{product.stock} in stock</StatusBadge>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xl font-bold">${product.price}</p>
                    <p className="text-xs text-muted-foreground">{product.sku}</p>
                  </div>
                </div>
              </AdminCard>
            </motion.div>))}
        </div>) : (<AdminCard className="p-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.map((product) => (<TableRow key={product.id} className="cursor-pointer transition-all hover:bg-primary/5" onClick={() => {
                    setSelectedProductId(product.id);
                    updateParams(product.category, product.id);
                }}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img src={product.image} alt={product.name} className="h-14 w-14 rounded-2xl object-cover"/>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">Premium collection</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>
                    <StatusBadge tone={product.stock > 10 ? "success" : "warning"}>{product.stock}</StatusBadge>
                  </TableCell>
                  <TableCell>{product.sku}</TableCell>
                  <TableCell className="text-right">
                    <button type="button" onClick={(event) => {
                    event.stopPropagation();
                    deleteProduct(product.id);
                }} className="rounded-xl bg-black px-3 py-2 text-primary">
                      Delete
                    </button>
                  </TableCell>
                </TableRow>))}
            </TableBody>
          </Table>
        </AdminCard>)}

      {selectedProduct ? (<AdminCard className="p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Related Products</p>
              <h3 className="mt-2 text-xl font-semibold">Products related to {selectedProduct.name}</h3>
              <p className="text-sm text-muted-foreground">Showing products from the {selectedProduct.category} category.</p>
            </div>
            <StatusBadge tone="warning" className="w-fit">{relatedProducts.length} related items</StatusBadge>
          </div>

          {relatedProducts.length ? (<div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {relatedProducts.map((product) => (<button key={product.id} type="button" onClick={() => {
                        setSelectedProductId(product.id);
                        updateParams(product.category, product.id);
                    }} className="flex items-center gap-3 rounded-2xl border border-border/60 bg-secondary/40 p-3 text-left transition-all hover:border-primary/40 hover:bg-secondary/70">
                  <img src={product.image} alt={product.name} className="h-16 w-16 rounded-2xl object-cover"/>
                  <div className="min-w-0">
                    <p className="truncate font-medium">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.category}</p>
                    <p className="mt-1 text-sm font-semibold">${product.price}</p>
                  </div>
                </button>))}
            </div>) : (<div className="mt-5 rounded-2xl border border-dashed border-border bg-secondary/30 p-5 text-sm text-muted-foreground">
              No other related products found in this category yet.
            </div>)}
        </AdminCard>) : null}

      <Pagination className="justify-end">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" onClick={(event) => {
            event.preventDefault();
            setPage((current) => Math.max(1, current - 1));
        }}/>
          </PaginationItem>
          {Array.from({ length: totalPages }).map((_, index) => (<PaginationItem key={index}>
              <PaginationLink href="#" isActive={page === index + 1} onClick={(event) => {
                event.preventDefault();
                setPage(index + 1);
            }}>
                {index + 1}
              </PaginationLink>
            </PaginationItem>))}
          <PaginationItem>
            <PaginationNext href="#" onClick={(event) => {
            event.preventDefault();
            setPage((current) => Math.min(totalPages, current + 1));
        }}/>
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <AdminModal open={open} onOpenChange={setOpen} title="Add a new product" description="Use local state to simulate inventory creation with a polished modal flow." footer={<>
            <AdminButton variant="outline" onClick={() => setOpen(false)} className="rounded-2xl">
              Cancel
            </AdminButton>
            <AdminButton onClick={submitProduct} disabled={!form.name || !form.price || !form.stock} className="rounded-2xl gradient-primary text-primary-foreground">
              Save Product
            </AdminButton>
          </>}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-medium">Product Name</label>
            <AdminInput value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}/>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Price</label>
            <AdminInput type="number" value={form.price} onChange={(event) => setForm((current) => ({ ...current, price: event.target.value }))}/>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Stock</label>
            <AdminInput type="number" value={form.stock} onChange={(event) => setForm((current) => ({ ...current, stock: event.target.value }))}/>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Category</label>
            <select value={form.category} onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))} className="h-11 w-full rounded-xl border border-border/60 bg-background px-4 text-sm">
              {categoryOptions.filter((item) => item !== "All").map((item) => (<option key={item}>{item}</option>))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Image Source</label>
            <select value={form.image} onChange={(event) => setForm((current) => ({ ...current, image: event.target.value }))} className="h-11 w-full rounded-xl border border-border/60 bg-background px-4 text-sm">
              {products.map((item) => (<option key={`${item.id}-${item.image}`} value={item.image}>
                  {item.name}
                </option>))}
            </select>
          </div>
        </div>
      </AdminModal>
    </div>);
}

