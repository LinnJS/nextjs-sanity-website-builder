import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

import Cta from '../Cta';
import client from '../../client';
import SimpleBlockContent from '../SimpleBlockContent';
import styles from './ImageSection.module.css';

const builder = imageUrlBuilder(client);

interface ImageSectionProps {
  heading: string;
  label: string;
  text: any[];
  image: SanityImageSource;
  cta: any;
}

const ImageSection = ({ heading, label, text, image, cta }: ImageSectionProps) => {
  if (!image) {
    return null;
  }

  return (
    <div className={styles.root}>
      <figure className={styles.content}>
        <img src={builder.image(image).auto('format').width(2000).url()} className={styles.image} alt={heading} />
        <figcaption>
          <div className={styles.caption}>
            <div className={styles.captionBox}>
              <div className={styles.label}>{label}</div>
              <h2 className={styles.title}>{heading}</h2>
              {text && <SimpleBlockContent blocks={text} />}
              {cta && cta.route && <Cta {...cta} />}
            </div>
          </div>
        </figcaption>
      </figure>
    </div>
  );
};

export default ImageSection;
