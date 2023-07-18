//리다이렉트될 화면
//kakaoRedirectHandler.tsx

import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../utils/paths';
import {
  getMultiTokenFromCookie,
  setMultiTokenToCookie,
  setTokenToCookie,
} from '../../utils/token';
import { saveUid } from './saveUid';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { agencyState, userState } from '../../states/user';
import { pathToAfterLogin } from '../../states/uiState';
import { getDeviceToken } from '../../utils/device';
import { usePatchDeviceToken } from '../../api/hooks/device';

const KakaoRedirectHandler = () => {
  console.log('kakaoRedirectHandler.tsx');

  const setUserState = useSetRecoilState(userState);
  const setAgencyState = useSetRecoilState(agencyState);

  const pathToAfterLoginValue = useRecoilValue(pathToAfterLogin);
  const patchDeviceToken = usePatchDeviceToken();

  const navigate = useNavigate();
  const goTo = useCallback(
    (path: string) => {
      navigate(path);
    },
    [navigate],
  );

  let authorizationCode = new URL(window.location.href).searchParams.get(
    'code',
  );

  useEffect(() => {
    'USE EFFECT IN LOGIN';
    getDeviceToken().then((deviceToken) => {
      console.log('LOGIN response', deviceToken);

      console.log('인가 코드(Authorization Code): ', authorizationCode);

      const requestUrl = `http://13.125.119.30/oauth/redirect/kakao?code=${authorizationCode}`;
      //const requestUrl = `http://10.30.112.173:8080/oauth/redirect/kakao?code=${authorizationCode}`;
      console.log('인가코드 전송 url: ', requestUrl);
      console.log('entire: ', new URL(window.location.href));

      // Send GET request with authorizationCode
      axios
        .get(requestUrl)
        .then(async (response) => {
          console.log(response);

          //signUp에 따른 처리
          if (response.data.signUp === true) {
            /*jwt 토큰 저장*/
            setTokenToCookie(response.data.jwt, 10);
            if (await getDeviceToken()) {
              setMultiTokenToCookie('undefined', 0);
            }
            console.log('토큰 저장:', response.data.jwt);
            setUserState(response.data);
            setAgencyState(null);
            console.log(pathToAfterLoginValue);
            console.log('deviceToken');
            if (deviceToken) {
              console.log('deviceToken', deviceToken);
              patchDeviceToken.mutateAsync(
                {
                  deviceToken,
                },
                {
                  onSuccess: async (data) => {
                    console.log('디바이스 토큰 업데이트 성공');
                  },
                  onError: (err) => {
                    console.log('디바이스 토큰 업데이트 실패');
                  },
                },
              );
            }

            if (pathToAfterLoginValue) goTo(pathToAfterLoginValue);
            else goTo(PATH.HOME);
          }

          //signUp == false일 경우,
          else if (response.data.signUp === false) {
            /*uid 가져오기*/
            const real_uid = response.data.uid;
            saveUid(real_uid);
            console.log('UID 저장: ', real_uid);

            goTo(PATH.JOIN);
          }
        })
        .catch((error) => {
          console.error('Error sending GET request:', error);
        });
    });
  }, [
    pathToAfterLoginValue,
    authorizationCode,
    goTo,
    setUserState,
    setAgencyState,
    patchDeviceToken,
  ]);

  return <div></div>;
};

export default KakaoRedirectHandler;
