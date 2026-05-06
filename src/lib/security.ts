export function isValidUrl(url: string) {
  try {
    const parsed = new URL(url);
    return ['http:', 'https:'].includes(parsed.protocol);
  } catch {
    return false;
  }
}

export function sanitizeText(text: string) {
  // Simple replacement for basic XSS prevention in text
  return text.replace(/[<>&"']/g, (m) => ({
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    '"': '&quot;',
    "'": '&#39;'
  }[m] || m));
}
