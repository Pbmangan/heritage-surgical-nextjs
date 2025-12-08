'use client';

import { useEffect, useState } from 'react';

export default function LegacyProgress() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="legacy-progress-container">
      <div className={`legacy-progress ${animate ? 'animate' : ''}`} />
    </div>
  );
}
