import { GetPageableData, PageableData } from './ICommon';

export interface IDealBoard {
  createdAt: string;
  updatedAt: string;
  d_boardId: number;
  title: string;
  content: string;
  type: string;
  category?: string;
  location?: string;
  startTime: any;
  endTime: any;
  pay: number;
  boardStatus: string;
  state: any;
  volunteerTime: number;
  volunteerPeople: number;
  hidden: boolean;
  auto: boolean;
  volunteer: boolean;
  userId: number;
  userName: string;
  userNickname: string;
  dealAttatchments: string[];
}

export interface IGetBoardRequest extends GetPageableData {
  title?: string;
  author?: string;
  type?: string;
  category?: string;
  sortType?: string;
  startTime?: string;
  endTime?: string;
  volunteer?: boolean;
  authorSearchKeyword?: string;
  authorSearchValue?: string;
}

export interface IGetBoardResponse extends PageableData {
  content: IDealBoard[];
}

export interface IPostBoardStatus {
  ids: number[];
  status: string;
}

export type IBoardState =
  | '매칭중'
  | '매칭완료'
  | '활동시작'
  | '활동중'
  | '활동완료'
  | '활동취소'
  | '활동지연';

export type IBoardType = '도움요청' | '같이하기' | '기부하기';
