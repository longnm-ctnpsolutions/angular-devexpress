import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { Company, CompanyBase } from '../types/company';
import { Injectable } from '@angular/core';
import { SharedDataService } from './shared.service';
import { Employee, EmployeeBase } from '../types/employee';

const API_URL = 'http://localhost:5074/api';
@Injectable()
export class BaseDataService {
  companyUpdated$: Subject<void> = new Subject<void>();
  constructor(
    private http: HttpClient,
    private sharedDataService: SharedDataService
  ) {}
  public getCompanie = (id: number) =>
    this.http.get<Company>(`${API_URL}/company/${id}`);

  public getEmployeById = (id: string) =>
    this.http.get<Employee>(`${API_URL}/user/${id}`);

  setCompanyData(data: Company | undefined) {
    this.sharedDataService.setCompanyData(data);
  }

  getCompanyData() {
    return this.sharedDataService.getCompanyData();
  }

  setEmpData(data: Employee | undefined) {
    this.sharedDataService.setEmpData(data);
  }

  getEmpData() {
    return this.sharedDataService.getEmpData();
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

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${API_URL}/user`).pipe(
      map((emps) => {
        return emps.map((item) => ({
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

  public createEmp = (empData: EmployeeBase) =>
    this.http.post<Employee>(`${API_URL}/user/${empData.companyID}`, empData);

  generateRandomImage() {
    return this.sharedDataService.generateRandomImage();
  }
}
