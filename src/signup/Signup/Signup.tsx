import React from 'react';
import Layout from '../../common/Layout/Layout.component';
import SignupForm, { SignupFormValues } from '../SignupForm/SignupForm';

const handleSubmit = (values: SignupFormValues) => {
  // eslint-disable-next-line
  console.log(values);
};

const Signup = () => (
  <Layout title="Sign up">
    <SignupForm onSubmit={handleSubmit} />
  </Layout>
);

export default Signup;
