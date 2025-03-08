import React from "react";

interface TimeCenterProps {
  outerColor: string;
  innerColor: string;
}

const TimeCenter: React.FC<TimeCenterProps> = ({ outerColor, innerColor }) => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="20" cy="20" r="20" fill={outerColor} />
    <circle cx="20" cy="20" r="14" fill={innerColor} />
  </svg>
);

export default TimeCenter;
