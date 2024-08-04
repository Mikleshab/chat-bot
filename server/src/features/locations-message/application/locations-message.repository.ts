export abstract class LocationsMessageRepository {
  abstract getLocations(): Promise<object>;
}
