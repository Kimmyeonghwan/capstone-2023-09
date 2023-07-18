import {
  Steps,
  Input,
  Button,
  Form,
  message,
  Upload,
  UploadFile,
  Radio,
  DatePicker,
  Checkbox,
  Modal,
} from 'antd';
import { RcFile, UploadChangeParam, UploadProps } from 'antd/es/upload';
import { useCallback, useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  cssPostPageStyle,
  cssPostTitleStyle,
  cssPostTitleInputStyle,
  cssLineStyle,
  cssPostContentStyle,
  cssPostContentInputStyle,
  cssPostBtnStyle,
  cssPostBtnStyle2,
  cssPostFooterStyle,
  cssPostCategoryStyle,
  cssPostDateStyle,
} from './RegisterFreePage.style';
import { FlagFilled } from '@ant-design/icons';
import { useSetRecoilState } from 'recoil';
import { headerTitleState } from '../../states/uiState';
import { useQueryClient } from 'react-query';
import { useCreateDealBoards } from '../../api/hooks/register';
import dummyProfileImg from '../../assets/images/icons/dummy-profile-img.png';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import locale from 'antd/es/date-picker/locale/ko_KR';
import { useGetCategory } from '../../api/hooks/category';
import { COMMON_COLOR } from '../../styles/constants/colors';
import { useGetUserInfo } from '../../api/hooks/user';
import {
  cssPostAutoStyle,
  cssPostInputNumberStyle,
} from './RegisterRequest.styles';

const { TextArea } = Input;
const MAX_IMAGES = 5;

