import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function HomeIcon({ thisColor = '#B5B5B5', width = 24, height = 24 }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M15.4999 28.5001V21.0001H21.4999V28.5001C21.4999 29.3251 22.1749 30.0001 22.9999 30.0001H27.4999C28.3249 30.0001 28.9999 29.3251 28.9999 28.5001V18.0001H31.5499C32.2399 18.0001 32.5699 17.1451 32.0449 16.6951L19.5049 5.40008C18.9349 4.89008 18.0649 4.89008 17.4949 5.40008L4.9549 16.6951C4.4449 17.1451 4.7599 18.0001 5.4499 18.0001H7.9999V28.5001C7.9999 29.3251 8.6749 30.0001 9.4999 30.0001H13.9999C14.8249 30.0001 15.4999 29.3251 15.4999 28.5001Z"
        fill={thisColor}
      />
    </Svg>
  );
}
