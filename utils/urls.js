export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

export const STRIPE_PK = process.env.stripePK;

/**
 * Given an image return the Url
 * Works for local and deployed strapis
 * @param {any} image
 */
export const fromImageToUrl = (image) => {
  if (!image) {
    return "/vercel.svg";
  }

  if (image.url.indexOf("/") === 0) {
    return `${API_URL}${image.url}`;
  }

  return image.url;
};
