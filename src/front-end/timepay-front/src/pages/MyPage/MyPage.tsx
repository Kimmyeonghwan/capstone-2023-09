import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSetRecoilState } from 'recoil';

import { headerTitleState } from '../../states/uiState';
import { PATH } from '../../utils/paths';

import { apiRequest } from '../../api/request';
import { API_URL } from '../../api/urls';
import { useAgencyLogout, useDeleteAgency } from '../../api/hooks/agency';
import { message, Modal } from 'antd';
import { getMultiTokenFromCookie, setTokenToCookie } from '../../utils/token';
import { useDelete, useLogout } from '../../api/hooks/user';
import {
  cssMyInfoStyle,
  cssMyPage,
  cssMyPageProfileBlock,
  cssMyPageInfoBlock,
  cssMyPageButtonBlock,
  cssMyStyle,
} from './MyPage.styles';
import { IAgency } from '../../api/interfaces/IAgency';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import useFontSize from '../../hooks/useFontSize';

const MyPage = () => {
  const navigate = useNavigate();

  const useLogoutMutation = useLogout();
  const useDeleteMutation = useDelete();
  const useAgencyLogoutMutation = useAgencyLogout();
  const useDeleteAgencyMutation = useDeleteAgency();

  const setHeaderTitle = useSetRecoilState(headerTitleState);

  const [messageApi, contextHolder] = message.useMessage();

  const { scaleValue } = useFontSize();

  const [image, setImage]: any = useState();
  const [nickName, setNickName]: any = useState();
  const [town, setTown]: any = useState();
  const [introduction, setIntroduction]: any = useState();
  const [personalNum, setPersonalNum]: any = useState();
  const [timePay, setTimePay]: any = useState();
  const [agencyInfo, setAgencyInfo] = useState<IAgency>();
  const multiToken = getMultiTokenFromCookie();

  const handlePageMove = useCallback(
    (path: string) => {
      navigate(path);
    },
    [navigate],
  );

  const handleOnLogOut = useCallback(async () => {
    Modal.confirm({
      content: '정말 로그아웃 하시겠습니까?',
      okText: '확인',
      cancelText: '취소',
      onOk: async () => {
        if (agencyInfo) {
          await useAgencyLogoutMutation.mutateAsync(
            {},
            {
              onSuccess: async (data) => {
                messageApi.open({
                  type: 'success',
                  content: '로그아웃 완료',
                  duration: 0.5,
                  onClose() {
                    setTokenToCookie('', 0);
                    navigate(PATH.AGENCY_SIGN_IN);
                  },
                });
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
            },
          );
        } else {
          await useLogoutMutation.mutateAsync(
            {},
            {
              onSuccess: async (data) => {
                messageApi.open({
                  type: 'success',
                  content: '로그아웃 완료',
                  duration: 0.5,
                  onClose() {
                    setTokenToCookie('', 0);
                    navigate(PATH.LOGIN);
                  },
                });
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
            },
          );
        }
      },
    });
  }, [
    agencyInfo,
    messageApi,
    useLogoutMutation,
    useAgencyLogoutMutation,
    navigate,
  ]);

  const handleOnCloseWithdraw = useCallback(() => {
    Modal.confirm({
      content: '정말 탈퇴하시겠습니까?',
      okText: '확인',
      cancelText: '취소',
      onOk: async () => {
        if (agencyInfo) {
          await useDeleteAgencyMutation.mutateAsync(undefined, {
            onSuccess: async (data) => {
              messageApi.open({
                type: 'success',
                content: '탈퇴 완료',
                duration: 0.5,
                onClose() {
                  setTokenToCookie('', 0);
                  navigate(PATH.AGENCY_SIGN_IN);
                },
              });
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
          });
        } else {
          await useDeleteMutation.mutateAsync(undefined, {
            onSuccess: async (data) => {
              messageApi.open({
                type: 'success',
                content: '탈퇴 완료',
                duration: 0.5,
                onClose() {
                  setTokenToCookie('', 0);
                  navigate(PATH.LOGIN);
                },
              });
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
          });
        }
      },
    });
  }, [
    agencyInfo,
    messageApi,
    useDeleteAgencyMutation,
    useDeleteMutation,
    navigate,
  ]);

  useEffect(() => {
    if (agencyInfo) setHeaderTitle('기관 정보');
    else setHeaderTitle('내정보');
  }, [agencyInfo, setHeaderTitle]);

  useEffect(() => {
    apiRequest
      .get(API_URL.USER_INFO_GET)
      .then((res) => {
        setImage(
          res.data.body.image_url ||
            'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
        );
        setNickName(res.data.body.nick_name);
        setTown(res.data.body.location);
        setIntroduction(res.data.body.introduction);
        setPersonalNum(res.data.body.id);
        setTimePay(res.data.body.time_pay);
        if (res.data.body.manager_name) {
          setAgencyInfo(res.data.body);
        }
      })
      .catch((error) => {
        console.error('Error sending GET request:', error);
      });
  }, []);

  return (
    <div css={cssMyStyle(scaleValue)}>
      {contextHolder}
      <div className="MyContentWrap">
        <div className="MyEdit">
          <button
            className="Edit"
            onClick={() =>
              handlePageMove(agencyInfo ? PATH.AGENCY_EDIT : PATH.MY_EDIT)
            }
          >
            {agencyInfo ? '기관정보 수정' : '프로필 수정'}
          </button>
        </div>

        {agencyInfo ? (
          <div css={cssMyInfoStyle(scaleValue)}>
            <div className="info-header">
              <img
                src={
                  !agencyInfo.image_url || agencyInfo.image_url === 'none'
                    ? 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
                    : agencyInfo.image_url
                }
                alt="내 프로필"
              />
              <div>{agencyInfo.organization_name}</div>
            </div>
            <div className="info-detail">
              <div>
                <span className="label">이메일(아이디)</span>
                <span className="value">{agencyInfo.id}</span>
              </div>
              <div>
                <span className="label">사업자등록번호</span>
                <span className="value">{agencyInfo.business_code}</span>
              </div>
              <div>
                <span className="label">종사자 수</span>
                <span className="value">{agencyInfo.employee_num} 명</span>
              </div>
              <div>
                <span className="label">현재 타임페이</span>
                <span className="value">{agencyInfo.timepay} TP</span>
              </div>
              <div>
                <span className="label">봉사활동 자격 서류 인증</span>
                <span className="value">
                  {agencyInfo.authority === 'volunteer' ? (
                    <CheckCircleFilled className="yes" />
                  ) : (
                    <CloseCircleFilled className="no" />
                  )}
                </span>
              </div>
              <div></div>
              <div>
                <span className="label">담당자 이름</span>
                <span className="value">{agencyInfo.manager_name}</span>
              </div>
              <div>
                <span className="label">담당자 전화번호</span>
                <span className="value">{agencyInfo.manager_phone}</span>
              </div>
            </div>
          </div>
        ) : (
          <div css={cssMyPage}>
            <div css={cssMyPageProfileBlock(scaleValue)}>
              <div className="MyTopBox">
                <div className="MyImageWrap">
                  <img src={image} className="MyProfileImage" alt="내 프로필" />
                </div>
                <div className="space"></div>

                <div className="MyNameWrap">
                  <div className="MyName">{nickName}</div>
                  <div className="MyPersonalNum"> {'#' + personalNum}</div>
                </div>
              </div>
            </div>

            <div css={cssMyPageInfoBlock(scaleValue)}>
              <div className="MyTotalBox">
                <div className="MyLeftBox">
                  <div className="MyTitleText">나의 타임페이</div>
                  <div className="MyTitleText">나의 동네</div>
                  <div className="MyTitleText">나의 소개</div>
                </div>
                <div className="MyRightBox">
                  <div className="MyContentText">{timePay}</div>
                  <div className="MyContentText">{town}</div>
                  <div className="MyContentText">{introduction}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div css={cssMyPageButtonBlock(scaleValue)}>
          <div className="MyBlockBox">
            {/* <div className="MyPageMoveBox">
              <button
                className="MyPageText"
                onClick={() => handlePageMove(PATH.MY_ACTIVITY_RECORD)}
              >
                활동 기록
              </button>
            </div> */}
            {!agencyInfo && (
              <div className="MyPageMoveBox">
                <button
                  className="MyPageText"
                  onClick={() => handlePageMove(PATH.MY_VOLUNTEER)}
                >
                  봉사활동 기록
                </button>
              </div>
            )}
            {!multiToken || multiToken === 'undefined' ? (
              <>
                <div className="MyPageMoveBox">
                  <button
                    className="MyPageText"
                    onClick={() => handlePageMove(PATH.AGENT)}
                  >
                    대리인 관리
                  </button>
                </div>
                <div className="MyPageMoveBox">
                  <button
                    className="MyPageText"
                    onClick={() => handlePageMove(PATH.APPLICANT)}
                  >
                    신청인 관리
                  </button>
                </div>
              </>
            ) : (
              <></>
            )}

            <div className="MyPageMoveBox">
              <button
                className="MyPageText"
                onClick={() => handlePageMove(PATH.INQUIRE)}
              >
                문의하기
              </button>
            </div>

            <div className="MyPageMoveBox">
              <button
                className="MyPageText"
                onClick={() => handlePageMove(PATH.CATEGORY_SELECT)}
              >
                카테고리 알림 설정
              </button>
            </div>

            {!multiToken || multiToken === 'undefined' ? (
              <>
                <div className="MyPageMoveBox">
                  <button className="MyPageText" onClick={handleOnLogOut}>
                    로그아웃
                  </button>
                </div>
                <div className="MyPageMoveBox">
                  <button
                    className="MyPageText"
                    onClick={handleOnCloseWithdraw}
                  >
                    탈퇴하기
                  </button>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
