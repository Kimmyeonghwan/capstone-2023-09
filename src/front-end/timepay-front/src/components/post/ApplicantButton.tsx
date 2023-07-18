import { useState } from 'react';
import { List, Modal, Button, message } from 'antd';
import {
  cssCommentContainer,
  cssCollectButton,
  cssCollectBtn,
  cssApplicant,
} from '../../pages/PostPage/PostPage.style';
import { COMMON_COLOR } from '../../styles/constants/colors';

interface ApplicantButtonProps {
  applicantList: string[];
  onItemClick: (index: number, name: string) => void;
}

const ApplicantButton: React.FC<ApplicantButtonProps> = ({
  applicantList,
  onItemClick,
}) => {
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [selectedApplicantIndex, setSelectedApplicantIndex] = useState(-1);
  const [messageApi, contextHolder] = message.useMessage();

  const showListModal = () => {
    setIsListModalOpen(true);
  };

  const onOk2 = () => {
    // 선택된 지원자가 없으면 선택하도록 알림을 띄웁니다.
    if (selectedApplicantIndex === -1) {
      messageApi.open({
        type: 'warning',
        content: '지원자를 선택해주세요.',
        duration: 1,
      });
      return;
    }

    // 선택된 지원자의 인덱스와 이름을 부모 컴포넌트로 전달합니다.
    onItemClick(selectedApplicantIndex, applicantList[selectedApplicantIndex]);
    setIsListModalOpen(false);
  };

  const onCancel2 = () => {
    setIsListModalOpen(false);
  };

  const onItemClickHandler = (index: number) => {
    setSelectedApplicantIndex(index);
  };

  return (
    <div css={cssCommentContainer}>
      {contextHolder}
      <div css={cssCollectButton}>
        <Button css={cssCollectBtn} onClick={showListModal}>
          지원자 선정하기
        </Button>
      </div>
      <Modal
        title="지원자 목록"
        open={isListModalOpen}
        onOk={onOk2}
        onCancel={onCancel2}
        width={330}
        okText="선정하기"
        cancelText="취소"
      >
        <div css={cssApplicant}>
          <List>
            {applicantList.map((applicant, index) => (
              <List.Item
                key={index}
                onClick={() => onItemClickHandler(index)}
                style={{ paddingLeft: 12, borderRadius: 10, border: 'none' }}
                css={{
                  backgroundColor:
                    selectedApplicantIndex === index
                      ? `${COMMON_COLOR.LIGHT_YELLOW}`
                      : '',
                  cursor: 'pointer',
                }}
              >
                {applicant}
              </List.Item>
            ))}
          </List>
        </div>
      </Modal>
    </div>
  );
};

export default ApplicantButton;
