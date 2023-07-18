import { Form, Input, Select, Row, Button } from 'antd';
import { useCallback } from 'react';
import { useQueryClient } from 'react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { IGetBoardRequest } from '../../api/interfaces/IBoard';
import { boardSearchState } from '../../states/boardSearchState';
import { cssPostSearchFormStyle } from './PostSearchForm.styles';

const PostSearchForm = () => {
  const queryClient = useQueryClient();

  const boardSearchValue = useRecoilValue(boardSearchState);
  const setBoardSearch = useSetRecoilState(boardSearchState);

  const handleOnSearchBoard = useCallback(
    async (values: IGetBoardRequest) => {
      setBoardSearch(values);
      await queryClient.invalidateQueries({
        queryKey: ['useGetBoards', values],
      });
    },
    [setBoardSearch, queryClient],
  );

  return (
    <div css={cssPostSearchFormStyle}>
      <Form layout="horizontal" onFinish={handleOnSearchBoard}>
        <Row>
          <Form.Item
            name="authorSearchKeyword"
            initialValue={boardSearchValue.authorSearchKeyword}
          >
            <Select style={{ width: 100 }}>
              <Select.Option value="author">이름</Select.Option>
              <Select.Option value="nickname">닉네임</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="authorSearchValue"
            initialValue={boardSearchValue.authorSearchValue}
          >
            <Input placeholder="작성자 정보 입력" />
          </Form.Item>
        </Row>
        <Row>
          <Form.Item
            name="title"
            label="제목"
            initialValue={boardSearchValue.title}
          >
            <Input style={{ width: 400 }} placeholder="게시글 제목 입력" />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginLeft: 'auto' }}
          >
            검색
          </Button>
        </Row>
      </Form>
    </div>
  );
};

export default PostSearchForm;
