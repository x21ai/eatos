// @ts-nocheck
'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  Globe,
  Loader2,
  Package,
  Save,
  Sparkles,
  Trash2,
} from 'lucide-react';
import { toast } from 'sonner';
import RichTextEditor from '@/components/admin/RichTextEditor';

function totalForVariant(stock, variantId) {
  const row = stock?.[variantId];
  if (!row) return 0;
  return Object.values(row).reduce((sum, qty) => sum + (Number(qty) || 0), 0);
}

export default function ShopProductEditor() {
  const params = useParams();
  const slug = params?.slug;
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [newLocationName, setNewLocationName] = useState('');

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/shop/products/${slug}?detail=1`)
      .then((r) => r.json())
      .then((j) => {
        if (j.error) throw new Error(j.message);
        setForm(j.data);
      })
      .catch((err) => toast.error(err.message));
  }, [slug]);

  const locations = form?.stock_locations || [];

  const stockLevelsPayload = useMemo(() => {
    if (!form?.variants || !form?.stock) return [];
    const levels = [];
    for (const variant of form.variants) {
      for (const location of locations) {
        levels.push({
          variant_id: variant.id,
          location_id: location.id,
          quantity: form.stock?.[variant.id]?.[location.id] ?? 0,
        });
      }
    }
    return levels;
  }, [form?.variants, form?.stock, locations]);

  function updateStock(variantId, locationId, quantity) {
    setForm((prev) => ({
      ...prev,
      stock: {
        ...prev.stock,
        [variantId]: {
          ...(prev.stock?.[variantId] || {}),
          [locationId]: Math.max(0, Number(quantity) || 0),
        },
      },
    }));
  }

  async function save() {
    setSaving(true);
    try {
      const res = await fetch(`/api/shop/products/${slug}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title,
          new_slug: form.slug,
          description_html: form.description_html,
          price_amount: form.price_amount === '' ? null : Number(form.price_amount),
          currency: form.currency || 'USD',
          status: form.status,
          available: form.available,
          vendor: form.vendor,
          product_type: form.product_type,
          seo_title: form.seo_title,
          seo_description: form.seo_description,
        }),
      });
      const json = await res.json();
      if (!res.ok || json.error) throw new Error(json.message || 'Save failed');

      const stockRes = await fetch(`/api/shop/products/${slug}/stock`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ levels: stockLevelsPayload }),
      });
      const stockJson = await stockRes.json();
      if (!stockRes.ok || stockJson.error) {
        throw new Error(stockJson.message || 'Stock save failed');
      }

      const refreshed = await fetch(`/api/shop/products/${json.data.slug}?detail=1`).then((r) =>
        r.json(),
      );
      if (refreshed.data) setForm(refreshed.data);

      toast.success('Product saved');
      if (json.data.slug !== slug) window.location.href = `/admin/shop/${json.data.slug}`;
    } catch (err) {
      toast.error(err.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  }

  async function remove() {
    if (!confirm('Delete this product?')) return;
    const res = await fetch(`/api/shop/products/${slug}`, { method: 'DELETE' });
    if (!res.ok) {
      toast.error('Delete failed');
      return;
    }
    toast.success('Deleted');
    window.location.href = '/admin/shop';
  }

  async function suggestWithMaya() {
    setAiLoading(true);
    const toastId = toast.loading('Maya is drafting SEO…');
    try {
      const res = await fetch('/api/ai/product-catalog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title,
          description_html: form.description_html,
          vendor: form.vendor,
          product_type: form.product_type,
        }),
      });
      const json = await res.json();
      if (!res.ok || json.error) throw new Error(json.message || 'AI suggestion failed');

      setForm((prev) => ({
        ...prev,
        seo_title: json.data.seo_title || prev.seo_title,
        seo_description: json.data.seo_description || prev.seo_description,
        description_html: json.data.description_html || prev.description_html,
      }));
      toast.success(json.data.ai_used ? 'Suggestions ready — review before saving' : 'Draft suggestions ready (no API key)');
    } catch (err) {
      toast.error(err.message || 'AI suggestion failed');
    } finally {
      toast.dismiss(toastId);
      setAiLoading(false);
    }
  }

  async function addLocation() {
    const name = newLocationName.trim();
    if (!name) {
      toast.error('Enter a location name');
      return;
    }
    try {
      const res = await fetch('/api/shop/stock-locations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      const json = await res.json();
      if (!res.ok || json.error) throw new Error(json.message || 'Could not add location');

      const location = json.data;
      setForm((prev) => {
        const nextStock = { ...prev.stock };
        for (const variant of prev.variants || []) {
          nextStock[variant.id] = {
            ...(nextStock[variant.id] || {}),
            [location.id]: 0,
          };
        }
        return {
          ...prev,
          stock_locations: [...(prev.stock_locations || []), location],
          stock: nextStock,
        };
      });
      setNewLocationName('');
      toast.success(`Location “${location.name}” added`);
    } catch (err) {
      toast.error(err.message || 'Could not add location');
    }
  }

  if (!form) {
    return (
      <div className="min-h-screen bg-[#050505] text-white p-8 pt-32 flex justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <header className="fixed top-0 left-0 right-0 h-16 bg-[#0A0A0A] border-b border-white/5 flex items-center justify-between px-6 z-50">
        <div className="flex items-center gap-4 min-w-0">
          <a
            href="/admin/shop"
            className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400 hover:text-white"
          >
            <ArrowLeft size={20} />
          </a>
          <h1 className="font-semibold text-lg truncate">{form.title}</h1>
          <span
            className={`px-2 py-0.5 rounded text-xs border capitalize ${
              form.status === 'published'
                ? 'bg-green-500/10 text-green-500 border-green-500/20'
                : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
            }`}
          >
            {form.status || 'draft'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={remove}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-zinc-300 hover:bg-white/5"
          >
            <Trash2 size={14} /> Delete
          </button>
          <button
            type="button"
            onClick={save}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-semibold"
          >
            {saving ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />}
            Save
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 pt-24 pb-16 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
        <div className="space-y-6">
          <div className="bg-[#111] rounded-xl border border-white/10 p-5 space-y-4">
            <h2 className="font-semibold text-white">Product details</h2>
            {[
              ['title', 'Title'],
              ['slug', 'Slug'],
              ['vendor', 'Vendor / brand'],
              ['product_type', 'Product type'],
              ['currency', 'Currency'],
              ['status', 'Status'],
            ].map(([key, label]) => (
              <label key={key} className="block text-xs uppercase tracking-[0.16em] text-zinc-500">
                {label}
                <input
                  value={form[key] ?? ''}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm text-white"
                />
              </label>
            ))}

            <label className="block text-xs uppercase tracking-[0.16em] text-zinc-500">
              Price (major units, e.g. 59)
              <input
                type="number"
                value={form.price_amount ?? ''}
                onChange={(e) => setForm({ ...form, price_amount: e.target.value })}
                className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm text-white"
              />
            </label>

            <label className="flex items-center gap-3 text-sm text-zinc-300">
              <input
                type="checkbox"
                checked={Boolean(form.available)}
                onChange={(e) => setForm({ ...form, available: e.target.checked })}
              />
              Available for purchase
            </label>
          </div>

          <div className="bg-[#111] rounded-xl border border-white/10 p-5 space-y-3">
            <h2 className="font-semibold text-white">Description</h2>
            <RichTextEditor
              value={form.description_html ?? ''}
              onChange={(html) => setForm({ ...form, description_html: html })}
            />
          </div>

          <div className="bg-[#111] rounded-xl border border-white/10 p-5 space-y-4">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-semibold text-white flex items-center gap-2">
                <Package size={16} className="text-zinc-400" />
                Stock by location
              </h2>
              <span className="text-xs text-zinc-500">Counts per variant · saved with product</span>
            </div>

            {(form.variants || []).length === 0 ? (
              <p className="text-sm text-zinc-500">No variants yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="text-zinc-500 border-b border-white/10">
                      <th className="py-2 pr-4 font-medium">Variant</th>
                      {locations.map((loc) => (
                        <th key={loc.id} className="py-2 px-2 font-medium whitespace-nowrap">
                          {loc.name}
                          {loc.is_default ? (
                            <span className="ml-1 text-[10px] text-zinc-600">(default)</span>
                          ) : null}
                        </th>
                      ))}
                      <th className="py-2 pl-2 font-medium">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {form.variants.map((variant) => (
                      <tr key={variant.id} className="border-b border-white/5">
                        <td className="py-3 pr-4">
                          <div className="font-medium text-white">{variant.title}</div>
                          {variant.sku ? (
                            <div className="text-xs text-zinc-500">SKU {variant.sku}</div>
                          ) : null}
                        </td>
                        {locations.map((loc) => (
                          <td key={loc.id} className="py-3 px-2">
                            <input
                              type="number"
                              min="0"
                              value={form.stock?.[variant.id]?.[loc.id] ?? 0}
                              onChange={(e) => updateStock(variant.id, loc.id, e.target.value)}
                              className="w-20 rounded-lg border border-white/10 bg-black px-2 py-1.5 text-sm text-white"
                            />
                          </td>
                        ))}
                        <td className="py-3 pl-2 text-zinc-300">
                          {totalForVariant(form.stock, variant.id)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="flex flex-wrap items-end gap-2 pt-2 border-t border-white/10">
              <label className="flex-1 min-w-[180px] text-xs uppercase tracking-[0.16em] text-zinc-500">
                Add stock location
                <input
                  value={newLocationName}
                  onChange={(e) => setNewLocationName(e.target.value)}
                  placeholder="e.g. Downtown commissary"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black px-3 py-2 text-sm text-white"
                />
              </label>
              <button
                type="button"
                onClick={addLocation}
                className="rounded-full border border-white/15 px-4 py-2 text-sm hover:bg-white/5"
              >
                Add location
              </button>
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="bg-[#111] rounded-xl border border-white/10 p-5 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-semibold text-white flex items-center gap-2">
                <Globe size={16} className="text-zinc-400" />
                Search & sharing
              </h2>
              <button
                type="button"
                onClick={suggestWithMaya}
                disabled={aiLoading}
                className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/10 px-3 py-1.5 text-xs font-medium text-brand-on-dark hover:bg-brand/20 disabled:opacity-50"
              >
                {aiLoading ? (
                  <Loader2 className="animate-spin" size={12} />
                ) : (
                  <Sparkles size={12} />
                )}
                Maya suggest
              </button>
            </div>
            <p className="text-xs text-zinc-500">
              AI drafts SEO title and description from your product copy. Review and edit before saving.
            </p>

            <label className="block text-xs uppercase tracking-[0.16em] text-zinc-500">
              SEO title
              <input
                value={form.seo_title ?? ''}
                onChange={(e) => setForm({ ...form, seo_title: e.target.value })}
                placeholder={form.title}
                className="mt-2 w-full rounded-xl border border-white/10 bg-black px-3 py-2 text-sm text-white"
              />
            </label>

            <label className="block text-xs uppercase tracking-[0.16em] text-zinc-500">
              SEO description
              <textarea
                rows={4}
                value={form.seo_description ?? ''}
                onChange={(e) => setForm({ ...form, seo_description: e.target.value })}
                placeholder="Short summary for search and link previews…"
                className="mt-2 w-full rounded-xl border border-white/10 bg-black px-3 py-2 text-sm text-white"
              />
            </label>
          </div>

          {(form.images || []).length > 0 ? (
            <div className="bg-[#111] rounded-xl border border-white/10 p-5 space-y-3">
              <h2 className="font-semibold text-white">Gallery</h2>
              <div className="grid grid-cols-2 gap-2">
                {form.images.map((img) => (
                  <div key={img.id} className="rounded-lg overflow-hidden border border-white/10">
                    <img src={img.url} alt={img.alt || form.title} className="w-full h-24 object-cover" />
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </aside>
      </div>
    </div>
  );
}
