import React from 'react';
import { RegisteredUser } from '../../services/apiClient';
import styles from './ThankYou.module.scss';

interface ThankYouProps {
  user: RegisteredUser
}

const ThankYou = ({ user } : ThankYouProps) => (
  <div className={styles['thank-you']} role="status" aria-label="Thank You">
    <div>
      <div className={styles['thank-you__ok-hand']}>👌</div>
    </div>
    <div>
      Thank you for registering<br />
      <strong>{ user.name }</strong><br />
      We would send an activation email to<br />
      <strong>{ user.email }</strong><br />
    </div>
    <div>
      Unfortunately this is just a mock 🤷
    </div>
  </div>
);

export {
  ThankYou,
};
