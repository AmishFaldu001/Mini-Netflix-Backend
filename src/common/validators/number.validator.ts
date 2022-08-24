import { isNumberString } from 'class-validator';
import { CustomHttpError } from '../utils/custom-http-error';

/**
 * Performs number validation.
 * @param {Object} data - Object data to pass to function.
 * @param {string} data.fieldName - human readable field name.
 * @param {string} data.value - input value to validate.
 * @returns number value if input value is a valid number. Else throws CustomHttpError
 */
export const numberValidator = ({
  fieldName,
  value,
}: {
  value: string;
  fieldName: string;
}): number => {
  if (isNumberString(value) && parseInt(value) > 0) {
    return parseInt(value);
  }
  throw new CustomHttpError({
    statuscode: 400,
    message: `Please enter valid ${fieldName}`,
  });
};
