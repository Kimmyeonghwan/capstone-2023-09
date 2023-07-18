import { SelectOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { ICommentActivity } from '../../api/interfaces/IComment';
import useFontSize from '../../hooks/useFontSize';
import { cssActivityCommentCardStyle } from './ActivityCommentCard.styles';

interface ActivityCommentCardProps {
  comment: ICommentActivity;
}
const ActivityCommentCard = ({ comment }: ActivityCommentCardProps) => {
  const { scaleValue } = useFontSize();

  return (
    <NavLink
      css={cssActivityCommentCardStyle(scaleValue)}
      to={`/post/${comment.originBoardId}`}
    >
      <div className="activity-comment-content">{comment.content}</div>
      <div className="activity-origin-post-title">
        <SelectOutlined />
        {comment.boardTitle}
      </div>
      <div className="activity-comment-date-time">
        작성시간 : {comment.writtenTime?.split('.')[0].replace('T', ' ')}
      </div>
    </NavLink>
  );
};

export default ActivityCommentCard;
