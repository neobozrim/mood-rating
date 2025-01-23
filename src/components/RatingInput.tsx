// RatingInput.tsx
import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { colors } from '../constants/colors';
import { supabase } from '../lib/supabaseClient';

interface Props {
  eventId: string;
}

export const RatingInput: React.FC<Props> = ({ eventId }) => {
  const [rating, setRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    const { data } = await supabase
      .from('ratings')
      .insert([{
        event_id: eventId,
        value: rating,
        timestamp: Date.now()
      }])
      .select();

    if (data) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="p-8 rounded-lg shadow-lg text-center" style={{ backgroundColor: colors.alpine_oat }}>
        <h2 className="text-2xl font-bold mb-4">Thank you!</h2>
        <p>Your rating has been submitted.</p>
      </div>
    );
  }

  return (
    <div className="p-8 rounded-lg shadow-lg" style={{ backgroundColor: colors.alpine_oat }}>
      <h2 className="text-2xl font-bold mb-4">How do you feel?</h2>
      <input
        type="range"
        min="1"
        max="10"
        value={rating}
        onChange={(e) => setRating(parseInt(e.target.value))}
        className="w-full mb-4"
      />
      <div className="flex justify-between mb-4">
        <span>1</span>
        <span>{rating}</span>
        <span>10</span>
      </div>
      <button
        onClick={handleSubmit}
        className="w-full p-2 rounded flex items-center justify-center gap-2"
        style={{ backgroundColor: colors.aura_indigo }}
      >
        <span className="text-white">Submit</span>
        <ChevronRight className="w-4 h-4 text-white" />
      </button>
    </div>
  );
};