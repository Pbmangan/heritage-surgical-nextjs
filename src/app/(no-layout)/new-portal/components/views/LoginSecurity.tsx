'use client';

import { useState, useEffect } from 'react';
import { SESSION_CONFIG, storeSession, type PortalSession } from '@/lib/session';

interface LoginSecurityProps {
  userId: string;
  password: string;
  onNext: () => void;
}

type SecurityQuestion = {
  question: string;
  answer: string;
};

const securityQuestions: SecurityQuestion[] = [
  { question: "What is your mother's first name?", answer: 'martha' },
  { question: "What is your father's middle name?", answer: 'francis' },
  { question: "What town did you grow up in?", answer: 'derby' },
];

export default function LoginSecurity({ userId, password, onNext }: LoginSecurityProps) {
  const [answer, setAnswer] = useState('');
  const [rememberComputer, setRememberComputer] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<SecurityQuestion>(securityQuestions[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Randomly select a question on mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * securityQuestions.length);
    setCurrentQuestion(securityQuestions[randomIndex]);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.toLowerCase() !== currentQuestion.answer.toLowerCase()) {
      alert('Incorrect answer');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, password }),
      });

      if (!response.ok) {
        alert('Failed to create session');
        setIsSubmitting(false);
        return;
      }

      const data = await response.json();
      if (data.success && data.session) {
        storeSession(data.session);
        onNext();
      } else {
        alert('Session creation failed');
        setIsSubmitting(false);
      }
    } catch {
      alert('Network error');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="portal-login">
      <div className="portal-login-box">
        <div className="portal-login-question">{currentQuestion.question}</div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="portal-login-input"
            placeholder="Your answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            autoFocus
            id="securityAnswer"
            name="securityAnswer"
          />
          <button type="submit" className="portal-login-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="portal-login-remember">
          <h3>Remember This Computer?</h3>
          <div className="portal-toggle">
            <div
              className={`portal-toggle-switch ${rememberComputer ? 'active' : ''}`}
              onClick={() => setRememberComputer(!rememberComputer)}
              role="switch"
              aria-checked={rememberComputer}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setRememberComputer(!rememberComputer);
                }
              }}
            />
            <span className="portal-toggle-label">{rememberComputer ? 'Yes' : 'No'}</span>
          </div>
          <p>This option is not recommended for public computers.</p>
        </div>
      </div>
    </div>
  );
}
