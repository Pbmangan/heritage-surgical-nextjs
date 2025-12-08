'use client';

import { useRouter } from 'next/navigation';
import { useState, ReactNode, MouseEvent } from 'react';

interface FrictionLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export default function FrictionLink({ href, children, className }: FrictionLinkProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setLoading(true);

    // Random delay 400-900ms like PHP's legacy.js
    const delay = 400 + Math.random() * 500;
    await new Promise(resolve => setTimeout(resolve, delay));

    router.push(href);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={className}
      style={loading ? { opacity: 0.6, cursor: 'wait' } : undefined}
    >
      {loading ? 'Loading with cache refresh...' : children}
    </a>
  );
}
