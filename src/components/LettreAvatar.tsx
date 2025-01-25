import React from 'react';

interface LetterAvatarProps {
  letter: string;
  bgColor: string;
  textColor: string;
}

const LetterAvatar: React.FC<LetterAvatarProps> = ({ letter, bgColor, textColor }) => {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="8" fill={bgColor} />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="20"
        fontWeight="bold"
        fill={textColor}
      >
        {letter}
      </text>
    </svg>
  );
};

export default LetterAvatar;