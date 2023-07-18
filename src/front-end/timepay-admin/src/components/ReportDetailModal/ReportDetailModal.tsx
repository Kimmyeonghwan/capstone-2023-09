import { Button, message, Modal } from 'antd';
import { useCallback, useMemo } from 'react';
import { useQueryClient } from 'react-query';
import { usePatchReport } from '../../api/hooks/report';
import { IReport } from '../../api/interfaces/IReport';
import { cssReportDetailModalStyle } from './ReportDetailModal.styles';

interface ReportDetailModalProps {
  report?: IReport;
  isOpen: boolean;
  onCancel: () => void;
}
const ReportDetailModal = ({
  report,
  isOpen,
  onCancel,
}: ReportDetailModalProps) => {
  const queryClient = useQueryClient();
  const patchReportMutation = usePatchReport();
  const [messageApi, contextHolder] = message.useMessage();

  const handleOnPenalty = useCallback(async () => {
    if (report)
      await patchReportMutation.mutateAsync(
        { userIds: [report?.targetId] },
        {
          onSuccess: async (data) => {
            messageApi.open({
              type: 'success',
              content: '신고 처리 완료되었습니다.',
            });
            await queryClient.invalidateQueries('useGetReports');
          },
          onError: (err) => {
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
          onSettled: () => {
            onCancel();
          },
        },
      );
  }, [messageApi, onCancel, patchReportMutation, queryClient, report]);

  const footer = useMemo(() => {
    return (
      <div>
        <Button type="primary" onClick={() => handleOnPenalty()}>
          신고처리
        </Button>
        <Button type="primary" ghost onClick={onCancel}>
          닫기
        </Button>
      </div>
    );
  }, [handleOnPenalty, onCancel]);

  return (
    <Modal
      title="신고 처리"
      open={isOpen}
      onOk={onCancel}
      onCancel={onCancel}
      footer={footer}
      width={700}
      css={cssReportDetailModalStyle}
    >
      {contextHolder}
      <div className="reportContent">
        <span className="title">신고 사유</span>
        <div className="reportInnerContent">{report?.reason}</div>
        {/* 게시글 조회 api 수정되면 추가 */}
        {/* <span className="title">신고 대상 내용</span>
        <div className="reportInnerContent">{post?.postContent}</div> */}
      </div>
    </Modal>
  );
};
export default ReportDetailModal;
