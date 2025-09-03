interface GetResizedImageUrlArgs {
  url: string;
  w?: number; // width
  h?: number; // height
  q?: "medium"; // quality
}

export function getResizedImageUrl({ url, w, h, q }: GetResizedImageUrlArgs): string | undefined {
  try {
    const resizedUrl = new URL(url);

    resizedUrl.searchParams.set("resize", "1");
    if (w) resizedUrl.searchParams.set("w", w.toFixed());
    if (h) resizedUrl.searchParams.set("h", h.toFixed());
    if (q) resizedUrl.searchParams.set("quality", q);

    return resizedUrl.toString();
  } catch (e) {
    console.error("Failed to resize image URL", e);
    return undefined;
  }
}
