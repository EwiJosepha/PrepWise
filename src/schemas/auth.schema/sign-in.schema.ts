
import * as Yup from 'yup';

const SignInValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),

  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be more than 8 characters ')
    .matches(/[a-z]/, 'Must contain lower case character')
    .matches(/[A-Z]/, 'Must contain upper case character')
    .matches(/[0-9]/, 'Must include a number')
    .matches(/[\W_]/, 'Must include a special character'),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Password must match')
    .required(' Confirm Password is Required'),
});

export { SignInValidationSchema };

export type SignUpType = Yup.InferType<typeof SignInValidationSchema>;
