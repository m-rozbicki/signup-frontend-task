import * as Yup from 'yup';

export const SigninValidationSchema = Yup.object({
  email: Yup.string().email('Invalid e-mail address').required('E-mail is required'),
  password: Yup.string().required('Password is required'),
});
