import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Field, Submit } from '../../common/Form';
import FormError from '../../common/Form/FormError.component';

interface SignupFormValues {
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

const onSubmit = (values: SignupFormValues) => {
  // eslint-disable-next-line
  console.log(values);
};

const SignupForm = () => {
  const [touched, setTouched] = useState(false);

  const handleSubmit = (
    handler: (event?: React.FormEvent<HTMLFormElement> | undefined) => void,
    event?: React.FormEvent<HTMLFormElement> | undefined,
  ) => {
    setTouched(true);
    handler(event);
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
      {(formik) => (
        <Form onSubmit={(event) => handleSubmit(formik.handleSubmit, event)}>
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

          <FormError isValid={formik.isValid} touched={touched} />

          <Submit>Continue</Submit>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;
