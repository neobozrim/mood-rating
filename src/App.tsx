import React, { useState, useEffect } from 'react';
import { EventCreation } from './components/EventCreation';
import { EventDisplay } from './components/EventDisplay';
import { RatingInput } from './components/RatingInput';
import { Event } from './types/types';

const App = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const urlParams = new URLSearchParams(window.location.search);
  const eventId = urlParams.get('event');
  const mode = urlParams.get('mode');

  useEffect(() => {
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }

    if (eventId) {
      const storedEvents = localStorage.getItem('events');
      if (storedEvents) {
        const events = JSON.parse(storedEvents);
        const event = events.find((e: Event) => e.id === eventId);
        if (event) {
          setCurrentEvent(event);
        }
      }
    }
  }, [eventId]);

  const createEvent = (name: string) => {
    const newEvent = { id: Date.now().toString(), name };
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    localStorage.setItem('events', JSON.stringify(updatedEvents));
    setCurrentEvent(newEvent);
  };

  const submitRating = (value: number) => {
    const rating = { value, timestamp: Date.now() };
    const storedRatings = localStorage.getItem(`ratings_${eventId}`);
    const ratings = storedRatings ? JSON.parse(storedRatings) : [];
    const updatedRatings = [...ratings, rating];
    localStorage.setItem(`ratings_${eventId}`, JSON.stringify(updatedRatings));
    window.dispatchEvent(new StorageEvent('storage', {
      key: `ratings_${eventId}`,
      newValue: JSON.stringify(updatedRatings)
    }));
  };

  if (mode === 'rate' && eventId) {
    return <RatingInput onSubmitRating={submitRating} />;
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