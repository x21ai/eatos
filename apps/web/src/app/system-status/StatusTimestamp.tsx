'use client';

import { useEffect, useState } from 'react';

const easternTimeFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
  second: '2-digit',
  timeZoneName: 'short',
  timeZone: 'America/New_York',
});

export default function StatusTimestamp() {
  const [currentTime, setCurrentTime] = useState(() => new Date());

  useEffect(() => {
    const updateTime = () => setCurrentTime(new Date());

    updateTime();
    const timer = window.setInterval(updateTime, 1000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <p className="mt-4 text-sm text-gray-400" aria-live="off" suppressHydrationWarning>
      Last updated: {easternTimeFormatter.format(currentTime)}
    </p>
  );
}