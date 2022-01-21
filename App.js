import { Layout, Dropdown, Menu, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import LoginPage from "./components/LoginPage";
import HostHomePage from "./components/HostHomePage";
import GuestHomePage from "./components/GuestHomePage";

import React from "react";

const { Header, Content, Footer } = Layout;

const footer = {
  'background': 'transparent',
  'border': 'none',
  'color': 'white',
  'height': '90px',
  'text-align': 'center',
}

const img = {
  'background-image': 'url(https://unsplash.com/photos/R-LK3sqLiBw/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8Mnx8aG9tZXx8MHx8fHwxNjQyNzg5ODIy&force=true)',
  'width': '100%',
  'height': '100%',
  'position': 'fixed',
  'background-repeat': 'no-repeat',
  'background-position': '0px 0px',
  'background-size': '100% 100%',
}

class App extends React.Component {
  state = {
    authed: false,
    asHost: false,
  };

  componentDidMount() {
    const authToken = localStorage.getItem("authToken");
    const asHost = localStorage.getItem("asHost") === "true";
    this.setState({
      authed: authToken !== null,
      asHost,
    });
  }

  handleLoginSuccess = (token, asHost) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("asHost", asHost);
    this.setState({
      authed: true,
      asHost,
    });
  };

  handleLogOut = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("asHost");
    this.setState({
      authed: false,
    });
  };

  renderContent = () => {
    if (!this.state.authed) {
      return <LoginPage handleLoginSuccess={this.handleLoginSuccess} />;
    }
    if (this.state.asHost) {
      return <HostHomePage />;
    }
    return <GuestHomePage />;
  };

  userMenu = (
    <Menu>
      <Menu.Item key="logout" onClick={this.handleLogOut}>
        Log Out
      </Menu.Item>
    </Menu>
  );

  render() {
    return (
      <Layout style={img}>
        <Header style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: "white" }}>
            Online Booking System
          </div>
          {this.state.authed && (
            <div>
              <Dropdown trigger="click" overlay={this.userMenu}>
                <Button icon={<UserOutlined />} shape="circle" />
              </Dropdown>
            </div>
          )}
        </Header>
        <Content
          style={{ height: "calc(100% - 64px)", margin: 20, overflow: "auto" }}
        >
          {this.renderContent()}
        </Content>

        <Footer style={footer}>
            Online Booking System ©2022 Created by Teejay Pei
          </Footer>
      </Layout>
    );
  }
}
export default App;
