'use client';

interface HeaderButton {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}

interface PortalHeaderProps {
  buttons?: HeaderButton[];
  showLogo?: boolean;
}

// SVG Icons
const BackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" height="32" width="32">
    <g>
      <rect y="14" x="12.5" height="4" width="17.10244" style={{ fill: '#ffffff' }} />
      <path
        transform="matrix(0.71423837,-0.05031861,0.04283607,0.92816864,2.1168596,1.7114727)"
        d="M 15.780488,25.94634 7.7003609,20.611404 -0.37976596,15.276468 8.2804882,10.946341 16.940742,6.6162135 16.360615,16.281277 Z"
        style={{ fill: '#ffffff' }}
      />
    </g>
  </svg>
);

const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" height="32" width="32">
    <g>
      <path
        d="M 16.019531 5.5800781 C 15.996978 5.5800781 13.591007 7.3640174 10.673828 9.5429688 L 5.3710938 13.503906 L 5.3710938 19.855469 L 5.3710938 26.205078 L 8.3105469 26.205078 L 11 26.205078 L 11 15 L 21 15 L 21 26.205078 L 23.726562 26.205078 L 26.667969 26.205078 L 26.667969 19.853516 L 26.667969 13.503906 L 21.363281 9.5429688 C 18.446484 7.3642559 16.042091 5.5800781 16.019531 5.5800781 z "
        style={{ fill: '#ffffff', stroke: '#ffffff', strokeWidth: 0.86 }}
      />
      <path
        d="m 21.53742,3.2452677 3.107823,0 0,7.1590103 -3.107823,0 z"
        style={{ fill: '#ffffff', stroke: '#ffffff', strokeWidth: 0.87 }}
      />
      <path
        d="m 2.4953674,14.67054 2.2539139,0 11.2695497,-9.7824848 11.269549,9.7824848 2.253915,0 L 16.018831,2.5862925 Z"
        style={{ fill: '#ffffff', stroke: '#ffffff', strokeWidth: 0.87 }}
      />
    </g>
  </svg>
);

const ContactIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" height="32" width="32">
    <path
      style={{ fill: '#ffffff' }}
      d="m 19.610644,4.0218497 c 0,0 5.238623,0.06888 5.170701,4.8141589 -0.06816,4.7455194 -1.020747,8.9411974 -2.58559,11.2795174 -1.564603,2.338559 -5.578234,8.459516 -10.13692,7.840798 0,0 -2.2452608,-0.48168 -3.9457072,-1.58232 l 5.5105512,-4.332959 c 0,0 1.632764,1.03176 2.653272,-0.34392 1.020749,-1.3752 4.218117,-7.771437 4.218117,-7.771437 0,0 0.884425,-2.06352 -1.08867,-2.95752 l 0.204246,-6.9463183 z"
    />
  </svg>
);

const ScheduleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" height="32" width="32">
    <g style={{ fill: '#ffffff' }}>
      <circle cx="6" cy="7" r="5" />
      <circle cx="20" cy="7" r="5" />
      <path d="M 1 14 L 1 30 L 25 30 L 25 24 L 31 28 L 31 16 L 25 18 L 25 14 L 1 14 z M 11 15 L 15 15 L 15 20 L 20 20 L 20 24 L 15 24 L 15 29 L 11 29 L 11 24 L 6 24 L 6 20 L 11 20 L 11 15 z" />
    </g>
  </svg>
);

const CameraIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" height="32" width="32">
    <path
      d="M 11 7 L 11 10 L 2 10 L 2 10.273438 L 2 25 L 30 25 L 30 10.273438 L 30 10 L 21 10 L 21 7 L 11 7 z M 16 12.5 A 5 5 0 0 1 21 17.5 A 5 5 0 0 1 16 22.5 A 5 5 0 0 1 11 17.5 A 5 5 0 0 1 16 12.5 z"
      style={{ fill: '#ffffff' }}
    />
  </svg>
);

const SendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" height="32" width="32">
    <g>
      <path
        d="M 2 14 L 2 29 L 30 29 L 30 14 L 19 14 L 19 17.666016 L 13 17.666016 L 13 14 L 2 14 z M 4.9609375 19.947266 L 26.976562 19.947266 L 26.976562 20.947266 L 4.9609375 20.947266 L 4.9609375 19.947266 z M 4.9667969 23.023438 L 26.980469 23.023438 L 26.980469 24.023438 L 4.9667969 24.023438 L 4.9667969 23.023438 z M 4.9121094 25.947266 L 26.927734 25.947266 L 26.927734 26.947266 L 4.9121094 26.947266 L 4.9121094 25.947266 z"
        style={{ fill: '#ffffff' }}
      />
      <path
        d="M 16.0625,3 12.03125,7.138443 8,11.276886 l 5.5,0.01445 0,6.037938 5,0 0,-6.023493 5.5,0.01444 L 20.03125,7.1601103 16.0625,3 Z"
        style={{ fill: '#ffffff' }}
      />
    </g>
  </svg>
);

const NewMedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" height="32" width="32">
    <g style={{ fill: '#ffffff' }}>
      <path d="M14 4v10H4v4h10v10h4V18h10v-4H18V4z" />
    </g>
  </svg>
);

const CancelIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" height="32" width="32">
    <circle cx="16" cy="16" r="14" fill="none" stroke="#ffffff" strokeWidth="2" />
    <line x1="10" y1="16" x2="22" y2="16" stroke="#ffffff" strokeWidth="2" />
  </svg>
);

const DoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" height="32" width="32">
    <path d="M12 22l-6-6 2-2 4 4 10-10 2 2z" fill="#ffffff" />
  </svg>
);

const RxIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" height="32" width="32">
    <text x="6" y="24" style={{ fill: '#ffffff', fontSize: '20px', fontWeight: 'bold' }}>
      Rx
    </text>
  </svg>
);

const RefreshIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" height="32" width="32">
    <path
      d="M16 4C9.373 4 4 9.373 4 16s5.373 12 12 12c5.018 0 9.372-3.092 11.13-7.469l-2.457-.812C23.438 22.96 20.005 26 16 26c-5.514 0-10-4.486-10-10S10.486 6 16 6c2.762 0 5.262 1.124 7.071 2.929L19 13h9V4l-3.879 3.879C21.839 5.613 19.094 4 16 4z"
      style={{ fill: '#ffffff' }}
    />
  </svg>
);

const SubmitIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" height="32" width="32">
    <path d="M12 24l-8-8 2.83-2.83L12 18.34l13.17-13.17L28 8z" fill="#ffffff" />
  </svg>
);

const PortalIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" height="32" width="32">
    <circle cx="16" cy="10" r="6" fill="#ffffff" />
    <path d="M16 18c-6 0-11 3-11 7v3h22v-3c0-4-5-7-11-7z" fill="#ffffff" />
  </svg>
);

const CloseExitIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" height="32" width="32">
    <text x="4" y="22" style={{ fill: '#ffffff', fontSize: '14px', fontWeight: 'bold', fontStyle: 'italic' }}>
      CE
    </text>
  </svg>
);

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" height="32" width="32">
    <path
      d="M4 8v16h24V8H4zm22 2l-10 6-10-6h20zm-20 12V12l10 6 10-6v10H6z"
      fill="#ffffff"
    />
  </svg>
);

export const iconMap: Record<string, React.ReactNode> = {
  back: <BackIcon />,
  home: <HomeIcon />,
  contact: <ContactIcon />,
  schedule: <ScheduleIcon />,
  camera: <CameraIcon />,
  send: <SendIcon />,
  newMed: <NewMedIcon />,
  cancel: <CancelIcon />,
  done: <DoneIcon />,
  rx: <RxIcon />,
  refresh: <RefreshIcon />,
  submit: <SubmitIcon />,
  portal: <PortalIcon />,
  closeExit: <CloseExitIcon />,
  email: <EmailIcon />,
};

