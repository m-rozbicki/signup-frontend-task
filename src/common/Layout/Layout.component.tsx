import React from 'react';
import styles from './Layout.module.scss';

interface LayoutProps {
  title?: string;
  children?: React.ReactNode;
}

const Layout = ({ title = '', children = null }: LayoutProps) => (
  <div className={styles['layout']}>
    <div className={styles['layout__content']}>
      <h1>{title}</h1>
      <div className={styles['layout__children-container']}>{children}</div>
    </div>
  </div>
);

export default Layout;
