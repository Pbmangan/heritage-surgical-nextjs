'use client';

import PortalHeader from '../PortalHeader';
import PortalFooter from '../PortalFooter';
import MenuButton, {
  ChartLookupIcon,
  MyEmailIcon,
  MyTriageIcon,
  MyScheduleIcon,
  MyDocIcon,
  MyTodoIcon,
} from '../MenuButton';
import { ViewState } from '../../types';

interface DashboardProps {
  userName: string;
  navigate: (view: ViewState) => void;
  onLogout: () => void;
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function Dashboard({ userName, navigate, onLogout }: DashboardProps) {
  return (
    <div className="portal-container">
      <PortalHeader showLogo={true} />

      <div className="portal-content">
        <div className="portal-dashboard">
          <h1 id="main_menu_greeting">
            {getGreeting()}, {userName}!
          </h1>

          <div id="selection_buttons" className="portal-menu-grid">
            <MenuButton
              id="menuId_75"
              actionId="75"
              label="Chart Lookup"
              icon={<ChartLookupIcon />}
              onClick={() => navigate({ screen: 'chart-lookup' })}
            />
            <MenuButton
              id="menuId_5"
              actionId="5"
              label="My Email"
              icon={<MyEmailIcon />}
              onClick={() => alert('My Email - Not implemented')}
            />
            <MenuButton
              id="menuId_2"
              actionId="2"
              label="My Triage"
              icon={<MyTriageIcon />}
              onClick={() => navigate({ screen: 'triage-new' })}
            />
            <MenuButton
              id="menuId_74"
              actionId="74"
              label="My Schedule"
              icon={<MyScheduleIcon />}
              onClick={() => alert('My Schedule - Not implemented')}
            />
            <MenuButton
              id="menuId_4"
              actionId="4"
              label="My Doc"
              icon={<MyDocIcon />}
              onClick={() => alert('My Doc - Not implemented')}
            />
            <MenuButton
              id="menuId_3"
              actionId="3"
              label="My Todo"
              icon={<MyTodoIcon />}
              onClick={() => alert('My Todo - Not implemented')}
            />
          </div>
        </div>
      </div>

      <PortalFooter userName={userName} onLogout={onLogout} />
    </div>
  );
}
