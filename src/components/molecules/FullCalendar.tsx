import React, { useEffect, useState } from 'react';
import ReactFullCalendar, {
  EventClickArg,
  EventContentArg,
} from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import { Box, Button, ButtonBase, ButtonGroup, Grid } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import interactionPlugin from '@fullcalendar/interaction';

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

  useEffect(() => {
    console.log({ events });
  }, [events]);

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
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button onClick={prev}>
              <ChevronLeft />
            </Button>
            <Button onClick={next}>
              <ChevronRight />
            </Button>
          </ButtonGroup>
          <Button onClick={goToHoje}>Hoje</Button>
        </Box>
        <Box>
          <ButtonGroup
            variant="contained"
            aria-label="outlined primary button group"
          >
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
          editable={selectable}
          selectable={selectable}
          select={onSelectTime}
          allDaySlot={false}
          initialEvents={events}
          locale="pt-br"
          eventClick={clickHandler}
        />
      </Grid>
    </Grid>
  );
}

function renderEventContent(eventContent: EventContentArg) {
  return (
    <ButtonBase>
      <b>{eventContent.timeText}</b>
      <i>{eventContent.event.title}</i>
    </ButtonBase>
  );
}
