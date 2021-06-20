import React, { FormHTMLAttributes } from 'react';
import styles from './Form.module.scss';

const Form = ({ children, ...otherProps }: FormHTMLAttributes<HTMLFormElement>) => (
  <form className={styles['form']} {...otherProps}>
    {children}
  </form>
);

export {
  Form,
};
