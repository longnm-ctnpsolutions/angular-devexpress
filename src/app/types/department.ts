import { Employee } from './employee';

export type Department = {
  departmentID: number;
  departmentName: string;
  companyID: number;
  companyName: string;
  employees: Employee[];
};
