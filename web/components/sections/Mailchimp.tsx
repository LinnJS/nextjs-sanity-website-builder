// @ts-ignore
import MailchimpForm from 'react-mailchimp-form';

import styles from './Mailchimp.module.css';

interface MailChimpProps {
  heading: string;
  subtitle: string;
  actionUrl: string;
}

const Mailchimp = ({ heading, subtitle, actionUrl }: MailChimpProps) => {
  return (
    <section className={styles.root}>
      <div className={styles.container}>
        <h2 className={styles.heading}>{heading}</h2>
        <p className={styles.subtitle}>{subtitle}</p>
        {actionUrl && (
          <MailchimpForm
            action={actionUrl}
            fields={[
              {
                name: 'EMAIL',
                placeholder: 'Email',
                type: 'email',
                className: styles.email,
                required: true,
              },
            ]}
            buttonClassName={styles.button}
            styles={{
              sendingMsg: {
                color: '#0652DD',
              },
              successMsg: {
                color: '#009432',
              },
              duplicateMsg: {
                color: '#EE5A24',
              },
              errorMsg: {
                color: 'red',
              },
            }}
            messages={{
              sending: 'Sending...',
              success: 'Thank you for subscribing!',
              error: 'An unexpected internal error has occurred.',
              empty: 'You must write an e-mail.',
              duplicate: 'Already subscribed',
              button: 'Subscribe!',
            }}
            className={styles.form}
          />
        )}
      </div>
    </section>
  );
};

export default Mailchimp;
