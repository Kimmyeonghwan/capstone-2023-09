import React from 'react';
import { cssPostTextarea } from '../../pages/PostPage/PostPage.style';
import { Input } from 'antd';

interface InputTextProps {
  onChange(e: React.ChangeEvent<HTMLTextAreaElement>): void;
  inputText: string;
}

const { TextArea } = Input;

const InputText = ({ onChange, inputText }: InputTextProps) => {
  return (
    <TextArea
      placeholder="댓글 입력 창 입니다 :)"
      onChange={(e) => onChange(e)}
      value={inputText}
      css={cssPostTextarea}
      style={{
        padding: 0,
        height: 80,
        width: '90%',
        fontSize: 20,
        resize: 'none',
      }}
    />
  );
};

export default InputText;
