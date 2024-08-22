import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { Type } from '@nestjs/common';

export function createInstance<T extends object>(cls: Type<T>, data: object): T {
  const instance = plainToInstance(cls, data);
  const errors = validateSync(instance);
  if (errors.length > 0) {
    throw new Error(`${cls.name} validation failed. Errors: ${JSON.stringify(errors)}`);
  }

  return instance;
}
