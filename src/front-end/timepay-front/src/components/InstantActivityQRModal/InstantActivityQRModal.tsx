import { Button, Modal, QRCode } from 'antd';
import { useMemo } from 'react';
import useFontSize from '../../hooks/useFontSize';
import { deployHostName, PATH } from '../../utils/paths';
import { cssInstantActivityQRModalStyle } from './InstantActivityQRModal.styles';

interface InstantActivityQRModalProps {
  isOpen: boolean;
  onCancel: () => void;
  helpPk?: string;
}

const InstantActivityQRModal = ({
  isOpen,
  onCancel,
  helpPk,
}: InstantActivityQRModalProps) => {
  const { scaleValue } = useFontSize();

  const footer = useMemo(() => {
    return (
      <Button type="primary" onClick={onCancel}>
        닫기
      </Button>
    );
  }, [onCancel]);

  return (
    <Modal
      title="바로 도움 요청"
      open={isOpen}
      onCancel={onCancel}
      css={cssInstantActivityQRModalStyle(scaleValue)}
      footer={footer}
    >
      <QRCode value={`${deployHostName}${PATH.INSTANT_ACTIVITY}/${helpPk}`} />
      도우미 분의 카메라로 이 QR을 찍어주세요! <br />
      QR을 찍은 후 도우미 분의 휴대폰으로 함께 어떤 활동을 할건지 작성해주세요~!
    </Modal>
  );
};

export default InstantActivityQRModal;
