// @ts-nocheck
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Loader2, Save, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export default function ShopProductEditor() {
  const params = useParams();
  const slug = params?.slug;
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/shop/products/${slug}`)
      .then((r) => r.json())
      .then((j) => {
        if (j.error) throw new Error(j.message);
        setForm(j.data);
      })
      .catch((err) => toast.error(err.message));
  }, [slug]);

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
        }),
      });
      const json = await res.json();
      if (!res.ok || json.error) throw new Error(json.message || 'Save failed');
      setForm(json.data);
      toast.success('Saved');
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

  if (!form) {
    return (
      <div className="min-h-screen bg-[#050505] text-white p-8 pt-32">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 pt-32">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl font-bold tracking-tight">Edit product</h1>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={remove}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm"
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
        </div>

        {[
          ['title', 'Title'],
          ['slug', 'Slug'],
          ['vendor', 'Vendor'],
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

        <label className="block text-xs uppercase tracking-[0.16em] text-zinc-500">
          Description HTML
          <textarea
            rows={8}
            value={form.description_html ?? ''}
            onChange={(e) => setForm({ ...form, description_html: e.target.value })}
            className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm text-white"
          />
        </label>

        <label className="flex items-center gap-3 text-sm text-zinc-300">
          <input
            type="checkbox"
            checked={Boolean(form.available)}
            onChange={(e) => setForm({ ...form, available: e.target.checked })}
          />
          Available
        </label>
      </div>
    </div>
  );
}
