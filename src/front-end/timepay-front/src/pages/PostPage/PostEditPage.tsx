import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Layout, message, Modal, Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import {
  cssPostEditPage,
  cssPostDetailFirst,
  cssPostDetailUser,
  cssPostDetailTitle,
  cssLine1,
  cssLine2,
  cssLine3,
  cssPostDetailProfile,
  cssPostEditSecond,
  cssPostDetailThird,
  cssPostDetailCategory1,
  cssPostDetailCategory2,
  cssPostDetailPay,
  cssPostDetailFourth,
  cssPostDetailRegion,
  cssPostDetailTime,
  cssPostDetailFifth,
  cssPostDetailContent1,
  cssPostEditContent2,
  cssPostDetailAttachment,
  cssPostTextarea,
  cssPostEditBtn2,
  cssPostEditFooter,
  cssPostEditFooter2,
} from './PostEditPage.style';
import { ClockCircleOutlined, FlagFilled } from '@ant-design/icons';
import { useQueryClient } from 'react-query';
import { usePutBoard, useGetBoardWithId } from '../../api/hooks/board';
import { useSetRecoilState } from 'recoil';
import { headerTitleState } from '../../states/uiState';
import { PATH } from '../../utils/paths';
import dayjs from 'dayjs';

const Footer = Layout;

const PostEditPage = () => {
  const url = window.location.pathname;
  const boardId = url.substring(6);

  const navigate = useNavigate();
  const setHeaderTitle = useSetRecoilState(headerTitleState);
  useEffect(() => {
    setHeaderTitle('게시글 수정');
  }, [setHeaderTitle]);

  const { data, isLoading } = useGetBoardWithId(parseInt(boardId));
  useEffect(() => {
    console.log(data);
  }, [data]);

  const queryClient = useQueryClient();
  const [messageApi, contextHolder] = message.useMessage();

  // 수정 화면 들어가면 바로 데이터가 안 보임

  const usePutBoardMutation = usePutBoard();

  const [title, setTitle] = useState();
  const [location, setLocation] = useState<string>('');
  const [content, setContent] = useState();

  const handleTitle = (e: any) => {
    setTitle(e.target.value);
  };
  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };
  const handleContent = (e: any) => {
    setContent(e.target.value);
  };

  const handleClickCancel = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const [form] = Form.useForm();

  const handelClickSave = useCallback(
    (values: any) => {
      Modal.confirm({
        content: '해당 내용으로 게시글을 수정하시겠습니까?',
        okText: '확인',
        cancelText: '취소',
        onOk: async () => {
          if (boardId && !isNaN(Number(boardId)))
            await usePutBoardMutation.mutateAsync(
              {
                boardId: boardId,
                board: {
                  ...values,
                  category: '기부하기',
                  targetTimePay: parseInt(values.targetTimePay),
                },
              },
              {
                onSuccess: (data) => {
                  queryClient.invalidateQueries('useGetDonationBoards');
                  queryClient.invalidateQueries('useGetDonationBoardWithId');
                  messageApi.success({
                    content: '수정이 완료되었습니다.',
                    duration: 1,
                    onClose: () => {},
                  });
                },
              },
            );
          navigate(`${PATH.Post}/${boardId}`);
        },
      });
    },
    [queryClient, usePutBoardMutation, boardId, messageApi, navigate],
  );

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        title: data?.data.title,
        content: data?.data.content,
      });
    }
  }, [data, form]);

  return (
    <Form onFinish={handelClickSave} form={form} initialValues={{}}>
      <div css={cssPostEditPage}>
        <div css={cssPostDetailFirst}>
          <div css={cssPostDetailProfile}></div>
          <div css={cssPostDetailUser}>{data?.data.userNickname}</div>
        </div>
        <div css={cssLine1} />
        <div css={cssPostEditSecond}>
          <div css={cssPostDetailTitle}>제목</div>
          <Form.Item name="title">
            <Input
              placeholder="여기에 제목을 입력하세요"
              maxLength={25}
              onChange={handleTitle}
              css={cssPostTextarea}
            />
          </Form.Item>
        </div>
        <div css={cssLine3} />
        <div>
          <div css={cssPostDetailThird}>
            <div className="category">
              <div css={cssPostDetailCategory1}>카테고리</div>
              <div css={cssPostDetailCategory2}>{data?.data.category}</div>
            </div>
            <div css={cssPostDetailPay}>{data?.data.pay} TP</div>
          </div>
        </div>
        <div css={cssLine3} />
        <div css={cssPostDetailFourth}>
          <div css={cssPostDetailRegion}>
            <FlagFilled style={{ marginRight: 15, color: 'black' }} />
            {data?.data.location}
          </div>
          <div css={cssPostDetailTime}>
            <ClockCircleOutlined style={{ marginRight: 15, color: 'black' }} />
            {dayjs(data?.data.startTime).format('MM월 DD일 HH시 mm분')} ~{' '}
            {dayjs(data?.data.endTime).format('HH시 mm분')}
          </div>
        </div>
        <div css={cssLine1} />
        <div css={cssPostDetailFifth}>
          <div css={cssPostDetailContent1}>내용</div>
          <Form.Item name="content">
            <TextArea
              rows={5}
              style={{ resize: 'none' }}
              css={cssPostEditContent2}
              placeholder="여기에 내용을 입력하세요"
              onChange={handleContent}
            />
          </Form.Item>
        </div>
      </div>
      <Footer css={cssPostEditFooter}>
        <div css={cssLine2} />
        <div css={cssPostEditFooter2}>
          <Button css={cssPostEditBtn2} type="primary" htmlType="submit">
            수정
          </Button>
        </div>
      </Footer>
    </Form>
  );
};

export default PostEditPage;
