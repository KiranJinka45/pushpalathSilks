export function getProductImage(product: any) {
  const images = product?.product_images || [];
  const sorted = [...images].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
  return sorted[0]?.image_url || "";
}

export function getProductImages(product: any) {
  return [...(product?.product_images || [])]
    .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
    .map((img) => img.image_url)
    .filter(Boolean);
}
