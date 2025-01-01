import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Company } from '../types/company';
import { Injectable } from '@angular/core';
import { SharedDataService } from './shared.service';

const API_URL = 'http://localhost:5074/api';
@Injectable()
export class BaseDataService {
  constructor(
    private http: HttpClient,
    private sharedDataService: SharedDataService
  ) {}

  protected get<T>(url: string): Observable<T> {
    return this.http.get<T>(`${API_URL}/`);
  }

  protected post<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(`${API_URL}/`, body);
  }

  public getCompanies = () => this.http.get<Company[]>(`${API_URL}/company`);

  public getCompanie = (id: number) =>
    this.http.get<Company>(`${API_URL}/company/${id}`);

  setCompanyData(data: Company | undefined) {
    this.sharedDataService.setCompanyData(data);
  }

  getCompanyData() {
    return this.sharedDataService.getCompanyData();
  }

  setCompanyList(data: Company[]) {
    this.sharedDataService.setCompanyList(data);
  }

  getCompanyList(): Company[] {
    return this.sharedDataService.getCompanyList();
  }

  generateRandomImage() {
    return this.sharedDataService.generateRandomImage();
  }
}
