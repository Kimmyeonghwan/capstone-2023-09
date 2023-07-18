import { Button, Form, Input, message, Modal, Space, Table } from 'antd';
import type { ColumnType } from 'antd/es/table';
import { useCallback, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { useQueryClient } from 'react-query';
import { cssModalFooter, cssRegisterModal } from './ApplicantModal.style';
import useFontSize from '../../hooks/useFontSize';
import { IApplicant } from '../../api/interfaces/IApplicant';
import { useDeleteApplicant } from '../../api/hooks/applicant';

export interface AgentModalProps {
  applicants?: IApplicant[];
  isOpen: boolean;
  onCancel: () => void;
}

interface DataType {
  key: React.Key;
  appliUid: number;
  appliName: string;
}

const ApplicantModal = ({ applicants, isOpen, onCancel }: AgentModalProps) => {
  const queryClient = useQueryClient();
  const { scaleValue } = useFontSize();

  const [form] = Form.useForm();
  const deleteApplicantMutation = useDeleteApplicant();
  const [selectedApplicantUID, setSelectedApplicantUID] = useState<any>();
  const [messageApi, contextHolder] = message.useMessage();

  const onRegisterClick = useCallback(async () => {
    console.log('test');
    if (selectedApplicantUID) {
      await deleteApplicantMutation.mutateAsync(
        { uid: selectedApplicantUID[0] },
        {
          onSuccess: (result) => {
            queryClient.invalidateQueries({
              queryKey: ['useGetApplicant'],
            });
          },
          onError: (err) => {
            console.log(err.response?.status);
          },
        },
      );
    } else {
      messageApi.open({
        type: 'warning',
        content: '신청자를 선택해주세요',
      });
    }
  }, [deleteApplicantMutation, messageApi, queryClient, selectedApplicantUID]);

  const rowSelection = {
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
      width: 30,
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
              onClick={onRegisterClick}
              type="primary"
            >
              삭제하기
            </Button>
            <Button className="agentDelete" onClick={onCancel} type="primary">
              취소
            </Button>
          </Space>
        </div>
      </>
    );
  }, [onCancel, onRegisterClick, scaleValue]);

  return (
    <Modal
      title={'신청자 삭제'}
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
        dataSource={applicants}
        rowKey="appliUid"
        columns={columns}
        showHeader={false}
        locale={{
          emptyText: (
            <span>
              <p>신청자가 없습니다</p>
            </span>
          ),
        }}
        pagination={false}
        scroll={{ y: 240 }}
      />
    </Modal>
  );
};
export default ApplicantModal;
