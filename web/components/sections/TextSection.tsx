import React from 'react';
import SimpleBlockContent from '../SimpleBlockContent';
import styles from './TextSection.module.css';

interface TextSectionProps {
  heading: string;
  label: string;
  text: any[];
}

const TextSection = ({ heading, label, text }: TextSectionProps) => {
  return (
    <div className={styles.root}>
      <section className={styles.article}>
        <div className={styles.label}>{label}</div>
        <h2 className={styles.heading}>{heading}</h2>
        {text && <SimpleBlockContent blocks={text} />}
      </section>
    </div>
  );
};

export default TextSection;
