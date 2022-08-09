export default {
  type: 'object',
  name: 'mailchimp',
  title: 'MailChimp newsletter signup',
  fields: [
    {
      name: 'heading',
      type: 'string',
      title: 'Heading',
    },
    {
      name: 'subtitle',
      type: 'string',
      title: 'Subheading',
    },
    {
      name: 'actionUrl',
      type: 'url',
      title: 'URL to MailChimp signup',
      description:
        'URL for the MailChimp signup form. Remember to add your domain in your mailchimp settings to avoid CORS errors.',
    },
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({ title }) {
      return {
        title,
        subtitle: 'MailChimp newsletter signup section',
      };
    },
  },
};
