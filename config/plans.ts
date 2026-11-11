export type Plan = {
  id: string;
  name: string;
  price: string | null;
  period: string | null;
  description: string | null;
  features: string[];
  cta: string;
  featured: boolean;
};

/**
 * Published tariffs only.
 * Keep empty until name, price, period, and benefits are supplied by the owner.
 * The homepage section shows a designed awaiting state while this array is empty.
 */
export const plans: Plan[] = [];
