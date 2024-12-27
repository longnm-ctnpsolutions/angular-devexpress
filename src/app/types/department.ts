import { User } from './user';

export type Department = {
  departmentID: number;
  departmentName: string;
  companyID: number;
  companyName: string;
  users: User[];
};
