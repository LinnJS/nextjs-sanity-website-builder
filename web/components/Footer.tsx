import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { withRouter } from 'next/router';
import styles from './Footer.module.css';
import SimpleBlockContent from './SimpleBlockContent';
import { getPathFromSlug, slugParamToPath } from '../utils/urls';

interface FooterProps {
  text: any;
  router: {
    pathname: string;
    events: any;
    query: {
      slug?: string;
    };
  };
  navItems: {
    _id: string;
    title: string;
    slug: {
      current: string;
    };
  }[];
}

const Footer = (props: FooterProps) => {
  const { navItems, text, router } = props;
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

Footer.propTypes = {
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      slug: PropTypes.shape({
        current: PropTypes.string,
      }),
    })
  ),
  text: PropTypes.arrayOf(PropTypes.object),
  router: PropTypes.shape({
    pathname: PropTypes.string,
    query: PropTypes.shape({
      slug: PropTypes.array,
    }),
  }),
};

// @ts-ignore
export default withRouter(Footer);
