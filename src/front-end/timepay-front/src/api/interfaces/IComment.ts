export interface IComment {
  commentId: number;
  originBoardId: number;
  originCommentId?: number;
  writerName: string;
  writerNickname: string;
  writerId: number;
  applyYN: boolean;
  selectYN: boolean;
  originWriterYN: boolean;
  writtenTime: string;
  updatedTime?: string;
  content: string;
  hidden: boolean;
  startTime: any;
  endTime: any;
}

export interface IPostComment {
  adopted: boolean;
  applied: boolean;
  content: string;
  hidden: boolean;
  id?: number;
  userNickname?: string;
  userId?: number;
}

export interface ICommentActivity extends IComment {
  boardTitle: string; // 게시글 제목
  body: string;
}
