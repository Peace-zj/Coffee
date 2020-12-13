import React, { Component } from 'react'
import { Layout, Dropdown,Avatar, Menu } from 'antd';
import {
    ExportOutlined
} from '@ant-design/icons';
import {withRouter} from 'react-router-dom'
import './head.css'
const { Header } = Layout;

class Head extends Component {
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    render() {
        const menu = (
            <Menu>
              <Menu.Item danger onClick={()=>{
                  localStorage.removeItem('cookie')
                  this.props.history.push('/login')
              }}>退出</Menu.Item>
            </Menu>
          );
        return (
            <div>
                <Header className="site-layout-background" style={{ paddingLeft: '16px', background: '#000' }}>
                    <Avatar src="https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2838893844,10476647&fm=26&gp=0.jpg" className="little" /> 
                    <Dropdown overlay={menu}>
                    <ExportOutlined style={{color:'rgba(247, 214, 30, 0.979)',fontSize:'22px',float:'right',marginTop:'22px'}}/>
                    </Dropdown>
                </Header>

            </div>
        )
    }
}
export default withRouter(Head)