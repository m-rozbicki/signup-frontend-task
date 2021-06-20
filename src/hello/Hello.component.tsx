import React from 'react';
import { Submit } from '../common/Form';
import { Layout } from '../common/Layout/Layout.component';
import { useAuth } from '../services/Auth.context';
import styles from './Hello.module.scss';

const Hello = () => {
  const { user, logout } = useAuth();
  const [userName] = (user?.name ?? '').split(' ');

  return (
    <Layout title={`Hello, ${userName}`}>
      <div className={styles['hello']}>
        <div>
          <div className={styles['hello__wave']}>👋</div>
        </div>
        <div>Thanks for checking in but you can only log out here.</div>
        <div>
          <Submit onClick={() => { logout(); }}>
            Logout
          </Submit>
        </div>
      </div>
    </Layout>
  );
};

export {
  Hello,
};
