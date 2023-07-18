import { Button, DatePicker, Form, Input, message, Steps } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import {
  cssInstantActivityPageStyle,
  cssInstantActivityStepItemStyle,
} from './InstantActivityPage.styles';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import locale from 'antd/es/date-picker/locale/ko_KR';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { headerTitleState } from '../../states/uiState';
import { useGetUserInfo } from '../../api/hooks/user';
import { PATH } from '../../utils/paths';
import useFontSize from '../../hooks/useFontSize';
import { usePostInstantMatching } from '../../api/hooks/instantMatching';
import { IPostInstantMatchingRequest } from '../../api/interfaces/IInstantMatching';
import { useQueryClient } from 'react-query';

const InstantActivityPage = () => {
  const queryClient = useQueryClient();

  const usePostInstantMatchingMutation = usePostInstantMatching();
  const navigate = useNavigate();
  const setHeaderTitle = useSetRecoilState(headerTitleState);
  const { data } = useGetUserInfo();
  const { helpPk } = useParams();

  const { scaleValue } = useFontSize();

  const [timeForm] = Form.useForm();
  const [contentForm] = Form.useForm();
  const [current, setCurrent] = useState(0);
  const [exchangeTimepay, setExchangeTimepay] = useState(60);

  const [messageApi, contextHolder] = message.useMessage();

  // eslint-disable-next-line eqeqeq
  if (data?.data.body.id == (helpPk as string)) {
    messageApi
      .open({
        type: 'error',
        content: '자신의 코드가 아닌 다른 사람의 qr코드를 스캔해주세요',
        duration: 1,
      })
      .then(function () {
        navigate('/home');
      });
  }

  const next = useCallback(() => {
    setCurrent(current + 1);
  }, [current]);

  const prev = useCallback(() => {
    setCurrent(current - 1);
  }, [current]);

  const handleOnChangeStep = useCallback((value: number) => {
    setCurrent(value);
  }, []);

  useEffect(() => {
    setHeaderTitle('바로도움 요청 일지 작성');
  }, [setHeaderTitle]);

  useEffect(() => {
    timeForm.setFieldValue('startTime', dayjs());
    timeForm.setFieldValue('rangeTime', dayjs('01:00', 'HH:mm'));
  }, [timeForm]);

  const handleOnChangeTime = useCallback((changedValues: any, values: any) => {
    if (values.rangeTime) {
      setExchangeTimepay(
        values.rangeTime.hour() * 60 + values.rangeTime.minute(),
      );
    } else {
      setExchangeTimepay(30);
    }
  }, []);

  const handleOnSubmit = useCallback(async () => {
    const timeFormValues = timeForm.getFieldsValue();
    const contentFormValues = contentForm.getFieldsValue();

    if (contentFormValues.content) {
      const newActivity: IPostInstantMatchingRequest = {
        title: timeFormValues.activityDate.format(
          'YYYY년 MM월 DD일 바로 도움 활동',
        ),
        category: '바로도움',
        content: contentFormValues.content,
        startTime: `${timeFormValues.activityDate.format(
          'YYYY-MM-DDT',
        )}${timeFormValues.startTime.format('HH:mm:ss.000')}Z`,
        endTime: `${dayjs()
          .add(timeFormValues.rangeTime.hour(), 'hours')
          .add(timeFormValues.rangeTime.minute(), 'minutes')
          .format('YYYY-MM-DDTHH:mm:ss.000')}Z`,
        location: '장소',
        auto: false,
        pay: exchangeTimepay,
        uid: parseInt(helpPk || ''),
      };

      console.log(newActivity);

      await usePostInstantMatchingMutation.mutateAsync(newActivity, {
        onSuccess: (data) => {
          if (data.data.deal_board_id && data.data.success)
            messageApi.open({
              type: 'success',
              content: '바로 도움 활동이 성공적으로 완료했습니다.',
              duration: 0.5,
              onClose: () => {
                queryClient.invalidateQueries({ queryKey: ['useGetComments'] });
                queryClient.invalidateQueries({
                  queryKey: ['useGetNotifications'],
                });
                navigate(`/post/${data.data.deal_board_id}`);
              },
            });
          else
            messageApi.open({
              type: 'error',
              content: `도움 활동 에러 발생 ${data.data.status}`,
            });
        },
        onError: (err) => {
          console.log(`ERROR : ${err}`);
          messageApi.open({
            type: 'error',
            content: '도움 활동 에러 발생',
          });
        },
      });
    } else {
      messageApi.open({
        type: 'error',
        content: '활동 내용을 입력해주세요',
      });
    }
  }, [
    navigate,
    messageApi,
    queryClient,
    timeForm,
    exchangeTimepay,
    contentForm,
    helpPk,
    usePostInstantMatchingMutation,
  ]);

  const steps = useMemo(
    () => [
      { key: '확인', title: '확인' },
      {
        key: '활동일시',
        title: '활동일시',
      },
      {
        key: '활동내용',
        title: '활동내용',
      },
    ],
    [],
  );

  return (
    <div css={cssInstantActivityPageStyle}>
      {contextHolder}
      <Steps
        direction="horizontal"
        current={current}
        items={steps}
        onChange={handleOnChangeStep}
      />
      <div css={cssInstantActivityStepItemStyle(current === 0, scaleValue)}>
        <div>
          <p className="helper-user-nickname">
            안녕하세요 {data?.data.body.nick_name || '-'} 님!
          </p>
          <p className="help-user">
            <span>
              도움을 <b>받을</b> 분의 id는 <b>{helpPk}</b> 번이 맞나요?
            </span>
            <br />
            <span className="guide">
              id는 마이페이지 {'->'} 닉네임 아래 # 뒤에 적혀있습니다.
            </span>
          </p>
        </div>
        <div className="control-box">
          <Button onClick={() => navigate(PATH.HOME)}>취소</Button>
          <Button type="primary" onClick={next}>
            맞습니다
          </Button>
        </div>
      </div>
      <div css={cssInstantActivityStepItemStyle(current === 1, scaleValue)}>
        <Form
          form={timeForm}
          layout="horizontal"
          onValuesChange={handleOnChangeTime}
        >
          <div className="form-info">활동을 얼마동안 할지 선택해주세요.</div>
          <Form.Item name="activityDate" label="활동일" initialValue={dayjs()}>
            <DatePicker format="YYYY년 MM월 DD일" disabled />
          </Form.Item>
          <Form.Item
            name="startTime"
            label="활동을 시작한 시간"
            initialValue={dayjs()}
            rules={[{ required: true, message: '필수로 작성해주세요.' }]}
          >
            <DatePicker.TimePicker
              disabled
              locale={locale}
              format="HH시 mm분"
              placeholder="시간"
              showNow={false}
            />
          </Form.Item>
          <Form.Item
            name="rangeTime"
            label="활동을 할 시간"
            initialValue={dayjs()}
            rules={[{ required: true, message: '필수로 작성해주세요.' }]}
          >
            <DatePicker.TimePicker
              locale={locale}
              format="HH시간 mm분"
              placeholder="시간"
              showNow={false}
              // 확인 버튼 누르지 않아도 값이 지정되도록 커스텀
              popupClassName={`time-picker-no-footer ${
                scaleValue > 1 ? 'big-post-dropdown' : 'small-post-dropdown'
              }`}
              onSelect={(value) => {
                timeForm.setFieldValue('rangeTime', value);
                handleOnChangeTime(
                  { rangeTime: value },
                  timeForm.getFieldsValue(),
                );
              }}
              disabledTime={(now) => {
                return {
                  disabledHours: () => [
                    6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
                    22, 23,
                  ],
                  disabledMinutes: (selectedHour: number) => {
                    if (selectedHour === 0) return [0];
                    return [];
                  },
                };
              }}
              minuteStep={30}
              allowClear={false}
            />
          </Form.Item>
          <div className="guide">
            <div>
              교환할 타임페이 양 :{' '}
              <b>{exchangeTimepay ? exchangeTimepay + ' TP' : ''}</b>{' '}
            </div>
            <div>도움을 받은 분의 타임페이가 충분한지 확인해주세요.</div>
          </div>
        </Form>
        <div className="control-box">
          <Button onClick={prev}>이전으로</Button>
          <Button type="primary" onClick={next}>
            선택 완료
          </Button>
        </div>
      </div>
      <div css={cssInstantActivityStepItemStyle(current === 2, scaleValue)}>
        <Form form={contentForm}>
          <div className="form-info">
            어떤 활동을 할건지 간략하게 적어주세요.
          </div>

          <Form.Item
            name="content"
            label="활동 내용"
            rules={[{ required: true, message: '필수로 작성해주세요.' }]}
          >
            <Input.TextArea rows={5} maxLength={100} showCount />
          </Form.Item>
          <div className="guide">
            활동 내용은 100자 내로 작성해주세요 <br />
            활동 내용에는 다음과 같은 내용들을 넣으면 좋아요. <br />
            <ul>
              <li>장소</li>
              <li>어떤 도움에 대한 내용인지</li>
            </ul>
          </div>
        </Form>
        <div className="control-box">
          <Button onClick={prev}>이전으로</Button>
          <Button type="primary" onClick={handleOnSubmit}>
            작성 완료
          </Button>
        </div>
      </div>
    </div>
  );
};
export default InstantActivityPage;
