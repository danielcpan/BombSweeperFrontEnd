import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

import {
  Container,
  Icon,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react';

const DesktopContainer = (props) => {
  const [fixed, setFixed] = useState(false);
  const { location, children } = props;

  return (
    <Responsive minWidth={Responsive.onlyTablet.minWidth}>
      <Visibility
        once={false}
        onBottomPassed={() => setFixed(true)}
        onBottomPassedReverse={() => setFixed(false)}
      >
        <Segment
          inverted
          textAlign="center"
          vertical
        >
          <Menu
            fixed={fixed ? 'top' : null}
            inverted={!fixed}
            pointing={!fixed}
            secondary={!fixed}
          >
            <Container>
              <Menu.Item>
                <Link to="/">
                  <h1>Bomb Sweeper</h1>
                </Link>
              </Menu.Item>
              <Menu.Item position="right">
                <Menu.Item active={location.pathname === '/'}>
                  <Link to="/">
                    Play
                  </Link>
                </Menu.Item>
                <Menu.Item active={location.pathname === '/leaderboard'}>
                  <Link to="/leaderboard">
                    Leaderboard
                  </Link>
                </Menu.Item>
              </Menu.Item>
            </Container>
          </Menu>
        </Segment>
        {children}
      </Visibility>
    </Responsive>
  );
};

DesktopContainer.propTypes = {
  children: PropTypes.node,
};

const MobileContainer = (props) => {
  const [sidebarOpened, setSidebarOpened] = useState(false);
  const { location, children } = props;

  return (
    <Responsive
      as={Sidebar.Pushable}
      maxWidth={Responsive.onlyMobile.maxWidth}
    >
      <Sidebar
        as={Menu}
        animation="push"
        inverted
        onHide={() => setSidebarOpened(false)}
        vertical
        visible={sidebarOpened}
      >
        <Menu.Item active={location.pathname === '/'}>
          <Link to="/" onClick={() => setSidebarOpened(false)}>
            Play
          </Link>
        </Menu.Item>        
        <Menu.Item active={location.pathname === '/leaderboard'}>
          <Link to="/leaderboard" onClick={() => setSidebarOpened(false)}>
            Leaderboard
          </Link>
        </Menu.Item>
      </Sidebar>

      <Sidebar.Pusher dimmed={sidebarOpened}>
        <Segment
          inverted
          textAlign="center"
          vertical
        >
          <Container>
            <Menu inverted pointing secondary size="large">
              <Menu.Item onClick={() => setSidebarOpened(true)} style={{ alignSelf: 'center' }}>
                <Icon name="sidebar" />
              </Menu.Item>
              <Menu.Item><h1>Bomb Sweeper</h1></Menu.Item>
            </Menu>
          </Container>
        </Segment>
        {children}
      </Sidebar.Pusher>
    </Responsive>
  );
};

MobileContainer.propTypes = {
  children: PropTypes.node,
};

const DefaultLayout = (props) => {
  const { location, children } = props;

  return (
    <div>
      <DesktopContainer location={location}>{children}</DesktopContainer>
      <MobileContainer location={location}>{children}</MobileContainer>
    </div>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.node,
};

export default withRouter(DefaultLayout);
