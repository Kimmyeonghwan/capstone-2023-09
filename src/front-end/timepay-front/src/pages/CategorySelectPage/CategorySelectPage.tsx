import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from 'antd';
import { useGetCategory } from '../../api/hooks/category';
import {
  cssCategorySelect,
  cssMainHeaderBlank,
  cssCategorySelectText,
  cssCategorySelectContent,
  cssCategoryListStyle,
  cssCategorySelectButton,
} from './CategorySelectPage.styles';
import { ReactComponent as BackArrow } from '../../assets/images/icons/header-back-arrow.svg';
import { cssMainHeaderStyle } from '../../components/MainHeader/MainHeader.styles';
import { PATH } from '../../utils/paths';
import { useRecoilState } from 'recoil';
import { isFirstState } from '../../states/categorySelect';

const CategorySelectPage = () => {
  //
  // recoil value 로 바꾸기..
  // 지금은 항상 isFirst가 true로 초기화됨
  //
  const [isFirst, setIsFirst] = useRecoilState(isFirstState); // isFirst가 false면 첫 화면 아님

  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const navigate = useNavigate();
  const handleClickBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const { data, isLoading } = useGetCategory({
    type: '도움요청',
    useYn: 'Y',
  });

  const handleOnSelect = useCallback(() => {
    setIsFirst(false);
    navigate(-1);
  }, [navigate]);

  const handleOnLater = useCallback(() => {
    setIsFirst(false);
    navigate(PATH.FINISHJOIN);
  }, [navigate]);

  return (
    <div css={cssCategorySelect}>
      {!isFirst && (
        <div css={cssMainHeaderStyle}>
          <BackArrow onClick={handleClickBack} />
          <span>카테고리 알림 설정</span>
        </div>
      )}
      <div css={cssMainHeaderBlank}></div>
      <div css={cssCategorySelectText}>
        <h3>관심 카테고리를 선택해주세요!</h3>
        <h6>
          선택한 카테고리의 글이 올라오면
          <br /> 푸시 알림을 보내드려요
        </h6>
      </div>
      <div css={cssCategorySelectContent}>
        <div css={cssCategoryListStyle}>
          {data?.data.map((category) => (
            <Button key={category.categoryId}>{category.categoryName}</Button>
          ))}
        </div>
      </div>
      <div css={cssCategorySelectButton}>
        <Button size="large" className="choice" onClick={handleOnSelect}>
          선택완료
        </Button>
        {isFirst && <Button className="later">나중에 설정하기</Button>}
      </div>
    </div>
  );
};
export default CategorySelectPage;
