import { SVGAttributes } from 'react';

export interface IconProps extends SVGAttributes<SVGElement> {
  className?: string;
}

const strokeStyle: any = { vectorEffect: 'non-scaling-stroke' };

const HamburgerIcon = (props: IconProps) => {
  return (
    <svg
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid"
      width="1em"
      height="1em"
      {...props}
    >
      <path d="M5 7.5H20" stroke="currentColor" style={strokeStyle} />
      <path d="M5 12.5H20" stroke="currentColor" style={strokeStyle} />
      <path d="M5 17.5H20" stroke="currentColor" style={strokeStyle} />
    </svg>
  );
};

export default HamburgerIcon;
