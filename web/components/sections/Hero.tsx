import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

import Cta from '../Cta';
import client from '../../client';
import styles from './Hero.module.css';
import SimpleBlockContent from '../SimpleBlockContent';

function urlFor(source: SanityImageSource) {
  return imageUrlBuilder(client).image(source);
}

interface HeroProps {
  heading: string;
  backgroundImage: SanityImageSource;
  tagline: any[];
  ctas: any[];
}

const Hero = ({ heading, backgroundImage, tagline, ctas }: HeroProps) => {
  const style = backgroundImage
    ? {
        backgroundImage: `url("${urlFor(backgroundImage).width(2000).auto('format').url()}")`,
      }
    : {};

  return (
    <div className={styles.root} style={style}>
      <div className={styles.content}>
        <h1 className={styles.title}>{heading}</h1>
        <div className={styles.tagline}>{tagline && <SimpleBlockContent blocks={tagline} />}</div>
        {ctas && (
          <div className={styles.ctas}>
            {ctas.map((cta) => (
              <Cta {...cta} key={cta._key} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
