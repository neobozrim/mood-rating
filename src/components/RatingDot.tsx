import React from 'react';
import { Rating } from '../types/types';
import { colors } from '../constants/colors';

interface Props {
  rating: Rating;
  isNew: boolean;
}

export const RatingDot: React.FC<Props> = ({ rating, isNew }) => {
  const getColor = (value: number) => {
    if (value <= 3) return colors.cherry_red;
    if (value <= 5) return colors.butter_yellow;
    if (value <= 7) return colors.aura_indigo;
    return colors.dill_green;
  };

  return (
    <div
      className={`w-8 h-8 rounded-full transition-all duration-500 ${
        isNew ? 'animate-bounce' : ''
      }`}
      style={{
        backgroundColor: getColor(rating.value),
        transform: `scale(${rating.value / 5})`,
      }}
    />
  );
};