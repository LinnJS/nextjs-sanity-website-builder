import React, { Fragment, ReactElement } from 'react';
import * as SectionComponents from './sections';
import capitalizeString from '../utils/capitalizeString';
import Mailchimp from './sections/Mailchimp';

type SectionProps = {
  _type: string;
  _key: string;
  _id: string;
  section: ReactElement;
};

interface RenderSectionsProps {
  sections: SectionProps[];
}

function resolveSections(section: SectionProps) {
  // @ts-ignore
  const Section = SectionComponents[capitalizeString(section._type)];

  if (section._type === 'mailchimp') {
    return Mailchimp;
  }

  if (Section) {
    return Section;
  }

  console.error('Cant find section', section); // eslint-disable-line no-console
  return null;
}

const RenderSections = ({ sections }: RenderSectionsProps) => {
  if (!sections) {
    console.error('Missing section');
    return <div>Missing sections</div>;
  }

  return (
    <Fragment>
      {sections.map((section) => {
        const SectionComponent = resolveSections(section);
        if (!SectionComponent) {
          return <div>Missing section {section._type}</div>;
        }
        return <SectionComponent {...section} key={section._key} />;
      })}
    </Fragment>
  );
};

export default RenderSections;
