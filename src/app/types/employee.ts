import { Role } from './role';

export const userStatusList: string[] = ['Active', 'Inactive'];

export type EmployeeStatus = (typeof userStatusList)[number];

export type Employee = {
  staffCode: string;
  phone: string;
  status: EmployeeStatus;
  fullName: string;
  departmenID: number;
  companyName: string;
  companyID: number | null;
  role: Role;
  image: string;
};
export type EmployeeBase = {
  companyID: string | number;
  fullName: string;
  phone: string;
};
export const newEmployee: EmployeeBase = {
  companyID: '',
  fullName: '',
  phone: '',
};
