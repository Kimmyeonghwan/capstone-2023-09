import { cssAgencySignUpPageStyle } from './AgencySignUpPage.styles';
import { headerTitleState } from '../../states/uiState';
import { useSetRecoilState } from 'recoil';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Form, Input, message, Modal, Upload, UploadFile } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { RcFile, UploadChangeParam, UploadProps } from 'antd/es/upload';
import dummyProfileImg from '../../assets/images/icons/dummy-profile-img.png';
import {
  companyRegistrationNumber,
  englishRegex,
  koreanRegex,
  numberRegex,
  passwordRegex,
  phoneRegex,
} from '../../utils/regex';
import { usePostAgencyRegister } from '../../api/hooks/agency';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../utils/paths';
import MainHeader from '../../components/MainHeader';

const AgencySignUpPage = () => {
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [imgFileList, setImgFileList] = useState<UploadFile[]>([]);
  const [previewImage, setPreviewImage] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);

  const postAgencyRegisterMutation = usePostAgencyRegister();
  const setHeaderTitle = useSetRecoilState(headerTitleState);

  const [messageApi, contextHolder] = message.useMessage();

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const passwordRegexRule = (_: any, value: string) => {
    if (!value) {
      return Promise.reject(new Error('비밀번호를 입력해 주세요.'));
    }
    if (!passwordRegex.test(value)) {
      return Promise.reject(new Error('비밀번호 형식에 맞게 입력해주세요.'));
    }
    return Promise.resolve();
  };

  const checkPassword = useCallback(
    (_rule: any, value: any) => {
      if (!value) {
        return Promise.reject(new Error('비밀번호를 확인해주세요.'));
      }
      if (value !== form.getFieldValue('pw')) {
        return Promise.reject(new Error('비밀번호가 불일치합니다.'));
      } else {
        return Promise.resolve();
      }
    },
    [form],
  );

  const phoneNumberRule = (_: any, value: string) => {
    if (!value) {
      return Promise.reject(new Error('전화번호를 입력해주세요.'));
    }
    if (!phoneRegex.test(value)) {
      return Promise.reject(
        new Error('휴대폰 전화번호에 맞는 형식으로 입력해주세요.'),
      );
    }
    return Promise.resolve();
  };

  const companyRegistrationNumberRule = (_: any, value: string) => {
    if (value && !companyRegistrationNumber.test(value)) {
      return Promise.reject(
        new Error('사업자 등록 번호에 맞는 형식으로 입력해주세요.'),
      );
    }
    return Promise.resolve();
  };

  const onlyKoreanOrEnglishRule = (param: any, value: string) => {
    if (!value) {
      if (param.field === 'organizationName')
        return Promise.reject(new Error('기관명을 입력해주세요.'));
      if (param.field === 'managerName')
        return Promise.reject(new Error('담당자명을 입력해주세요.'));
    }
    if (!koreanRegex.test(value) && !englishRegex.test(value)) {
      return Promise.reject(new Error('영어 또는 한글로만 입력해주세요.'));
    }
    return Promise.resolve();
  };

  const onlyNumberRegex = (_: any, value: string) => {
    if (!value) {
      return Promise.reject(new Error('종사자 수를 입력해주세요.'));
    }
    if (!numberRegex.test(value)) {
      return Promise.reject(new Error('숫자로만 입력해주세요.'));
    }
    return Promise.resolve();
  };

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handleImgChange: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>,
  ) => {
    setImgFileList(info.fileList);
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleCancelPreview = useCallback(() => setPreviewOpen(false), []);

  const handleOnSubmit = useCallback(
    async (values: any) => {
      let formData = new FormData();
      if (values.profileImage && values.profileImage.length > 0) {
        formData.append('image', values.profileImage[0].originFileObj);
      }
      if (values.volunteerFile && values.volunteerFile.length > 0) {
        formData.append('certification', values.volunteerFile[0].originFileObj);
      }
      const newAgency = {
        ...values,
        employeeNum: parseInt(values.employeeNum),
        checkPw: null,
        profileImage: null,
        volunteerFile: null,
        timepay: parseInt(values.employeeNum) * 600,
      };

      formData.append(
        'request',
        new Blob([JSON.stringify(newAgency)], { type: 'application/json' }),
      );

      await postAgencyRegisterMutation.mutateAsync(formData, {
        onSuccess: (result) => {
          messageApi.open({
            type: 'success',
            content: '회원가입을 성공했습니다.',
            duration: 1,
            onClose: () => {
              navigate(PATH.AGENCY_SIGN_IN);
            },
          });
        },
        onError: (err) => {
          console.log(err);
          messageApi.open({
            type: 'error',
            content: (
              <>
                오류 발생: <br />
                {err}
              </>
            ),
          });
        },
      });
    },
    [messageApi, navigate, postAgencyRegisterMutation],
  );

  const uploadButton = useMemo(() => {
    return <img width="100%" height="100%" src={dummyProfileImg} alt="+" />;
  }, []);

  useEffect(() => {
    setHeaderTitle('기관 회원가입');
  });

  return (
    <>
      <MainHeader />
      <div css={cssAgencySignUpPageStyle}>
        {contextHolder}
        <Form onFinish={handleOnSubmit} form={form}>
          <Form.Item
            name="profileImage"
            getValueFromEvent={normFile}
            valuePropName="fileList"
          >
            <Upload
              onChange={handleImgChange}
              onPreview={handlePreview}
              listType="picture-circle"
              multiple={false}
              beforeUpload={() => false}
              accept="image/png, image/jpg, image/jpeg"
            >
              {imgFileList.length === 1 ? null : uploadButton}
            </Upload>
          </Form.Item>
          <Form.Item
            label="아이디"
            name="id"
            rules={[
              { required: true, message: '아이디를 입력해주세요' },
              {
                type: 'email',
                message: '아이디를 이메일 형식으로 입력해주세요',
              },
            ]}
          >
            <Input placeholder="아이디는 담당자 이메일로 입력해주세요." />
          </Form.Item>
          <Form.Item
            label="비밀번호"
            name="pw"
            rules={[
              { required: true, message: '' },
              { validator: passwordRegexRule },
            ]}
            extra="숫자, 영문, 특수기호(!@#$%^&*,./?)를 모두 포함하는 10~20자리"
          >
            <Input type="password" placeholder="비밀번호를 입력해주세요." />
          </Form.Item>
          <Form.Item
            label="비밀번호 확인"
            name="checkPw"
            rules={[
              { required: true, message: '' },
              { validator: checkPassword },
            ]}
          >
            <Input
              type="password"
              placeholder="비밀번호를 다시 입력해주세요."
            />
          </Form.Item>
          <Form.Item
            label="기관명"
            name="organizationName"
            rules={[
              { required: true, message: '' },
              { validator: onlyKoreanOrEnglishRule },
            ]}
          >
            <Input placeholder="기관명을 입력해주세요." />
          </Form.Item>
          <Form.Item
            label="사업자 등록 번호"
            name="businessCode"
            rules={[{ validator: companyRegistrationNumberRule }]}
          >
            <Input
              type="number"
              placeholder="사업자 등록 번호를 입력해주세요."
            />
          </Form.Item>
          <Form.Item
            label="담당자 이름"
            name="managerName"
            rules={[
              { required: true, message: '' },
              { validator: onlyKoreanOrEnglishRule },
            ]}
          >
            <Input placeholder="담당자 이름을 입력해주세요." />
          </Form.Item>
          <Form.Item
            label="담당자 전화번호"
            name="managerPhone"
            rules={[
              { required: true, message: '' },
              { validator: phoneNumberRule },
            ]}
            extra="'-' 빼고 입력 : 예시) 010XXXXXXXX"
          >
            <Input placeholder="담당자 전화번호를 입력해주세요." />
          </Form.Item>
          <Form.Item
            label="종사자 수 입력"
            name="employeeNum"
            rules={[
              { required: true, message: '' },
              { validator: onlyNumberRegex },
            ]}
          >
            <Input type="number" placeholder="종사자 수" />
          </Form.Item>
          <Form.Item
            name="volunteerFile"
            label="봉사활동 자격 서류"
            rules={[{ required: false }]}
            getValueFromEvent={normFile}
            extra={
              <>
                가입 완료 후에도 마이 페이지에서 제출 가능합니다.
                <br /> 서류 제출시 확인에 3~4 일 정도 소요될 수 있습니다. <br />
                제출한 회원만 봉사 활동 모집글을 올릴 수 있습니다.
              </>
            }
            valuePropName="fileList"
          >
            <Upload beforeUpload={() => false} maxCount={3} multiple>
              <Button icon={<UploadOutlined />}>업로드</Button>
            </Upload>
          </Form.Item>
          <Button htmlType="submit" className="submit-btn" type="primary">
            회원가입 완료
          </Button>
        </Form>
        <Modal
          open={previewOpen}
          title="프로필 미리보기"
          footer={null}
          onCancel={handleCancelPreview}
        >
          <img
            alt="프로필 이미지"
            style={{ width: '100%', height: 'auto' }}
            src={previewImage}
          />
        </Modal>
      </div>
    </>
  );
};

export default AgencySignUpPage;
