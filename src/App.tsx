import React, { useState, useEffect } from 'react';
import { EventCreation } from './components/EventCreation';
import { EventDisplay } from './components/EventDisplay';
import { RatingInput } from './components/RatingInput';
import { Event } from './types/types';
import { supabase } from './lib/supabaseClient';

const App = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const urlParams = new URLSearchParams(window.location.search);
  const eventId = urlParams.get('event');
  const mode = urlParams.get('mode');

  useEffect(() => {
    const fetchEvents = async () => {
      const { data } = await supabase
        .from('events')
        .select();
      if (data) setEvents(data);
    };

    const fetchCurrentEvent = async () => {
      if (eventId) {
        const { data } = await supabase
          .from('events')
          .select()
          .eq('id', eventId)
          .single();
        if (data) setCurrentEvent(data);
      }
    };

    fetchEvents();
    fetchCurrentEvent();
  }, [eventId]);

  if (mode === 'rate' && eventId) {
    return <RatingInput eventId={eventId} />;
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      {!currentEvent ? (
        <EventCreation onCreateEvent={createEvent} />
      ) : (
        <EventDisplay event={currentEvent} />
      )}
    </div>
  );
};

export default App;