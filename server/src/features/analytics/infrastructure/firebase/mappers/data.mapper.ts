import { Data } from '@features/analytics/domain/value-objects/data';

export class DataMapper {
  static toDomain(doc: any): Data {
    return new Data(doc.date.toMillis());
  }
}
