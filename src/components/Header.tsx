'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // 28% chance of showing popup blocker on page load
    if (Math.random() < 0.28) {
      setShowPopup(true);
    }
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/providers', label: 'Providers' },
    { href: '/contact', label: 'Contact' },
    { href: '/intake', label: 'New Patient Intake' },
    { href: '/schedule', label: 'Schedule Appointment' },
  ];

  return (
    <>
      {showPopup && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.6)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => setShowPopup(false)}
        >
          <div
            style={{
              background: '#ffffc0',
              border: '3px outset #999',
              padding: '30px',
              maxWidth: '400px',
              textAlign: 'center',
              fontFamily: 'Trebuchet MS, sans-serif',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <p style={{ fontSize: '14px', marginBottom: '15px' }}>
              <strong>⚠️ Browser Compatibility Notice</strong>
            </p>
            <p style={{ fontSize: '12px', marginBottom: '20px' }}>
              This site is best viewed at <strong>1024×768</strong> resolution
              on <strong>Internet Explorer 6.0</strong> or Netscape Navigator 4.7
            </p>
            <button
              onClick={() => setShowPopup(false)}
              style={{
                padding: '8px 20px',
                fontSize: '12px',
                cursor: 'pointer',
                border: '2px outset #ccc',
                background: '#e0e0e0',
              }}
            >
              Continue Anyway
            </button>
          </div>
        </div>
      )}

      <div className="outdated-banner">
        ⚠️ Our new patient portal is under construction. Thank you for your patience!
      </div>

      <header className="header">
        <div className="header-content">
          <h1 className="site-title">
            <Link href="/">Heritage Surgical Associates</Link>
          </h1>
          <p className="tagline">Trusted Orthopedic Care Since 1987</p>
        </div>
        <nav className="nav">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link ${pathname === link.href ? 'active' : ''}`}
              data-friction="true"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </header>
    </>
  );
}
