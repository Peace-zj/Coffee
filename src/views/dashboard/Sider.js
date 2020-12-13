import React, {  Component } from 'react'
import { Layout, Menu } from 'antd';
import {withRouter} from 'react-router'
import {
    UserOutlined,
    HomeOutlined,
    BlockOutlined,
    ContactsOutlined,
    IdcardOutlined,
    FileTextOutlined,
    CoffeeOutlined,
    BellOutlined,
    FileAddOutlined,
    SearchOutlined,
    TableOutlined,
    TeamOutlined,
    BarChartOutlined,
    DollarCircleOutlined
} from '@ant-design/icons';
import './Sider.css'
const menus = [
    {
        id:1,
        path:'/home',
        icon:<HomeOutlined />,
        title:"首页",
        permission:[1,2,3]
    },
    {
        path:'/employee',
        icon:<UserOutlined />,
        title:'员工管理',
        permission:[1,2],
        children:[
            {
                id:2,
                path:'/employee/askforleave',
                icon:<BlockOutlined />,
                title:"请假",
                permission:[1,2]
            },
            {
                id:3,
                path:'/employee/attendance',
                icon:<ContactsOutlined />,
                title:'出勤状况',
                permission:[1,2]
            },
            {
                id:4,
                path:'/employee/message',
                icon:<IdcardOutlined />,
                title:'个人信息',
                permission:[1,2]
            }
        ]
    },
    {
        path:'/menu',
        icon:<FileTextOutlined />,
        title:'菜单',
        permission:[1,2,3],
        children:[
            {
                id:5,
                path:'/menu/coffee',
                icon:<CoffeeOutlined />,
                title:'咖啡',
                permission:[1,2,3]
            },
            {
                id:6,
                path:'/menu/milkytea',
                icon:<CoffeeOutlined />,
                title:'奶茶',
                permission:[1,2,3]
            },
            {
                id:7,
                path:'/menu/tea',
                icon:<CoffeeOutlined />,
                title:'茶',
                permission:[1,2,3]
            }
        ]
    },
    {
        path:'/order',
        icon:<BellOutlined />,
        title:'预订',
        permission:[1,2,3],
        children:[
            {
                id:8,
                path:'/order/addorder',
                icon:<FileAddOutlined />,
                title:'新增预订',
                permission:[1,2,3]
            },
            {
                id:9,
                path:'/order/selectorder',
                icon:<SearchOutlined />,
                title:'查询预订',
                permission:[1,2,3]
            }
        ]
    },
    {
        path:'/table',
        icon:<TableOutlined />,
        title:'餐台',
        permission:[1,2,3],
        children:[
            {
                id:10,
                path:'/table/tables',
                icon:<TableOutlined />,
                title:'餐台情况',
                permission:[1,2,3]
            }
        ]
    },
    {
        path:'/vipCustomer',
        icon:<TeamOutlined />,
        title:'VIP用户',
        permission:[1,2,3],
        children:[
            {
                id:11,
                path:'/vipCustomer/vipCustomers',
                icon:<UserOutlined />,
                title:'用户列表',
                permission:[1,2,3]
            }
        ]
    },
    {
        path:'/business',
        icon:<BarChartOutlined />,
        title:'营业情况',
        permission:[1],
        children:[
            {
                id:12,
                path:'/business/turnover',
                icon:<DollarCircleOutlined />,
                title:'销售量',
                permission:[1]
            }
        ]
    }
    
]
const { Sider } = Layout;
const { SubMenu } = Menu;
class Side extends Component {
    state = {
        collapsed: false,
        color:false,
        current:0
    };
    renderMenu(menus){
        let {roleType} = JSON.parse(localStorage.getItem("cookie"))
       return menus.map(item=>{
            if(item.children){
                if(!item.permission.includes(roleType)){
                    return null
                }
                return <SubMenu key={item.path} title={item.title} icon={item.icon}>
                {this.renderMenu(item.children)}
            </SubMenu>
            }
            if(!item.permission.includes(roleType)){
                return null
            }
        return <Menu.Item key={item.path} icon={item.icon} id={this.state.current===item.id?'active':''} onClick={
            ()=>{
                this.setState({
                    color:true,
                    current:item.id
                })
                this.props.history.push(item.path)
            }
        }>{item.title}</Menu.Item>
        })
    }
    render() {
        //console.log(this.props.location.pathname)
        let openKeys=['/'+this.props.location.pathname.split('/')[1]]
        let selKey=[this.props.location.pathname]
        return (
            <Sider trigger={null} collapsible collapsed={this.state.collapsed} id="sideMenu">
                <div className="logo">Coffee House</div>
                <Menu theme="dark" mode="inline" style={{width:'195px'}} defaultOpenKeys={openKeys} selectedKeys={selKey}>
                        {
                            this.renderMenu(menus)
                        }
                    {/* <Menu.Item key="1">首页</Menu.Item>
                    <SubMenu key="sub1" title="Navigation One">
                        <Menu.Item key="1">Option 1</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" title="Navigation Two">
                        <Menu.Item key="5">Option 5</Menu.Item>
                        <SubMenu key="sub3" title="Submenu">
                            <Menu.Item key="7">Option 7</Menu.Item>
                            <Menu.Item key="8">Option 8</Menu.Item>
                        </SubMenu>
                    </SubMenu> */}
                </Menu>
            </Sider>
        )
    }
}

export default withRouter(Side)