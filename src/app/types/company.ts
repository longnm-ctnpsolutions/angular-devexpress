import { Department } from "./department";
import { User } from "./user"

export type Company = {
  companyID: number;
  companyName: string;
  address: string;
  phone: string;
  status: boolean;
  users: User[];
  departments: Department[];
};
