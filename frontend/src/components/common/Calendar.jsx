import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import React from 'react';

const Calendar = () => {
    const calendarStyle = {
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        // more styles...
      };
      
  return (
    <FullCalendar
    style={calendarStyle}
    plugins={[dayGridPlugin, timeGridPlugin]} 
    initialView="dayGridMonth" 
    headerToolbar={{
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay' 
    }}
    events={[
      {
        title: 'Morning Meeting',
        start: '2023-12-01T09:00:00', 
        end: '2023-12-01T10:30:00', 
      },
      {
        title: 'Lunch Break',
        start: '2023-12-01T12:00:00', 
      },
    ]}
    allDaySlot={false} 
  />
  );
};

export default Calendar;
