import { Department } from './department';
import { Employee } from './employee';

export type CompanyBase = {
  companyName: string;
  address: string;
  phone: string;
  email: string;
  industry: string;
  isActive: boolean;
};

export const newCompany: CompanyBase = {
  companyName: '',
  address: '',
  phone: '',
  email: '',
  industry: '',
  isActive: true,
};

export interface Company extends CompanyBase {
  companyID: number;
  companyName: string;
  address: string;
  phone: string;
  isActive: boolean;
  email: string;
  status: string;
  industry: string;
  image: string;
  employees: Employee[];
}

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
