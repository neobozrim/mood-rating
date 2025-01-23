// App.tsx
import { useState, useEffect } from 'react';
import { EventCreation } from './components/EventCreation';
import { EventDisplay } from './components/EventDisplay';
import { RatingInput } from './components/RatingInput';
import { Event } from './types/types';
import { supabase } from './lib/supabaseClient';

const App = () => {
 const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
 const urlParams = new URLSearchParams(window.location.search);
 const eventId = urlParams.get('event');
 const mode = urlParams.get('mode');

 useEffect(() => {
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

   fetchCurrentEvent();
 }, [eventId]);

 const createEvent = (event: Event) => {
   setCurrentEvent(event);
 };

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