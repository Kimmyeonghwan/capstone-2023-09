import React, { useState, useEffect, useCallback } from 'react';
import { Button, Form, Input, Select, Space, message, Image } from 'antd';
import { useNavigate } from 'react-router-dom';
import { headerTitleState } from '../../states/uiState';
import { useSetRecoilState } from 'recoil';

import { siData } from '../JoinPage/Data/SIDATA';
import { guData } from '../JoinPage/Data/GUDATA';
import { dongData } from '../JoinPage/Data/DONGDATA';

import { PATH } from '../../utils/paths';
import './MyEdit_imageSet.css';

import {
  cssMyEditCenter,
  cssMyEditMargin,
  cssMyEditSubmitBtn,
  topWrapperCSS,
} from './MyEdit.styles';
import { cssJoinNick } from '../JoinPage/Join.styles';
import { apiRequest } from '../../api/request';
import { API_URL } from '../../api/urls';
import useFontSize from '../../hooks/useFontSize';

/*행정동 타입 선언*/
type DongName = keyof typeof dongData;

const MyEditPage: React.FC = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const [profileImage, setProfileImage]: any = useState();
  const [finalProfileImage, setfinalProfileImage]: any = useState();

  const [nickName, setNickName] = useState<string>('');
  const [town, setTown] = useState<string>('');
  const [introduction, setIntroduction] = useState<string>('');

  const [gu, setGu] = useState(dongData[guData[0]]);
  const [dong, setDong] = useState(dongData[guData[0]][0]);

  const [guText, setGuText] = useState<string>('');
  const [dongText, setDongText] = useState<string>('');

  const [viewNickname, setViewNickname] = useState<string>('');

  const [overlap, setOverlap] = useState<boolean>(false);

  const { scaleValue } = useFontSize();

  const handleFileChange = (e: any) => {
    const imageFile = e.target.files[0];

    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        if (fileReader.result !== null) {
          setProfileImage(fileReader.result);
          setfinalProfileImage(imageFile);
        }
      }
    };
    fileReader.readAsDataURL(imageFile);
  };

  const navigate = useNavigate(); //history

  const handlePageMove = useCallback(
    (path: string) => {
      navigate(path);
    },
    [navigate],
  );

  const onChangeNickName = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('닉네임 바뀜:', e.target.value);
    setNickName(e.target.value);
  };

  const onChangeGu = (value: DongName) => {
    setGu(dongData[value]);
    setDong(dongData[guData[0]][0]);
    //console.log('구 바뀜: ', value.valueOf());
    setGuText(value.valueOf());
  };

  const onChangeDong = (value: DongName) => {
    setDong(value);
    //console.log('동 바뀜: ', value.valueOf());
    setDongText(value.valueOf());
  };

  const onChangeIntroduction = (e: React.ChangeEvent<HTMLInputElement>) => {
    //console.log('자기소개 바뀜:', e.target.value);
    setIntroduction(e.target.value);
  };

  /* 닉네임 유효성 검사 커스텀 */
  const rightNickname = (_: any, value: string) => {
    const nickname_regExp = /^[a-zA-Zㄱ-힣0-9]{2,16}$/;

    /*닉네임 수정없이 기존 닉네임 그대로*/
    if (nickName === viewNickname || value === '') {
      return Promise.resolve();
    } else if (value.search(/\s/) !== -1) {
      return Promise.reject(new Error('닉네임을 공백 없이 입력해 주세요.'));
    }
    if (!nickname_regExp.test(value)) {
      return Promise.reject(
        new Error(
          '닉네임은 한글, 영어, 숫자를 조합하여 2자 이상 16자 이하로 입력해 주세요.',
        ),
      );
    }

    return Promise.resolve();
  };

  /*지역 null check*/
  const warning = (value: string) => {
    messageApi.open({
      type: 'warning',
      content: value,
    });
  };

  const success_nickNameOverlapping = () => {
    messageApi.open({
      type: 'success',
      content: '사용 가능한 닉네임입니다.',
    });
  };

  /*닉네임 중복 검사*/
  const overlapNickname = () => {
    /*get*/
    apiRequest
      .get(`/api/users/check/nickname/${nickName}`)
      .then((res) => {
        console.log('닉네임 중복 검사 성공');
        console.log(res);

        if (res.data === true) {
          setOverlap(true);
          success_nickNameOverlapping();
        } else if (res.data === false) {
          warning('이미 존재하는 닉네임입니다.');
        }
      })
      .catch((err) => {
        console.log('닉네임 중복 검사 실패');
      });
  };

  /*From Check*/
  const onFinishJoin = () => {
    console.log('수정 성공!');
  };

  const onFinishFailedJoin = () => {
    console.log('수정 실패!');
  };

  /*Handle 가입 완료 Btn*/
  const handleSubmitBtn = () => {
    const formData = new FormData();
    var townText: string = '서울특별시 ' + guText + ' ' + dongText;

    if (gu === dongData[guData[0]] && dong === '동') {
      townText = town;
    } else if (viewNickname !== nickName && overlap === false) {
      console.log('가입 완료 제출: 닉네임 중복 여부 확인되지 않음');
      warning('닉네임 중복 여부를 검사해 주세요.');
    } else {
      console.log('PUT할 데이터');
      console.log('프로필 이미지: ', finalProfileImage);
      console.log('닉네임: ', nickName);
      console.log('지역: ', townText);
      console.log('소개: ', introduction);

      /*formData, put */
      formData.append('image', finalProfileImage);
      formData.append('nickName', nickName);
      formData.append('location', townText);
      formData.append('introduction', introduction);

      apiRequest
        .put(API_URL.USER_INFO_PUT, formData)
        .then((res) => {
          console.log('PUT 완료');
          console.log(res);
          handlePageMove(PATH.MY);
        })
        .catch((err) => {
          console.log('PUT 실패');
        });
    }
  };

  const setHeaderTitle = useSetRecoilState(headerTitleState);

  useEffect(() => {
    console.log('enter edit page');
    setHeaderTitle('내 정보 수정');

    apiRequest
      .get(API_URL.USER_INFO_GET)
      .then((res) => {
        console.log(res);
        form.setFieldValue('nickName', res.data.body.nick_name);
        form.setFieldValue('introduction', res.data.body.introduction);
        setGu(
          dongData[
            res.data.body.location.split(' ')[1] as (typeof guData)[number]
          ],
        );
        setGuText(res.data.body.location.split(' ')[1]);
        setDong(res.data.body.location.split(' ')[2]);

        setfinalProfileImage(
          res.data.body.image_url ||
            'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
        );
        setProfileImage(
          res.data.body.image_url ||
            'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
        );
        console.log(res.data);
        console.log(res.data.body.image_url);

        setViewNickname(res.data.body.nick_name);
        setNickName(res.data.body.nick_name);
        setTown(res.data.body.location);
        setIntroduction(res.data.body.introduction);
      })
      .catch((error) => {
        console.error('Error sending GET request:', error);
      });
  }, [form, setHeaderTitle]);

  return (
    <Space css={topWrapperCSS(scaleValue)} align="baseline">
      {contextHolder}
      <Form
        form={form}
        name="EditMyPage"
        onFinish={handleSubmitBtn}
        onFinishFailed={onFinishFailedJoin}
      >
        <Form.Item name="profileImage" css={cssMyEditCenter}>
          <Space direction="vertical">
            <Image
              src={profileImage}
              width={100}
              height={100}
              className="EditprofileImage"
            />
            <div className="EditprofileImageWrap">
              <label htmlFor="image_guide">
                프로필 사진 설정하기
                <input
                  type="file"
                  id="image_guide"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </Space>
        </Form.Item>

        <Form.Item
          label="닉네임"
          name="nickName"
          rules={[{ validator: rightNickname }]}
          css={cssMyEditMargin}
        >
          <Input
            onChange={onChangeNickName}
            defaultValue={nickName}
            placeholder={nickName}
          />
        </Form.Item>

        <Form.Item name="닉네임 중복 검사">
          <Button type="primary" css={cssJoinNick} onClick={overlapNickname}>
            닉네임 중복 검사
          </Button>
        </Form.Item>

        <Form.Item label="지역" name="Town">
          현재 설정된 지역: {town}
          <Space align="baseline">
            <Select
              defaultValue={siData[0]}
              options={siData.map((si) => ({
                label: si,
                value: si,
              }))}
            />

            <Select
              value={guText as (typeof guData)[number]}
              onChange={onChangeGu}
              options={guData.map((province) => ({
                label: province,
                value: province,
              }))}
              style={{ width: 100 }}
            />

            <Select
              value={dong as DongName}
              onChange={onChangeDong}
              options={gu.map((city) => ({ label: city, value: city }))}
              style={{ width: 100 }}
            />
          </Space>
        </Form.Item>

        <Form.Item
          label="자신을 소개해 주세요"
          name="introduction"
          rules={[{ required: false, message: '' }]}
        >
          <Input onChange={onChangeIntroduction} placeholder={introduction} />
        </Form.Item>

        <Form.Item name="submit" style={{ textAlign: 'center' }}>
          <Button type="primary" htmlType="submit" css={cssMyEditSubmitBtn}>
            수정 완료
          </Button>
        </Form.Item>
      </Form>
    </Space>
  );
};

export default MyEditPage;
