import React from 'react';
import styles from './FormError.module.scss';

interface FormErrorProps {
  isValid: boolean;
  touched: boolean;
}

const FormError = ({ touched, isValid }: FormErrorProps) => (
  <div className={styles['form-error']} aria-label="Form error" role="alert">
    {touched && !isValid && 'Form contains errors'}
  </div>
);

export default FormError;
