export interface IGetCategoryRequest {
  type: string; //게시글 타입
  useYn: 'Y' | 'N';
}

export type IGetCategoryResponse = ICategory[];

export interface ICategory {
  categoryId: number;
  boardType: string;
  categoryName: string;
  useYn: string;
}
