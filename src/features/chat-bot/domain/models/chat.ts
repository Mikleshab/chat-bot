export class Chat {
  constructor(
    public readonly id: number,
    public readonly type: 'private' | 'public',
  ) {}
}
