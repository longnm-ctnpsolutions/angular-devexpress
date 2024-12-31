import { HttpClient } from '@angular/common/http';
import { BaseDataService } from './base-data.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../types/employee';

// user.service.ts
@Injectable({
  providedIn: 'root',
})
export class EmployeeService extends BaseDataService {
  constructor(http: HttpClient) {
    super(http);
  }

  getUsers(): Observable<User[]> {
    return this.get<User[]>('/api/users');
  }

  createUser(user: User): Observable<User> {
    return this.post<User>('/api/users', user);
  }
}
