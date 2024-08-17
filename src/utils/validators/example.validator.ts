import * as yup from 'yup';
export type YupValidatorErrorType = yup.ValidationError;

export const validationSchema = yup.object().shape({
  example: yup.string(),
});
