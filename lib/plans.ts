export type Tariff = {
  id: string;
  name: string;
  price: string;
  comparePrice: string | null;
  days: string;
  unlimited: boolean;
  coins: string | null;
  savings: string | null;
  savingsVersus: string | null;
  features: string[];
  color: string;
  popular: boolean;
  purchasable: boolean;
  free: boolean;
};

type ApiPlan = {
  id?: unknown;
  name?: unknown;
  days?: unknown;
  unlimited?: unknown;
  price?: unknown;
  comparePrice?: unknown;
  attributes?: unknown;
  iconColors?: { primary?: unknown };
  popular?: unknown;
  purchasable?: unknown;
  dailyCoins?: unknown;
  savings?: { amount?: unknown; versusName?: unknown } | null;
};

const PLANS_URL = "https://metatest.app/api/payments/plans";

function fa(value: number) {
  return value.toLocaleString("fa-IR");
}

function hex(value: unknown, fallback: string) {
  return typeof value === "string" && /^#[0-9a-fA-F]{6}$/.test(value) ? value : fallback;
}

function attributeLabel(value: unknown) {
  if (typeof value === "string" && value.trim()) return value.trim();
  if (!value || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;
  for (const key of ["title", "name", "label", "text"]) {
    const item = record[key];
    if (typeof item === "string" && item.trim()) return item.trim();
  }
  return null;
}

function toTariff(value: unknown): Tariff | null {
  if (!value || typeof value !== "object") return null;
  const plan = value as ApiPlan;
  if (typeof plan.id !== "string" || typeof plan.name !== "string" || typeof plan.price !== "number") return null;

  const unlimited = plan.unlimited === true || plan.days == null;
  const features: string[] = [];
  if (Array.isArray(plan.attributes)) {
    for (const attribute of plan.attributes) {
      const label = attributeLabel(attribute);
      if (label) features.push(label);
    }
  }
  const savings = plan.savings;
  const hasSavings =
    !!savings && typeof savings.amount === "number" && typeof savings.versusName === "string" && savings.versusName.trim().length > 0;

  return {
    id: plan.id,
    name: plan.name,
    price: fa(plan.price),
    comparePrice: typeof plan.comparePrice === "number" ? fa(plan.comparePrice) : null,
    days: unlimited ? "نامحدود" : typeof plan.days === "number" ? `${fa(plan.days)} روز` : "",
    unlimited,
    coins: typeof plan.dailyCoins === "number" ? `روزانه ${fa(plan.dailyCoins)} سکه` : null,
    savings: hasSavings && savings && typeof savings.amount === "number" ? `صرفه‌جویی ${fa(savings.amount)} تومان` : null,
    savingsVersus: hasSavings && savings && typeof savings.versusName === "string" ? savings.versusName.trim() : null,
    features,
    color: hex(plan.iconColors?.primary, "#c4b5fd"),
    popular: plan.popular === true,
    purchasable: plan.purchasable !== false,
    free: plan.price === 0,
  };
}

/** Live package list. Prices stay out of the page when the request fails. */
export async function getTariffs(): Promise<Tariff[]> {
  try {
    const response = await fetch(PLANS_URL, { next: { revalidate: 3600 } });
    if (!response.ok) return [];
    const body = (await response.json()) as { data?: unknown };
    if (!Array.isArray(body.data)) return [];
    return body.data.flatMap((item) => {
      const tariff = toTariff(item);
      return tariff ? [tariff] : [];
    });
  } catch {
    return [];
  }
}
