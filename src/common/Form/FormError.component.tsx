import React from 'react';
import styles from './FormError.module.scss';

interface FormErrorProps {
  isValid: boolean;
  touched: boolean;
  error?: string | null;
}

const FormError = ({ touched, isValid, error }: FormErrorProps) => (
  <div className={styles['form-error']} aria-label="Form error" role="alert">
    {touched && !isValid && 'Form contains errors.'}
    {touched && isValid && error}
  </div>
);

export default FormError;
