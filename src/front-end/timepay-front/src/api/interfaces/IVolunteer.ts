import { PageableData } from './ICommon';

export interface IVolunteerBoard {
  boardId: number;
  title: string;
  organizationName: string;
  managerName: string;
  managerPhone: string;
  volunteerTime: number;
  state: boolean;
  certificationUrl?: string | null;
}

export interface IVolunteerBoardInfo {
  title: string;
  location: string;
  startTime: string;
  endTime: string;
  participateNum: number;
}

export interface IVolunteerUser {
  userId: number;
  userName: string;
  userNickname: string;
  email: string;
  phone: string;
  certificationUrl?: string | null;
  published: boolean;
}

export interface IVolunteerInfo {
  title: string;
  location: string;
  startTime: string;
  endTime: string;
  participateNum: number;
  volunteerTime?: number;
}

export interface IParticipateUser {
  userId: number;
  userName: string;
  userNickname: string;
  email: string;
  phone: string;
  certificationUrl: string;
  published: boolean;
}

export interface IParticipateUsers extends PageableData {
  content: IParticipateUser[];
}
export interface IGetMyPageCertificateResponse {
  volunteerInfo: IVolunteerInfo;
  participateUsers: IParticipateUsers;
}

export interface ICertification {
  boardId: number;
  title: string;
  organizationName: string;
  managerName: string;
  managerPhone: string;
  volunteerTime: number;
  state: boolean;
  certificationUrl: string;
}

export interface ICertificationList extends PageableData {
  content: ICertification[];
}

export interface IGetMyCertificateResponse {
  totalTime: number;
  certificationListPage: ICertificationList;
}
