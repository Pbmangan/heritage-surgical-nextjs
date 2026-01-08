'use client';

import { useState } from 'react';

interface LoginPasswordProps {
  userId: string;
  onNext: (password: string) => void;
}

export default function LoginPassword({ userId, onNext }: LoginPasswordProps) {
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate password
    if (password !== 'adm4400') {
      alert('Invalid password');
      return;
    }
    onNext(password);
  };

  return (
    <div className="portal-login">
      <div className="portal-login-box">
        <div className="portal-login-security">
          <img
            src="https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=200&h=200&fit=crop"
            alt="Security image - cookies"
            style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 4 }}
          />
          <div className="portal-login-security-text">
            <div className="phrase">{userId.toLowerCase().substring(0, 6) || 'user'}</div>
            <div className="warning">
              If this isn&apos;t your site image and phrase,{' '}
              <strong>do not enter your password</strong>.
            </div>
          </div>
        </div>

        <h1 style={{ fontSize: 18, textAlign: 'left', marginBottom: 12 }}>
          Medent Mobile Passcode
        </h1>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            className="portal-login-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            id="password"
            name="password"
          />
          <button type="submit" className="portal-login-btn">
            Sign In
          </button>
        </form>

        <div className="portal-login-recommendation">
          <strong>Recommendation</strong>: Enable 2 factor authentication to increase security.
          Please contact MEDENT support for more information.
        </div>
      </div>
    </div>
  );
}
