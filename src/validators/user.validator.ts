import * as Yup from 'yup';
import { CreateUserModel } from '../models/user.model';
import { UserRole } from '@prisma/client';

const CreateUserValidator: Yup.ObjectSchema<CreateUserModel> = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      'Password must contain at least 8 characters, one uppercase, one number and one special character'
    ),
  firstName: Yup.string().optional(),
  lastName: Yup.string().optional(),
  phoneNumber: Yup.string().optional(),
  phoneCountryCode: Yup.string().optional(),
  role: Yup.mixed<UserRole>().optional(),
});

export default CreateUserValidator;
