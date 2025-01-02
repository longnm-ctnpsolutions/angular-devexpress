import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Company, CompanyBase } from '../types/company';
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

  getCompanies(): Observable<Company[]> {
    return this.sharedDataService.fetchDataWithCache(
      'companyList',
      this.http.get<Company[]>(`${API_URL}/company`).pipe(
        map((companies) =>
          companies.map((company) => ({
            ...company,
            status: company.isActive ? 'Active' : 'InActive',
            image: this.generateRandomImage(),
          }))
        )
      )
    );
  }

  clearCache(key: string) {
    return this.sharedDataService.clearCache(key);
  }

  public getCompanie = (id: number) =>
    this.http.get<Company>(`${API_URL}/company/${id}`);

  public createCompany = (companyData: CompanyBase) =>
    this.http.post<Company>(`${API_URL}/company`, companyData);

  public updateCompanyPanel = (companyData: CompanyBase, id: number) =>
    this.http.put<Company>(`${API_URL}/company/${id}`, companyData);

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
