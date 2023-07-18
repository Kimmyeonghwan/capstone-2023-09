export interface IGetAgentResponse {
  status: boolean;
  agentName: string;
  myUid: number;
  myName: string;
  accept: boolean;
}

export interface IPostAgentRequest {
  uid: number;
}
