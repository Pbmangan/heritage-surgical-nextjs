'use client';

interface PortalFooterProps {
  userName: string;
  onLogout: () => void;
}

export default function PortalFooter({ userName, onLogout }: PortalFooterProps) {
  const lastLogin = new Date().toLocaleString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <footer className="portal-footer">
      <div className="portal-footer-icons">
        <span id="logout" onClick={onLogout} style={{ cursor: 'pointer' }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" height="32" width="32">
            <g style={{ fill: '#757575' }}>
              <path d="M 10.666668,9.6013728 6.5104166e-7,15.971367 10.633334,22.401373 l 0.01333,-5.12 -1.0599996,0 -0.00999,3.52 -7.9766667,-4.823339 8.0000001,-4.776661 -0.00999,3.626666 1.0633332,0 0.01333,-5.2266662 z" />
              <path d="m 10.346667,13.868039 0,0.96 8.320001,0 0,2.453334 -8.320001,0 0,0.853333 9.280001,0 0,-4.266667 -9.280001,0 z" />
              <path d="m 11.733334,1.6013728 0,10.1333332 1.6,0 0,-8.5333332 14.933334,0 0,25.6000002 -14.933334,0 0,-8.533334 -1.6,0 0,10.133334 18.133334,0 0,-28.8000002 -18.133334,0 z" />
            </g>
          </svg>
        </span>
        <span id="preferences">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" height="32" width="32">
            <g style={{ fill: '#757575' }}>
              <circle cx="16" cy="16" r="3" />
              <path d="M16 4c-.5 0-1 .4-1 1v2c0 .6.5 1 1 1s1-.4 1-1V5c0-.6-.5-1-1-1zM16 24c-.5 0-1 .4-1 1v2c0 .6.5 1 1 1s1-.4 1-1v-2c0-.6-.5-1-1-1zM28 15h-2c-.6 0-1 .5-1 1s.4 1 1 1h2c.6 0 1-.5 1-1s-.4-1-1-1zM7 16c0-.5-.4-1-1-1H4c-.6 0-1 .5-1 1s.4 1 1 1h2c.6 0 1-.5 1-1zM24.5 6.1c-.4-.4-1-.4-1.4 0l-1.4 1.4c-.4.4-.4 1 0 1.4.4.4 1 .4 1.4 0l1.4-1.4c.4-.4.4-1 0-1.4zM9.8 20.9c-.4-.4-1-.4-1.4 0l-1.4 1.4c-.4.4-.4 1 0 1.4.4.4 1 .4 1.4 0l1.4-1.4c.4-.4.4-1 0-1.4zM24.5 25.9c.4-.4.4-1 0-1.4l-1.4-1.4c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l1.4 1.4c.4.4 1 .4 1.4 0zM9.8 11.1c.4-.4.4-1 0-1.4L8.4 8.3c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l1.4 1.4c.4.4 1 .4 1.4 0z" />
            </g>
          </svg>
        </span>
      </div>

      <div id="last_login">Last login: {lastLogin}</div>
      <div id="copyright">Copyright © Community Computer Service Inc.</div>
      <div id="corporateLink">
        Powered by <a href="#" className="clickable_link">medent™</a>
      </div>

      <hr />

      <div id="sLoginId">
        Support user <br />
        You are logged in as Heritage Medical (HM001)<br />
        Web version <span id="jsVersion">2025.12.12.00.00.00</span><br />
        medent version 237 (23702268)<br />
        Home directory
      </div>

      {/* Hidden system vars for Playwright selectors */}
      <div id="system-vars">
        <input type="hidden" id="sMmSessionId" name="sMmSessionId" value="mock-session-123" />
        <input type="hidden" id="sPracticeId" name="sPracticeId" value="HM001" />
        <input type="hidden" id="sPracticeName" name="sPracticeName" value="Heritage Medical" />
        <input type="hidden" id="sMobileId" name="sMobileId" value="HM001mockID" />
        <input type="hidden" id="sMobileUserId" name="sMobileUserId" value="12345" />
        <input type="hidden" id="sMedentSessionId" name="sMedentSessionId" value="mockMedent" />
        <input type="hidden" id="sMobileUserName" name="sMobileUserName" value={userName} />
        <input type="hidden" id="iTimeout" value="1200" />
        <input type="hidden" id="bIsLoggedIn" value="1" />
      </div>
    </footer>
  );
}
