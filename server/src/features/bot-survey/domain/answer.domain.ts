export class AnswerDomain {
  constructor(
    public readonly userId: number,
    public readonly login: string,
    public readonly name: string,
    public readonly question: string,
    public readonly answer: string,
  ) {}
}
