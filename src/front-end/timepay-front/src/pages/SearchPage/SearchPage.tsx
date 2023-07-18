import { useEffect, useMemo } from 'react';
import { useInfiniteGetSearchBoard } from '../../api/hooks/board';
import SimplePostCard from '../../components/SimplePostCard';
import { useInView } from 'react-intersection-observer';
import { useRecoilValue } from 'recoil';
import { boardSearchState } from '../../states/boardSearch';
import { Spin } from 'antd';
import {
  cssNothingStyle,
  cssSearchPageStyle,
  cssSpinStyle,
} from './SearchPage.styles';
import { searchDrawerOpenState } from '../../states/uiState';
import useFontSize from '../../hooks/useFontSize';
import { useInfiniteGetDonationBoards } from '../../api/hooks/donation';

const SearchPage = () => {
  const boardSearchValue = useRecoilValue(boardSearchState);
  const isDrawerOpen = useRecoilValue(searchDrawerOpenState);

  const { data, fetchNextPage, hasNextPage, isLoading } =
    useInfiniteGetSearchBoard(boardSearchValue);

  const {
    data: donationData,
    fetchNextPage: fetchNextDonationPage,
    hasNextPage: hasNextDonationPage,
    isLoading: isLoadingDonation,
  } = useInfiniteGetDonationBoards(boardSearchValue);

  const { scaleValue } = useFontSize();

  const [ref, inView] = useInView({ threshold: 0.3 });

  useEffect(() => {
    if (boardSearchValue.type === 'event' && inView && hasNextDonationPage) {
      fetchNextDonationPage();
    } else if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [
    inView,
    fetchNextPage,
    hasNextPage,
    boardSearchValue.type,
    hasNextDonationPage,
    fetchNextDonationPage,
  ]);

  const boardsList = useMemo(() => {
    if (
      boardSearchValue.type === 'event' &&
      donationData &&
      donationData.pages &&
      donationData.pages.length > 0
    )
      return donationData.pages.map((page) => page.data.content).flat(1);
    else if (data && data.pages && data.pages.length > 0) {
      return data.pages.map((page) => page.data.content).flat(1);
    }
  }, [boardSearchValue.type, donationData, data]);

  return isLoading ||
    (boardSearchValue.type === 'event' && isLoadingDonation) ? (
    <Spin size="large" css={cssSpinStyle} />
  ) : (
    <div css={cssSearchPageStyle(isDrawerOpen)}>
      <div className="dimmed" />
      {boardsList && boardsList.length > 0 ? (
        boardsList.map((board, index) => (
          <SimplePostCard
            key={board ? board.d_boardId || board.id : index}
            post={board}
          />
        ))
      ) : (
        <div css={cssNothingStyle(scaleValue)}>
          <span className="emoji">😅</span>
          <span>해당하는 게시글이 없습니다.</span>
          <span>다르게 검색해보세요!</span>
        </div>
      )}
      <div ref={ref} />
    </div>
  );
};

export default SearchPage;
