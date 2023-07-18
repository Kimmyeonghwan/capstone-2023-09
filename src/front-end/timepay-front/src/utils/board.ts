import { IPostState, IPostType } from '../api/interfaces/IPost';
import dayjs from 'dayjs';

export const getStatus: (boardStatus?: string | null) => IPostState = (
  boardStatus?: string | null,
) => {
  if (boardStatus)
    switch (boardStatus) {
      case 'MATCHING_IN_PROGRESS':
        return '모집중';
      case 'MATCHING_COMPLETE':
        return '모집완료';
      case 'ACTIVITY_IN_PROGRESS':
        return '활동중';
      case 'ACTIVITY_COMPLETE':
        return '활동완료';
      case 'ACTIVITY_DELAY':
        return '활동지연';
      case 'ACTIVITY_CANCEL':
        return '활동취소';
      default:
        return '모집중';
    }
  else return '모집중';
};

export const getType: (type?: string) => IPostType = (type?: string) => {
  if (type)
    switch (type) {
      case 'help':
        return '도움요청';
      case 'helper':
        return '같이하기';
      case '기부하기':
        return '기부하기';
      default:
        return '도움요청';
    }
  else return '도움요청';
};

export const getDateDiffToday = (createdAt: string) => {
  const diffDay = dayjs().diff(
    dayjs(createdAt, 'YYYY-MM-DDTHH:mm:ss.SSS'),
    'minutes',
  );
  if (diffDay <= 60 * 24) {
    if (diffDay < 60) return `${diffDay}분 전`;
    else {
      return `${Math.floor(diffDay / 60)}시간 전`;
    }
  }
  if (diffDay <= 60 * 24 * 3) {
    return `${Math.floor(diffDay / (60 * 24))} 일 전`;
  }
  return createdAt.split('T')[0];
};
