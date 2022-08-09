import React from 'react';

interface EmbedHTMLProps {
  node: {
    html: string;
  };
}
const EmbedHTML = ({ node }: EmbedHTMLProps) => {
  const { html } = node;
  if (!html) {
    return undefined;
  }
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export default EmbedHTML;
