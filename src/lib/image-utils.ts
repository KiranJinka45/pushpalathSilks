export function normalizeImageUrl(url?: string | null) {
  if (!url) return "/placeholder-saree.jpg";

  return url
    .replace("yxcotimyhjvxxpyusic.supabase.co", "yxcotimyhjvvxxpyusic.supabase.co")
    .replace("yxcotimyhjvwxpyusic.supabase.co", "yxcotimyhjvvxxpyusic.supabase.co");
}

export function getSellingPrice(price: number, discountAmount?: number | null) {
  return discountAmount && discountAmount > 0 ? price - discountAmount : price;
}

export function getDiscountPercent(price: number, discountAmount?: number | null) {
  if (!discountAmount || discountAmount <= 0 || discountAmount >= price) return 0;
  return Math.round((discountAmount / price) * 100);
}

export function formatINR(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}
