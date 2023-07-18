import { IAdmin } from './IAdmin';

export interface ILoginRequest {
  adminName: string;
  password: string;
}

export interface ILoginResponse {
  admin: IAdmin;
  jwt: string;
}
