import 'dayjs/locale/ko';
import { Dayjs } from 'dayjs';
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';
import generatePicker from 'antd/es/date-picker/generatePicker';
import locale from 'antd/es/date-picker/locale/ko_KR';
import { DateRangeProps } from '../../states/register';

const DatePicker = generatePicker<Dayjs>(dayjsGenerateConfig);
const { RangePicker } = DatePicker;

export function KoDatePicker(props: DateRangeProps) {
  const { value, onChange } = props;

  const handleDateRangeChange = (dates: any, dateStrings: [string, string]) => {
    if (dateStrings[0] && dateStrings[1]) {
      onChange([new Date(dateStrings[0]), new Date(dateStrings[1])]);
    }
    console.log(`selected ${dateStrings}`);
  };

  return (
    <div>
      <RangePicker
        locale={locale}
        size={'large'}
        style={{ marginLeft: '20px' }}
        onChange={handleDateRangeChange}
      />
    </div>
  );
}
