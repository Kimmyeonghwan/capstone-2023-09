import { Steps, Input, Button, Form, message, Upload, UploadFile } from 'antd';
import { RcFile, UploadChangeParam, UploadProps } from 'antd/es/upload';
import { useCallback, useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  cssPostPageStyle,
  cssPostTitleStyle2,
  cssPostTitleInputStyle,
  cssLineStyle,
  cssPostContentStyle,
  cssPostContentInputStyle,
  cssPostBtnStyle,
  cssPostBtnStyle2,
  cssPostFooterStyle,
  cssPostDateStyle,
} from './RegisterFreePage.style';
import { useSetRecoilState } from 'recoil';
import { headerTitleState } from '../../states/uiState';
import { useQueryClient } from 'react-query';
import { useCreateFreeBoards } from '../../api/hooks/register';
import dummyProfileImg from '../../assets/images/icons/dummy-profile-img.png';
import { useGetCategory } from '../../api/hooks/category';
import { COMMON_COLOR } from '../../styles/constants/colors';
import { useGetUserInfo } from '../../api/hooks/user';

const { TextArea } = Input;
const MAX_IMAGES = 5;

const RegisterServePage = () => {
  const queryClient = useQueryClient();

  const setHeaderTitle = useSetRecoilState(headerTitleState);
  useEffect(() => {
    setHeaderTitle('같이하기');
  }, [setHeaderTitle]);

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [exchangeTimepay, setExchangeTimepay] = useState(0);
  const [form] = Form.useForm();
  const [imgFileList, setImgFileList] = useState<UploadFile[]>([]);
  const [previewImage, setPreviewImage] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);

  const createFreeBoardsMutation = useCreateFreeBoards();
  const [messageApi, contextHolder] = message.useMessage();

  const { data, isLoading } = useGetCategory({
    type: '같이쓰기',
    useYn: 'Y',
  });

  const { data: userInfo, isLoading: isLoadingUser } = useGetUserInfo();

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  // 사진
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const isAgency = useMemo(() => {
    if (userInfo?.data.body.manager_name) return true;
    return false;
  }, [userInfo]);

  const isVolunteerAvailable = useMemo(() => {
    return (
      isAgency &&
      !!userInfo?.data.body.certification_url &&
      userInfo?.data.body.certification_url !== 'none'
    );
  }, [isAgency, userInfo]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files as FileList);
    const urls = files.map((file) => URL.createObjectURL(file));
    // 최대 5개의 이미지를 업로드할 수 있도록 하고 이미지가 5개가 넘을 경우 추가로 업로드하지 못하도록 합니다.
    if (images.length + files.length > MAX_IMAGES) {
      alert(`최대 ${MAX_IMAGES}개의 이미지까지 업로드할 수 있습니다.`);
      return;
    }
    setImages([...images, ...files]);
    setPreviewUrls([...previewUrls, ...urls]);
  };

  const handleDeleteImage = (index: number) => {
    setImages((prevState) => prevState.filter((_, i) => i !== index));
    setPreviewUrls((prevState) => prevState.filter((_, i) => i !== index));
  };

  //////////

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

  ////////

  // 뒤로가기
  const navigate = useNavigate();
  const handleClickBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  // 버튼 활성화 관련
  const isDisabled = !title || !content;

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setContent(event.target.value);
  };
  // 이미지 업로드 핸들러
  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 이미지 파일만 업로드 가능하도록 체크합니다.
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }

    const newImages = [...images];
    const newPreviewUrls = [...previewUrls];
    newImages[index] = file;
    newPreviewUrls[index] = URL.createObjectURL(file);

    setImages(newImages);
    setPreviewUrls(newPreviewUrls);
  };

  const handleOnSubmit = useCallback(
    async (values: any) => {
      let formData = new FormData();
      if (values.images && values.images.length > 0) {
        formData.append('image', values.images[0].originFileObj);
      }

      const newPost = {
        ...values,
        d_board_id: values.d_board_id ? parseInt(values.d_board_id) : null,
        images: null,
      };

      console.log(newPost);

      formData.append(
        'dealBoardDTO',
        new Blob([JSON.stringify(newPost)], { type: 'application/json' }),
      );

      await createFreeBoardsMutation.mutateAsync(formData, {
        onSuccess: (result) => {
          messageApi.open({
            type: 'success',
            content: '게시글이 등록되었습니다.',
            duration: 1,
            onClose: () => {
              navigate(-1);
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
    [createFreeBoardsMutation],
  );

  const uploadButton = useMemo(() => {
    return <img width="100%" height="100%" src={dummyProfileImg} alt="+" />;
  }, []);

  const [current, setCurrent] = useState(0);

  const handleCategoryChange = (value: any) => {
    setCurrent(1);
  };

  const handleTimeLocationChange = () => {
    setCurrent(2); // startTime과 endTime 값을 가져옵니다.
  };

  return (
    <div css={cssPostPageStyle}>
      {contextHolder}
      <Steps
        direction="vertical"
        current={current}
        style={{
          position: 'fixed',
          zIndex: 100,
          background: `${COMMON_COLOR.WHITE}`,
          paddingLeft: 20,
          paddingTop: 10,
          boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
        }}
        items={[
          {
            title: '제목 입력',
          },
          {
            title: '내용 입력',
          },
        ]}
      />

      <Form onFinish={handleOnSubmit} form={form} layout="vertical">
        <Form.Item label="제목" name="title" css={cssPostTitleStyle2}>
          <Input
            css={cssPostTitleInputStyle}
            placeholder="여기에 제목을 입력하세요"
            maxLength={25}
            value={title}
            onChange={handleTitleChange}
          />
        </Form.Item>

        <Form.Item label="내용" name="content" css={cssPostContentStyle}>
          <TextArea
            rows={5}
            style={{ resize: 'none' }}
            css={cssPostContentInputStyle}
            placeholder="여기에 내용을 입력하세요"
            value={content}
            onChange={handleContentChange}
          />
        </Form.Item>
        <div css={cssLineStyle} />
        <Form.Item
          name="images"
          getValueFromEvent={normFile}
          valuePropName="fileList"
          css={cssPostDateStyle}
        >
          <Upload
            onChange={handleImgChange}
            onPreview={handlePreview}
            multiple={false}
            beforeUpload={() => false}
            accept="image/png, image/jpg, image/jpeg"
          >
            {imgFileList.length === 1 ? null : uploadButton}
          </Upload>
        </Form.Item>

        <div css={cssPostFooterStyle}>
          {isDisabled ? (
            <Button css={cssPostBtnStyle2}>작성완료</Button>
          ) : (
            <Button htmlType="submit" css={cssPostBtnStyle}>
              작성완료
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
};

export default RegisterServePage;
