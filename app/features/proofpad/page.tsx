"use client";

import { useEffect, useState } from "react";

type Proof = {
  _id: string;
  title: string;
  imageUrl: string;
  createdAt: string;
};

function fileToDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function ProofPadPage() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [items, setItems] = useState<Proof[]>([]);
  const [submitting, setSubmitting] = useState(false);

  async function load() {
    const res = await fetch("/api/proof", { cache: "no-store" });
    const data = await res.json();
    setItems(data);
  }

  useEffect(() => {
    load();
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;
    setSubmitting(true);
    try {
      const imageUrl = await fileToDataURL(file); // convert to data URL
      const res = await fetch("/api/proof", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, imageUrl }),
      });
      setSubmitting(false);
      if (res.ok) {
        setTitle("");
        setFile(null);
        await load();
      } else {
        const j = await res.json().catch(() => ({}));
        alert(`Upload failed: ${j.error || res.status}`);
      }
    } catch (err) {
      setSubmitting(false);
      alert("Could not read file");
    }
  }

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">ProofPad</h1>

      <form onSubmit={onSubmit} className="flex flex-col gap-3 mb-8">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title (e.g., Receipt #123)"
          className="border rounded p-3"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="border rounded p-3"
          required
        />
        <button
          className="bg-black text-white rounded p-3 disabled:opacity-50"
          disabled={submitting}
        >
          {submitting ? "Uploading…" : "Upload"}
        </button>
      </form>

      <section className="grid md:grid-cols-2 gap-6">
        {items.map((p) => (
          <article key={p._id} className="border rounded-lg p-3">
            <h2 className="font-semibold mb-2">{p.title}</h2>
            <img
              src={p.imageUrl}
              alt={p.title}
              className="w-full h-auto rounded"
            />
            <p className="text-xs text-gray-500 mt-2">
              {new Date(p.createdAt).toLocaleString()}
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}
