// EventDisplay.tsx
import { useEffect, useState } from 'react';
import { Event, Rating } from '../types/types';
import { QRCodeGenerator } from './QRCodeGenerator';
import { RatingDot } from './RatingDot';
import { colors } from '../constants/colors';
import { supabase } from '../lib/supabaseClient';

interface Props {
  event: Event;
}

export const EventDisplay: React.FC<Props> = ({ event }) => {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [newRatingIndex, setNewRatingIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchRatings = async () => {
      const { data } = await supabase
        .from('ratings')
        .select()
        .eq('event_id', event.id);
      
      if (data) {
        setRatings(data);
        setNewRatingIndex(data.length - 1);
        setTimeout(() => setNewRatingIndex(null), 1000);
      }
    };

    fetchRatings();

    const subscription = supabase
      .channel('ratings')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'ratings', filter: `event_id=eq.${event.id}` },
        (payload: { new: Rating }) => {
          setRatings(current => [...current, payload.new as Rating]);
          setNewRatingIndex(ratings.length);
          setTimeout(() => setNewRatingIndex(null), 1000);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [event.id]);

  return (
    <div className="p-8 rounded-lg shadow-lg" style={{ backgroundColor: colors.alpine_oat }}>
      <h2 className="text-2xl font-bold mb-4">{event.name}</h2>
      <div className="mb-8">
        <QRCodeGenerator value={`${import.meta.env.VITE_APP_URL}/rate/${event.id}`} />
        <div className="mt-2 text-sm text-center break-all">
          <p>Scan QR code or visit:</p>
          <p className="font-mono">{`${import.meta.env.VITE_APP_URL}/rate/${event.id}`}</p>
        </div>
      </div>
      <div className="flex gap-4 items-center min-h-24 flex-wrap">
        {ratings.map((rating, index) => (
          <RatingDot
            key={index}
            rating={rating}
            isNew={index === newRatingIndex}
          />
        ))}
      </div>
    </div>
  );
};