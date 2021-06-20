import React, { useState, useCallback } from 'react';
import { AxiosError } from 'axios';
import { Link } from 'react-router-dom';
import Layout from '../../common/Layout/Layout.component';
import { apiClient } from '../../services/apiClient';
import SigninForm, { SigninFormValues } from '../SigninForm/SigninForm';
import { useAuth } from '../../services/Auth.context';

enum AxiosCode {
  TimeoutError = 'ECONNABORTED',
}

const extractMessage = (error: AxiosError) => {
  if (typeof error?.response?.data?.message === 'string') {
    return error.response.data.message;
  }

  if (error.code === AxiosCode.TimeoutError) {
    return 'Error connecting to server. Please check your connection and contact support if issues persist.';
  }

  return error.message;
};

const link = <>Not our member yet? <Link to="/signup">Click here to create new account</Link></>;

const Signin = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { login } = useAuth();

  const handleSubmit = useCallback(async (values: SigninFormValues) => {
    try {
      setErrorMessage(null);
      const response = await apiClient.authenthicateUser(values);

      const { message, user } = response.data;

      if (
        typeof user?.name !== 'string'
        || typeof user?.email !== 'string'
      ) {
        setErrorMessage(
          message
          ?? 'There was a problem with server response. Please contact support.',
        );
        return;
      }

      login(user);
    } catch (error) {
      setErrorMessage(extractMessage(error));
    }
  }, [login]);

  return (
    <Layout title="Sign in" link={link}>
      <SigninForm onSubmit={handleSubmit} error={errorMessage} />
    </Layout>
  );
};

export default Signin;
