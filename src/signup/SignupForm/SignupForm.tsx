import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Field, Submit } from '../../common/Form';

interface FormValues {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid e-mail address').required('E-mail is required'),
  name: Yup.string().matches(/[\s]/, 'Missing last name').required('Full name is required'),
  password: Yup.string().min(8, 'Password is too short').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Please confirm your password')
    .required('Please confirm your password'),
});

const handleSubmit = (values: FormValues) => {
  // eslint-disable-next-line
  console.log(values);
};

const SignupForm = () => (
  <Formik
    initialValues={{
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
    }}
    validationSchema={validationSchema}
    onSubmit={handleSubmit}
  >
    {(formik) => (
      <Form onSubmit={formik.handleSubmit}>
        <Field
          label="E-mail address"
          touched={formik.touched.email}
          error={formik.errors.email}
          formikProps={formik.getFieldProps('email')}
          inputProps={{ type: 'email', required: true }}
        />

        <Field
          label="Full name"
          touched={formik.touched.name}
          error={formik.errors.name}
          formikProps={formik.getFieldProps('name')}
          inputProps={{ type: 'text', required: true }}
        />

        <Field
          label="Password"
          touched={formik.touched.password}
          error={formik.errors.password}
          formikProps={formik.getFieldProps('password')}
          inputProps={{ type: 'password', required: true }}
        />

        <Field
          label="Confirm your password"
          touched={formik.touched.confirmPassword}
          error={formik.errors.confirmPassword}
          formikProps={formik.getFieldProps('confirmPassword')}
          inputProps={{ type: 'password', required: true }}
        />

        <Submit>Continue</Submit>
      </Form>
    )}
  </Formik>
);

export default SignupForm;
