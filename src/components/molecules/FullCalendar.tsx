import React from 'react';
import ReactFullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Box, Button, ButtonGroup, Grid } from '@mui/material';
import { IAppointment } from '../../interfaces/Appointment';

interface IFullCalendar {
  events?: any;
  onSelectEvent?: (event?: any) => void;
  selectable?: boolean;
  onSelectTime?: (time: any) => void;
}

export default function FullCalendar({
  events,
  onSelectEvent,
  selectable = false,
  onSelectTime,
}: IFullCalendar) {
  const calendarRef = React.createRef<any>();

  const tratedEvents: IAppointment[] | undefined = events?.map((event: any) => {
    if (event.start && event.end) {
      return {
        ...event,
        extendedProps: event,
        title: event?.patient?.name || 'Disponível',
        backgroundColor: event.patient ? 'red' : 'gray',
        borderColor: event.patient ? 'red' : 'gray',
        id: event._id,
      };
    }
    return event;
  });

  function goToHoje() {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.today();
  }

  function next() {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.next();
  }

  function prev() {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.prev();
  }

  function changeView(view: string) {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.changeView(view);
  }
  function clickHandler({ event }: any) {
    if (onSelectEvent) onSelectEvent(event);
  }

  return (
    <Grid container spacing={3}>
      <Grid
        item
        xs={12}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ButtonGroup
            sx={{ marginRight: 3 }}
            variant="outlined"
            color="secondary"
          >
            <Button onClick={prev}>
              <ChevronLeft />
            </Button>
            <Button onClick={next}>
              <ChevronRight />
            </Button>
          </ButtonGroup>
          <Button variant="outlined" color="secondary" onClick={goToHoje}>
            Hoje
          </Button>
        </Box>
        <Box>
          <ButtonGroup variant="outlined" color="secondary">
            <Button onClick={() => changeView('dayGridMonth')}>Mês</Button>
            <Button onClick={() => changeView('timeGridWeek')}>Semana</Button>
            <Button onClick={() => changeView('timeGridDay')}>Dia</Button>
          </ButtonGroup>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <ReactFullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: '',
            center: 'title',
            right: '',
          }}
          eventTimeFormat={{
            hour: '2-digit',
            minute: '2-digit',
            meridiem: false,
          }}
          editable={selectable}
          selectable={selectable}
          select={onSelectTime}
          allDaySlot={false}
          initialEvents={tratedEvents}
          locale="pt-br"
          eventClick={clickHandler}
        />
      </Grid>
    </Grid>
  );
}
