import React, { ButtonHTMLAttributes } from 'react';
import styles from './Submit.module.scss';

interface SubmitProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  status?: 'pending' | null
}

const Submit = ({
  children,
  status = null,
  ...otherProps
}: SubmitProps) => (
  <button
    type="submit"
    className={`${styles['submit']} ${status ? styles[`submit--${status}`] : ''}`}
    {...otherProps}
  >
    {children}
  </button>
);

export default Submit;
