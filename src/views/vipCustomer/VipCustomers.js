import React, { Component } from 'react'
// import './vip.css'
import { Table, Modal, Button, Form, Input,Radio, Popconfirm, Tag} from 'antd';
import {
    EditOutlined,
    DeleteOutlined,
    UserOutlined,
    PhoneOutlined
} from '@ant-design/icons';
import axios from 'axios'
export default class VipCustomers extends Component {
    state = {
        dataSource: [],
        visibleAdd: false,
        visibleUpdate:false,
        visibleDel:false,
        loading:false,
        sex:'男',
        level:'level 1',
        crt:0,
    }
    addRef = React.createRef()
    updateRef = React.createRef()
    current=null
    columns = [
        {
            title: '用户名字',
            dataIndex: 'name',
            align:'center',
            render: text => <b>{text}</b>,
        },
        {
            title: '性别',
            dataIndex: 'sex',
            align:'center',
            render:(text)=>{
                if(text==='男'){
                    return <Tag color={'blue'}>{text}</Tag> 
                }
                return <Tag color={'pink'}>{text}</Tag>
            }
        },
        {
            title: '余额',
            dataIndex: 'account',
            align:'center',
            render: (text) => {
                return <div>￥{text}.00</div>
            }
        },
        {
            title: '会员等级',
            dataIndex: 'level',
            align:'center',
            render: (text) => {
                let arr=['gold','blue','green']
            return <Tag color={arr[text-1]}>LEVEL {text}</Tag>
            }
        },
        {
            title: '联系电话',
            dataIndex: 'tel',
            align:'center',
        },
        {
            title: '修改',
            key: 'edit',
            align:'center',
            render: (data) => (
                    <EditOutlined style={{color:'rgba(247, 214, 30, 0.979)'}}onClick={()=>{this.handleUpdate(data)}} />
            ),
        },
        {
            title: '移除',
            align:'center',
            render: (data) => {
                return <Popconfirm title="Are you sure？" okText="Yes" cancelText="No"
                visible={this.state.crt===data.id?true:false}
                onConfirm={()=>{this.handleDelete(data.id)}}
                onCancel={()=>{
                    this.setState({
                        crt:0
                    })
                  }
                }>
                        <DeleteOutlined onClick={()=>{
                            this.setState({
                                crt:data.id
                            })
                          }
                        }
                        style={{color:'red'}} />   
                </Popconfirm>
            },
        }
    ];
    componentDidMount() {
        axios.get('http://localhost:7777/vipCustomer').then(res => {
            this.setState({
                dataSource: res.data
            })
        })
    }

    handleDelete(id){
        console.log(id)
        this.setState({
            loading:true
        })
        axios.delete(`http://localhost:7777/vipCustomer/${id}`).then(()=>{
            setTimeout(()=>{
                this.setState({
                    dataSource:this.state.dataSource.filter(item=>item.id!==id),
                    loading:false,
                    crt:0
                })
            },500)
        })
    }
    updateOk(){
        this.updateRef.current.validateFields().then(data=>{
            axios.put(`http://localhost:7777/vipCustomer/${this.current.id}`,{
                ...this.current,
                ...data
            }).then(res=>{
                this.setState({
                    dataSource:this.state.dataSource.map(item=>{
                        if(item.id===this.current.id){
                            return {
                                ...this.current,
                                ...data
                            }
                        }
                        return item
                    }),
                    visibleUpdate:false

                })
            })
        })
    }
    handleUpdate(data){
        this.current=data
        console.log(data)
        setTimeout(()=>{
            this.setState({
                visibleUpdate:true
            })
            this.updateRef.current.setFieldsValue({
                name:data.name,
                account:data.account,
                tel:data.tel
            })
        },0)
    }
    handleOk(){
        // console.log(this.addRef.current)
        this.addRef.current.validateFields().then(data=>{
            return data
        }).catch(err=>{
            console.log(err)
        }).then(value=>{
            axios.post('http://localhost:7777/vipCustomer',value).then(res=>{
                this.setState({
                    dataSource:[...this.state.dataSource,res.data],
                    visibleAdd:false
                })
            })
            this.addRef.current.resetFields()
        })
    }
    render() {
        return (
            <div>
                <Button style={{ background: '#000', border: '1px solid rgba(247, 214, 30, 0.979)', color: '#fff', marginBottom: '10px' }} onClick={() => {
                    this.setState({
                        visibleAdd: true,
                        sex:'男'
                    })
                }}>新的VIP</Button>
                <Modal
                    title="新的VIP"
                    visible={this.state.visibleAdd}
                    onOk={()=>{this.handleOk()}}
                    onCancel={() => {
                        this.setState({
                            visibleAdd: false
                        })
                    }}
                    width={350}
                >
                    <Form name="control-hooks" 
                    ref={this.addRef}>
                        <Form.Item name="name" label="姓名" rules={[{ required: true }]}>
                            <Input prefix={<UserOutlined />} placeholder="username"/>
                        </Form.Item>
                        <Form.Item name="sex" label="性别" rules={[{ required: true }]}>
                            <Radio.Group onChange={(ev)=>{
                                this.setState({
                                    sex:ev.target.value
                                })
                            }} value={this.state.sex}>
                                <Radio value='男' key='male'>男</Radio>
                                <Radio value='女' key='female'>女</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item name="account" label="充值金额" rules={[{ required: true }]}>
                            <Input prefix="￥" suffix="RMB"/>
                        </Form.Item>
                        <Form.Item name="level" label="会员等级" rules={[{ required: true }]}>
                            <Radio.Group onChange={(ev)=>{
                                this.setState({
                                    level:ev.target.value
                                })
                            }} value={this.state.level}>
                                <Radio key='one' value={1}>LEVEL 1</Radio>
                                <Radio key='two' value={2}>LEVEL 2</Radio>
                                <Radio key='third' value={3}>LEVEL 3</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item name="tel" label="联系电话" rules={[{ required: true }]}>
                            <Input prefix={<PhoneOutlined />} placeholder="Tel"/>
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal
                    title="VIP用户信息修改"
                    visible={this.state.visibleUpdate}
                    onOk={()=>{this.updateOk()}}
                    onCancel={() => {
                        this.setState({
                            visibleUpdate: false
                        })
                    }}
                    width={350}
                >
                    <Form
                    layout='vertical' 
                    name="control-hooks" 
                    ref={this.updateRef}>
                        <Form.Item name="name" label="姓名" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="account" label="充值金额" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="tel" label="联系电话" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
                <Table columns={this.columns} 
                loading={this.state.loading} 
                dataSource={this.state.dataSource} 
                pagination={{
                    pageSize: 5
                }
                } 
                rowKey={record => record.id} 
                size={"middle"}
                />
            </div>
        )
    }
}