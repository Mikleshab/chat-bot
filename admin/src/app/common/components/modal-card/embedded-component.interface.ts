import { Observable } from "rxjs";

export interface EmbedComponentInterface<Response> extends Record<string, any> {
  close(): Observable<Response>;
}