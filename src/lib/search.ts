export function normalizeQuery(value: string | null | undefined) {
  return value?.trim() ?? "";
}

export function buildExploreUrl(lang: "en" | "km", params: Record<string, string | number | undefined>) {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") search.set(key, String(value));
  }
  const query = search.toString();
  return `/${lang}/explore${query ? `?${query}` : ""}`;
}
