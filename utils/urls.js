export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

export const STRIPE_PK =
  process.env.NEXT_PUBLIC_STRIPE_PK || process.env.stripePK;

/**
 * Given an image return the Url
 * Works for local and deployed strapis
 * @param {any} image
 */
export const fromImageToUrl = (image) => {
  if (!image) {
    return "/logo_png.png";
  }

  if (image.url.indexOf("/") === 0) {
    return `${API_URL}${image.url}`;
  }

  return image.url;
};

export const fromImageToUrlThumbnail = (image) => {
  if (!image) {
    return "/logo_png.png";
  }

  if (image.formats.thumbnail.url.indexOf("/") === 0) {
    return `${API_URL}${image.formats.thumbnail.url}`;
  }

  return image.url;
};

export const fromImageToUrlSmall = (image) => {
  if (!image) {
    return "/logo_png.png";
  }

  if (image.formats.small.url.indexOf("/") === 0) {
    return `${API_URL}${image.formats.small.url}`;
  }

  return image.url;
};
