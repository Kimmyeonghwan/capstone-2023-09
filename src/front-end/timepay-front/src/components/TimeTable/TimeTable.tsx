import { useCallback, useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import { EventInput } from '@fullcalendar/core/index.js';
import timeGridPlugin from '@fullcalendar/timegrid';
import { cssCalendarHeader, cssTimeTable } from './TimeTable.style';
import { Radio } from 'antd';
import { useGetUserBoards, useGetUserComments } from '../../api/hooks/user';
import { COMMON_COLOR } from '../../styles/constants/colors';

const TimeTable = () => {
  const { data } = useGetUserBoards();
  const { data: commentData } = useGetUserComments();
  const [newEvent, setNewEvent] = useState<EventInput>({});

  useEffect(() => {
    const dataSource =
      data?.data.body.deal_boards.content.map(
        (data: { startTime: any; endTime: any }) => ({
          ...data,
          start: data.startTime,
          end: data.endTime,
        }),
      ) || [];
    setNewEvent(dataSource);
  }, [data?.data.body.deal_boards.content]);

  const onClickRadio = useCallback(
    (type: string) => {
      let newEvent: any[] = [];

      if (type === 'all') {
        const dataSource =
          data?.data.body.deal_boards.content.map(
            (data: { startTime: any; endTime: any }) => ({
              ...data,
              start: data.startTime,
              end: data.endTime,
            }),
          ) || [];

        const commentDataSource =
          commentData?.data.body.content.map((data) => ({
            ...data,
            start: data.startTime,
            end: data.endTime,
          })) || [];

        newEvent = dataSource.concat(commentDataSource);
      } else if (type === 'board') {
        newEvent =
          data?.data.body.deal_boards.content.map(
            (data: { startTime: any; endTime: any }) => ({
              ...data,
              start: data.startTime,
              end: data.endTime,
            }),
          ) || [];
      } else if (type === 'selectComment') {
        newEvent =
          commentData?.data.body.content
            .filter((data) => data.selectYN)
            .map((data) => ({
              ...data,
              start: data.startTime,
              end: data.endTime,
            })) || [];
      } else if (type === 'comment') {
        newEvent =
          commentData?.data.body.content.map((data) => ({
            ...data,
            start: data.startTime,
            end: data.endTime,
          })) || [];
      } else {
        console.log('error');
      }

      setNewEvent(newEvent);
    },
    [commentData?.data.body.content, data?.data.body.deal_boards.content],
  );

  return (
    <div className="calendarContainer" css={cssTimeTable}>
      <div className="calendarHeader" css={cssCalendarHeader}>
        <div className="title">나의 일정</div>
        <Radio.Group
          className="radioBtn"
          defaultValue="board"
          style={{ marginTop: 16 }}
        >
          <Radio.Button value="all" onClick={() => onClickRadio('all')}>
            전체
          </Radio.Button>
          <Radio.Button value="board" onClick={() => onClickRadio('board')}>
            게시글
          </Radio.Button>
          <Radio.Button
            value="selectComment"
            onClick={() => onClickRadio('selectComment')}
          >
            선정 댓글
          </Radio.Button>
          <Radio.Button value="comment" onClick={() => onClickRadio('comment')}>
            댓글
          </Radio.Button>
        </Radio.Group>
      </div>

      <FullCalendar
        plugins={[timeGridPlugin]}
        titleFormat={{ year: 'numeric', month: 'long' }}
        initialView="timeGridWeek"
        locale="ko"
        allDaySlot={false}
        buttonText={{ today: '오늘 날짜' }}
        dayHeaderFormat={{
          weekday: 'short',
          day: 'numeric',
        }}
        buttonIcons={{ prev: 'chevron-left' }}
        events={newEvent}
        eventColor={COMMON_COLOR.MAIN1}
        eventTimeFormat={{
          hour: 'numeric',
          minute: '2-digit',
          meridiem: false,
        }}
      />
    </div>
  );
};

export default TimeTable;
