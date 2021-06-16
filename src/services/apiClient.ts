import axios, { AxiosResponse } from 'axios';
import { SignupFormValues } from '../signup/SignupForm/SignupForm';

export interface RegisteredUser {
  name: string;
  email: string;
}

export interface RegistrationResponse extends AxiosResponse {
  message?: string,
  user?: RegisteredUser
}

const { REACT_APP_BACKEND_URL } = process.env;

const httpClient = axios.create({
  baseURL: REACT_APP_BACKEND_URL,
  timeout: 5000,
});

export const apiClient = {
  registerUser: (values: SignupFormValues) =>
    httpClient.post<RegistrationResponse>(
      '/users/register',
      values,
    ),

  authenthicateUser: () => {},
};
