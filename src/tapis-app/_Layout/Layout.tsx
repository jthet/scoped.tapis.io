import React, { useState } from 'react';
import { Sidebar } from 'tapis-app/_components';
import { Router } from 'tapis-app/_Router';
import { PageLayout } from 'tapis-ui/_common';
import { NotificationsProvider } from 'tapis-app/_components/Notifications';
import { useHistory } from 'react-router-dom';
import { useList } from 'tapis-hooks/tenants';
import './Layout.scss';
import { useTapisConfig } from 'tapis-hooks';
import { useLogin } from 'tapis-hooks/authenticator';
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { QueryWrapper } from 'tapis-ui/_wrappers';

const Layout: React.FC = () => {
  const { claims } = useTapisConfig();
  const { data, isLoading, error } = useList();
  const tenants = data?.result ?? [];
  const history = useHistory();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { logout } = useLogin();

  const header = (
    <div className="tapis-ui__header">
      <div>
      {/* <img 
        src="https://seisscoped.org/images/scoped_logo.jpg" 
        alt="SCOPED Logo" 
        width="50" 
        height="50" 
        /> */}
        SCOPED Tapis UI
      </div>
      <div></div>
      <div>
        {claims["sub"] && (
          <ButtonDropdown
            size="sm"
            isOpen={isOpen}
            toggle={() => setIsOpen(!isOpen)}
            className="dropdown-button"
          >
            <DropdownToggle caret>{claims["sub"]}</DropdownToggle>
            <DropdownMenu style={{ maxHeight: "50vh", overflowY: "scroll" }}>
              <DropdownItem onClick={() => history.push("/logout")}>
                Logout
              </DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        )}
      </div>
    </div>
  );

  const workbenchContent = (
    <div className="workbench-content">
      <Router />
    </div>
  );

  return (
    <NotificationsProvider>
      <div style={{ display: 'flex', flexGrow: 1, height: '100vh' }}>
        <PageLayout top={header} left={<Sidebar />} right={workbenchContent} />
      </div>
    </NotificationsProvider>
  );
};

export default Layout;
