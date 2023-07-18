export interface IPostInstantMatchingRequest {
  auto: boolean;
  category: string;
  content: string;
  endTime: string;
  location: string;
  pay: number;
  startTime: string;
  title: string;
  uid: number; // 도움 받은 user id
}
