import { IBoardState, IBoardType } from '../api/interfaces/IBoard';

export const getStatus: (boardStatus?: string) => IBoardState = (
  boardStatus?: string,
) => {
  if (boardStatus)
    switch (boardStatus) {
      case 'MATCHING_IN_PROGRESS':
        return '매칭중';
      case 'MATCHING_COMPLETE':
        return '매칭완료';
      case 'ACTIVITY_IN_PROGRESS':
        return '활동중';
      case 'ACTIVITY_COMPLETE':
        return '활동완료';
      case 'ACTIVITY_DELAY':
        return '활동지연';
      case 'ACTIVITY_CANCEL':
        return '활동취소';
      default:
        return '매칭중';
    }
  else return '매칭중';
};

export const getType: (type?: string) => IBoardType = (type?: string) => {
  if (type)
    switch (type) {
      case 'help':
        return '도움요청';
      case 'helper':
        return '같이하기';
      case 'event':
        return '기부하기';
      default:
        return '도움요청';
    }
  else return '도움요청';
};
