import { GetPageableData, PageableData } from './ICommon';

export interface IGetAgencyRequest extends GetPageableData {
  query?: string;
  value?: string;
  volunteer?: string | null;
  volunteerCheck?: boolean;
  queryValue: string;
}

export interface IAgency {
  userId: number;
  id: string;
  organizationName: string;
  imageUrl: string;
  businessNumber?: string;
  managerName: string;
  managerPhone: string;
  certificationUrl?: string;
  authority: string;
  employeeNum: number;
  timepay: number;
  blackList: boolean;
}

export interface IGetAgenciesResponse extends PageableData {
  content: IAgency[];
}
