import React, { useState, useCallback } from 'react';
import { AxiosError } from 'axios';
import Layout from '../../common/Layout/Layout.component';
import { apiClient } from '../../services/apiClient';
import SignupForm, { SignupFormValues } from '../SignupForm/SignupForm';

enum AxiosCode {
  TimeoutError = 'ECONNABORTED',
}

const extractMessage = (error: AxiosError) => {
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }

  if (error.code === AxiosCode.TimeoutError) {
    return 'Error connecting to server. Please check your connection and contact support if issues persist.';
  }

  return error.message;
};

const Signup = () => {
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = useCallback(async (values: SignupFormValues) => {
    try {
      setErrorMessage(null);
      await apiClient.registerUser(values);
    } catch (error) {
      setErrorMessage(extractMessage(error));
    }
  }, []);

  return (
    <Layout title="Sign up">
      <SignupForm onSubmit={handleSubmit} error={errorMessage} />
    </Layout>
  );
};

export default Signup;
