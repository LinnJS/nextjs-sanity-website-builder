import React from 'react';
import Link from 'next/link';
import { withRouter, NextRouter } from 'next/router';

import styles from './Footer.module.css';
import SimpleBlockContent from './SimpleBlockContent';
import { getPathFromSlug, slugParamToPath } from '../utils/urls';

interface WithRouterProps {
  router: NextRouter;
}

interface FooterProps extends WithRouterProps {
  text: any;
  navItems: {
    _id: string;
    title: string;
    slug: {
      current: string;
    };
  }[];
}

const Footer = ({ navItems, text, router }: FooterProps) => {
  return (
    <div className={styles.root}>
      <nav>
        <ul className={styles.items}>
          {navItems &&
            navItems.map((item) => {
              const isActive = slugParamToPath(router.query.slug) === item.slug.current;
              return (
                <li key={item._id} className={styles.item}>
                  <Link href={getPathFromSlug(item.slug.current)}>
                    <a data-is-active={isActive ? 'true' : 'false'} aria-current={isActive}>
                      {item.title}
                    </a>
                  </Link>
                </li>
              );
            })}
        </ul>
      </nav>
      <div className={styles.text}>
        <SimpleBlockContent blocks={text} />
      </div>
    </div>
  );
};

export default withRouter(Footer);
