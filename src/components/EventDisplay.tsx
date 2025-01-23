import React, { useState, useEffect } from 'react';
import { Event, Rating } from '../types/types';
import { QRCodeGenerator } from './QRCodeGenerator';
import { RatingDot } from './RatingDot';
import { colors } from '../constants/colors';

interface Props {
  event: Event;
}

export const EventDisplay: React.FC<Props> = ({ event }) => {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [newRatingIndex, setNewRatingIndex] = useState<number | null>(null);

  useEffect(() => {
    // Load initial ratings
    const storedRatings = localStorage.getItem(`ratings_${event.id}`);
    console.log('Stored ratings:', storedRatings);
    if (storedRatings) {
      const parsedRatings = JSON.parse(storedRatings);
      console.log('Parsed ratings:', parsedRatings);
      setRatings(parsedRatings);
    }

    // Handle storage updates
    const handleStorage = (e: StorageEvent) => {
      if (e.key === `ratings_${event.id}` && e.newValue) {
        const updatedRatings = JSON.parse(e.newValue);
        setRatings(updatedRatings);
        setNewRatingIndex(updatedRatings.length - 1);
        setTimeout(() => setNewRatingIndex(null), 1000);
      }
    };

    // Handle messages
    const handleMessage = (e: MessageEvent) => {
      if (e.data.type === 'newRating' && e.data.eventId === event.id) {
        setRatings(e.data.ratings);
      }
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener('message', handleMessage);
    
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('message', handleMessage);
    };
  }, [event.id]);

  const currentUrl = window.location.href.split('?')[0];
  const ratingUrl = `${currentUrl}?event=${event.id}&mode=rate`;

  return (
    <div className="p-8 rounded-lg shadow-lg" style={{ backgroundColor: colors.alpine_oat }}>
      <h2 className="text-2xl font-bold mb-4">{event.name}</h2>
      <div className="mb-8">
        <QRCodeGenerator value={ratingUrl} />
        <div className="mt-2 text-sm text-center break-all">
          <p>Scan QR code or visit:</p>
          <p className="font-mono">{ratingUrl}</p>
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