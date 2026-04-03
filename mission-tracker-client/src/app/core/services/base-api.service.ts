import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Abstract: cannot be injected or used directly
// Forces every subclass to declare its own baseUrl
@Injectable()
export abstract class BaseApiService {

  // Subclasses must provide this
  protected abstract readonly baseUrl: string;

  constructor(protected http: HttpClient) {}

  // Encapsulated HTTP methods — subclasses call these, never http directly
  protected get<T>(path = ''): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${path}`);
  }

  protected post<T>(path = '', body: unknown): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${path}`, body);
  }

  protected patch<T>(path = '', body: unknown): Observable<T> {
    return this.http.patch<T>(`${this.baseUrl}${path}`, body);
  }

  protected delete<T>(path = ''): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${path}`);
  }
}