import axios from 'axios';
import { SignupFormValues } from '../signup/SignupForm/SignupForm';

const { REACT_APP_BACKEND_URL } = process.env;

const httpClient = axios.create({
  baseURL: REACT_APP_BACKEND_URL,
  timeout: 5000,
});

export const apiClient = {
  registerUser: (values: SignupFormValues) => httpClient.post(
    '/users/register',
    values,
  ),

  authenthicateUser: () => {},
};
