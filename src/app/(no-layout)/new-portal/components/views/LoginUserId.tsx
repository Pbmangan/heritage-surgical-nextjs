'use client';

import { useState } from 'react';

interface LoginUserIdProps {
  onNext: (userId: string) => void;
}

export default function LoginUserId({ onNext }: LoginUserIdProps) {
  const [userId, setUserId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate username
    if (userId.toUpperCase() !== 'CLARKS') {
      alert('Invalid User ID');
      return;
    }
    onNext(userId);
  };

  return (
    <div className="portal-login">
      <div className="portal-login-box">
        <h1>Sign in to Medent Mobile</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="portal-login-input"
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            autoFocus
            id="userId"
            name="userId"
          />
          <button type="submit" className="portal-login-btn">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
