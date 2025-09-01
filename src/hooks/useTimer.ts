'use client';

import { useState, useEffect, useRef } from 'react';

interface UseTimerProps {
  startTime: number | null;
  endTime: number | null;
  isActive: boolean;
}

export const useTimer = ({ startTime, endTime, isActive }: UseTimerProps): number => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive && startTime && !endTime) {
      intervalRef.current = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      
      if (startTime && endTime) {
        setElapsedTime(Math.floor((endTime - startTime) / 1000));
      } else if (!startTime) {
        setElapsedTime(0);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [startTime, endTime, isActive]);

  return Math.min(999, elapsedTime);
};