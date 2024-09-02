export class ButtonCallback<Data = unknown> {
  constructor(
    public readonly text: string,
    public readonly data: Data,
  ) {}
}
