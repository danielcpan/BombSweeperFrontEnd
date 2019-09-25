import PropTypes from 'prop-types'
import React, { useState } from 'react'
import {
  Container,
  Icon,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react'

const DesktopContainer = props => {
  const [fixed, setFixed] = useState(false);
  const { children } = props;

  return (
    <Responsive 
      // minWidth={Responsive.onlyTablet.minWidth}
    >
      <Visibility
        once={false}
        onBottomPassed={() => setFixed(true)}
        onBottomPassedReverse={() => setFixed(false)}
      >
        <Segment
          inverted
          textAlign='center'
          vertical
        >
          <Menu
            fixed={fixed ? 'top' : null}
            inverted={!fixed}
            pointing={!fixed}
            secondary={!fixed}
          >
            <Container>
              <Menu.Item><h1>Bomb Sweeper</h1></Menu.Item>
              <Menu.Item position='right'>
                <Menu.Item as='a' active>Play</Menu.Item>
                <Menu.Item as='a'>Leaderboard</Menu.Item>
              </Menu.Item>                
            </Container>
          </Menu>
        </Segment>
        {children}
      </Visibility>
    </Responsive>    
  )
} 

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

const MobileContainer = props => {
  const [sidebarOpened, setSidebarOpened] = useState(false);
  const { children } = props;

  return (
    <Responsive
      as={Sidebar.Pushable}
      maxWidth={Responsive.onlyMobile.maxWidth}
    >
      <Sidebar
        as={Menu}
        animation='push'
        inverted
        onHide={() => setSidebarOpened(false)}
        vertical
        visible={sidebarOpened}
      >
        <Menu.Item as='a' active>Play</Menu.Item>
        <Menu.Item as='a'>Leaderboard</Menu.Item>
      </Sidebar>

      <Sidebar.Pusher dimmed={sidebarOpened}>
        <Segment
          inverted
          textAlign='center'
          vertical
        >
          <Container>
            <Menu inverted pointing secondary size='large'>
              <Menu.Item onClick={() => setSidebarOpened(true)} style={{alignSelf: 'center'}}>
                <Icon name='sidebar' />
              </Menu.Item>
              <Menu.Item><h1>Bomb Sweeper</h1></Menu.Item>
            </Menu>
          </Container>
        </Segment>
        {children}
      </Sidebar.Pusher>
    </Responsive>  
  )
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

const DefaultLayout = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    {/* <MobileContainer>{children}</MobileContainer> */}
  </div>
)

DefaultLayout.propTypes = {
  children: PropTypes.node,
}

export default DefaultLayout