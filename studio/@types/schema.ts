import type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
} from 'sanity-codegen';

export type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
};

/**
 * Page
 *
 *
 */
export interface Page extends SanityDocument {
  _type: 'page';

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Page sections — `array`
   *
   *
   */
  content?: Array<SanityKeyed<Hero> | SanityKeyed<ImageSection> | SanityKeyed<Mailchimp> | SanityKeyed<TextSection>>;

  /**
   * Description — `text`
   *
   * This description populates meta-tags on the webpage
   */
  description?: string;

  /**
   * Open Graph Image — `image`
   *
   * Image for sharing previews on Facebook, Twitter etc.
   */
  openGraphImage?: {
    _type: 'image';
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };
}

/**
 * Route
 *
 *
 */
export interface Route extends SanityDocument {
  _type: 'route';

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: 'slug'; current: string };

  /**
   * page — `reference`
   *
   * Select the page that this route should point to
   */
  page?: SanityReference<Page>;

  /**
   * Include page in sitemap — `boolean`
   *
   * For search engines. Will be added to /sitemap.xml
   */
  includeInSitemap?: boolean;

  /**
   * Disallow in robots.txt — `boolean`
   *
   * Hide this route for search engines
   */
  disallowRobots?: boolean;
}

/**
 * Site configuration
 *
 *
 */
export interface SiteConfig extends SanityDocument {
  _type: 'site-config';

  /**
   * Site title — `string`
   *
   *
   */
  title?: string;

  /**
   * URL — `url`
   *
   * The main site url. Used to create canonical url
   */
  url?: string;

  /**
   * frontpage — `reference`
   *
   * Choose page to be the frontpage
   */
  frontpage?: SanityReference<Page>;

  /**
   * Site language — `string`
   *
   * Should be a valid bcp47 language code like en, en-US, no or nb-NO
   */
  lang?: string;

  /**
   * Brand logo — `image`
   *
   * Best choice is to use an SVG where the color are set with currentColor
   */
  logo?: {
    _type: 'image';
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;

    /**
     * Alternative text — `string`
     *
     * Important for SEO and accessiblity.
     */
    alt?: string;
  };

  /**
   * Main navigation — `array`
   *
   * Select pages for the top menu
   */
  mainNavigation?: Array<SanityKeyedReference<Route>>;

  /**
   * Footer navigation items — `array`
   *
   *
   */
  footerNavigation?: Array<SanityKeyedReference<Route>>;

  /**
   * footerText — `simplePortableText`
   *
   *
   */
  footerText?: SimplePortableText;
}

export type Cta = {
  _type: 'cta';
  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Internal link — `reference`
   *
   * Use this to link between pages on the website
   */
  route?: SanityReference<Route>;

  /**
   * External link — `url`
   *
   *
   */
  link?: string;
};

export type EmbedHTML = {
  _type: 'embedHTML';
  /**
   * HTML — `text`
   *
   * You usually want to avoid storing freeform HTML, but for embed codes it can be useful.
   */
  html?: string;
};

export type Figure = {
  _type: 'figure';
  asset: SanityReference<SanityImageAsset>;
  crop?: SanityImageCrop;
  hotspot?: SanityImageHotspot;

  /**
   * Caption — `string`
   *
   *
   */
  caption?: string;

  /**
   * Alternative text — `string`
   *
   * Important for SEO and accessiblity.
   */
  alt?: string;
};

export type Hero = {
  _type: 'hero';
  /**
   * Heading — `string`
   *
   *
   */
  heading?: string;

  /**
   * Tagline — `simplePortableText`
   *
   *
   */
  tagline?: SimplePortableText;

  /**
   * Background image — `image`
   *
   *
   */
  backgroundImage?: {
    _type: 'image';
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Call to actions — `array`
   *
   *
   */
  ctas?: Array<SanityKeyed<Cta>>;
};

export type ImageSection = {
  _type: 'imageSection';
  /**
   * Heading — `string`
   *
   *
   */
  heading?: string;

  /**
   * Label — `string`
   *
   *
   */
  label?: string;

  /**
   * Text — `simplePortableText`
   *
   *
   */
  text?: SimplePortableText;

  /**
   * Image — `figure`
   *
   *
   */
  image?: Figure;

  /**
   * Call to action — `cta`
   *
   *
   */
  cta?: Cta;
};

export type InternalLink = SanityReference<Page | Route>;

export type Link = {
  _type: 'link';
  /**
   * URL — `url`
   *
   *
   */
  href?: string;
};

export type Mailchimp = {
  _type: 'mailchimp';
  /**
   * Heading — `string`
   *
   *
   */
  heading?: string;

  /**
   * Subheading — `string`
   *
   *
   */
  subtitle?: string;

  /**
   * URL to Mailchimp signup — `url`
   *
   * URL for the Mailchimp signup form. Remember to add your domain in your mailchimp settings to avoid CORS errors.
   */
  actionUrl?: string;
};

export type PortableText = Array<SanityKeyed<SanityBlock> | SanityKeyed<Figure> | SanityKeyed<EmbedHTML>>;

export type SimplePortableText = Array<SanityKeyed<SanityBlock> | SanityKeyed<EmbedHTML>>;

export type TextSection = {
  _type: 'textSection';
  /**
   * Label — `string`
   *
   *
   */
  label?: string;

  /**
   * Heading — `string`
   *
   *
   */
  heading?: string;

  /**
   * Text — `portableText`
   *
   *
   */
  text?: PortableText;
};

export type Documents = Page | Route | SiteConfig;
