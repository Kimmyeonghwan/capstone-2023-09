import { Button, message, Modal, Space, Table } from 'antd';

import { useCallback, useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';
import {
  cssModalFooter,
  cssRegisterModal,
} from './ApplicantReceivedModalstyle';
import useFontSize from '../../hooks/useFontSize';
import {
  IApplicant,
  IPostApplicantRequest,
} from '../../api/interfaces/IApplicant';
import {
  useGetApplicantWaiting,
  usePostApplicantApply,
} from '../../api/hooks/applicant';

export interface AgentModalProps {
  isOpen: boolean;
  onCancel: () => void;
}

const ApplicantReceivedModal = ({ isOpen, onCancel }: AgentModalProps) => {
  const queryClient = useQueryClient();
  const { scaleValue } = useFontSize();
  const [messageApi, contextHolder] = message.useMessage();

  const { data } = useGetApplicantWaiting();
  const [selectedApplicantUID, setSelectedApplicantUID] = useState<any>();
  const postAgentRegister = usePostApplicantApply();

  const dataSource = data?.data.applicant || [];

  const onClickBtn = useCallback(
    async (type: boolean) => {
      if (selectedApplicantUID) {
        console.log('selectedApplicantUID :', selectedApplicantUID);
        const reject: IPostApplicantRequest = {
          uid: selectedApplicantUID[0],
          apply: type,
        };

        await postAgentRegister.mutateAsync(reject, {
          onSuccess: () => {
            messageApi.open({
              type: type ? 'success' : 'error',
              content: type
                ? '대리인 신청을 수락했습니다'
                : '대리인 신청을 거절했습니다',
            });
            queryClient.invalidateQueries({
              queryKey: ['useGetApplicantWaiting'],
            });
            queryClient.invalidateQueries({
              queryKey: ['useGetApplicant'],
            });
          },
          onError: (err) => {
            console.log(err.response?.status);
          },
        });
      } else {
        messageApi.open({
          type: 'warning',
          content: '받은 신청을 선택해주세요',
        });
      }
    },
    [messageApi, postAgentRegister, queryClient, selectedApplicantUID],
  );

  const rowSelection = {
    columnWidth: '20px',
    onChange: (selectedRowKeys: React.Key[], selectedRows: IApplicant[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows,
      );
      setSelectedApplicantUID(selectedRowKeys);
    },
  };

  const columns = [
    {
      title: 'appliUid',
      dataIndex: 'appliUid',
      key: 'appliUid',
      width: 10,
    },
    {
      title: 'appliName',
      dataIndex: 'appliName',
      key: 'appliName',
      width: 30,
    },
  ];

  const footer = useMemo(() => {
    return (
      <>
        <div className="space-align-block" css={cssModalFooter(scaleValue)}>
          <Space align="center" size={10}>
            <Button
              className="agentRegister"
              onClick={() => onClickBtn(true)}
              type="primary"
            >
              수락
            </Button>
            <Button
              className="agentReject"
              onClick={() => onClickBtn(false)}
              type="primary"
            >
              거절
            </Button>
            <Button className="agentDelete" onClick={onCancel} type="primary">
              취소
            </Button>
          </Space>
        </div>
      </>
    );
  }, [onCancel, onClickBtn, scaleValue]);

  return (
    <Modal
      title={'받은 신청 목록'}
      onCancel={onCancel}
      open={isOpen}
      footer={footer}
      width={700}
      closable={false}
      css={cssRegisterModal(scaleValue)}
    >
      {contextHolder}
      <Table
        rowSelection={{
          type: 'radio',
          ...rowSelection,
        }}
        dataSource={dataSource}
        rowKey="appliUid"
        columns={columns}
        showHeader={false}
        pagination={false}
        locale={{
          emptyText: (
            <span>
              <p>받은 신청이 없습니다</p>
            </span>
          ),
        }}
        scroll={{ y: 240 }}
      />
    </Modal>
  );
};
export default ApplicantReceivedModal;
