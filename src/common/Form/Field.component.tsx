import React, { useState, InputHTMLAttributes } from 'react';
import { v4 as uuid } from 'uuid';
import { FieldInputProps } from 'formik';
import styles from './Field.module.scss';

interface FieldProps {
  label: string;
  touched?: boolean;
  error?: string;
  formikProps?: FieldInputProps<string | number | readonly string[] | undefined>;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
}

const Field = ({
  label,
  touched = false,
  error = '',
  formikProps,
  inputProps = {},
}: FieldProps) => {
  const [fieldId] = useState(() => uuid());

  return (
    <div className={styles['field']}>
      <div id={`form-error_${fieldId}`} className={styles['field__error']} role="alert">
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
          aria-describedby={`form-error_${fieldId}`}
          {...formikProps}
          {...inputProps}
        />
      </label>
    </div>
  );
};

export default Field;
