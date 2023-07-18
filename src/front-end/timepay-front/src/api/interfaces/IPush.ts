import { PageableData } from './ICommon';

export const PUSH_TYPE = {
  ALL: '전체알림',
  ACTIVITY: '활동관련',
} as const;

export type IPushType = 'notice' | 'activity' | 'comment' | 'bookmark';

export interface INotification {
  createdAt: string;
  updatedAt: string;
  pushId: null;
  type: string;
  isAlreadyRead?: boolean;
  notificationId: number;
  title: string;
  imageUrl: any;
  content: string;
  adminId: number;
  adminName: string;
  notice: boolean;
  link: null;
  viewed: boolean;
}
export interface IGetNotificationResponse extends PageableData {
  content: INotification[];
}
