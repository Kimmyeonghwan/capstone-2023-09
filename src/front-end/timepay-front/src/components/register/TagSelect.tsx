import { useRecoilState } from 'recoil';
import { Tag, Space } from 'antd';
import {
  selectedTagsServeState,
  selectedTagsRequestState,
  selectedTagsQnaState,
} from '../../states/register';
import { COMMON_COLOR } from '../../styles/constants/colors';

const { CheckableTag } = Tag;

const tagsServeData = ['생활', '건강', '산책', '봉사', '교육', '친목'];
const tagsRequestData = [
  '생활',
  '건강',
  '산책',
  '봉사',
  '교육',
  '친목',
  '도와주세요',
];
const tagsQnaData = ['버그', '건의사항', '요청사항'];

export function TagServeSelect() {
  // Recoil state
  const [selectedTags, setSelectedTags] = useRecoilState(
    selectedTagsServeState,
  );

  const handleTagChange = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    setSelectedTags(nextSelectedTags);
    console.log(`selected ${nextSelectedTags}`);
  };

  return (
    <Space size={[0, 8]} wrap>
      {tagsServeData.map((tag) => (
        <CheckableTag
          key={tag}
          checked={selectedTags.includes(tag)}
          onChange={(checked) => handleTagChange(tag, checked)}
          style={{
            marginTop: '5px',
            marginLeft: '20px',
            paddingTop: '5px',
            paddingBottom: '5px',
            paddingLeft: '10px',
            paddingRight: '10px',
            borderRadius: '20px',
            fontSize: '16px',
            fontWeight: '600',
            border: '1px solid #ffc700',
          }}
        >
          {tag}
        </CheckableTag>
      ))}
    </Space>
  );
}

export function TagRequestSelect() {
  // Recoil state
  const [selectedTags, setSelectedTags] = useRecoilState(
    selectedTagsRequestState,
  );

  const handleTagChange = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    setSelectedTags(nextSelectedTags);
    console.log(`selected ${nextSelectedTags}`);
  };

  return (
    <Space size={[0, 8]} wrap>
      {tagsRequestData.map((tag) => (
        <CheckableTag
          key={tag}
          checked={selectedTags.includes(tag)}
          onChange={(checked) => handleTagChange(tag, checked)}
          style={{
            marginTop: '5px',
            marginLeft: '20px',
            paddingTop: '5px',
            paddingBottom: '5px',
            paddingLeft: '10px',
            paddingRight: '10px',
            borderRadius: '20px',
            fontSize: '16px',
            fontWeight: '600',
            border: '1px solid #ffc700',
          }}
        >
          {tag}
        </CheckableTag>
      ))}
    </Space>
  );
}

export function TagQnaSelect() {
  // Recoil state
  const [selectedTags, setSelectedTags] = useRecoilState(selectedTagsQnaState);

  const handleTagChange = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    setSelectedTags(nextSelectedTags);
    console.log(`selected ${nextSelectedTags}`);
  };

  return (
    <Space size={[0, 8]} wrap>
      {tagsQnaData.map((tag) => (
        <CheckableTag
          key={tag}
          checked={selectedTags.includes(tag)}
          onChange={(checked) => handleTagChange(tag, checked)}
          style={{
            marginTop: '5px',
            marginLeft: '20px',
            paddingTop: '5px',
            paddingBottom: '5px',
            paddingLeft: '10px',
            paddingRight: '10px',
            borderRadius: '20px',
            fontSize: '16px',
            fontWeight: '600',
            border: '1px solid #ffc700',
          }}
        >
          {tag}
        </CheckableTag>
      ))}
    </Space>
  );
}
