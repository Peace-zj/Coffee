import React, { Component } from 'react'
import {Switch,Route, Redirect} from 'react-router-dom'
import { Layout } from 'antd';
import Side from "./Sider";
import Head from "./Header";
import './Dashboard.css'
import Turnover from '../business/turnover'
import MilkyTea from '../menu/MilkyTea';
import Addorder from '../order/Addorder';
import Askforleave from '../employee/Askforleave';
import Attendance from '../employee/Attendance';
import Message from '../employee/Message';
import Coffee from '../menu/Coffee';
import Tea from '../menu/Tea';
import VipCustomers from '../vipCustomer/VipCustomers';
import Selectorder from '../order/Selectorder';
import Table from '../table/Table';
import Home from '../home/Home';
import Nopermission from '../nopermission/Nopermission'
const { Content } = Layout;
const routes = [
    {
        path:'/home',
        component:Home,
        permission:[1,2,3]
    },
    {
        path:'/employee/askforleave',
        component:Askforleave,
        permission:[1,2]
    },
    {
        path:'/employee/attendance',
        component:Attendance,
        permission:[1,2]
    },
    {
        path:'/employee/message',
        component:Message,
        permission:[1,2]
    },
    {
        path:'/menu/coffee',
        component:Coffee,
        permission:[1,2,3]
    },
    {
        path:'/menu/milkytea',
        component:MilkyTea,
        permission:[1,2,3]
    },
    {
        path:'/menu/tea',
        component:Tea,
        permission:[1,2,3]
    },
    {
        path:'/order/addorder',
        component:Addorder,
        permission:[1,2,3]
    },
    {
        path:'/order/selectorder',
        component:Selectorder,
        permission:[1,2,3]
    },
    {
        path:'/table/tables',
        component:Table,
        permission:[1,2,3]
    },
    {
        path:'/vipCustomer/vipCustomers',
        component:VipCustomers,
        permission:[1,2,3]
    },
    {
        path:'/business/turnover',
        component:Turnover,
        permission:[1]
    }
]
export default class Dashboard extends Component {

    render() {
         let {roleType} = JSON.parse(localStorage.getItem("cookie"))
        console.log(roleType)
        return (
                <Layout>
                    <Side></Side>
                    <Layout className="site-layout">
                        <Head></Head>
                            <Content
                                className="site-layout-background"
                                style={{
                                    margin: '24px 16px',
                                    padding: 24,
                                    minHeight: 280,
                                }}
                            >
                                <Switch>
                                    {
                                        routes.map(item=>
                                            item.permission.includes(roleType) &&
                                            <Route path={item.path} key={item.path} component={item.component} />
                                        )  
                                    }
                                    <Redirect from='/' to='/home' exact/>
                                    <Route path="*" component={Nopermission}/>
                                </Switch>
                            </Content>
                    </Layout>
                </Layout>
        )
    }
}