export abstract class AccidentMessageRepository {
  abstract getAccidentPreventions(): Promise<object>;
}
