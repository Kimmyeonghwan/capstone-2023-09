import { headerTitleState } from '../../states/uiState';
import { useSetRecoilState } from 'recoil';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Form, Input, message, Modal, Upload, UploadFile } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { RcFile, UploadChangeParam, UploadProps } from 'antd/es/upload';
import dummyProfileImg from '../../assets/images/icons/dummy-profile-img.png';
import { englishRegex, koreanRegex, phoneRegex } from '../../utils/regex';
import { usePatchAgencyUpdate } from '../../api/hooks/agency';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../utils/paths';
import { cssAgencyEditPageStyle } from './AgencyEdit.styles';
import { useGetUserInfo } from '../../api/hooks/user';

const AgencyEditPage = () => {
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [imgFileList, setImgFileList] = useState<UploadFile[]>([]);
  const [previewImage, setPreviewImage] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);

  const { data } = useGetUserInfo();
  const patchAgencyUpdateMutation = usePatchAgencyUpdate();
  const setHeaderTitle = useSetRecoilState(headerTitleState);

  const [messageApi, contextHolder] = message.useMessage();

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

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
        managerName: values.managerName,
        managerPhone: values.managerPhone,
      };

      formData.append(
        'request',
        new Blob([JSON.stringify(newAgency)], { type: 'application/json' }),
      );

      await patchAgencyUpdateMutation.mutateAsync(formData, {
        onSuccess: (result) => {
          messageApi.open({
            type: 'success',
            content: '기관 정보 수정 성공했습니다.',
            duration: 1,
            onClose: () => {
              navigate(PATH.MY_PAGE);
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
    [messageApi, navigate, patchAgencyUpdateMutation],
  );

  const uploadButton = useMemo(() => {
    return <img width="100%" height="100%" src={dummyProfileImg} alt="+" />;
  }, []);

  useEffect(() => {
    setHeaderTitle('기관정보 수정');
  });

  useEffect(() => {
    if (data) {
      form.setFieldValue(
        'profileImage',
        !data.data.body.image_url || data.data.body.image_url === 'none'
          ? undefined
          : [
              {
                uid: 0,
                status: 'done',
                name: '프로필 이미지',
                url: data.data.body.image_url,
              },
            ],
      );
      if (data.data.body.image_url && data.data.body.image_url !== 'none')
        setImgFileList([
          {
            uid: '-1',
            status: 'done',
            name: '프로필 이미지',
            url: data.data.body.image_url,
          },
        ]);
      form.setFieldValue('managerName', data.data.body.manager_name);
      form.setFieldValue('managerPhone', data.data.body.manager_phone);
      form.setFieldValue(
        'volunteerFile',
        !data.data.body.certification_url ||
          data.data.body.certification_url === 'none'
          ? undefined
          : [
              {
                uid: 0,
                status: 'done',
                name: data.data.body.certification_url.split('_')[1],
                url: data.data.body.certification_url,
              },
            ],
      );
    }
  }, [data, form]);

  return (
    <div css={cssAgencyEditPageStyle}>
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
          label="담당자 이름"
          name="managerName"
          rules={[
            { required: true, message: '' },
            { validator: onlyKoreanOrEnglishRule },
          ]}
          initialValue={data?.data.body.manager_name}
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
          name="volunteerFile"
          label="봉사활동 자격 서류"
          rules={[{ required: false }]}
          getValueFromEvent={normFile}
          extra={
            <>
              서류 제출시 확인에 3~4 일 정도 소요될 수 있습니다. <br />
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
          수정 완료
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
  );
};

export default AgencyEditPage;
