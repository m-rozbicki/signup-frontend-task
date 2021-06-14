import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
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
}

type FormEvent = React.FormEvent<HTMLFormElement>;
type FormHandler = (event?: FormEvent) => void;

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid e-mail address').required('E-mail is required'),
  name: Yup.string().matches(/[\s]/, 'Missing last name').required('Full name is required'),
  password: Yup.string().min(8, 'Password is too short').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Please confirm your password')
    .required('Please confirm your password'),
});

const SignupForm = ({ onSubmit }: SignupFormProps) => {
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
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ touched, errors, isValid, handleSubmit, getFieldProps }) => (
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

          <FormError isValid={isValid} touched={formTouched} />

          <Submit>Continue</Submit>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;
