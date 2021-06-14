import React, { InputHTMLAttributes } from 'react';
import { FieldInputProps } from 'formik';
import styles from './Field.module.scss';

interface FieldProps {
  label: string;
  formikProps: FieldInputProps<string | number | readonly string[] | undefined>;
  touched?: boolean;
  error?: string;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
}

const Field = ({
  label,
  touched = false,
  error = '',
  formikProps,
  inputProps = {},
}: FieldProps) => (
  <div className={styles['field']}>
    <div
      id={`form-error_${formikProps.name}`}
      className={styles['field__error']}
      role="alert"
      aria-label={`${label} error`}
    >
      {touched ? error : ''}
    </div>
    <label>
      {label}
      <span className={styles['field__required-asterisk']}>
        {inputProps.required ? ' *' : ''}
      </span>
      <input
        className={`${styles['field__input']} ${
          touched && error ? styles['field__input--invalid'] : ''
        }`}
        aria-invalid={touched && error ? 'true' : 'false'}
        aria-describedby={`form-error_${formikProps.name}`}
        {...formikProps}
        {...inputProps}
      />
    </label>
  </div>
);

export default Field;
