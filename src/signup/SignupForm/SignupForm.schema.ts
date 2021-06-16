import * as Yup from 'yup';

export const validationSchema = Yup.object({
  email: Yup.string().max(50, 'E-mail address is too long').email('Invalid e-mail address').required('E-mail is required'),
  name: Yup.string().max(50, 'Provided name is too long').matches(/[\s]/, 'Missing last name').required('Full name is required'),
  password: Yup.string().min(8, 'Password is too short').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Please confirm your password')
    .required('Please confirm your password'),
});