export default function PortalHeader({ buttons = [], showLogo = false }: PortalHeaderProps) {
  return (
    <header className="portal-header">
      {showLogo && (
        <div className="portal-header-main">
          <div className="portal-header-logo">
            <svg viewBox="0 0 40 40" height="40" width="40">
              <circle cx="20" cy="20" r="18" fill="white" />
              <text x="20" y="26" textAnchor="middle" fill="#3f51b5" fontSize="18" fontWeight="bold">
                M
              </text>
            </svg>
            <span>medent</span>
          </div>
        </div>
      )}

      {buttons.length > 0 && (
        <div className="portal-menubar" id="topMenuBar">
          {buttons.map((button) => (
            <button key={button.id} id={button.id} onClick={button.onClick}>
              {button.icon}
              <br />
              {button.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

// Pre-built header configurations for different screens
export function getChartLookupHeader(goBack: () => void, goHome: () => void): HeaderButton[] {
  return [
    { id: 'icon_go_back', label: 'Back', icon: <BackIcon />, onClick: goBack },
    { id: 'icon_create_new', label: 'Create New Account', icon: <NewMedIcon />, onClick: () => alert('Create New Account - Not implemented') },
    { id: 'icon_go_home', label: 'Home', icon: <HomeIcon />, onClick: goHome },
  ];
}

export function getPatientChartHeader(goBack: () => void, goHome: () => void): HeaderButton[] {
  return [
    { id: 'icon_go_back', label: 'Back', icon: <BackIcon />, onClick: goBack },
    { id: 'icon_contact', label: 'Contact', icon: <ContactIcon />, onClick: () => alert('Contact - Not implemented') },
    { id: 'icon_new_video_visit', label: 'Schedule New', icon: <ScheduleIcon />, onClick: () => alert('Schedule New - Not implemented') },
    { id: 'icon_get_photos', label: 'Camera', icon: <CameraIcon />, onClick: () => alert('Camera - Not implemented') },
    { id: 'icon_get_send_info', label: 'Send', icon: <SendIcon />, onClick: () => alert('Send - Not implemented') },
    { id: 'icon_go_home', label: 'Home', icon: <HomeIcon />, onClick: goHome },
  ];
}

export function getMedicationsHeader(goBack: () => void, onNewMed: () => void, goHome: () => void): HeaderButton[] {
  return [
    { id: 'icon_go_back', label: 'Back', icon: <BackIcon />, onClick: goBack },
    { id: 'icon_new_med', label: 'New Med', icon: <NewMedIcon />, onClick: onNewMed },
    { id: 'icon_go_home', label: 'Home', icon: <HomeIcon />, onClick: goHome },
  ];
}

export function getMedicationDetailHeader(
  onDone: () => void,
  onCancel: () => void,
  goHome: () => void
): HeaderButton[] {
  return [
    { id: 'icon_done', label: 'Done', icon: <DoneIcon />, onClick: onDone },
    { id: 'icon_cancel', label: 'Cancel', icon: <CancelIcon />, onClick: onCancel },
    { id: 'icon_rx', label: 'eRx', icon: <RxIcon />, onClick: () => alert('eRx - Not implemented') },
    { id: 'icon_go_home', label: 'Home', icon: <HomeIcon />, onClick: goHome },
  ];
}

export function getDrugLookupHeader(onCancel: () => void, goHome: () => void): HeaderButton[] {
  return [
    { id: 'icon_cancel', label: 'Cancel', icon: <CancelIcon />, onClick: onCancel },
    { id: 'icon_go_home', label: 'Home', icon: <HomeIcon />, onClick: goHome },
  ];
}

export function getTriageListHeader(
  goBack: () => void,
  onNewTriage: () => void,
  onRefresh: () => void,
  goHome: () => void
): HeaderButton[] {
  return [
    { id: 'icon_go_back', label: 'Back', icon: <BackIcon />, onClick: goBack },
    { id: 'icon_new_triage', label: 'New Triage', icon: <NewMedIcon />, onClick: onNewTriage },
    { id: 'icon_refresh', label: 'Refresh', icon: <RefreshIcon />, onClick: onRefresh },
    { id: 'icon_go_home', label: 'Home', icon: <HomeIcon />, onClick: goHome },
  ];
}

export function getTriageNewHeader(
  onSubmit: () => void,
  onCancel: () => void,
  onPortal: () => void,
  onCloseExit: () => void,
  onRefEmail: () => void,
  onRefTriage: () => void,
  goHome: () => void
): HeaderButton[] {
  return [
    { id: 'icon_triage_submit', label: 'Submit', icon: <SubmitIcon />, onClick: onSubmit },
    { id: 'icon_cancel', label: 'Cancel', icon: <CancelIcon />, onClick: onCancel },
    { id: 'icon_send_message_to_portal', label: 'Portal', icon: <PortalIcon />, onClick: onPortal },
    { id: 'icon_triage_close_exit', label: 'Close/Exit', icon: <CloseExitIcon />, onClick: onCloseExit },
    { id: 'icon_triage_create_ref_email', label: 'Ref Email', icon: <EmailIcon />, onClick: onRefEmail },
    { id: 'icon_triage_create_ref_triage', label: 'Ref Triage', icon: <NewMedIcon />, onClick: onRefTriage },
    { id: 'icon_go_home', label: 'Home', icon: <HomeIcon />, onClick: goHome },
  ];
}
