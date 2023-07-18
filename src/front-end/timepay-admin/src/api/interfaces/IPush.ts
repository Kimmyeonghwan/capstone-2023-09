export interface IPush {
  pushId: number; //공지 번호
  type: IPushType; //공지 유형
  name: string; //작성자
  createdAt: string; //작성일시
  title: string; //공지 제목
  content: string; //공지 내용
}

export type IPushType = 'notice' | 'activity' | 'comment' | 'bookmark';
