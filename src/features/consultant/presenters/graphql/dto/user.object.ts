import { Field, ObjectType } from '@nestjs/graphql';

/**
 * Represents a user entity in the system.
 * This object holds essential information about a user, including
 * their unique identifier (`userId`), their username (`username`),
 * their full name (`fullName`), and the country they are from (`country`).
 *
 * Each user has a unique identifier which distinguishes them within the system.
 * The username is the handle the user uses, while `fullName` provides the
 * complete name of the user. The `country` field stores the location of the user.
 */
@ObjectType('UserObject', { description: 'Represents a user entity.' })
export class UserObject {
  @Field(() => Number, { description: 'Unique identifier of the user.' })
  userId: number;

  @Field(() => String, { description: 'Username of the user.' })
  username: string;

  @Field(() => String, { description: 'Full name of the user.' })
  fullName: string;

  @Field(() => String, { description: 'Country of the user.' })
  country: string;

  constructor(userId: number, username: string, fullName: string, country: string) {
    this.userId = userId;
    this.username = username;
    this.fullName = fullName;
    this.country = country;
  }
}
