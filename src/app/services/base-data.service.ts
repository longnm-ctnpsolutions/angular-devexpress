import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Company, CompanyBase } from '../types/company';
import { Injectable } from '@angular/core';
import { SharedDataService } from './shared.service';
import { Employee } from '../types/employee';

const API_URL = 'http://localhost:5074/api';
@Injectable()
export class BaseDataService {
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

  getCompanieV2(id: number): Observable<Company> {
    return this.sharedDataService.fetchDataWithCache(
      'companyById',
      this.http.get<Company>(`${API_URL}/company/${id}`).pipe(
        map((company) => {
          const status = company.isActive ? 'Active' : 'Inactive';
          const image = this.generateRandomImage();
          const data = {
            ...company,
            status,
            image,
          };
          return data;
        })
      )
    );
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

  getEmployees(): Observable<Employee[]> {
    return this.sharedDataService.fetchDataWithCache(
      'empList',
      this.http.get<Employee[]>(`${API_URL}/user`).pipe(
        map((emps) =>
          emps.map((emp) => ({
            ...emp,
            status: emp.staffCode ? 'Active' : 'InActive',
            image: this.generateRandomImage(),
          }))
        )
      )
    );
  }

  public deleteCompany = (id: number) =>
    this.http.delete<Company>(`${API_URL}/company/${id}`);

  clearCache(key: string) {
    return this.sharedDataService.clearCache(key);
  }

  public createCompany = (companyData: CompanyBase) =>
    this.http.post<Company>(`${API_URL}/company`, companyData);

  public updateCompanyPanel = (companyData: CompanyBase, id: number) =>
    this.http.put<Company>(`${API_URL}/company/${id}`, companyData);

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
