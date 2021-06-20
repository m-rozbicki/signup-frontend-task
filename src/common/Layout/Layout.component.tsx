import React from 'react';
import { Logo } from '../Logo/Logo.compontent';
import styles from './Layout.module.scss';

interface LayoutProps {
  title?: string;
  link?: React.ReactNode;
  children?: React.ReactNode;
}

const Layout = ({ title = '', link = '', children = null }: LayoutProps) => (
  <div className={styles['layout']}>
    <div className={styles['layout__container']}>
      <div className={styles['layout__logo']}>
        <Logo />
      </div>
      <main className={styles['layout__content']}>
        <h1>{title}</h1>
        <div className={styles['layout__children-container']}>{children}</div>
        <div className={styles['layout__link']}>{link}</div>
      </main>
    </div>
  </div>
);

export default Layout;
