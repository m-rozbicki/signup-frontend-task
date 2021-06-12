import React, { ButtonHTMLAttributes } from 'react';
import styles from './Submit.module.scss';

const Submit = ({ children, ...otherProps }: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button type="submit" className={styles['submit']} {...otherProps}>
    {children}
  </button>
);

export default Submit;
