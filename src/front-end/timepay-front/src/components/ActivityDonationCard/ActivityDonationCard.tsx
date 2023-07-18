import useFontSize from '../../hooks/useFontSize';
import { cssActivityDonationCardStyle } from './ActivityDonationCard.styles';
import { NavLink } from 'react-router-dom';
import { IDonationBoard } from '../../api/interfaces/IDonation';
import { PATH } from '../../utils/paths';
import { Progress } from 'antd';

interface ActivityDonationCardProps {
  board: IDonationBoard;
}
const ActivityDonationCard = ({ board }: ActivityDonationCardProps) => {
  const { scaleValue } = useFontSize();

  return (
    <NavLink
      css={cssActivityDonationCardStyle(scaleValue)}
      to={`${PATH.DONATION_BOARD}/${board.id}`}
    >
      <div className="activity-post-card-title">{board.title}</div>
      <Progress
        style={{ width: '100%' }}
        percent={
          board?.donateTimePay && board?.targetTimePay
            ? Math.floor((board?.donateTimePay / board?.targetTimePay) * 100)
            : 0
        }
        size="small"
      />
      <div className="donate-detail">
        <div>
          목표 : <span className="tp">{board?.targetTimePay || 0} TP</span>
        </div>
        <div>
          현재 : <span className="tp">{board?.donateTimePay || 0} TP</span>
        </div>
      </div>
      <div className="activity-post-date-time">
        작성시간 :{' '}
        {board.createAt ? board.createAt.split('.')[0].replace('T', ' ') : '-'}
      </div>
    </NavLink>
  );
};

export default ActivityDonationCard;
