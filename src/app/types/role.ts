import { Permission } from './permission';

export type Role = {
  roleID: number;
  roleName: string;
  permissions: Permission[];
};
