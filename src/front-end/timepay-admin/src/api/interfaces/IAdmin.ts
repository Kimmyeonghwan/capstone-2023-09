import { GetPageableData, PageableData } from './ICommon';

export interface IAdmin {
  createdAt: string;
  updatedA?: string;
  adminId: number;
  adminName: string;
  password: string;
  authority?: string;
  name: string;
  email: string;
  phone: string;
  first: boolean;
  inquiryAnswers: any[];
}
export interface IGetAdminRequest extends GetPageableData {
  adminId?: string;
}
export interface IGetAdminResponse extends PageableData {
  content: IAdmin[];
}
