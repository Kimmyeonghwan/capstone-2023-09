import { GetPageableData } from '../api/interfaces/ICommon';

export const customPaginationProps = <T extends GetPageableData>({
  totalElements,
  currentSearchValues,
  setSearchValues,
}: {
  totalElements?: number;
  currentSearchValues: T;
  setSearchValues: (currentSearchValues: T) => void;
}) => {
  const handleOnChangePagination = (page: number, pageSize: number) => {
    setSearchValues({
      ...currentSearchValues,
      pagingIndex: page - 1,
      pagingSize: pageSize,
    });
  };
  return {
    total: totalElements || 0,
    current: (currentSearchValues?.pagingIndex || 0) + 1,
    pageSize: currentSearchValues.pagingSize || 10,
    showSizeChanger: true,
    pageSizeOptions: [10, 50, 100],
    onChange: handleOnChangePagination,
  };
};
