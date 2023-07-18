import { GetPageableData, PageableData } from './ICommon';

export interface IReport {
  reportId: number; //신고번호
  reporterId: number; //신고자 회원번호
  reporterName: string; //신고자 이름
  type: string; //신고글타입
  reason: string; //신고사유
  targetId: number; //신고대상 글번호
  reportedAt: string; //신고일시
  targetReportId: number; //신고대상자 회원번호
  process: string; //신고처리여부
}

export interface IGetReportRequest extends GetPageableData {
  searchLabel?: string;
  searchValue?: string;
  reportId?: number;
  reporterName?: string;
  reason?: string;
  startTime?: Date;
  endTime?: Date;
  query: string;
  value?: string;
}
export interface IGetReportResponse extends PageableData {
  content: IReport[];
}

export interface IPatchReportRequest {
  userIds: number[];
}
