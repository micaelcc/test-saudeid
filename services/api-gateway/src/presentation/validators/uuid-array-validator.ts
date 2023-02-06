import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import isUUID from 'validator/lib/isUUID';

@ValidatorConstraint({ name: 'validateArray', async: false })
export class ValidateUUIDArray implements ValidatorConstraintInterface {
  validate(data: string[]) {
    const isNotUUID = data?.some((id) => !isUUID(id));

    return !isNotUUID;
  }

  defaultMessage() {
    return 'array of uuid must be provided';
  }
}
