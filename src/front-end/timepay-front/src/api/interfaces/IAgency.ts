export interface IAgencyLoginRequest {
  id: string;
  pw: string;
}

export interface IAgency {
  createdAt?: string;
  updatedAt?: string;
  organization_id?: number;
  organization_name: string;
  business_code?: string;
  employee_num: number;
  timepay: number;
  account?: string;
  pw?: string;
  authority?: string;
  image_url?: string;
  certification_url?: string;
  roles?: any[];
  authorities?: any[];
  id?: string;
  manager_name?: string;
  manager_phone?: string;
  uid: number;
}
