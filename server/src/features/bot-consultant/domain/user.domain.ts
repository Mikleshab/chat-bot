export class UserDomain {
  constructor(
    public readonly userId: number,
    public readonly username: string,
    public readonly fullName: string,
    public readonly country: string,
  ) {}
}
