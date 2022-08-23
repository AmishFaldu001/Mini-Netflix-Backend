import { isString } from 'class-validator';
import { CustomHttpError } from '../utils/custom-http-error';

/**
 * Performs string validation.
 * @param {Object} data - Object data to pass to function.
 * @param {string} data.fieldName - human readable field name.
 * @param {string} data.value - input value to.
 * @returns string value if input value is a valid string. Else throws CustomHttpError
 */
export const stringValidator = ({
  fieldName,
  value,
}: {
  value: string;
  fieldName: string;
}): string => {
  if (isString(value)) {
    return value;
  }
  throw new CustomHttpError({
    statuscode: 400,
    message: `Please enter valid ${fieldName}`,
  });
};
