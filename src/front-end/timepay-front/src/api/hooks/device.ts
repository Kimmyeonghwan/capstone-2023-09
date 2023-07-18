import { AxiosError, AxiosResponse } from 'axios';
import { useMutation } from 'react-query';
import { apiRequest } from '../request';
import { API_URL } from '../urls';

export const usePatchDeviceToken = () => {
  return useMutation<AxiosResponse<any>, AxiosError, any>({
    mutationKey: 'usePatchDeviceToken',
    mutationFn: (data) =>
      apiRequest.patch(
        `${API_URL.DEVICE_UPDATE}?deviceToken=${data.deviceToken}`,
        {},
      ),
  });
};
