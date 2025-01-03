import { Role } from './role';

export const userStatusList: string[] = ['Active', 'Inactive'];

export type EmployeeStatus = (typeof userStatusList)[number];

export type Employee = {
  staffCode: string;
  phone: string;
  status: EmployeeStatus;
  fullName: string;
  departmenID: number;
  companyID: number;
  role: Role;
};
