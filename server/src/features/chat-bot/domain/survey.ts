export class Survey {
  constructor(
    private readonly clientId: string,
    private readonly formTitle: string,
    private readonly formUrl: string,
  ) {
  }

  getMessage(): string {
    return `Пройдите пожалуйста опрос [${this.formTitle}](${this.formUrl}?clientId=${this.clientId})`;
  }
}