import React, { ReactNode } from 'react';

import { RuleType } from '../../@types';

interface LinkRenderProps {
  children: ReactNode;
}

const LinkRender = ({ children }: LinkRenderProps) => <span>{children} 🌍</span>;

export default {
  title: 'URL',
  name: 'link',
  type: 'object',
  fields: [
    {
      title: 'URL',
      name: 'href',
      type: 'url',
      validation: (Rule: RuleType) =>
        Rule.uri({
          allowRelative: true,
          scheme: ['https', 'http', 'mailto', 'tel'],
        }),
    },
  ],
  blockEditor: {
    icon: () => '🌍',
    render: LinkRender,
  },
};
