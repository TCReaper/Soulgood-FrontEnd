import React, { useEffect, useRef } from 'react';
import { useRouter } from 'expo-router';

export default function Explore() {
  const router = useRouter();

  useEffect(() => {
      router.replace('../index');
  }, []);
}