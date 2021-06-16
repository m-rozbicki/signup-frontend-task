import React, { useState, useCallback } from 'react';
import { AxiosError } from 'axios';
import Layout from '../../common/Layout/Layout.component';
import { apiClient } from '../../services/apiClient';
import SignupForm, { SignupFormValues } from '../SignupForm/SignupForm';
import { ThankYou } from './ThankYou.component';

interface RegisteredUser {
  name: string;
  email: string;
}

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

const Signup = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [registeredUser, setRegisteredUser] = useState<RegisteredUser | null>(null);

  const handleSubmit = useCallback(async (values: SignupFormValues) => {
    try {
      setErrorMessage(null);
      const response = await apiClient.registerUser(values);

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

      setRegisteredUser(user);
    } catch (error) {
      setErrorMessage(extractMessage(error));
    }
  }, []);

  return (
    <Layout title="Sign up">
      {
        registeredUser
          ? <ThankYou user={registeredUser} />
          : <SignupForm onSubmit={handleSubmit} error={errorMessage} />
      }
    </Layout>
  );
};

export default Signup;
