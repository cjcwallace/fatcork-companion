import * as Yup from 'yup';

// https://github.com/jquense/yup
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('An email is required')
    .required(),
  password: Yup.string()
    .required()
    .min(6, 'A password is required'),
});

export default validationSchema;
