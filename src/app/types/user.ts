import { Role } from './role';

export const userStatusList: string[] = ['Active', 'Inactive'];

export type UserStatus = (typeof userStatusList)[number];

export type User = {
  staffCode: number;
  phone: string;
  status: UserStatus;
  fullName: string;
  departmenID: number;
  companyID: number;
  role: Role;
};
