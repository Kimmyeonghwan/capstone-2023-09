import { atom } from 'recoil';

// timeSelect
export const startTime = atom({
  key: 'startTime',
  default: '09:00',
});
export const endTime = atom({
  key: 'endTime',
  default: '18:00',
});

// selectedTags, setSelectedTags
export const selectedTagsServeState = atom<string[]>({
  key: 'selectedTagsServeState',
  default: [],
});
export const selectedTagsRequestState = atom<string[]>({
  key: 'selectedTagsRequestState',
  default: [],
});
export const selectedTagsQnaState = atom<string[]>({
  key: 'selectedTagsQnaState',
  default: [],
});

// dateRange
export type DateRange = [Date | null, Date | null];
export interface DateRangeProps {
  value: DateRange;
  onChange: (value: DateRange) => void;
}
