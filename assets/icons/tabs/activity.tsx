import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

type Props = {
  thisColor?: string;
  width?: number;
  height?: number;
};

export default function ActivityIcon({
  thisColor = '#B5B5B5',
  width = 36,
  height = 36,
}: Props) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M4.5 18H10.5L15 30L21 6L25.5 18H31.5"
        stroke={thisColor}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
