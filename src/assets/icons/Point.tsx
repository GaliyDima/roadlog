import React from "react";

interface PointProps {
  color: string;
}

const Point: React.FC<PointProps> = ({ color }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="7" cy="7" r="7" fill={color} />
  </svg>
);

export default Point;
