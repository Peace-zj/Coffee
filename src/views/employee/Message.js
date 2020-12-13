import React, { Component } from 'react'
import { Input, Table, Tag, Button, Descriptions } from 'antd';
import axios from 'axios'
import {
    ReloadOutlined,
    FileTextOutlined
} from '@ant-design/icons';
const { Search } = Input;

export default class Message extends Component {
    state = {
        dataSource: [],
        detail: true

    }
    msgObj={}
    componentDidMount() {
        axios.get('http://localhost:7777/employee').then(res => {
            this.setState({
                dataSource: res.data
            })
        })
    }
    columns = [
        {
            title: '员工编号',
            dataIndex: 'id',
            align: 'center',
            
        },
        {
            title: '员工姓名',
            dataIndex: 'name',
            align: 'center'
        },
        {
            title: '性别',
            dataIndex: 'sex',
            align: 'center',
            render: (text) => {
                if (text === '男') {
                    return <Tag color={'blue'}>{text}</Tag>
                }
                return <Tag color={'red'}>{text}</Tag>
            }
        },
        {
            title: '年龄',
            dataIndex: 'age',
            align: 'center'
        },
        {
            title: '联系电话',
            dataIndex: 'tel',
            align: 'center'
        },
        {
            title: '查看详情',
            key: 'search',
            align: 'center',
            render: (data) => (
                <Button type="text" onClick={() => { this.handleClick(data.id) }}><FileTextOutlined style={{fontSize:'20px',color:'rgba(247, 214, 30, 0.979)'}}/></Button>
            )
        }
    ];
    //查看详情
    handleClick(id) {
        setTimeout(()=>{
            axios.get(`http://localhost:7777/employee?id=${id}`).then(res=>{
            // console.log(res.data)
                this.msgObj=[...res.data]
                // console.log(this.msgObj[0])
                this.setState({
                    detail: false
                })
            })
        })
    }
    //查看单独的个人信息
    onSearch = value => {
        // console.log(value)
        axios.get(`http://localhost:7777/employee?id=${value}`).then(res => {
            this.setState({
                dataSource: res.data
            })

        })
    }
    render() {
        return (
            <div>
                <div>{
                    this.state.detail ?
                    <div>
                    <Search placeholder="员工编号" onSearch={this.onSearch} style={{ width: 200, marginBottom: '20px' }} allowClear />
                    <ReloadOutlined style={{ float: 'right', fontSize: '20px', color: '#aaa' }} onClick={() => {
                        axios.get(`http://localhost:7777/employee?`).then(res => {
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
                    </div>:
                        <Descriptions
                            column={2}
                            bordered
                            title="个人信息"
                            extra={<Button type="primary" onClick={()=>{
                                this.setState({
                                    detail:true
                                })
                            }}>返回</Button>}
                        >
                            <Descriptions.Item label="姓名">{this.msgObj[0].name}</Descriptions.Item>
                            <Descriptions.Item label="性别">{this.msgObj[0].sex}</Descriptions.Item>
                            <Descriptions.Item label="年龄">{this.msgObj[0].age}</Descriptions.Item>
                            <Descriptions.Item label="学历">{this.msgObj[0].edu}</Descriptions.Item>
                            <Descriptions.Item label="爱好">{this.msgObj[0].hobby}</Descriptions.Item>
                            <Descriptions.Item label="邮箱">{this.msgObj[0].email}</Descriptions.Item>
                            <Descriptions.Item label="联系电话">{this.msgObj[0].tel}</Descriptions.Item>
                            <Descriptions.Item label="联系地址 ">{this.msgObj[0].address}
                                <br />
                            </Descriptions.Item>
                            <Descriptions.Item label="自我评价">{this.msgObj[0].skill}
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                            </Descriptions.Item>
                        </Descriptions>
                }
                </div>
            </div>
        )
    }
}