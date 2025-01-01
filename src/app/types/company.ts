import { Department } from './department';
import { Employee } from './employee';

export type Company = {
  companyID: number;
  companyName: string;
  address: string;
  phone: string;
  isActive: boolean;
  email: string;
  status: string;
  industry: string;
  employees: Employee[];
  image: string;
  // departments: Department[];
};

export const companyStatusList: string[] = ['Active', 'InActive'];
export type CompanyStatus = (typeof companyStatusList)[number];

export const statusMapping: Record<string, CompanyStatus> = {
  true: 'Active',
  false: 'InActive',
};

export const reverseStatusMapping: Record<CompanyStatus, string> = {
  Active: 'true',
  InActive: 'false',
};
