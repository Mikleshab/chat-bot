import { Expose, instanceToPlain, plainToClass } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString, validateSync } from 'class-validator';

export class Member {
  @IsNumber()
  @Expose()
  readonly userId!: number;

  @IsBoolean()
  @Expose()
  readonly isBot!: boolean;

  @IsString()
  @IsOptional()
  @Expose()
  readonly username?: string;

  @IsString()
  @IsOptional()
  @Expose()
  readonly firstname?: string;

  @IsString()
  @IsOptional()
  @Expose()
  readonly lastname?: string;

  @IsNumber()
  @Expose()
  readonly date!: number;

  static create(data: object): Member {
    const message = plainToClass(Member, data);
    const errors = validateSync(message);
    if (errors.length > 0) {
      throw new Error(`MessageDomain validation failed. Errors: ${JSON.stringify(errors)}`);
    }

    return message;
  }

  toObject(): object {
    return instanceToPlain(this, { exposeUnsetFields: false });
  }
}
