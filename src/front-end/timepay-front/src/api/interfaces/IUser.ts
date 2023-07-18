import { IAgency } from './IAgency';
import { ICommentActivity } from './IComment';
import { PageableData } from './ICommon';
import { IBoard } from './IPost';

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

export interface IAgencyOrUser extends IAgency {
  nick_name?: string;
  image_url: string;
  introduction?: string;
  location?: string;
  time_pay?: number;
}

export interface IGetUserBoardRequest {
  pageIndex: number;
  pageSize: number;
  boardStatus?:
    | 'ACTIVITY_CANCEL'
    | 'ACTIVITY_COMPLETE'
    | 'ACTIVITY_DELAY'
    | 'ACTIVITY_IN_PROGRESS'
    | 'FREE_BOARD'
    | 'MATCHING_COMPLETE'
    | 'MATCHING_IN_PROGRESS';
  boardType?: 'help' | 'helper' | 'event';
}

export interface IDealBoards extends PageableData {
  content: IBoard[];
}

export interface IGetUserBoardResponse {
  id: number;
  image_url: string;
  nick_name: string;
  location: string;
  introduction: string;
  time_pay: number;
  deal_boards: IDealBoards;
  body: string;
}

export interface IGetUserCommentRequest {
  pageIndex: number;
  pageSize: number;
  isApplied?: boolean;
  isAdopted?: boolean;
}

export interface IGetUserCommentResponse extends PageableData {
  content: ICommentActivity[];
}
