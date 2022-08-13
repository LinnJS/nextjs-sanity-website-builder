/* eslint-disable @typescript-eslint/no-unused-vars */
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import groq from 'groq';
import imageUrlBuilder from '@sanity/image-url';

import client from '../client';
import Layout from '../components/Layout';
import RenderSections from '../components/RenderSections';
import { getSlugVariations, slugParamToPath } from '../utils/urls';

interface FooterNavigationProps {
  _id: string;
  title: string;
  page: object;
  slug: {
    current: string;
  };
}

export interface ConfigProps {
  _id: string;
  _rev: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  title: string;
  mainNavigation: {
    _id: string;
    _rev: string;
    _type: string;
    title: string;
    slug: {
      current: string;
    };
  }[];
  footerNavigation: FooterNavigationProps[];
  footerText: {
    _key: string;
    _type: string;
    title: string;
    slug: string;
    children: any[];
    markDefs: any[];
    style: string;
  }[];
  logo: {
    logo: string;
    title: string;
    asset: {
      url: string;
      extension?: string;
    };
  };
  url: string;
}

const pageFragment = groq`
...,
content[] {
  ...,
  cta {
    ...,
    route->
  },
  ctas[] {
    ...,
    route->
  }
}`;

const siteConfigQuery = groq`
  *[_id == "global-config"] {
    ...,
    logo {asset->{extension, url}},
    mainNavigation[] -> {
      ...,
      "title": page->title
    },
    footerNavigation[] -> {
      ...,
      "title": page->title
    }
  }[0]
  `;

/**
 * Fetches data for our pages.
 *
 * The [[...slug]] name for this file is intentional - it means Next will run this getServerSideProps
 * for every page requested - /, /about, /contact, etc..
 * From the received params.slug, we're able to query Sanity for the route corresponding to the currently requested path.
 */

interface ServerProps extends GetServerSideProps {
  params: {
    slug: string;
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { allRoutesSlugs } = await client.fetch(groq`{
    // get all documents that are type of route as long as they are not a draft
    "allRoutesSlugs": *[
      _type == "route" &&
      !(_id in path("drafts.**"))
    ].slug.current,
  }`);

  const allRoutes = allRoutesSlugs.map((slug: string) => (slug === '/' ? '/' : `/${slug}`));

  return {
    paths: allRoutes,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (props) => {
  const slug = slugParamToPath(props.params?.slug);
  const config = await client.fetch(siteConfigQuery);

  let data;

  // Frontpage - fetch the linked `frontpage` from the global configuration document.
  if (slug === '/') {
    data = await client
      .fetch(
        groq`
        *[_id == "global-config"][0]{
          frontpage -> {
            ${pageFragment}
          }
        }
      `
      )
      .then((res) => (res?.frontpage ? { ...res.frontpage, slug } : undefined));
  } else {
    // Regular route
    data = await client
      .fetch(
        // Get the route document with one of the possible slugs for the given requested path
        groq`*[_type == "route" && slug.current in $possibleSlugs][0]{
          page-> {
            ${pageFragment}
          }
        }`,
        { possibleSlugs: getSlugVariations(slug) }
      )
      .then((res) => (res?.page ? { ...res.page, slug } : undefined));
  }

  if (data?._type !== 'page') {
    return {
      notFound: true,
    };
  }

  return {
    props: data || {},
  };
};

const builder = imageUrlBuilder(client);

interface LandingPageProps {
  title?: string;
  description: string;
  slug: string;
  disallowRobots: boolean;
  openGraphImage: any;
  content?: any[];
  config: ConfigProps;
}

const LandingPage = ({ content, openGraphImage, ...rest }: LandingPageProps) => {
  const openGraphImages = openGraphImage
    ? [
        {
          url: builder.image(openGraphImage).width(800).height(600).url(),
          width: 800,
          height: 600,
          alt: rest.title,
        },
        {
          // Facebook recommended size
          url: builder.image(openGraphImage).width(1200).height(630).url(),
          width: 1200,
          height: 630,
          alt: rest.title,
        },
        {
          // Square 1:1
          url: builder.image(openGraphImage).width(600).height(600).url(),
          width: 600,
          height: 600,
          alt: rest.title,
        },
      ]
    : [];

  return (
    <>
      {/* <NextSeo
        title={title}
        titleTemplate={`%s | ${config.title}`}
        description={description}
        canonical={config.url && `${config.url}/${slug}`}
        openGraph={{
          images: openGraphImages,
        }}
        noindex={disallowRobots}
      /> */}
      {content && <RenderSections sections={content} />}
    </>
  );
};

export default LandingPage;
