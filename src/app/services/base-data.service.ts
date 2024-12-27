import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = '';

export class BaseDataService {
  constructor(private http: HttpClient) {}

  protected get<T>(url: string): Observable<T> {
    return this.http.get<T>(`${API_URL}/`);
  }

  protected post<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(`${API_URL}/`, body);
  }
}
