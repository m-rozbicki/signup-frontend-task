import axios, { AxiosResponse } from 'axios';
import { SignupFormValues } from '../signup/SignupForm/SignupForm.component';
import { SigninFormValues } from '../signin/SigninForm/SigninForm.component';

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

const apiClient = {
  registerUser: (values: SignupFormValues) =>
    httpClient.post<RegistrationResponse>(
      '/users/register',
      values,
    ),

  authenthicateUser: (values: SigninFormValues) =>
    httpClient.post<RegistrationResponse>(
      '/users/authenthicate',
      values,
    ),
};

export {
  apiClient,
};
