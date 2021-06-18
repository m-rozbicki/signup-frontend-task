import React, { useState } from 'react';
import { Formik } from 'formik';
import { SignupValidationSchema } from './SignupForm.schema';
import { Form, Field, Submit } from '../../common/Form';
import FormError from '../../common/Form/FormError.component';

export interface SignupFormValues {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

interface SignupFormProps {
  onSubmit: (values: SignupFormValues) => void;
  error?: string | null;
}

type FormEvent = React.FormEvent<HTMLFormElement>;
type FormHandler = (event?: FormEvent) => void;

const SignupForm = ({ onSubmit, error }: SignupFormProps) => {
  const [formTouched, setFormTouched] = useState(false);

  const beforeSubmit = (handleSubmit: FormHandler) => (event?: FormEvent) => {
    setFormTouched(true);
    handleSubmit(event);
  };

  return (
    <Formik
      initialValues={{
        email: '',
        name: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={SignupValidationSchema}
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
            label="Full name"
            touched={touched.name}
            error={errors.name}
            formikProps={getFieldProps('name')}
            inputProps={{ type: 'text', required: true }}
          />

          <Field
            label="Password"
            touched={touched.password}
            error={errors.password}
            formikProps={getFieldProps('password')}
            inputProps={{ type: 'password', required: true }}
          />

          <Field
            label="Confirm your password"
            touched={touched.confirmPassword}
            error={errors.confirmPassword}
            formikProps={getFieldProps('confirmPassword')}
            inputProps={{ type: 'password', required: true }}
          />

          <FormError isValid={isValid} touched={formTouched} error={error} />

          <Submit status={isSubmitting ? 'pending' : null}>Continue</Submit>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;