const RegisterRequestPage = () => {
  const queryClient = useQueryClient();

  const setHeaderTitle = useSetRecoilState(headerTitleState);
  useEffect(() => {
    setHeaderTitle('도움요청');
  }, [setHeaderTitle]);

  const [title, setTitle] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [exchangeTimepay, setExchangeTimepay] = useState(0);
  const [form] = Form.useForm();
  const [imgFileList, setImgFileList] = useState<UploadFile[]>([]);
  const [previewImage, setPreviewImage] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);

  const createDealBoardsMutation = useCreateDealBoards();
  const [messageApi, contextHolder] = message.useMessage();

  const pay = 100;

  const { data, isLoading } = useGetCategory({
    type: '도움요청',
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
  const [isVolunteer, setIsVolunteer] = useState(false);

  const isAgency = useMemo(() => {
    if (userInfo?.data.body.manager_name) return true;
    return false;
  }, [userInfo]);

  const isVolunteerAvailable = useMemo(() => {
    return isAgency && userInfo?.data.body?.authority === 'volunteer';
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

  // 보유 타임페이보다 지급 타임페이가 큰 경우의 로직 나중에.. 구현

  // 뒤로가기
  const navigate = useNavigate();
  const handleClickBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  // 버튼 활성화 관련
  const isDisabled = !title || !content || !location;

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
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

  const handleOnChangeTime = useCallback((changedValues: any, values: any) => {
    if (values.startTime && values.endTime) {
      const startTime = values.startTime.clone();
      const endTime = values.endTime.clone();
      const duration = endTime.diff(startTime, 'minutes');
      setExchangeTimepay(duration);
    } else {
      setExchangeTimepay(30);
    }
  }, []);

  const handleOnSubmit = useCallback(
    async (values: any) => {
      if (
        userInfo?.data.body.time_pay &&
        userInfo?.data.body.time_pay < exchangeTimepay
      ) {
        Modal.warning({
          title: '도움요청 불가',
          content: (
            <>
              보유한 타임페이가 부족해서 도움을 요청할 수 없습니다!
              <br />
              활동 시간을 줄이거나 도움을 주고 타임페이를 얻어보세요!
              <br />
              <br />
              <div style={{ fontSize: 16, fontWeight: 700 }}>
                보유한 타임페이 : {userInfo.data.body.time_pay || 0} TP <br />
                부족한 타임페이 :{' '}
                <span style={{ color: COMMON_COLOR.MAIN2 }}>
                  {exchangeTimepay - userInfo.data.body.time_pay || 0} TP
                </span>
              </div>
              <br />
            </>
          ),
          okText: '확인',
        });
      } else {
        let formData = new FormData();
        if (values.images && values.images.length > 0) {
          formData.append('image', values.images[0].originFileObj);
        }

        const newPost = {
          ...values,
          d_board_id: values.d_board_id ? parseInt(values.d_board_id) : null,
          volunteer: isVolunteerAvailable ? values.volunteer : false,
          volunteerPeople: isVolunteerAvailable
            ? parseInt(values.volunteerPeople)
            : 0,
          volunteerTime: isVolunteerAvailable
            ? values.volunteer
              ? values.volunteerTime
                ? parseInt(values.volunteerTime)
                : Math.ceil(exchangeTimepay / 60)
              : 0
            : 0,
          images: null,
          startTime: `${values.activityDate.format(
            'YYYY-MM-DD',
          )}T${values.startTime.format('HH:mm:ss')}.000Z`,
          endTime: `${values.activityDate.format(
            'YYYY-MM-DD',
          )}T${values.endTime.format('HH:mm:ss')}.000Z`,
          pay: exchangeTimepay,
        };

        console.log(newPost);

        formData.append(
          'dealBoardDTO',
          new Blob([JSON.stringify(newPost)], { type: 'application/json' }),
        );

        await createDealBoardsMutation.mutateAsync(formData, {
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
      }
    },
    [
      userInfo,
      messageApi,
      navigate,
      exchangeTimepay,
      isVolunteerAvailable,
      createDealBoardsMutation,
    ],
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
            title: '카테고리 선택',
          },
          {
            title: '시간/장소 입력',
          },
          {
            title: '게시글 내용 입력',
          },
        ]}
      />

      <Form onFinish={handleOnSubmit} form={form} layout="vertical">
        {isAgency && (
          <Form.Item
            label=""
            name="volunteer"
            css={cssPostCategoryStyle}
            valuePropName="checked"
            extra="봉사활동 지급 게시글 등록은 봉사활동 자격 서류 인증을 완료한 기관만 가능합니다."
          >
            <Checkbox
              disabled={!isVolunteerAvailable}
              onChange={(e) => {
                setIsVolunteer(e.target.checked);
              }}
            >
              봉사활동 지급 여부
            </Checkbox>
          </Form.Item>
        )}
        {isAgency && (
          <Form.Item
            label="봉사활동 인원"
            name="volunteerPeople"
            css={cssPostInputNumberStyle}
            extra="인원 * 타임페이가 소모될 예정입니다."
          >
            <Input
              min={1}
              disabled={!isVolunteerAvailable || !isVolunteer}
              addonAfter="명"
            />
          </Form.Item>
        )}
        {isAgency && (
          <Form.Item
            label="지급할 봉사활동 시간"
            name="volunteerTime"
            css={cssPostInputNumberStyle}
            extra={
              <>
                활동 완료 시 봉사자에게 지급할 봉사시간입니다. <br /> 작성하지
                않을 경우 활동 시간에서 반올림합니다.
              </>
            }
            rules={[{ required: false }]}
          >
            <Input
              min={1}
              step={1}
              disabled={!isVolunteerAvailable || !isVolunteer}
              addonAfter="시간"
            />
          </Form.Item>
        )}
        <Form.Item
          label="카테고리 선택"
          name="category"
          css={isAgency ? cssPostDateStyle : cssPostCategoryStyle}
        >
          <Radio.Group onChange={handleCategoryChange}>
            {data?.data.map((category) => (
              <Radio.Button
                key={category.categoryId}
                value={category.categoryName}
                style={{
                  borderRadius: '0',
                  margin: '5px',
                  fontWeight: '500',
                }}
              >
                {category.categoryName}
              </Radio.Button>
            ))}
          </Radio.Group>
        </Form.Item>

        <div css={cssLineStyle} />

        <Form.Item
          name="activityDate"
          label="활동일"
          initialValue={dayjs()}
          css={cssPostDateStyle}
        >
          <DatePicker format="YYYY년 MM월 DD일" />
        </Form.Item>

        <div className="time">
          <Form.Item
            name="startTime"
            label="활동을 시작할 시간"
            css={cssPostDateStyle}
            initialValue={dayjs().minute(0)}
          >
            <DatePicker.TimePicker
              locale={locale}
              format="HH시 mm분"
              placeholder="시간"
              showNow={false}
              minuteStep={30}
              popupClassName="time-picker-no-footer"
              onSelect={(value) => {
                form.setFieldValue('startTime', value);
                handleOnChangeTime({ startTime: value }, form.getFieldsValue());
              }}
            />
          </Form.Item>
          <Form.Item
            name="endTime"
            label="활동이 끝날 시간"
            css={cssPostDateStyle}
            initialValue={dayjs().minute(0)}
          >
            <DatePicker.TimePicker
              locale={locale}
              format="HH시 mm분"
              placeholder="시간"
              showNow={false}
              minuteStep={30}
              allowClear={false}
              popupClassName="time-picker-no-footer"
              onSelect={(value) => {
                form.setFieldValue('endTime', value);
                handleOnChangeTime({ endTime: value }, form.getFieldsValue());
              }}
              disabledTime={(now) => {
                return {
                  disabledHours: () => {
                    const { startTime } = form.getFieldsValue(['startTime']);
                    if (startTime) {
                      const selectedHour = startTime.hour();
                      return Array.from({ length: selectedHour }, (_, i) => i);
                    }
                    return [];
                  },
                };
              }}
            />
          </Form.Item>
        </div>
        <div className="guide">
          <div>
            교환할 타임페이 양 :{' '}
            <b>{exchangeTimepay ? exchangeTimepay + ' TP' : ''}</b>{' '}
          </div>
          <div>도움을 받은 분의 타임페이가 충분한지 확인해주세요.</div>
        </div>

        <Form.Item label="장소" name="location" css={cssPostDateStyle}>
          <Input
            size="large"
            placeholder="여기에 장소를 입력하세요"
            style={{
              paddingLeft: '15px',
              width: '230px',
            }}
            prefix={<FlagFilled style={{ marginRight: '5px' }} />}
            onChange={(event) => {
              handleLocationChange(event);
              handleTimeLocationChange();
            }}
          />
        </Form.Item>
        <div css={cssLineStyle} />

        <Form.Item label="제목" name="title" css={cssPostTitleStyle}>
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
        <Form.Item
          label=""
          name="auto"
          css={cssPostAutoStyle}
          valuePropName="checked"
          extra="설정 시 선착순으로 매칭됩니다."
        >
          <Checkbox>자동매칭 여부</Checkbox>
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

export default RegisterRequestPage;
