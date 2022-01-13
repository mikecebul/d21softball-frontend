export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

export const STRIPE_PK =
  process.env.NEXT_STRIPE_PK ||
  process.env.NEXT_TEST_STRIPE_PK ||
  "pk_test_51JRqZfK6osQEiLfg5lTb51JBXylk2BQZ1Swy3uetaUD4HfQv8OzwjSnwxABPTkQLQ9Rn13Ek5eWXvl3lRveaG8mA00ox6GHFWv";

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
