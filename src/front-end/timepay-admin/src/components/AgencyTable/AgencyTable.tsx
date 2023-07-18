import { Button, message, Modal, Table } from 'antd';
import { useCallback, useMemo } from 'react';
import { useQueryClient } from 'react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  useGetAgencies,
  usePatchAgencyAuthority,
  usePatchAgencyPenalty,
} from '../../api/hooks/agency';
import { IAgency, IGetAgencyRequest } from '../../api/interfaces/IAgency';
import { agencySearchState } from '../../states/agencySearchState';
import { customPaginationProps } from '../../utils/pagination';
import { cssAgencyTableStyle } from './AgencyTable.styles';

const AgencyTable = () => {
  const agencySearchValue = useRecoilValue(agencySearchState);
  const setAgencySearch = useSetRecoilState(agencySearchState);

  const queryClient = useQueryClient();
  const { data, isLoading } = useGetAgencies(agencySearchValue);
  const usePatchAgencyAuthorityMutation = usePatchAgencyAuthority();
  const usePatchAgencyPenaltyMutation = usePatchAgencyPenalty();

  const [messageApi, contextHolder] = message.useMessage();

  const handleOnClickAuthority = useCallback(
    (record: IAgency) => {
      Modal.confirm({
        content: `${record.organizationName} 을 봉사기관으로 인정하시겠습니까?`,
        okText: '예',
        cancelText: '취소',
        onOk: async () => {
          await usePatchAgencyAuthorityMutation.mutateAsync(record.userId, {
            onSuccess: (data) => {
              messageApi.open({
                type: 'success',
                content: '봉사활동 기관으로 인정되었습니다.',
              });
              queryClient.invalidateQueries('useGetAgencies');
            },
          });
        },
      });
    },
    [queryClient, messageApi, usePatchAgencyAuthorityMutation],
  );

  const handleOnClickPenalty = useCallback(
    (record: IAgency) => {
      Modal.confirm({
        content: `${record.organizationName} 에 패널티를 부여하시겠습니까?`,
        okText: '예',
        cancelText: '취소',
        onOk: async () => {
          await usePatchAgencyPenaltyMutation.mutateAsync(record.userId, {
            onSuccess: (data) => {
              messageApi.open({
                type: 'success',
                content: '패널티가 부여되었습니다.',
              });
              queryClient.invalidateQueries('useGetAgencies');
            },
          });
        },
      });
    },
    [queryClient, usePatchAgencyPenaltyMutation, messageApi],
  );

  const dataSource = useMemo(() => {
    if (agencySearchValue) {
      return data?.data.content || [];
    }
    return [];
  }, [agencySearchValue, data]);

  // @ts-ignore
  const columns: ColumnsType<IAgency> = useMemo(() => {
    return [
      {
        title: '회원 번호',
        key: 'userId',
        dataIndex: 'userId',
        width: 90,
        sorter: (a: IAgency, b: IAgency) => a.userId - b.userId,
      },
      {
        title: '아이디(이메일)',
        key: 'id',
        dataIndex: 'id',
        width: 100,
        align: 'center',
      },
      {
        title: '기관명',
        key: 'organizationName',
        dataIndex: 'organizationName',
        width: 100,
        align: 'center',
      },
      {
        title: '봉사활동 기관 여부',
        key: 'authority',
        dataIndex: 'authority',
        width: 110,
        render: (authority: string, record: IAgency) =>
          authority === 'normal' ? (
            record.certificationUrl && record.certificationUrl !== 'none' ? (
              <Button
                type="primary"
                onClick={() => handleOnClickAuthority(record)}
              >
                봉사 기관 인정
              </Button>
            ) : (
              'N'
            )
          ) : (
            'Y'
          ),
      },
      {
        title: '봉사활동 자격 서류',
        key: 'certificationUrl',
        dataIndex: 'certificationUrl',
        width: 110,
        render: (certificationUrl: string) =>
          !certificationUrl || certificationUrl === 'none' ? (
            '-'
          ) : (
            <Button
              type="link"
              download
              href={certificationUrl}
              target="_blank"
            >
              보기
            </Button>
          ),
      },
      {
        title: '사업자 번호',
        key: 'businessNumber',
        dataIndex: 'businessNumber',
        width: 110,
      },
      {
        title: '종사자 수',
        key: 'employeeNum',
        dataIndex: 'employeeNum',
        width: 140,
        align: 'center',
      },
      {
        title: '프로필 이미지',
        key: 'imageUrl',
        dataIndex: 'imageUrl',
        align: 'center',
        width: 120,
        render: (imageUrl: string) =>
          !imageUrl || imageUrl === 'none' ? (
            '-'
          ) : (
            <Button
              type="link"
              onClick={() =>
                Modal.info({
                  content: (
                    <>
                      <img
                        width="100%"
                        height="auto"
                        src={imageUrl}
                        alt="프로필 이미지"
                      />
                    </>
                  ),
                  okText: '닫기',
                })
              }
            >
              보기
            </Button>
          ),
      },

      {
        title: '담당자 이름',
        key: 'managerName',
        dataIndex: 'managerName',
        width: 100,
        align: 'center',
      },
      {
        title: '담당자 연락처',
        key: 'managerPhone',
        dataIndex: 'managerPhone',
        width: 100,
        align: 'center',
      },
      {
        title: '타임페이',
        key: 'timepay',
        dataIndex: 'timepay',
        width: 140,
        align: 'center',
        sorter: (a: IAgency, b: IAgency) => a.timepay - b.timepay,
      },
      {
        title: '블랙리스트',
        key: 'blackList',
        dataIndex: 'blackList',
        width: 140,
        align: 'center',
        render: (blackList: boolean) => (blackList ? 'Y' : 'N'),
      },
      {
        title: '패널티 부여',
        key: 'penalty',
        dataIndex: 'penalty',
        width: 140,
        align: 'center',
        render: (penalty: any, record: IAgency) => (
          <Button onClick={() => handleOnClickPenalty(record)}>
            패널티 부여
          </Button>
        ),
      },
    ];
  }, [handleOnClickAuthority, handleOnClickPenalty]);

  return (
    <>
      {contextHolder}
      <div css={cssAgencyTableStyle}>총 {data?.data.totalElements || 0} 개</div>
      <Table
        css={cssAgencyTableStyle}
        columns={columns}
        scroll={{ x: 1500 }}
        dataSource={dataSource}
        rowKey="userId"
        loading={isLoading}
        pagination={customPaginationProps<IGetAgencyRequest>({
          totalElements: data?.data.totalElements,
          currentSearchValues: agencySearchValue,
          setSearchValues: setAgencySearch,
        })}
      />
    </>
  );
};

export default AgencyTable;
