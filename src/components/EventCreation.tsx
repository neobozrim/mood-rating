import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { colors } from '../constants/colors';
import { supabase } from '../lib/supabaseClient';

interface Props {
  onCreateEvent: (name: string) => void;
}

export const EventCreation: React.FC<Props> = ({ onCreateEvent }) => {
  const [eventName, setEventName] = useState('');

  const createEvent = async () => {
    if (!eventName) return;

    const { data, error } = await supabase
      .from('events')
      .insert([{ name: eventName }])
      .select()

    if (data) {
      onCreateEvent(eventName);
      setEventName('');
    }
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg" style={{ backgroundColor: colors.alpine_oat }}>
      <h2 className="text-2xl font-bold mb-4">Create New Event</h2>
      <div className="flex gap-4">
        <input
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          placeholder="Enter event name"
          className="flex-1 p-2 rounded border"
        />
        <button
          onClick={createEvent}
          className="p-2 rounded-full"
          style={{ backgroundColor: colors.aura_indigo }}
        >
          <Plus className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
};