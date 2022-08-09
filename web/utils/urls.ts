// "/product//" => "/product/"
function removeDoubleSlashes(path: string) {
  return path.replace(/\/{2,}/g, '/');
}

// "contact/" => "/contact/"
export function getPathFromSlug(slug: string) {
  return removeDoubleSlashes(`/${slug || ''}`);
}

// "/about" => "https://my-site.com/about"
export function slugToAbsUrl(slug: string, baseUrl: string) {
  return baseUrl + getPathFromSlug(slug);
}

/**
 * Transforms a single slug into an array of its possible variations.
 *
 * As editors can include leading and/or trailing slashes in routes' slugs,
 * we need to normalize them before searching routes by slug.
 */
export function getSlugVariations(slug: string) {
  const slashless = slug.replace(/\//g, '');
  return [
    slashless,
    // /slash-on-both-ends/
    `/${slashless}/`,
    // trailing/
    `${slashless}/`,
    // /leading
    `/${slashless}`,
  ];
}

export function slugParamToPath(slugParam: string | any[] | undefined) {
  // Possible slug value types:
  const slug = Array.isArray(slugParam)
    ? // - ["multiple", "paths"]
      slugParam.join('/')
    : // - "single-path"
      slugParam ||
      // - undefined -> default to "/"
      '/';
  return slug;
}
