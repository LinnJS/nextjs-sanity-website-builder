import React from 'react';
import { PortableText } from '@portabletext/react';
import EmbedHTML from './EmbedHTML';
import Figure from './Figure';

interface SimpleBlockContentProps {
  blocks: any[];
}

const SimpleBlockContent = ({ blocks }: SimpleBlockContentProps) => {
  if (!blocks) {
    console.error('Missing blocks');
    return null;
  }

  return (
    <PortableText
      value={blocks}
      components={{
        types: {
          // @ts-ignore
          embedHTML: EmbedHTML,
          // @ts-ignore
          figure: Figure,
        },
      }}
    />
  );
};

export default SimpleBlockContent;
