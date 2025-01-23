import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { colors } from '../constants/colors';

interface Props {
 onSubmitRating: (rating: number) => void;
}

export const RatingInput: React.FC<Props> = ({ onSubmitRating }) => {
 const [rating, setRating] = useState(5);
 const [submitted, setSubmitted] = useState(false);

 const handleSubmit = () => {
   onSubmitRating(rating);
   setSubmitted(true);
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