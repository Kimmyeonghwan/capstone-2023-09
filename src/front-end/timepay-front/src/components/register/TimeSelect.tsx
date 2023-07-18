import { Select, Space } from 'antd';
import { useRecoilState } from 'recoil';
import { endTime, startTime } from '../../states/register';

export default function TimeSelct() {
  const [starttime, setStarttime] = useRecoilState(startTime);
  const [endtime, setEndtime] = useRecoilState(endTime);

  const options = [];

  for (let i = 0; i < 24; i++) {
    let time = i.toString().padStart(2, '0');
    options.push({ value: `${time}:00`, label: `${time}:00` });
    options.push({ value: `${time}:30`, label: `${time}:30` });
  }

  const handleStarttimeChange = (value: any) => {
    setStarttime(value);
    console.log(`selected ${value}`);
  };
  const handleEndtimeChange = (value: any) => {
    setEndtime(value);
    console.log(`selected ${value}`);
  };

  return (
    <Space wrap>
      <Select
        defaultValue="09:00"
        size={'large'}
        style={{ marginLeft: '20px', width: '120px', float: 'left' }}
        onChange={handleStarttimeChange}
        options={options}
      />
      <p style={{ marginLeft: '7px', marginRight: '7px' }}>~</p>
      <Select
        defaultValue="18:00"
        size={'large'}
        style={{ width: '120px', float: 'left' }}
        onChange={handleEndtimeChange}
        options={options}
      />
    </Space>
  );
}
