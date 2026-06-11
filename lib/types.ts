export type SubscriptionStatus = 'free' | 'active' | 'past_due' | 'cancelled';

export type AccountSummary = {
  user_id: string;
  plan_id: string;
  status: SubscriptionStatus;
  credits_balance: number;
  monthly_free_used: number;
  current_period_end: string | null;
};

export type GenerationHistoryItem = {
  id: string;
  product_type: string;
  scene: string;
  brand_style: string;
  seed: number;
  output_url: string | null;
  created_at: string;
};

export type BrandProfile = {
  id: string;
  name: string;
  lighting: string;
  shadow: string;
  color_palette: string;
  camera: string;
  mood: string;
  reference_notes: string | null;
  created_at: string;
};

export type DownloadRecord = {
  id: string;
  generation_id: string | null;
  file_url: string;
  created_at: string;
};
