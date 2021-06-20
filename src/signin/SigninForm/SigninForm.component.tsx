import React, { useState } from 'react';
import { Formik } from 'formik';
import { SigninValidationSchema } from './SigninForm.schema';
import { Form, FormError, Field, Submit } from '../../common/Form';

export interface SigninFormValues {
  email: string;
  password: string;
}

interface SigninFormProps {
  onSubmit: (values: SigninFormValues) => void;
  error?: string | null;
}

type FormEvent = React.FormEvent<HTMLFormElement>;
type FormHandler = (event?: FormEvent) => void;

const SigninForm = ({ onSubmit, error }: SigninFormProps) => {
  const [formTouched, setFormTouched] = useState(false);

  const beforeSubmit = (handleSubmit: FormHandler) => (event?: FormEvent) => {
    setFormTouched(true);
    handleSubmit(event);
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={SigninValidationSchema}
      onSubmit={onSubmit}
    >
      {({ touched, errors, isValid, handleSubmit, getFieldProps, isSubmitting }) => (
        <Form onSubmit={beforeSubmit(handleSubmit)}>
          <Field
            label="E-mail address"
            touched={touched.email}
            error={errors.email}
            formikProps={getFieldProps('email')}
            inputProps={{ type: 'email', required: true }}
          />

          <Field
            label="Password"
            touched={touched.password}
            error={errors.password}
            formikProps={getFieldProps('password')}
            inputProps={{ type: 'password', required: true }}
          />

          <FormError isValid={isValid} touched={formTouched} error={error} />

          <Submit status={isSubmitting ? 'pending' : null}>Continue</Submit>
        </Form>
      )}
    </Formik>
  );
};

export {
  SigninForm,
};
