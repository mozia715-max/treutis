"use client";

import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/lib/products";
import { uploadProductImage } from "@/lib/storage";
import { Product } from "@/lib/types";

const emptyForm = {
  name: "",
  category: "",
  fabric: "",
  fit: "",
  price: 0,
  description: "",
  sizes: "",
  imageUrl: "",
  inStock: true,
};

export default function AdminDashboard() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("treutis-admin-auth") !== "1") {
      router.replace("/admin");
      return;
    }
    setChecked(true);
    loadProducts();
  }, [router]);

  async function loadProducts() {
    setLoading(true);
    const list = await getAllProducts();
    setProducts(list);
    setLoading(false);
  }

  function startEdit(p: Product) {
    setEditingId(p.id);
    setForm({
      name: p.name,
      category: p.category,
      fabric: p.fabric,
      fit: p.fit,
      price: p.price,
      description: p.description,
      sizes: p.sizes.join(", "),
      imageUrl: p.imageUrl,
      inStock: p.inStock,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
  }

  async function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadProductImage(file);
      setForm((f) => ({ ...f, imageUrl: url }));
    } catch (err) {
      alert("Photo upload failed — check your connection and try again.");
    }
    setUploading(false);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    const payload = {
      name: form.name,
      category: form.category,
      fabric: form.fabric,
      fit: form.fit,
      price: Number(form.price),
      description: form.description,
      sizes: form.sizes
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      imageUrl: form.imageUrl,
      inStock: form.inStock,
    };
    if (editingId) {
      await updateProduct(editingId, payload);
    } else {
      await createProduct(payload);
    }
    setSaving(false);
    resetForm();
    loadProducts();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this product?")) return;
    await deleteProduct(id);
    loadProducts();
  }

  if (!checked) return null;

  return (
    <main className="px-[5vw] py-10">
      <div className="mb-10 flex items-center justify-between">
        <h1 className="font-display text-3xl uppercase">
          {editingId ? "Edit Product" : "New Product"}
        </h1>
        {editingId && (
          <button
            onClick={resetForm}
            className="text-xs font-semibold uppercase tracking-wider text-muted hover:text-red"
          >
            Cancel edit
          </button>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="mb-16 grid grid-cols-1 gap-4 md:grid-cols-2"
      >
        <input
          required
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border border-white/20 bg-transparent px-4 py-3 text-sm outline-none focus:border-red"
        />
        <input
          required
          placeholder="Category (e.g. Outerwear)"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="border border-white/20 bg-transparent px-4 py-3 text-sm outline-none focus:border-red"
        />
        <input
          placeholder="Fabric"
          value={form.fabric}
          onChange={(e) => setForm({ ...form, fabric: e.target.value })}
          className="border border-white/20 bg-transparent px-4 py-3 text-sm outline-none focus:border-red"
        />
        <input
          placeholder="Fit"
          value={form.fit}
          onChange={(e) => setForm({ ...form, fit: e.target.value })}
          className="border border-white/20 bg-transparent px-4 py-3 text-sm outline-none focus:border-red"
        />
        <input
          required
          type="number"
          placeholder="Price (AED)"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
          className="border border-white/20 bg-transparent px-4 py-3 text-sm outline-none focus:border-red"
        />
        <input
          placeholder="Sizes, comma separated (S, M, L, XL)"
          value={form.sizes}
          onChange={(e) => setForm({ ...form, sizes: e.target.value })}
          className="border border-white/20 bg-transparent px-4 py-3 text-sm outline-none focus:border-red"
        />
        <div className="md:col-span-2">
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted">
            Product Photo
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="w-full text-sm text-muted file:mr-4 file:border file:border-white/20 file:bg-transparent file:px-4 file:py-2 file:text-xs file:font-semibold file:uppercase file:tracking-wider file:text-fg"
          />
          {uploading && (
            <div className="mt-2 text-xs text-red">Uploading…</div>
          )}
          {form.imageUrl && !uploading && (
            <div className="relative mt-3 aspect-[4/5] w-32 overflow-hidden border border-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={form.imageUrl}
                alt="Preview"
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </div>
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={3}
          className="border border-white/20 bg-transparent px-4 py-3 text-sm outline-none focus:border-red md:col-span-2"
        />
        <label className="flex items-center gap-2.5 text-sm">
          <input
            type="checkbox"
            checked={form.inStock}
            onChange={(e) => setForm({ ...form, inStock: e.target.checked })}
          />
          In stock
        </label>
        <button
          type="submit"
          disabled={saving || uploading}
          className="bg-red px-6 py-3.5 text-[13px] font-bold uppercase tracking-wider hover:bg-fg hover:text-bg md:col-span-2 disabled:opacity-50"
        >
          {saving ? "Saving…" : editingId ? "Save Changes" : "Add Product"}
        </button>
      </form>

      <h2 className="font-display mb-6 text-2xl uppercase">
        Products ({products.length})
      </h2>

      {loading ? (
        <div className="text-muted">Loading…</div>
      ) : (
        <div className="flex flex-col gap-px bg-white/10">
          {products.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between gap-4 bg-bg-alt p-4"
            >
              <div>
                <div className="text-sm font-bold uppercase">{p.name}</div>
                <div className="text-xs text-muted">
                  {p.category} · AED {p.price} ·{" "}
                  {p.inStock ? "In stock" : "Out of stock"}
                </div>
              </div>
              <div className="flex gap-3 text-xs font-semibold uppercase tracking-wider">
                <button
                  onClick={() => startEdit(p)}
                  className="text-muted hover:text-red"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="text-muted hover:text-red"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}            
