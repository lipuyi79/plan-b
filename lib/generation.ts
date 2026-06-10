import { z } from 'zod';

import { brandStyles, seedPool } from './config';

export const generationRequestSchema = z.object({
  productDataUrl: z.string().min(20),
  productType: z.string().min(2).max(80),
  brandStyle: z.string().default('luxury-minimal'),
  scene: z.string().min(4).max(240),
  seedIndex: z.number().int().min(0).max(seedPool.length - 1).default(0),
  reflection: z.boolean().default(false),
  marketplace: z.enum(['shopify', 'amazon', 'etsy', 'dtc']).default('shopify'),
});

export type GenerationRequest = z.infer<typeof generationRequestSchema>;

export function getBrandDna(styleId: string) {
  return brandStyles.find((style) => style.id === styleId) ?? brandStyles[0];
}

export function buildBackgroundPrompt(input: GenerationRequest) {
  const style = getBrandDna(input.brandStyle);
  const seed = seedPool[input.seedIndex];
  const reflectionInstruction = input.reflection
    ? 'include a realistic glossy tabletop reflection zone where the locked product can be composited later'
    : 'include a matte surface with a clear grounding area for contact shadow compositing';

  return [
    `Commercial ecommerce product photography background for a ${input.productType}.`,
    `Scene: ${input.scene}.`,
    `Marketplace fit: ${input.marketplace}.`,
    `Brand DNA: lighting ${style.dna.lighting}; shadow ${style.dna.shadow}; color ${style.dna.color}; camera ${style.dna.camera}; mood ${style.dna.mood}.`,
    reflectionInstruction,
    'Important: generate only the environment/background and surface. Do not draw, invent, or repaint the product. Leave a clean center placement area for the original product PNG layer.',
    'Photorealistic studio lighting, correct perspective, realistic surface texture, no fake AI artifacts, no text, no logos, no extra objects blocking the product area.',
    `Use fixed creative seed family ${seed} for brand consistency.`,
  ].join(' ');
}
