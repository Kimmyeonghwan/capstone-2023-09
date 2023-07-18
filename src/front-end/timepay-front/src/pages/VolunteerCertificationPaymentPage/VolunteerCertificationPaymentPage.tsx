import {
  InboxOutlined,
  LinkOutlined,
  UploadOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Button,
  message,
  Modal,
  Table,
  Upload,
  UploadFile,
  UploadProps,
} from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import {
  IParticipateUser,
  IVolunteerUser,
} from '../../api/interfaces/IVolunteer';
import { headerTitleState } from '../../states/uiState';
import {
  cssVolunteerCertificationPaymentPageStyle,
  cssVolunteerOverviewStyle,
  cssVolunteerUserInfoStyle,
} from './VolunteerCertificationPaymentPage.styles';
import { ReactComponent as RegionPin } from '../../assets/images/icons/region-pin.svg';
import { ReactComponent as Clock } from '../../assets/images/icons/clock.svg';
import { PATH } from '../../utils/paths';
import { isMobileWidth } from '../../utils/device';
import {
  useGetMyPageCertificate,
  usePostQueryMyPageCertificatePublish,
} from '../../api/hooks/agency';
import { useQueryClient } from 'react-query';
import { UploadChangeParam } from 'antd/es/upload';

const VolunteerCertificationPaymentPage = () => {
  const navigate = useNavigate();
  let { boardId } = useParams();

  const setHeaderTitle = useSetRecoilState(headerTitleState);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isShowUploadModal, setIsShowUploadModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IVolunteerUser>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const [messageApi, contextHolder] = message.useMessage();

  const queryClient = useQueryClient();
  const { data, isLoading } = useGetMyPageCertificate(parseInt(boardId || ''));
  const usePostQueryMyPageCertificatePublishMutation =
    usePostQueryMyPageCertificatePublish();

  const boardData = useMemo(() => {
    if (!isLoading) return data?.data.volunteerInfo;
  }, [data, isLoading]);

  const volunteers = useMemo(() => {
    if (!isLoading) return data?.data.participateUsers;
  }, [data, isLoading]);

  const handleResizeWindowWidth = useCallback(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  const handleOnCancelModal = useCallback(() => {
    setIsShowUploadModal(false);
  }, []);

  const handleOnSubmitCertificate = useCallback(async () => {
    if (fileList && fileList[0] && fileList[0].originFileObj) {
      let formData = new FormData();
      formData.append('boardId', boardId!);
      formData.append('userId', selectedUser?.userId.toString()!);
      formData.append('certification', fileList[0].originFileObj);

      await usePostQueryMyPageCertificatePublishMutation.mutateAsync(formData, {
        onSuccess: (result) => {
          messageApi.open({
            type: 'success',
            content: '해당 회원에게 인증서를 지급했습니다.',
            duration: 1,
            onClose: () => {
              handleOnCancelModal();
              queryClient.invalidateQueries({
                queryKey: ['useGetMyPageCertificate'],
              });
            },
          });
        },
        onError: (err) => {
          console.log(err);
          messageApi.open({
            type: 'error',
            content: (
              <>
                오류 발생: <br />
                {err}
              </>
            ),
          });
        },
      });
    }
  }, [
    boardId,
    handleOnCancelModal,
    fileList,
    messageApi,
    selectedUser,
    queryClient,
    usePostQueryMyPageCertificatePublishMutation,
  ]);

  const handleFileChange: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>,
  ) => {
    setFileList(info.fileList);
  };

  const boardInfo = useMemo(() => {
    return (
      <div css={cssVolunteerOverviewStyle}>
        <span className="header">봉사활동 정보</span>
        <span className="title">{boardData?.title}</span>
        <div className="region">
          <RegionPin /> {boardData?.location}
        </div>
        <div className="time">
          <Clock /> {boardData?.startTime.replaceAll('T', ' ').slice(0, 16)} ~{' '}
          {boardData?.endTime.split('T')[1].slice(0, 5)} (지급할 봉사시간:{' '}
          {boardData?.volunteerTime || 0} 시간)
        </div>
        <div className="participateNum">
          <UserOutlined /> {boardData?.participateNum} 명
        </div>
        * 아래 활동자들에게 봉사활동 시간을 지급한 후 인증서를 등록해주세요.{' '}
        <br />* 인증서 등록 시 활동자에게 푸시 알림이 가며 활동자가 조회
        가능해집니다.
      </div>
    );
  }, [boardData]);

  const columns = useMemo(() => {
    if (isMobileWidth(windowWidth))
      return [
        {
          title: '회원번호',
          dataIndex: 'userId',
          width: 60,
        },
        {
          title: '회원정보',
          dataIndex: 'userName',
          width: 180,
          render: (userName: string, record: IParticipateUser) => {
            return (
              <div css={cssVolunteerUserInfoStyle}>
                <span className="name">{userName}</span>
                <div>
                  닉네임 : <span>{record.userNickname}</span>
                </div>
                <div>
                  <span>{record.email}</span>
                </div>
                <div>
                  <span>{record.phone}</span>
                </div>
              </div>
            );
          },
        },
        {
          title: '인증서',
          dataIndex: 'certificationUrl',
          width: 90,
          render: (certificationUrl: string, record: IParticipateUser) => {
            return (
              <>
                <Button
                  icon={<UploadOutlined />}
                  onClick={() => {
                    setIsShowUploadModal(true);
                    setSelectedUser(record);
                  }}
                >
                  {record.published ? '재등록' : '등록'}
                </Button>{' '}
                {record.published && (
                  <Button type="link" href={certificationUrl} target="_blank">
                    <LinkOutlined /> 보기
                  </Button>
                )}
              </>
            );
          },
        },
      ];
    else {
      return [
        {
          title: '회원번호',
          dataIndex: 'userId',
          width: 60,
        },
        {
          title: '이름',
          dataIndex: 'userName',
          width: 100,
        },
        {
          title: '닉네임',
          dataIndex: 'userNickname',
          width: 130,
        },
        {
          title: '이메일',
          dataIndex: 'email',
          width: 130,
        },
        {
          title: '전화번호',
          dataIndex: 'phone',
          width: 130,
        },
        {
          title: '등록된 인증서',
          dataIndex: 'certificationUrl',
          width: 80,
          render: (certificationUrl: string, record: IParticipateUser) => {
            return (
              <>
                {record.published ? (
                  <Button type="link" href={certificationUrl} target="_blank">
                    <LinkOutlined /> 보기
                  </Button>
                ) : (
                  '-'
                )}
              </>
            );
          },
        },
        {
          title: '인증서 등록',
          dataIndex: 'published',
          width: 80,
          render: (published: boolean, record: IParticipateUser) => {
            return (
              <Button
                icon={<UploadOutlined />}
                onClick={() => {
                  setIsShowUploadModal(true);
                  setSelectedUser(record);
                }}
              >
                {published ? '재등록' : '등록'}
              </Button>
            );
          },
        },
      ];
    }
  }, [windowWidth]);

  const footer = useMemo(() => {
    return (
      <>
        <Button onClick={handleOnCancelModal}>취소</Button>
        <Button type="primary" onClick={() => handleOnSubmitCertificate()}>
          {selectedUser?.published ? '재등록' : '등록'}
        </Button>
      </>
    );
  }, [handleOnCancelModal, handleOnSubmitCertificate, selectedUser]);

  useEffect(() => {
    setHeaderTitle('봉사활동 인증서 지급');
  }, [setHeaderTitle]);

  useEffect(() => {
    if (boardId && isNaN(Number(boardId))) {
      // boardId가 유효하지 않은 값일 떄 처리
      // 추후에 404페이지로 연결 예정
      navigate(PATH.HOME);
    }
  }, [boardId, navigate]);
  useEffect(() => {
    // 화면 너비 변경 시 테이블 컬럼 변화
    window.addEventListener('resize', handleResizeWindowWidth);
    return () => {
      window.removeEventListener('resize', handleResizeWindowWidth);
    };
  }, [handleResizeWindowWidth]);

  return (
    <div css={cssVolunteerCertificationPaymentPageStyle}>
      {contextHolder}
      <Table
        bordered
        title={() => boardInfo}
        scroll={{ x: isMobileWidth(windowWidth) ? 300 : 1000 }}
        columns={columns}
        dataSource={volunteers?.content}
        rowKey="userId"
      />
      <Modal
        open={isShowUploadModal}
        onCancel={handleOnCancelModal}
        title="인증서 등록"
        footer={footer}
      >
        <Upload.Dragger
          beforeUpload={() => false}
          multiple={false}
          maxCount={1}
          onChange={handleFileChange}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            클릭이나 드래그 드롭을 통해서 인증서 파일을 올릴 수 있습니다.
          </p>
          <p className="ant-upload-hint">단 하나의 파일만 올릴 수 있습니다.</p>
        </Upload.Dragger>
      </Modal>
    </div>
  );
};

export default VolunteerCertificationPaymentPage;
