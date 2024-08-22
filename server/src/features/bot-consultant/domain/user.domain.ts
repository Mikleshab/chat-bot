export class UserDomain {
  constructor(
    public readonly userId: string,
    public readonly username: string,
    public readonly fullName: string,
    public readonly country: string,
  ) {}
}
