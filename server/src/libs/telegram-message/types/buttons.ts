export type MessageKeyboardButtons = MessageKeyboardUrlButton | MessageKeyboardCallbackButton<unknown>;

export class MessageKeyboardUrlButton {
  constructor(
    public readonly text: string,
    public readonly url: string,
  ) {}
}

export class MessageKeyboardCallbackButton<T> {
  constructor(
    public readonly text: string,
    public readonly data: T,
  ) {}
}

export const isUrlButton = (button: MessageKeyboardButtons): button is MessageKeyboardUrlButton => 'url' in button;

export const isCallbackButton = (button: MessageKeyboardButtons): button is MessageKeyboardCallbackButton<unknown> =>
  'data' in button;
