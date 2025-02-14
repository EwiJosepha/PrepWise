export type User = {
  id: string
  firstName?: string;
  lastName?: string;
  email: string;
  password?: string;
  confirmPassword?: string;
}

export type FormValues = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export type SignInValues = Pick<FormValues, 'email' | 'password'>;
