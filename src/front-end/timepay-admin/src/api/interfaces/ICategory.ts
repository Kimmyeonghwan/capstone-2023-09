import { GetPageableData, PageableData } from './ICommon';

export interface ICategory {
  categoryId: number;
  boardType: string;
  categoryName: string;
  useYn: 'Y' | 'N';
}

export interface IGetCategoryRequest extends GetPageableData {
  categoryId?: number;
}

export interface IGetCategoryResponse extends PageableData {
  content: ICategory[];
}
