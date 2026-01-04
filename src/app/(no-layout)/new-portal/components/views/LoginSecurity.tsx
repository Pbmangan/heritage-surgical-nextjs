'use client';

import { useState, useEffect } from 'react';

interface LoginSecurityProps {
  userId: string;
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

export default function LoginSecurity({ userId, onNext }: LoginSecurityProps) {
  const [answer, setAnswer] = useState('');
  const [rememberComputer, setRememberComputer] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<SecurityQuestion>(securityQuestions[0]);

  // Randomly select a question on mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * securityQuestions.length);
    setCurrentQuestion(securityQuestions[randomIndex]);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate security answer (case-insensitive)
    if (answer.toLowerCase() !== currentQuestion.answer.toLowerCase()) {
      alert('Incorrect answer');
      return;
    }
    onNext();
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
          <button type="submit" className="portal-login-btn">
            Sign In
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
