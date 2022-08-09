import React from 'react';
import BaseApp, { AppContext, AppProps as NextAppProps } from 'next/app';

import client from '../client';

import '../styles/globals.css';
import '../styles/shared.module.css';
import '../styles/layout.css';
import '../styles/custom-properties.css';

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
  footerNavigation: {
    _id: string;
    title: string;
    page: object;
    slug: {
      current: string;
    };
  }[];
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

const siteConfigQuery = `
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

interface AppProps extends NextAppProps {
  logo: {
    asset: {
      extension: string;
      url: string;
    };
  };
}

class App extends BaseApp<AppProps> {
  static async getInitialProps({ Component, ctx }: AppContext) {
    let pageProps: { config?: ConfigProps } = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    // Add site config from sanity
    return client.fetch(siteConfigQuery).then((config: ConfigProps) => {
      if (!config) {
        return { pageProps };
      }

      if (config && pageProps) {
        pageProps.config = config;
      }

      return { pageProps };
    });
  }

  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

export default App;
