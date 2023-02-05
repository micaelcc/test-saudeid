import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'validateOrderByFilter', async: false })
export class ValidateOrderByFilter implements ValidatorConstraintInterface {
  validate(data: string) {
    return ['createdAt', 'updatedAt', 'id'].includes(data);
  }

  defaultMessage() {
    return 'orderBy must be a valid field: ["createdAt", "updatedAt", "id"]';
  }
}

@ValidatorConstraint({ name: 'validateStatusFilter', async: false })
export class ValidateStatusFilter implements ValidatorConstraintInterface {
  validate(data: string) {
    return ['ok', 'canceled'].includes(data);
  }

  defaultMessage() {
    return 'status must be a valid field: ["ok", "canceled"]';
  }
}
