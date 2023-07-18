import { Card, Progress, Spin } from 'antd';
import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { IBoard } from '../../api/interfaces/IPost';
import PostStatusTag from '../PostStatusTag';
import {
  cssSimplePostCardBodyStyle,
  cssSimplePostCardFooterStyle,
  cssSimplePostCardHeadStyle,
  cssSimplePostCardStyle,
} from './SimplePostCard.styles';
import { ReactComponent as RegionPin } from '../../assets/images/icons/region-pin.svg';
import { ReactComponent as Clock } from '../../assets/images/icons/clock.svg';
import { ReactComponent as Attachment } from '../../assets/images/icons/attachment.svg';
import { ReactComponent as VolunteerBadge } from '../../assets/images/icons/volunteer-badge.svg';
import { ReactComponent as AgencyUser } from '../../assets/images/icons/agency-user.svg';
import { UserOutlined } from '@ant-design/icons';
import PostTypeTag from '../PostTypeTag';
import { cssPostTypeTagStyle } from '../PostTypeTag/PostTypeTag.styles';
import { COMMON_COLOR } from '../../styles/constants/colors';
import { getDateDiffToday, getType } from '../../utils/board';
import useFontSize from '../../hooks/useFontSize';
import dayjs from 'dayjs';
import { IDonationBoard } from '../../api/interfaces/IDonation';
import { PATH } from '../../utils/paths';

interface SimplePostCardProps {
  post?: IBoard | IDonationBoard;
}

const SimplePostCard = ({ post }: SimplePostCardProps) => {
  const navigate = useNavigate();
  const { scaleValue } = useFontSize();

  const isDonate = useMemo(() => {
    return getType(post?.type) === '기부하기';
  }, [post?.type]);

  const isTogether = useMemo(() => {
    return getType(post?.type) === '같이하기';
  }, [post?.type]);

  const handlePageChange = useCallback(() => {
    if (isDonate) navigate(`${PATH.DONATION_BOARD}/${post?.id}`);
    else navigate(`/post/${post?.d_boardId}`, {});
  }, [isDonate, navigate, post]);

  const footerComponent = useCallback(
    (
      nickname?: string | null,
      createdAt?: string | null,
      userType?: string | null,
    ) => {
      return (
        <div css={cssSimplePostCardFooterStyle(scaleValue)}>
          <div className="nickname">
            {userType === '일반 유저' ? <UserOutlined /> : <AgencyUser />}
            {userType === '일반 유저' ? nickname : post?.organizationName}
          </div>
          <div>{createdAt ? getDateDiffToday(createdAt) : '-'}</div>
        </div>
      );
    },
    [post, scaleValue],
  );

  const postCardContent = useMemo(() => {
    return (
      <div>
        <div css={cssSimplePostCardHeadStyle(scaleValue)}>
          <div className="tag">
            <div className="type">
              <PostTypeTag type={post?.type} />
            </div>
            {isDonate ? (
              <Progress
                style={{ width: 150 }}
                percent={
                  post?.donateTimePay && post?.targetTimePay
                    ? Math.floor(
                        (post?.donateTimePay / post?.targetTimePay) * 100,
                      )
                    : 0
                }
                size="small"
              />
            ) : (
              <div
                className="amount"
                css={cssPostTypeTagStyle(
                  {
                    backgroundColor: COMMON_COLOR.MAIN1,
                  },
                  scaleValue,
                )}
              >
                {post?.pay || '0'} TP
              </div>
            )}
          </div>
          <div className="title">
            {!isDonate && <PostStatusTag status={post?.boardStatus} />}
            <div className="title-div">{post?.title || '-'}</div>
            <div className="attachment">{post?.imageUrl && <Attachment />}</div>
          </div>
        </div>
        <div css={cssSimplePostCardBodyStyle(scaleValue)}>
          {isTogether ? (
            <></>
          ) : isDonate ? (
            <>
              <div className="post-card-location">
                목표 : {post?.targetTimePay} TP
              </div>
              <div className="post-card-time">
                현재 : {post?.donateTimePay} TP
              </div>
            </>
          ) : (
            <>
              <div className="post-card-location">
                <RegionPin />
                {post?.location || '-'}
              </div>
              <div className="post-card-time">
                <Clock />
                {post ? (
                  <span>
                    {post.startTime
                      ? dayjs(post.startTime, 'YYYY-MM-DDTHH:mm:ss').format(
                          'MM월 DD일 HH시 mm분',
                        )
                      : '-'}{' '}
                    ~{' '}
                    {post.endTime
                      ? dayjs(post.endTime, 'YYYY-MM-DDTHH:mm:ss').format(
                          'HH시 mm분',
                        )
                      : '-'}
                  </span>
                ) : (
                  <span>-</span>
                )}
              </div>
            </>
          )}

          <div className="post-card-content">
            {post?.content || '로딩 중...'}
          </div>
        </div>
      </div>
    );
  }, [post, scaleValue, isDonate, isTogether]);

  return (
    <Card
      bordered={false}
      css={cssSimplePostCardStyle(scaleValue)}
      onClick={handlePageChange}
    >
      <Spin size="large" spinning={!post}>
        {post?.volunteer && (
          <div className="volunteer-badge">
            <VolunteerBadge />
          </div>
        )}
        {postCardContent}
      </Spin>
      {footerComponent(
        post?.userNickname || post?.organizationName!,
        post?.createdAt || post?.createAt,
        post?.userType,
      )}
    </Card>
  );
};

export default SimplePostCard;
