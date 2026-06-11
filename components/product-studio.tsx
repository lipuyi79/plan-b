'use client';

import { useMemo, useState } from 'react';
import { Download, Loader2, UploadCloud } from 'lucide-react';

import { brandStyles, seedPool } from '@/lib/config';

const marketplaces = ['shopify', 'amazon', 'etsy', 'dtc'] as const;

export function ProductStudio() {
  const [productDataUrl, setProductDataUrl] = useState<string>('');
  const [backgroundUrl, setBackgroundUrl] = useState<string>('');
  const [generationId, setGenerationId] = useState<string>('');
  const [productType, setProductType] = useState('ceramic mug');
  const [scene, setScene] = useState('premium kitchen countertop with soft morning window light');
  const [brandStyle, setBrandStyle] = useState('luxury-minimal');
  const [seedIndex, setSeedIndex] = useState(0);
  const [marketplace, setMarketplace] = useState<(typeof marketplaces)[number]>('shopify');
  const [reflection, setReflection] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRecordingDownload, setIsRecordingDownload] = useState(false);
  const [downloadMessage, setDownloadMessage] = useState('');
  const [error, setError] = useState('');
  const selectedStyle = useMemo(
    () => brandStyles.find((style) => style.id === brandStyle) ?? brandStyles[0],
    [brandStyle],
  );

  async function handleUpload(file: File) {
    const reader = new FileReader();
    reader.onload = () => setProductDataUrl(String(reader.result));
    reader.readAsDataURL(file);
  }

  async function generateBackground() {
    setError('');
    setDownloadMessage('');
    setIsGenerating(true);

    try {
      const response = await fetch('/api/generate-background', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productDataUrl,
          productType,
          scene,
          brandStyle,
          seedIndex,
          marketplace,
          reflection,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error ?? 'Generation failed.');
      }

      setBackgroundUrl(result.imageUrl);
      setGenerationId(result.generationId ?? '');
    } catch (generationError) {
      setError(generationError instanceof Error ? generationError.message : 'Generation failed.');
    } finally {
      setIsGenerating(false);
    }
  }

  async function recordDownload() {
    if (!backgroundUrl) return;

    setIsRecordingDownload(true);
    setDownloadMessage('');

    try {
      const response = await fetch('/api/downloads/record', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ generationId, fileUrl: backgroundUrl }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error ?? 'Could not record download.');
      }

      setDownloadMessage('Download recorded in your dashboard.');
      window.open(backgroundUrl, '_blank', 'noopener,noreferrer');
    } catch (downloadError) {
      setError(downloadError instanceof Error ? downloadError.message : 'Could not record download.');
    } finally {
      setIsRecordingDownload(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[420px_1fr]">
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h1 className="text-2xl font-semibold tracking-tight">Product Photo Studio</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Upload the real product, lock it as the product layer, then generate only the background. This prevents warped logos, handles, caps, labels, and packaging.
        </p>

        <label className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 px-5 py-8 text-center hover:bg-slate-100">
          <UploadCloud className="mb-3 text-brand" />
          <span className="font-semibold">Upload product image</span>
          <span className="mt-1 text-sm text-slate-500">PNG or JPG. Transparent PNG is best.</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void handleUpload(file);
            }}
          />
        </label>

        <div className="mt-5 space-y-4">
          <label className="block text-sm font-medium">
            Product type
            <input
              value={productType}
              onChange={(event) => setProductType(event.target.value)}
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2"
            />
          </label>

          <label className="block text-sm font-medium">
            Photography template / scene
            <textarea
              value={scene}
              onChange={(event) => setScene(event.target.value)}
              rows={3}
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2"
            />
          </label>

          <label className="block text-sm font-medium">
            Brand DNA
            <select
              value={brandStyle}
              onChange={(event) => setBrandStyle(event.target.value)}
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2"
            >
              {brandStyles.map((style) => (
                <option key={style.id} value={style.id}>
                  {style.name}
                </option>
              ))}
            </select>
          </label>

          <div className="rounded-md bg-slate-50 p-3 text-xs leading-5 text-slate-600">
            <strong className="text-slate-900">Saved DNA:</strong> lighting {selectedStyle.dna.lighting}, color {selectedStyle.dna.color}, camera {selectedStyle.dna.camera}, mood {selectedStyle.dna.mood}.
          </div>

          <div className="grid grid-cols-2 gap-3">
            <label className="block text-sm font-medium">
              Seed pool
              <select
                value={seedIndex}
                onChange={(event) => setSeedIndex(Number(event.target.value))}
                className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2"
              >
                {seedPool.map((seed, index) => (
                  <option key={seed} value={index}>
                    Seed {seed}
                  </option>
                ))}
              </select>
            </label>

            <label className="block text-sm font-medium">
              Channel
              <select
                value={marketplace}
                onChange={(event) => setMarketplace(event.target.value as (typeof marketplaces)[number])}
                className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2"
              >
                {marketplaces.map((item) => (
                  <option key={item} value={item}>
                    {item.toUpperCase()}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="flex items-center gap-2 text-sm font-medium">
            <input type="checkbox" checked={reflection} onChange={(event) => setReflection(event.target.checked)} />
            Reflection Engine for glass, cosmetics, perfume, and bottles
          </label>

          <button
            type="button"
            disabled={!productDataUrl || isGenerating}
            onClick={() => void generateBackground()}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-brand px-4 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isGenerating ? <Loader2 className="animate-spin" size={18} /> : null}
            Generate background only
          </button>

          {error ? <p className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}
          {downloadMessage ? <p className="rounded-md bg-emerald-50 p-3 text-sm text-emerald-700">{downloadMessage}</p> : null}
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold">Locked product composite</h2>
            <p className="text-sm text-slate-600">Background changes. Product pixels stay untouched.</p>
          </div>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">Product locked</span>
        </div>

        <div className="relative aspect-square overflow-hidden rounded-lg bg-slate-100">
          {backgroundUrl ? (
            <img src={backgroundUrl} alt="Generated ecommerce background" className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#ffffff,#e5e7eb_45%,#dbeafe)]" />
          )}

          <div className="grounding-shadow" />

          {productDataUrl ? (
            <>
              <img
                src={productDataUrl}
                alt="Locked original product"
                className="locked-product-shadow absolute left-1/2 top-[48%] z-10 max-h-[58%] max-w-[58%] -translate-x-1/2 -translate-y-1/2 object-contain"
              />
              {reflection ? (
                <img
                  src={productDataUrl}
                  alt="Generated reflection layer"
                  className="reflection-layer absolute left-1/2 top-[64%] max-h-[42%] max-w-[58%] -translate-x-1/2 object-contain"
                />
              ) : null}
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-center text-slate-500">
              Upload a product to lock the product layer.
            </div>
          )}
        </div>

        {backgroundUrl ? (
          <button
            type="button"
            onClick={() => void recordDownload()}
            disabled={isRecordingDownload}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-ink px-4 py-3 font-semibold text-white disabled:opacity-60"
          >
            {isRecordingDownload ? <Loader2 className="animate-spin" size={18} /> : <Download size={18} />}
            Download and record
          </button>
        ) : null}

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <div className="rounded-md bg-slate-50 p-4">
            <p className="font-semibold">No product redraw</p>
            <p className="mt-1 text-sm text-slate-600">AI is told to create environment only.</p>
          </div>
          <div className="rounded-md bg-slate-50 p-4">
            <p className="font-semibold">Grounding shadow</p>
            <p className="mt-1 text-sm text-slate-600">Adds contact so products do not float.</p>
          </div>
          <div className="rounded-md bg-slate-50 p-4">
            <p className="font-semibold">Fixed style seed</p>
            <p className="mt-1 text-sm text-slate-600">Keeps SKU batches visually consistent.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
