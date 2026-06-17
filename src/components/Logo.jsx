import React from 'react';

export default function Logo({ className = '', size = 32 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={`inline-block select-none ${className}`}
      aria-label="Flower Studio Lotus Logo"
    >
      {/* Background soft glow (optional, decorative) */}
      <circle cx="50" cy="50" r="45" fill="none" />

      {/* LOTUS GREEN BOTTOM SEPAL/LEAF (#3BD440) */}
      <path
        d="M 22 68 C 15 55, 30 75, 50 82 C 70 75, 85 55, 78 68 C 72 78, 62 82, 50 85 C 38 82, 28 78, 22 68 Z"
        fill="#3BD440"
      />
      <path
        d="M 50 82 C 32 75, 36 62, 50 65 C 64 62, 68 75, 50 82 Z"
        fill="#2EB632"
        opacity="0.85"
      />

      {/* LOTUS PINK CLOSED BUD PETALS (#F50C58) */}
      {/* Outer Left Petal */}
      <path
        d="M 50 18 C 30 35, 25 55, 35 70 C 42 74, 48 70, 50 65 C 48 55, 45 40, 50 18 Z"
        fill="#D20A47"
        opacity="0.9"
      />

      {/* Outer Right Petal */}
      <path
        d="M 50 18 C 70 35, 75 55, 65 70 C 58 74, 52 70, 50 65 C 52 55, 55 40, 50 18 Z"
        fill="#D20A47"
        opacity="0.9"
      />

      {/* Inner Petals Left */}
      <path
        d="M 50 18 C 35 38, 30 58, 42 68 C 47 70, 49 66, 50 60 C 47 50, 46 38, 50 18 Z"
        fill="#F50C58"
      />

      {/* Inner Petals Right */}
      <path
        d="M 50 18 C 65 38, 70 58, 58 68 C 53 70, 51 66, 50 60 C 53 50, 54 38, 50 18 Z"
        fill="#F50C58"
      />

      {/* Center Closed Core Petal (Bud Tip) */}
      <path
        d="M 50 18 C 44 32, 44 58, 50 66 C 56 58, 56 32, 50 18 Z"
        fill="#FFF0F3"
        opacity="0.3"
      />
      <path
        d="M 50 22 C 46 35, 46 55, 50 62 C 54 55, 54 35, 50 22 Z"
        fill="#F50C58"
      />

      {/* Subtle details on green leaves */}
      <path
        d="M 50 65 L 50 85"
        stroke="#228B22"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.4"
      />
      <path
        d="M 50 72 C 40 73, 33 70, 26 67"
        stroke="#228B22"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
        opacity="0.3"
      />
      <path
        d="M 50 72 C 60 73, 67 70, 74 67"
        stroke="#228B22"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
        opacity="0.3"
      />
    </svg>
  );
}
