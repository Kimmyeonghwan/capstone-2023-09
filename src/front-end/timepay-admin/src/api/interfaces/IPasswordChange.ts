export interface IPasswordChangeRequest {
  currentPassword: string;
  newPassword: string;
  newPassword2: string;
}

export interface IPasswordChangeResponse {
  success: boolean;
  message: string;
}
