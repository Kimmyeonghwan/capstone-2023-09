import { useSetRecoilState } from 'recoil';
import { headerTitleState } from '../../states/uiState';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { apiRequest } from '../../api/request';
import { API_URL } from '../../api/urls';
import useFontSize from '../../hooks/useFontSize';
import { cssBtnSpace, cssMyInfoStyle } from './AgentPage.style';
import { Button, Modal, Space, Typography } from 'antd';
import { COMMON_COLOR } from '../../styles/constants/colors';
import AgentModal from '../../components/AgentModal';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useDeleteAgent, useGetAgent } from '../../api/hooks/agent';
import { useQueryClient } from 'react-query';

const AgentPage = () => {
  const setHeaderTitle = useSetRecoilState(headerTitleState);
  const [isOpenRegisterModal, setIsOpenRegisterModal] = useState(false);

  const [image, setImage]: any = useState();

  const { scaleValue } = useFontSize();
  const { Text } = Typography;
  const { confirm } = Modal;

  const { data } = useGetAgent();
  const deleteAgentMutation = useDeleteAgent();
  const queryClient = useQueryClient();

  console.log(data?.data);
  const agentName = data?.data.agentName;
  const agent = agentName
    ? data?.data.accept
      ? `${agentName}님`
      : `(승인 대기중)${agentName}님`
    : '미지정';
  let isRegister: boolean = false;
  if (agentName) {
    isRegister = true;
  }

  const handleOnCancelModal = useCallback(() => {
    setIsOpenRegisterModal(false);
  }, []);

  const isOpenModal = () => {
    setIsOpenRegisterModal(true);
  };

  const showConfirm = () => {
    confirm({
      title: '대리인 삭제',
      icon: <ExclamationCircleFilled />,
      content: '대리인 삭제시 대리 작성 도움을 받을 수 없습니다',
      okText: '삭제',
      okType: 'primary',
      okButtonProps: { style: { backgroundColor: COMMON_COLOR.MAIN2 } },
      async onOk() {
        console.log('OK');
        await deleteAgentMutation.mutateAsync(undefined, {
          onSuccess: (result) => {
            queryClient.invalidateQueries({
              queryKey: ['useGetAgent'],
            });
          },
          onError: (err) => {
            console.log(err.response?.status);
          },
        });
      },
      cancelText: '취소',

      onCancel() {
        console.log('Cancel');
      },
    });
  };

  useEffect(() => {
    apiRequest
      .get(API_URL.USER_INFO_GET)
      .then((res) => {
        setImage(
          res.data.body.image_url ||
            'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
        );
      })
      .catch((error) => {
        console.error('Error sending GET request:', error);
      });
  }, []);

  useEffect(() => {
    setHeaderTitle('대리인 관리');
  }, [setHeaderTitle]);

  return (
    <>
      <div css={cssMyInfoStyle(scaleValue)}>
        <div className="MyTopBox">
          <div className="MyImageWrap">
            <img src={image} className="MyProfileImage" alt="내 프로필" />
          </div>
          <div className="space"></div>

          <div className="MyNameWrap">
            <div className="MyName">{data?.data.myName}</div>
            <div className="MyPersonalNum"> {'#' + data?.data.myUid}</div>
          </div>
        </div>
        <div className="agentBox">
          <Text className="text">나의 대리인 :</Text>
          <Text className="agent">{agent}</Text>
        </div>
        <div className="space-align-container" css={cssBtnSpace(scaleValue)}>
          <div className="space-align-block">
            <Space align="center" size={10}>
              <Button
                className="agentRegister"
                type="primary"
                style={{ background: COMMON_COLOR.MAIN1, width: 140 }}
                onClick={isOpenModal}
                disabled={isRegister}
              >
                대리인 등록
              </Button>
              <Button
                className="agentDelete"
                type="primary"
                style={{ background: COMMON_COLOR.MAIN2, width: 140 }}
                danger
                onClick={showConfirm}
              >
                대리인 삭제
              </Button>
            </Space>
          </div>
        </div>
      </div>
      <AgentModal
        myUID={data?.data.myUid as number}
        isOpen={isOpenRegisterModal}
        onCancel={handleOnCancelModal}
      />
    </>
  );
};

export default AgentPage;
