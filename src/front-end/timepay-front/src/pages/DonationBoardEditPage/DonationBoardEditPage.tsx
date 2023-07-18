import { Button, Form, Input, InputNumber, message, Modal } from 'antd';
import { useCallback, useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import {
  useGetDonationBoardWithId,
  usePutDonationBoardEdit,
} from '../../api/hooks/donation';
import { useGetUserInfo } from '../../api/hooks/user';
import { headerTitleState } from '../../states/uiState';
import { PATH } from '../../utils/paths';
import { cssDonationBoardEditPage } from './DonationBoardEditPage.styles';

const DonationBoardEditPage = () => {
  const { boardId } = useParams();

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: userInfo, isLoading: isLoadingUserInfo } = useGetUserInfo();
  const { data, isLoading } = useGetDonationBoardWithId(
    parseInt(boardId || '-1'),
  );

  const usePutDonationBoardEditMutation = usePutDonationBoardEdit();

  const setHeaderTitle = useSetRecoilState(headerTitleState);

  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const handleOnSubmitDonationBoard = useCallback(
    (values: any) => {
      Modal.confirm({
        content: '해당 내용으로 게시글을 수정하시겠습니까?',
        okText: '확인',
        cancelText: '취소',
        onOk: async () => {
          if (boardId && !isNaN(Number(boardId)))
            await usePutDonationBoardEditMutation.mutateAsync(
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
                    onClose: () => {
                      if (data && data.data && data.data.id)
                        navigate(`${PATH.DONATION_BOARD}/${data.data.id}`);
                    },
                  });
                },
              },
            );
        },
      });
    },
    [
      queryClient,
      usePutDonationBoardEditMutation,
      boardId,
      messageApi,
      navigate,
    ],
  );

  useEffect(() => {
    setHeaderTitle('기부하기 게시글 수정');
  });

  useEffect(() => {
    if (
      !isLoading &&
      !isLoadingUserInfo &&
      data?.data.userId !== userInfo?.data.body.uid
    ) {
      // 해당 게시글의 작성자가 아닐 경우 처리
      messageApi.open({
        type: 'error',
        content: '잘못된 접근입니다.',
        duration: 0.5,
        onClose: () => {
          navigate(PATH.HOME);
        },
      });
    } else {
      form.setFieldsValue({
        targetTimePay: data?.data.targetTimePay,
        title: data?.data.title,
        content: data?.data.content,
      });
    }
  }, [
    messageApi,
    isLoading,
    isLoadingUserInfo,
    data,
    userInfo,
    navigate,
    form,
  ]);

  return (
    <div css={cssDonationBoardEditPage}>
      {contextHolder}
      <Form onFinish={handleOnSubmitDonationBoard} form={form}>
        <Form.Item
          label="목표 타임페이"
          name="targetTimePay"
          rules={[{ required: true, message: '필수로 입력해주세요.' }]}
          extra="개인 회원들에게 노출됩니다."
          initialValue={data?.data.targetTimePay}
        >
          <InputNumber addonAfter="TP" />
        </Form.Item>
        <Form.Item
          label="제목"
          name="title"
          rules={[{ required: true, message: '필수로 입력해주세요.' }]}
          initialValue={data?.data.title}
        >
          <Input max={20} />
        </Form.Item>{' '}
        <Form.Item
          label="내용"
          name="content"
          rules={[{ required: true, message: '필수로 입력해주세요.' }]}
          extra="제목/내용에는 기부 받을 타임페이의 사용처와 기관에 대한 설명을 넣어주세요. "
          initialValue={data?.data.content}
        >
          <Input.TextArea rows={10} />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          수정
        </Button>
      </Form>
    </div>
  );
};

export default DonationBoardEditPage;
