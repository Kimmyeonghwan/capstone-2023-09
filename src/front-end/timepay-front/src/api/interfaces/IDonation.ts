import { PageableData } from './ICommon';

export interface IPostDonationBoardWriteRequest {
  category: string;
  content: string;
  targetTimePay: number;
  title: string;
}

export interface IPostDonationBoardWriteResponse {
  id: number;
  title: string;
  content: string;
  type: string;
  targetTimePay: number;
  donateTimePay: number;
  category: string;
}

export interface IDonationBoard {
  id: number;
  title: string;
  content: string;
  type: string;
  targetTimePay: number;
  donateTimePay: number;
  category: string;
  organizationName?: string;
  userId: number; // 유저 테이블에서의 pk -> 타 유저 프로필 등에 사용
  imageURL?: string;
  userType: string;
  createAt: string;
  // 아래는 실제로는 없는데 SimplePostCard에서 Board랑 같이 쓰면 에러나서 추가
  d_boardId: null;
  pay: null;
  boardStatus: null;
  imageUrl: null;
  location: null;
  startTime: null;
  endTime: null;
  volunteer: null;
  userNickname: null;
  createdAt: null;
}

export interface IPostDonateTimepayRequest {
  boardId: number;
  donateTimePay: number;
}

export interface IGetDonationBoardsResponse extends PageableData {
  content: IDonationBoard[];
}

export interface IPutDonationBoardEditRequest {
  boardId: string;
  board: IDonationBoard;
}
