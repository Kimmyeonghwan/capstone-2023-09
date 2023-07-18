import {
  Button,
  Form,
  Modal,
  Space,
  Image,
  Select,
  Input,
  message,
} from 'antd';
import { useState } from 'react';
import { siData } from './Data/SIDATA';
import { guData } from './Data/GUDATA';
import { dongData } from './Data/DONGDATA';
import { topWrapperCSS } from './UserManagement.styles';

/*행정동 타입 선언*/
type DongName = keyof typeof dongData;

const EditModal = () => {
  const [modalEdit, setModalEdit] = useState(false);

  const [form] = Form.useForm();

  const showModalEdit = () => {
    setModalEdit(true);
  };

  /*회원 정보 수정 모달 onChange 함수 - 프로필 이미지, 닉네임, 지역, 소개글*/
  const [editProfileImg, setEditProfileImg] = useState(
    'https://images.pexels.com/photos/4666665/pexels-photo-4666665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  );
  const [editNickName, setEditNickName] = useState('');
  const [editTown, setEditTown] = useState('');
  const [editIntroduction, setEditIntroduction] = useState('');

  const onChangeEditProfileImg = (value: any) => {
    setEditProfileImg(
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    );
  };
  const onChangeEditNickName = (value: any) => {
    setEditNickName(value);
  };
  const onChangeEditTown = (value: any) => {};
  const onChangeEditIntroduction = (value: any) => {};

  /* 닉네임 유효성 검사 커스텀 */
  const rightNickname = (_: any, value: string) => {
    const nickname_regExp = /^[a-zA-Zㄱ-힣0-9]{2,16}$/;
    if (!value) {
      return Promise.reject(new Error('닉네임을 입력해 주세요.'));
    } else if (value.search(/\s/) != -1) {
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

  /*From Check*/
  const onFinishJoin = () => {
    console.log('회원가입 성공!');
  };

  const onFinishFailedJoin = () => {
    console.log('회원가입 실패!');
  };

  /*지역*/
  const [gu, setGu] = useState(dongData[guData[0]]);
  const [dong, setDong] = useState(dongData[guData[0]][0]);

  const [guText, setGuText] = useState<string>('');
  const [dongText, setDongText] = useState<string>('');

  const onChangeGu = (value: DongName) => {
    setGu(dongData[value]);
    setGuText(value.valueOf());
  };

  const onChangeDong = (value: DongName) => {
    setDong(value);
    setDongText(value.valueOf());
    const town: string = guText + dongText;
    setEditTown(town);
  };

  /*지역, 생년월일 null check*/
  const [messageApi, contextHolder] = message.useMessage();

  const warning = (value: string) => {
    messageApi.open({
      type: 'warning',
      content: value + '을 입력해 주세요.',
    });
  };

  /*Handle 수정 완료 Btn*/
  const handleOkEdit = async () => {
    console.log(dong);

    if (gu === dongData[guData[0]] || dong === '동') {
      warning('지역');
    } else {
      let formData = new FormData();
      //formData.append('user', profileImage);
    }
  };

  const handleCancelEdit = () => {
    setModalEdit(false);
    setEditProfileImg(
      'https://images.pexels.com/photos/4666665/pexels-photo-4666665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    );
    setEditNickName('');
    setGu(dongData[guData[0]]);
    setDong(dongData[guData[0]][0]);

    setGuText('');
    setDongText('');

    form.setFieldsValue({
      editNickName: '',
      editSi: '서울특별시',
      editGu: '구',
      editDong: '동',
    });
  };
  return (
    <div>
      <Button onClick={showModalEdit}>수정</Button>
      <Modal
        title="회원 정보 수정"
        open={modalEdit}
        onOk={handleOkEdit}
        onCancel={handleCancelEdit}
        okText="수정"
        cancelText="취소"
      >
        <Space css={topWrapperCSS} align="baseline">
          {contextHolder}
          <Form
            form={form}
            name="JoinPage"
            onFinish={onFinishJoin}
            onFinishFailed={onFinishFailedJoin}
          >
            <Form.Item name="editProfileImage">
              <Image
                src={editProfileImg}
                width={100}
                height={100}
                //className="EditprofileImage"
              />
              <Button onClick={onChangeEditProfileImg} css={{ marginLeft: 30 }}>
                기본 이미지로 변경
              </Button>
            </Form.Item>

            <Form.Item
              label="닉네임"
              name="editNickName"
              css={{ marginTop: 60 }}
              rules={[{ validator: rightNickname }]}
            >
              <Input onChange={onChangeEditNickName} />
            </Form.Item>

            <Space>
              <Form.Item name="editSi">
                <Select
                  defaultValue={siData[0]}
                  options={siData.map((si) => ({
                    label: si,
                    value: si,
                  }))}
                  style={{ width: 120 }}
                />
              </Form.Item>

              <Form.Item name="editGu">
                <Select
                  onChange={onChangeGu}
                  options={guData.map((province) => ({
                    label: province,
                    value: province,
                  }))}
                  style={{ width: 100 }}
                />
              </Form.Item>

              <Form.Item name="editDong">
                <Select
                  value={dong as DongName}
                  onChange={onChangeDong}
                  options={gu.map((city) => ({ label: city, value: city }))}
                  style={{ width: 100 }}
                />
              </Form.Item>
            </Space>
          </Form>
        </Space>
      </Modal>
    </div>
  );
};

export default EditModal;
