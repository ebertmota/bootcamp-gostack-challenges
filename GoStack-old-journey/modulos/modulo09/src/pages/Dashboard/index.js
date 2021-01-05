import React, { useState, useMemo, useEffect } from 'react';
import {
  format,
  subDays,
  addDays,
  setHours,
  setMinutes,
  setSeconds,
  isBefore,
  parseISO,
} from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import pt from 'date-fns/locale/pt';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { FaCalendarCheck } from 'react-icons/fa';

import api from '~/services/api';

import { Container, Time } from './styles';

const range = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

function Dashboard() {
  const [schedule, setSchedule] = useState([]);
  const [date, setDate] = useState(new Date());

  const formattedDate = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

  useEffect(() => {
    async function loadSchedule() {
      const response = await api.get('schedule', {
        params: { date },
      });

      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const data = range.map((hour) => {
        const checkDate = setSeconds(setMinutes(setHours(date, hour), 0), 0);
        const compareDate = utcToZonedTime(checkDate, timezone);

        return {
          time: `${hour}:00h`,
          past: isBefore(compareDate, new Date()),
          appointment: response.data.find(
            (a) => parseISO(a.date).getHours() === hour
          ),
        };
      });

      setSchedule(data);
    }

    loadSchedule();
  }, [date]);

  function handlePrevDay() {
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
  }

  return (
    <Container>
      <header>
        <button type="button" onClick={handlePrevDay}>
          <MdChevronLeft size={36} color="#666" />
        </button>
        <strong>{formattedDate}</strong>
        <button type="button" onClick={handleNextDay}>
          <MdChevronRight size={36} color="#666" />
        </button>
      </header>

      <ul>
        {console.tron.log(schedule)}
        {schedule.map((item) => (
          <Time key={item.time} past={item.past} available={!item.appointment}>
            <div>
              <strong>{item.time}</strong>
              <span>
                {item.appointment ? item.appointment.user.name : 'Em aberto'}
              </span>
            </div>
            <div>
              {item.appointment && (
                <FaCalendarCheck size={20} color="#d65a69" />
              )}
            </div>
          </Time>
        ))}
      </ul>
    </Container>
  );
}

export default Dashboard;
