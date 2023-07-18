import React, { useState, useCallback, useEffect } from 'react';
import {
  Button,
  Form,
  Input,
  Select,
  Typography,
  Space,
  message,
  Image,
} from 'antd';

import { MONTH } from './Data/months';
import { DAY } from './Data/days';
import { siData } from './Data/SIDATA';
import { guData } from './Data/GUDATA';
import { dongData } from './Data/DONGDATA';

import type { DatePickerProps } from 'antd';
import { DatePicker } from 'antd';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../utils/paths';
import './Join_imageSet.css';

import { save } from '../LoginPage/saveUid';

import {
  cssJoinSubmitBtn,
  cssJoinText,
  cssJoinProfileImg,
  topWrapperCSS,
  cssJoinSubmitBtnBox,
  cssJoinNick,
  cssJoinMargin,
  cssPolicyLinkStyle,
} from './Join.styles';
import { apiRequest } from '../../api/request';
import { API_URL } from '../../api/urls';
import { getDeviceToken } from '../../utils/device';
import PolicyModal from '../../components/PolicyModal';

/*행정동 타입 선언*/
type DongName = keyof typeof dongData;

const JoinPage = () => {
  const { Text } = Typography;
  const [messageApi, contextHolder] = message.useMessage();

  const onFinishFailed = (errorInfo: any) => {
    console.log('회원가입 실패: ', errorInfo);
  };

  const [profileImage, setProfileImage]: any = useState(
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
  );
  const [finalProfileImage, setfinalProfileImage]: any = useState(
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
  );
  const [nickName, setNickName] = useState<string>('');
  const [realName, setRealName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [introduction, setIntroduction] = useState<string>('');
  const [id, setId] = useState<string>(save.toString());
  const [birth, setBirth] = useState<string>('');
  const [town, setTown] = useState<string>('');

  const [year, setYear] = useState<string>('연도');
  const [month, setMonth] = useState<string>('월');
  const [day, setDay] = useState<string>('일');

  const [gu, setGu] = useState(dongData[guData[0]]);
  const [dong, setDong] = useState(dongData[guData[0]][0]);

  const [guText, setGuText] = useState<string>('');
  const [dongText, setDongText] = useState<string>('');

  const [overlap, setOverlap] = useState<boolean>(false);

  const [deviceToken, setDeviceToken] = useState<string>();
  const [isOpenPolicyModal, setIsOpenPolicyModal] = useState(false);

  const navigate = useNavigate();

  const goTo = useCallback(
    (path: string) => {
      navigate(path);
    },
    [navigate],
  );

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

  const onChangeNickName = (e: React.ChangeEvent<HTMLInputElement>) => {
    //console.log('닉네임 바뀜:', e.target.value);
    setNickName(e.target.value);
  };

  const onChangeRealName = (e: React.ChangeEvent<HTMLInputElement>) => {
    //console.log('이름 바뀜:', e.target.value);
    setRealName(e.target.value);
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

  const onChangeYear: DatePickerProps['onChange'] = (date, dateString) => {
    setYear(dateString);
  };

  const onChangeMonth = (value: string) => {
    setMonth(value);
  };

  const onChangeDay = (value: string) => {
    setDay(value);
    const bitrh: string = year + ' ' + month + ' ' + day;
    setBirth(bitrh);
  };

  const onChangePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    //console.log('전화번호 바뀜:', e.target.value);
    setPhoneNumber(e.target.value);
  };

  const onChangeIntroduction = (e: React.ChangeEvent<HTMLInputElement>) => {
    //console.log('자기소개 바뀜:', e.target.value);
    setIntroduction(e.target.value);
  };

  /* 닉네임 유효성 검사 커스텀 */
  const nickname_regExp = /^[a-zA-Zㄱ-힣0-9]{2,16}$/;
  const rightNickname = (_: any, value: string) => {
    if (!value) {
      return Promise.reject(new Error('닉네임을 입력해 주세요.'));
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

  /*이름 검사 커스텀 */
  const realname_regExp = /^[a-zA-Zㄱ-힣]{0,20}$/;
  const rightRealname = (_: any, value: string) => {
    if (!value) {
      return Promise.reject(new Error('이름을 입력해 주세요.'));
    }
    if (!realname_regExp.test(value)) {
      return Promise.reject(new Error('이름은 한글 또는 영어로 입력해주세요.'));
    }
    return Promise.resolve();
  };

  /* 전화번호 유효성 검사 커스텀 */
  const phone_regex = /^[0-9\b -]{9,11}$/;
  const rightPhoneNumber = (_: any, value: string) => {
    if (!value) {
      return Promise.reject(new Error('전화번호를 입력해 주세요.'));
    } else if (value.search(/\s/) !== -1) {
      return Promise.reject(new Error('공백 없이 입력해 주세요.'));
    }
    if (value.length < 9 || value.length > 11) {
      return Promise.reject(new Error('올바른 전화번호를 입력해 주세요.'));
    }
    if (!phone_regex.test(value)) {
      return Promise.reject(
        new Error('전화번호는 -없이 숫자만 입력해 주세요.'),
      );
    }
    return Promise.resolve();
  };

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

  /*Handle 가입 완료 Btn*/
  const handleSubmitBtn = async () => {
    /* 닉네임, 이름, 생년월일, 전화번호를 필수값으로 검사*/
    if (!nickName || !nickname_regExp.test(nickName)) {
      console.log('가입 완료 제출: 닉네임 형식 부적합 ');
    } else if (!realName || !realname_regExp.test(realName)) {
      console.log('가입 완료 제출: 이름 형식 부적합');
    } else if (year === '연도' || month === '월' || day === '일') {
      console.log('가입 완료 제출: 생년월일 형식 부적합');
      warning('생년월일을 입력해 주세요.');
    } else if (
      !phoneNumber ||
      phoneNumber.length < 9 ||
      phoneNumber.length > 11 ||
      !phone_regex.test(phoneNumber)
    ) {
      console.log('가입 완료 제출: 전화번호 형식 부적합');
    } else if (overlap === false) {
      console.log('가입 완료 제출: 닉네임 중복 여부 확인되지 않음');
      warning('닉네임 중복 여부를 검사해 주세요.');
    } else {
      console.log('가입 완료 제출: 조건 충족');

      /*formData*/
      const birthText: string = year + month + day + '0000';
      const townText: string = '서울특별시 ' + guText + ' ' + dongText;

      console.log('birthday: ', birthText);
      console.log('id: ', id);
      console.log('imageUrl: ', '');
      console.log('image: ', finalProfileImage);
      console.log('introduction: ', introduction);
      console.log('location: ', townText);
      console.log('name: ', realName);
      console.log('nickName: ', nickName);
      console.log('phone: ', phoneNumber);
      //console.log('deviceToken: ', 'testToken');

      const formData = new FormData();

      formData.append('birthday', birthText);
      formData.append('id', id);
      formData.append('imageUrl', '');
      formData.append('image', finalProfileImage);
      formData.append('introduction', introduction);
      formData.append('location', townText);
      formData.append('name', realName);
      formData.append('nickName', nickName);
      formData.append('phone', phoneNumber);
      console.log('deviceToken', deviceToken);
      if (deviceToken) formData.append('deviceToken', deviceToken);

      /*POST*/
      apiRequest
        .postFormData(API_URL.USER_INFO_POST, formData)
        .then((res) => {
          console.log('POST 성공');
          console.log(res);
          messageApi
            .open({
              type: 'success',
              content: '회원가입이 완료되었습니다.',
              duration: 1,
            })
            .then(function () {
              goTo(PATH.LOGIN);
            });
        })
        .catch((err) => {
          console.log('POST 실패');
        });
    }
  };

  useEffect(() => {
    'USE EFFECT IN JOIN PAGE';
    getDeviceToken().then((response) => {
      setDeviceToken(response);
      console.log('JOINPAGE response', response);
    });
  }, []);

  return (
    <Space css={topWrapperCSS} align="baseline">
      {contextHolder}

      <Form
        name="JoinPage"
        onFinish={handleSubmitBtn}
        onFinishFailed={onFinishFailed}
      >
        <Text css={cssJoinText}>회원가입</Text>
        <Form.Item name="profileImage" css={cssJoinProfileImg}>
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
          css={cssJoinMargin}
          rules={[{ validator: rightNickname }]}
        >
          <Input onChange={onChangeNickName} />
        </Form.Item>

        <Form.Item name="닉네임 중복 검사">
          <Button type="primary" css={cssJoinNick} onClick={overlapNickname}>
            닉네임 중복 검사
          </Button>
        </Form.Item>

        <Form.Item
          label="이름"
          name="realName"
          rules={[{ validator: rightRealname }]}
          css={cssJoinMargin}
        >
          <Input onChange={onChangeRealName} />
        </Form.Item>

        <Form.Item label="생년월일" name="Birth">
          <Space>
            <DatePicker onChange={onChangeYear} picker="year" />
            <Select
              defaultValue={month}
              onChange={onChangeMonth}
              options={MONTH.map((month) => ({
                label: month,
                value: month,
              }))}
            />

            <Select
              defaultValue={day}
              onChange={onChangeDay}
              options={DAY.map((day) => ({
                label: day,
                value: day,
              }))}
            />
          </Space>
        </Form.Item>

        <Form.Item
          label="전화번호(-없이 숫자로만 입력)"
          name="phone"
          rules={[{ validator: rightPhoneNumber }]}
        >
          <Input onChange={onChangePhoneNumber} />
        </Form.Item>

        <Form.Item label="지역" name="Town">
          {' '}
          <Space align="baseline">
            <Select
              defaultValue={siData[0]}
              options={siData.map((si) => ({
                label: si,
                value: si,
              }))}
            />

            <Select
              defaultValue={'구'}
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
          <Input onChange={onChangeIntroduction} />
        </Form.Item>
        <div css={cssPolicyLinkStyle}>
          클릭 시{' '}
          <span onClick={() => setIsOpenPolicyModal(true)}>
            이용약관 및 개인정보처리방침
          </span>{' '}
          에 동의로 간주합니다.
        </div>
        <Form.Item name="submit" css={cssJoinSubmitBtnBox}>
          <Button type="primary" htmlType="submit" css={cssJoinSubmitBtn}>
            가입 완료
          </Button>
        </Form.Item>
      </Form>
      <PolicyModal
        open={isOpenPolicyModal}
        onCancel={() => setIsOpenPolicyModal(false)}
      />
    </Space>
  );
};

export default JoinPage;
