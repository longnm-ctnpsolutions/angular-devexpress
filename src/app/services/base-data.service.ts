import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../types/company';
import { Injectable } from '@angular/core';

const API_URL = 'http://localhost:5074/api';
@Injectable()
export class BaseDataService {
  constructor(private http: HttpClient) {}

  protected get<T>(url: string): Observable<T> {
    return this.http.get<T>(`${API_URL}/`);
  }

  protected post<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(`${API_URL}/`, body);
  }

  public getCompanies = () => this.http.get<Company[]>(`${API_URL}/company`);
}
