import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Company, CompanyBase } from '../types/company';
import { Injectable } from '@angular/core';
import { SharedDataService } from './shared.service';
import { Employee } from '../types/employee';

const API_URL = 'http://localhost:5074/api';
@Injectable()
export class BaseDataService {
  companyUpdated$: any;
  constructor(
    private http: HttpClient,
    private sharedDataService: SharedDataService
  ) {}
  public getCompanie = (id: number) =>
    this.http.get<Company>(`${API_URL}/company/${id}`);

  setCompanyData(data: Company | undefined) {
    this.sharedDataService.setCompanyData(data);
  }

  getCompanyData() {
    return this.sharedDataService.getCompanyData();
  }

  notifyCompanyUpdated() {
    return this.sharedDataService.notifyCompanyUpdated();
  }

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(`${API_URL}/company`).pipe(
      map((companies) => {
        return companies.map((item) => ({
          ...item,
          image: this.generateRandomImage(),
        }));
      })
    );
  }

  public deleteCompany = (id: number) =>
    this.http.delete<Company>(`${API_URL}/company/${id}`);

  public createCompany = (companyData: CompanyBase) =>
    this.http.post<Company>(`${API_URL}/company`, companyData);

  public updateCompanyPanel = (companyData: CompanyBase, id: number) =>
    this.http.put<Company>(`${API_URL}/company/${id}`, companyData);

  generateRandomImage() {
    return this.sharedDataService.generateRandomImage();
  }
}
