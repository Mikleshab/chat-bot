export class QuestionDomain {
  static create(userId: number, username: string, firstname: string, text: string, date: number): QuestionDomain {
    return new QuestionDomain(userId, username, firstname, text, date);
  }

  constructor(
    public readonly userId: number,
    public readonly username: string,
    public readonly firstname: string,
    public readonly text: string,
    public readonly date: number,
  ) {}
}
