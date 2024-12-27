import { Role } from './role';

export type User = {
  staffCode: number;
  phone: string;
  fullName: string;
  departmenID: number;
  companyID: number;
  role: Role;
};
