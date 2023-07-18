import { LinkOutlined } from '@ant-design/icons';
import { Button, Spin, Table } from 'antd';
import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { useGetUserCertificate } from '../../api/hooks/user';
import { ICertification } from '../../api/interfaces/IVolunteer';
import useFontSize from '../../hooks/useFontSize';
import { headerTitleState } from '../../states/uiState';
import { cssMyVolunteerPageStyle } from './MyVolunteerPage.styles';

const MyVolunteerPage = () => {
  const navigate = useNavigate();
  const setHeaderTitle = useSetRecoilState(headerTitleState);

  const { scaleValue } = useFontSize();

  const { data, isLoading } = useGetUserCertificate({
    pageIndex: 0,
    pageSize: 999,
  });

  useEffect(() => {
    setHeaderTitle('봉사활동 기록');
  }, [setHeaderTitle]);

  const handleOnClickTitle = useCallback(
    (record: ICertification) => {
      navigate(`/post/${record.boardId}`);
    },
    [navigate],
  );

  const columns = useMemo(() => {
    return [
      {
        title: '번호',
        dataIndex: 'index',
        render: (_text: number, _record: ICertification, index: number) => {
          ++index;
          return index;
        },
        width: 60,
      },
      {
        title: '활동명',
        dataIndex: 'title',
        width: 180,
        render: (title: string, record: ICertification) => {
          return (
            <>
              <Button
                type="link"
                onClick={() => {
                  handleOnClickTitle(record);
                }}
              >
                <LinkOutlined />
                {title}
              </Button>
              <br />
              <br />
              <div className="agency-info">
                기관명 : <span>{record.organizationName}</span>
                <br />
                담당자 : <span>{record.managerName}</span>
                <br />
                담당자 : <span>{record.managerPhone}</span>
              </div>
            </>
          );
        },
      },
      {
        title: '활동시간',
        dataIndex: 'certificationUrl',
        width: 90,
        render: (certificationUrl: string, record: ICertification) => {
          return (
            <>
              <div
                className={
                  record.certificationUrl ? 'certificate' : 'no-certificate'
                }
              >
                {record.volunteerTime} 시간
              </div>
              <br />
              {certificationUrl ? (
                <Button
                  className="certification-link"
                  type="link"
                  href={certificationUrl}
                  target="_blank"
                  download
                >
                  <LinkOutlined />
                  인증서
                </Button>
              ) : (
                '미발급'
              )}
            </>
          );
        },
      },
    ];
  }, [handleOnClickTitle]);

  return (
    <div css={cssMyVolunteerPageStyle(scaleValue)}>
      {isLoading ? (
        <Spin />
      ) : (
        <Table
          bordered
          title={() => (
            <>
              <div className="volunteer-overview">
                <span className="title">지급받은 총 봉사시간</span>
                <span>총 {data?.data.totalTime || 0} 시간</span>
              </div>
              <div className="volunteer-extra">
                * 타임페이 서비스를 통한 봉사활동만 표시됩니다. <br />* 지급받은
                총 봉사시간은 인증서를 지급 받은 활동만 계산합니다.
              </div>
            </>
          )}
          scroll={{ x: 330 }}
          columns={columns}
          dataSource={data?.data.certificationListPage.content}
          rowKey="boardId"
        />
      )}
    </div>
  );
};

export default MyVolunteerPage;
