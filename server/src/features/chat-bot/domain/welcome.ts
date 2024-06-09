export class Welcome {
  constructor(
    private readonly name: string,
    private readonly textLines: string[]
  ) {
  }

  getMessage(): string {
    const [firstLine, secondLine] = this.textLines;
    return `${firstLine}, ${this.name}.\n${secondLine}`;
  }
}