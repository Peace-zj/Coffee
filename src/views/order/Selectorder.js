import React, { Component } from 'react'
import { Input, Table, Tag,Modal} from 'antd';
import {
    DeleteOutlined,
    ReloadOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons';
import axios from 'axios'
const { Search } = Input;
const { confirm } = Modal;

export default class Selectorder extends Component {
    state = {
        dataSource: []

    }
    componentDidMount() {
        axios.get('http://localhost:7777/order').then(res => {
            this.setState({
                dataSource: res.data
            })
        })
    }
    columns = [
        {
            title: '订单号',
            dataIndex: 'id',
            align: 'center'
        },
        {
            title: '顾客姓名',
            dataIndex: 'customerName',
            align: 'center'
        },
        {
            title: '人数',
            dataIndex: 'customerNum',
            align: 'center',
            render: (text) => {
                return <Tag color={'gold'}>{text}人</Tag>
            }
        },
        {
            title: '餐桌号',
            dataIndex: 'tableNumber',
            align: 'center',
            render: (text) => {
                return <Tag color={'blue'}>{text}</Tag>
            }
        },
        {
            title: '预订时间',
            dataIndex: 'time',
            align: 'center',
            render: (text) => {
                return <Tag color={'green'}>{text}</Tag>
            }
        },
        {
            title: '联系电话',
            dataIndex: 'tel',
            align: 'center',
            render: (text) => {
                return <Tag color={'geekblue'}>{text}</Tag>
            }
        },
        {
            title: '移除',
            key: 'delete',
            align: 'center',
            render: (data) => (
                <DeleteOutlined style={{ color: 'red' }} onClick={() => { this.showConfirm(data.id,data.tableNumber) }} />
            ),
        }
    ];
    showConfirm=(id,num)=> {
        confirm({
          title: '确定取消预订?',
          icon: <ExclamationCircleOutlined />,
          okText:'确认',
          cancelText:'取消',
          onOk:()=>{
            axios.delete(`http://localhost:7777/order/${id}`).then(res=>{
                this.setState({
                    dataSource:this.state.dataSource.filter(item=>item.id!==id)
                })
            })
            axios.put(`http://localhost:7777/table/${parseInt(num)}`,{
                number:num,
                state:true,
                stateType:"empty"
            })
          }
        });
      }
    onSearch = value => {
        console.log(value)
        axios.get(`http://localhost:7777/order?customerName=${value}`).then(res => {
            this.setState({
                dataSource: res.data
            })
            
        })
    }
    render() {
        return (
            <div>
                <Search placeholder="顾客姓名" onSearch={this.onSearch} style={{ width: 200, marginBottom: '20px' }} allowClear />
                <ReloadOutlined style={{ float: 'right', fontSize: '20px', color: '#aaa' }} onClick={() => {
                    axios.get(`http://localhost:7777/order?`).then(res => {
                        this.setState({
                            dataSource: res.data
                        })
                    })
                }} />
                <Table columns={this.columns} dataSource={this.state.dataSource} bordered={true}
                    size={'middle'}
                    rowKey={record => record.id} pagination={
                        {
                            pageSize: 5
                        }
                    } />
            </div>
        )
    }
}