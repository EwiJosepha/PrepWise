
import * as Yup from 'yup';

const SignUpValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First name is required')
    .min(2, 'first name must be minimum 2 characters')
    .max(50, ('first name must be maximum 50 characters')),

  lastName: Yup.string()
    .required('First name is required')
    .min(2, 'first name must be minimum 2 characters')
    .max(50, ('first name must be maximum 50 characters')),

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

export { SignUpValidationSchema };

export type SignUpType = Yup.InferType<typeof SignUpValidationSchema>;
