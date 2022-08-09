import React from 'react';
import Head from 'next/head';
import { LogoJsonLd } from 'next-seo';

import type { ConfigProps } from '../pages/_app';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  config: ConfigProps;
}

const Layout = (props: LayoutProps) => {
  const { config, children } = props;

  if (!config) {
    console.error('Missing config');
    return <div>Missing config</div>;
  }

  const { title, mainNavigation, footerNavigation, footerText, logo, url } = config;
  const logoUrl = logo && logo.asset && logo.asset.url;

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width, viewport-fit=cover" />
      </Head>
      <div className="container">
        <Header title={title} navItems={mainNavigation} logo={logo} />
        <div className="content">{children}</div>
        <Footer navItems={footerNavigation} text={footerText} />
        {logoUrl && url && <LogoJsonLd url={url} logo={logoUrl} />}
      </div>
    </>
  );
};

export default Layout;
