import React, { Component } from 'react'
import { Row, Col, Divider, Tag, Popover,Button,Modal } from 'antd';
import axios from 'axios';
import {
    ExclamationCircleOutlined
} from '@ant-design/icons';
const { confirm } = Modal;
const Redstyle = { background: 'rgba(0,0,0)', padding: '8px 0', textAlign: 'center', color: '#fff', fontSize: '14px' };
const Greenstyle = { background: 'rgba(226, 204, 80, 0.979)', padding: '8px 0', textAlign: 'center', color: '#fff', fontSize: '14px' };
const secStyle = {background: 'rgba(0,0,0)',color:'#fff',height:'25px',fontSize:'10px',border:'none'}
const firStyle = {background: '#fff',color:'#000',height:'25px',fontSize:'10px',border:'1px solid #ccc',marginRight:'10px'}
const contentEmpty = (
    <div>
      <Tag color={'green'}>此座位尚且为空</Tag>
      <Button style={firStyle}>预订</Button>
      <Button style={secStyle}>点单</Button>
    </div>
  );
  
  const contentOccupied = (
    <div>
      <Tag color={'red'}>客人正在用餐</Tag>
      <Button style={firStyle}>点单</Button>
      <Button style={secStyle}>结算</Button>
    </div>
  );
export default class Table extends Component {
    state = {
        data: []
    }
    currentId = 0
    contentOrder = (
        <div>
          <Tag color={'orange'}>此座位已被预订</Tag>
          {/* <Button style={secStyle} onClick={()=>{this.cancelOrder()}}>取消预订</Button> */}
        </div>
      );
    //   cancelOrder(){
    //     confirm({
    //         title: '确定取消预订?',
    //         icon: <ExclamationCircleOutlined />,
    //         okText:'确认',
    //         cancelText:'取消',
    //         onOk:()=>{
    //           axios.delete(`http://localhost:7777/order/${this.currentId}`).then(res=>{
    //               this.setState({
    //                   dataSource:this.state.dataSource.filter(item=>item.id!==this.currentId)
    //               })
    //           })
    //           axios.put(`http://localhost:7777/table/${this.currentId}`,{
    //             number:`${this.currentId}号餐桌`,
    //             state:true,
    //             stateType:"empty"
    //         })
    //         }
    //       });  
    //   }
    componentDidMount() {
        axios.get('http://localhost:7777/table').then(res => {
            this.setState({
                data: res.data
            })
        })
    }
    render() {
        return (
            <div>
                <Divider orientation="center" style={{fontSize:'25px',fontWeight:'800'}}>餐台使用情况</Divider>
                <div style={{ textAlign: "right", marginBottom: '15px' }}>
                    <Tag color="rgba(226, 204, 80, 0.979)">无人</Tag>
                    <Tag color="rgba(0,0,0)">有人</Tag>
                </div>
                <Row gutter={[24, 32]}>
                    {
                        this.state.data.map(item => {
                            if (item.state) {
                                return (
                                    <Col className="gutter-row" span={6} key={item.id}>
                                        <Popover content={(props)=>contentEmpty} title="餐台使用情况" onVisibleChange={()=>this.currentId=item.id}>
                                        <div style={Greenstyle}>{item.number}</div>
                                        </Popover>
                                    </Col>
                                )
                            }
                            return (
                                <Col className="gutter-row" span={6} key={item.id}>
                                    <Popover content={item.stateType==='occupied'?contentOccupied:this.contentOrder} title="餐台使用情况" onVisibleChange={()=>this.currentId=item.id}>
                                        <div style={Redstyle}>{item.number}</div>
                                    </Popover>
                                </Col>
                            )
                        })
                    }
                </Row>
            </div>
        )
    }
}