import { IUser } from './IUser';

export interface IQna {
  qnaId: number; // 문의 번호
  title: string; // 제목
  createdAt: string; // 작성 날짜
  status: IQnaState; // 게시글 상태
  category: string; // 게시글 카테고리
  content: string; // 내용
  attachment?: string; // 첨부파일
  user: IUser; // 문의 작성자 정보
}

export interface IPostQna {
  content: string;
  subject: string;
  title: string;
  category?: string;
}

export interface IGetQna {
  title: string;
  content: string;
  inquiryId: number;
  state: string;
  category: string;
  createdAt: string;
}

export type IQnaState = '답변대기' | '답변완료';
