export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          <strong>Heritage Surgical Associates</strong><br />
          1200 Medical Center Drive, Suite 400<br />
          Anytown, USA 12345
        </p>
        <p>
          Phone: (555) 123-4567 | Fax: (555) 123-4568<br />
          <span className="broken-link">Patient Records</span> |{' '}
          <span className="broken-link">Insurance Portal</span> |{' '}
          <span className="broken-link">Telehealth (Beta)</span>
        </p>
        <p style={{ fontSize: '10px', marginTop: '15px', color: '#666' }}>
          © 2003-{new Date().getFullYear()} Heritage Surgical Associates. All rights reserved.<br />
          Site last updated: March 2019 | Webmaster: webmaster@heritagesurgical.local
        </p>
      </div>
    </footer>
  );
}
