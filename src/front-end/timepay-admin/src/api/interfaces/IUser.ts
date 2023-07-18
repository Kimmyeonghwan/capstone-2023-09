import { GetPageableData, PageableData } from './ICommon';

export interface IUser {
  userPk: number;
  name: string; // 이름
  sex: string; // 성별
  birthday: string; // 생년월일
  profileImage?: string;
  nickname: string;
  region: string;
  profileMessage?: string;
  phoneNumber: string;
  createdAt: string; // 계정생성일
  accountEmail: string;
  isAdmin: boolean; // 관리자 여부
}

export interface IUserInfo {
  userId: number;
  userName: string;
  nickName: string;
  sex: string;
  birth: string;
  region: string;
  timepay: number;
  totalVolunteerTime: number;
  profileUrl: string;
  banned: boolean;
}

export interface IGetUserInfoRequest extends GetPageableData {
  userId?: number;
  query?: string;
  value?: string;
}
export interface IGetUserInfoResponse extends PageableData {
  content: IUserInfo[];
}
