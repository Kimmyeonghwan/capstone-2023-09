import { useState, useRef } from 'react';

import {
  cssPostFooter2,
  cssPostBtn,
} from '../../pages/PostPage/PostPage.style';

import InputText from './InputText';

interface TList {
  id: number;
  text: string;
}

export const Comment = () => {
  const [inputText, setInputText] = useState('');
  const [tasks, setTasks] = useState<TList[]>([
    {
      id: 1,
      text: '이거는 어떻게 해야하나요?',
    },
    {
      id: 2,
      text: '저 지원하고 싶네요~ 열심히 할수 있어요!',
    },
    {
      id: 3,
      text: '정확히 어디서 하는 건지 알려줘요',
    },
  ]);
  const nextId = useRef(4);

  // 입력값 변경 핸들러
  const handleInputTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  // 입력값 버튼 핸들러
  const handleSubmitComment = (e: React.FormEvent<HTMLButtonElement>) => {
    const newList: TList = {
      id: nextId.current,
      text: inputText,
    };
    setTasks(tasks.concat(newList));
    setInputText('');
    nextId.current += 1;
  };

  return (
    <div css={cssPostFooter2}>
      <InputText onChange={handleInputTextChange} inputText={inputText} />
      <button css={cssPostBtn} onClick={handleSubmitComment}>
        등록
      </button>
    </div>
  );
};
