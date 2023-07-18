import { Modal, Image, Button } from 'antd';
import { useMemo } from 'react';
import { IUserInfo } from '../../api/interfaces/IUser';

interface ProfileModalProps {
  profile?: IUserInfo;
  isOpen: boolean;
  onCancel: () => void;
}
const ProfileImageModal = ({
  profile,
  isOpen,
  onCancel,
}: ProfileModalProps) => {
  const footer = useMemo(() => {
    return (
      <Button type="primary" onClick={onCancel}>
        확인
      </Button>
    );
  }, [onCancel]);

  return (
    <Modal
      title="프로필 사진 조회"
      open={isOpen}
      onOk={onCancel}
      onCancel={onCancel}
      footer={footer}
      width={900}
    >
      <div>
        <Image src={profile?.profileUrl} />
      </div>
    </Modal>
  );
};
export default ProfileImageModal;
