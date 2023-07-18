import { GetPageableData, PageableData } from './ICommon';

export interface IComment {
  originBoardId: number; // 게시글 번호
  commentId: number; // 댓글 번호
  originCommentId: number; // 부모 댓글 번호
  writerName: string; // 작성자 이름
  writerId: number; // 작성자 회원번호
  writerNickname: string; // 작성자 닉네임
  applyYN: boolean; // 지원여부
  selectYN: boolean; // 선정여부
  originWriterYN: boolean; // 게시글 작성자 여부
  writtenTime: any; // 작성 날짜
  content: string; // 댓글 내용
  hidden: boolean; // 댓글 숨김 여부
  updatedTime?: string; // 수정 날짜
}

export interface IGetCommentRequest extends GetPageableData {
  query: string;
  value?: string;
  boardId?: string;
}

export interface IGetCommentResponse extends PageableData {
  content: IComment[];
}

export interface IPatchCommentRequest {
  commentIds: number[];
}
