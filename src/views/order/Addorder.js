import React, { Component } from 'react'
import { Steps, Button, Form, Input, Select, TimePicker,Row, Col ,Result,Spin} from 'antd';
import { UserOutlined, PhoneOutlined,CheckCircleOutlined } from '@ant-design/icons';
import './addOrder.css'
import '../table/table.css'
import axios from 'axios'
// import moment from 'moment'
const { Option } = Select;
const sty = { border: '1px solid rgb(0,0,0)', background: 'rgba(247, 214, 30, 0.979)', color: '#000', fontSize: '15px' }
const preSty = { border: '1px solid rgba(247, 214, 30, 0.979)', background: '#000', color: '#fff', margin: '0 8px', fontSize: '15px' }
const { Step } = Steps;
const format = 'HH:mm';
export default class Addorder extends Component {
    state = {
        current: 0,
        data: [],
        crt:0,
        spinning:false,
        flag:0  //back回来后flag=1,button清空
    }
    obj = {}
    AddRef = React.createRef()
    componentDidMount() {
        axios.get('http://localhost:7777/table').then(res => {
            this.setState({
                data: res.data
            })
        })
    }
    order(id){
        this.setState({
            crt:id
        })
    }
    orderNew(id,number){
        this.setState({
            crt:id
        })
        this.obj.tableNumber=number
    }
    next() {
        this.setState({
            current: this.state.current + 1
        })
        // console.log(this.AddRef)
        if(this.state.current===1){
            this.AddRef.current.validateFields().then(value => {
                this.obj.customerName=value.nm
                this.obj.customerNum=value.dateNum
                this.obj.tel=value.tel
                this.AddRef.current.resetFields()
                this.setState({
                    spinning:true
                })
            })
        }
    }
    prev() {
        this.setState({
            current: this.state.current - 1
        })
    }
    back() {
        this.setState({
            current: 0,
            flag:1
        })
        
            setTimeout(()=>{
                axios.post('http://localhost:7777/order',this.obj).then(res=>{
                    console.log(res.data)
                    this.obj=null
                })   
                axios.put(`http://localhost:7777/table/${parseInt(this.obj.tableNumber)}`,{
                    number:this.obj.tableNumber,
                    state:false,
                    stateType:"order"
                }).then(res=>{
                    console.log(res.data)
                })        
            },0)
        

    }
    onChange(time, timeString) {
        this.obj.time=timeString
      }
    render() {
        return (
            <div style={{ position: 'relative' }}>
                <Steps current={this.state.current}>
                    <Step title='餐台编号' />
                    <Step title='顾客信息' />
                    <Step title='提交信息' />
                </Steps>
                <div className="steps-content">
                    <div className={this.state.current === 0 ? '' : 'hidden'}>
                        <Row gutter={[16, 24]}>
                            {
                                this.state.data.map(item => {
                                    if (item.state) {
                                        return (
                                            <Col className="gutter-row" span={6} key={item.id}>
                                                <div onClick={() => { this.orderNew(item.id,item.number) }} className={this.state.crt === item.id && this.state.flag===0? 'active' : 'Greenstyle'}>{item.number}</div>
                                            </Col>
                                        )
                                    }
                                    return (
                                        <Col className="gutter-row" span={6} key={item.id}>
                                            <div onClick={() => { this.order() }} className={this.state.crt === item.id ? 'active' : 'Redstyle'}>{item.number}</div>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    </div>
                    <div className={this.state.current === 1 ? '' : 'hidden'}>
                        <Form name="control-hooks"
                            ref={this.AddRef}
                            style={{ width: '600px', marginBottom: '70px' }}>
                            <Form.Item name="nm" label="顾客姓名" rules={[{ required: true}]}>
                                <Input placeholder="Username" prefix={<UserOutlined />} name='nm' />
                            </Form.Item>
                            <Form.Item name="dateTime" label="预约时间"
                            rules={[{ required: true}]}>
                                <TimePicker
                                    onChange={(time, timeString)=>(this.onChange(time, timeString))}
                                    name='dateTime'
                                    showNow={false}
                                    style={{ width: '518px' }}
                                    format={format} />
                            </Form.Item>
                            <Form.Item name="tel" label="联系电话" rules={[{ required: true}]}>
                                <Input placeholder="Tel" prefix={<PhoneOutlined />} name='Tel' />
                            </Form.Item>
                            <Form.Item name="dateNum" label="预约人数" rules={[{ required: true }]}>
                                <Select name='dateNum'>
                                    <Option key='1'>1人</Option>
                                    <Option key='2'>2人</Option>
                                    <Option key='3'>3人</Option>
                                    <Option key='4'>4人</Option>
                                </Select>
                            </Form.Item>
                        </Form>
                    </div>
                    <div className={this.state.current === 2 ? '' : 'hidden'}>
                        {
                            this.state.loading? 
                            <Spin spinning={this.state.loading} size={"large"}></Spin>:
                            <Result
                                icon={<CheckCircleOutlined style={{color:"rgba(247, 214, 30, 0.979)"}}/>}
                                title="预订成功!"
                                subTitle=""
                            />
                        }
                    </div>
                </div>
                <div className="steps-action"
                >
                    {this.state.current < 2 && (
                        <Button style={sty} onClick={() => this.next()}>
                            Next
                        </Button>
                    )}
                    {this.state.current === 2 && (
                        <Button style={sty} onClick={() => this.back()}>
                            Back
                        </Button>
                    )}
                    {this.state.current === 1 && (
                        <Button style={preSty} onClick={() => this.prev()}>
                            Prev
                        </Button>
                    )}
                </div>
            </div>
        )
    }
}