import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Space,
  Table,
} from 'antd';
import type { ColumnType } from 'antd/es/table';
import { useCallback, useMemo } from 'react';
import dayjs from 'dayjs';
import { useQueryClient } from 'react-query';
import { cssModalFooter, cssRegisterModal } from './AgentModal.style';
import useFontSize from '../../hooks/useFontSize';
import { IPostAgentRequest } from '../../api/interfaces/IAgent';
import { usePostAgentRegister } from '../../api/hooks/agent';

export interface AgentModalProps {
  myUID: number;
  isOpen: boolean;
  onCancel: () => void;
}
const AgentModal = ({ myUID, isOpen, onCancel }: AgentModalProps) => {
  const queryClient = useQueryClient();
  const { scaleValue } = useFontSize();

  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const postAgentRegister = usePostAgentRegister();

  const onRegisterClick = useCallback(async () => {
    const formValues = form.getFieldsValue();
    console.log(formValues);
    await postAgentRegister.mutateAsync(formValues, {
      onSuccess: () => {
        messageApi.open({
          type: 'success',
          content: '대리인 신청을 보냈습니다.',
        });
        queryClient.invalidateQueries({
          queryKey: ['useGetAgent'],
        });
        form.resetFields();
        onCancel();
      },
      onError: (err) => {
        console.log(err.response?.status);
      },
    });
  }, [form, messageApi, onCancel, postAgentRegister, queryClient]);

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
              신청하기
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
      title={'대리인 등록'}
      onCancel={onCancel}
      open={isOpen}
      footer={footer}
      width={700}
      closable={false}
      css={cssRegisterModal(scaleValue)}
    >
      <div className="inputBox">
        <p className="nameBox">
          나의 UID : <span className="myUIDnumber">#{myUID}</span>
        </p>
        {contextHolder}
        <Form form={form} layout="horizontal">
          <Form.Item name="uid">
            <InputNumber
              style={{ width: 210 }}
              placeholder="대리인의 UID를 입력해주세요"
            />
          </Form.Item>
        </Form>
      </div>
      <span className="guide">
        대리인 신청시 대리인에게
        <br />
        개인정보가 노출될수 있습니다.
        <br />
        대리인 선정에 주의하세요.
      </span>
      <p />
    </Modal>
  );
};
export default AgentModal;
