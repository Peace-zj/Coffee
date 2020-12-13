import React,{Component} from 'react'
import { Table, Tag,Divider,Tooltip } from 'antd';
import {
    EditOutlined
} from '@ant-design/icons';
import Axios from 'axios';


export default class Coffee extends Component{
    state={
        dataSource:[]
    }
    columns = [
        {
          title: '饮品名',
          dataIndex: 'name',
          align:'center',
          render: text => <b>{text}</b>,
        },
        {
          title: '图片',
          dataIndex: 'img',
          align:'center',
          render: text => <img src={text} alt="" style={{width:'20px',height:'20px'}}/>,
        },
        {
          title: '热',
          dataIndex: 'hot',
          align:'center',
          render:(text)=>{
              if(text==='/'){
                  return text 
              }
              return <Tag color={'gold'}>￥{text}.00</Tag>
          }
        },
        {
          title: '冰',
          dataIndex: 'ice',
          align:'center',
          render:(text)=>{
              if(text==='/'){
                  return text 
              }
              return <Tag color={'blue'}>￥{text}.00</Tag>
          }
        },
        {
          title: '壶',
          dataIndex: 'pot',
          align:'center',
          render:(text)=>{
              if(text==='/'){
                  return text 
              }
              return <Tag color={'green'}>￥{text}.00</Tag>
          }
        },
        {
          title: '售卖',
          dataIndex: 'stateType',
          align:'center',
          render:(text)=>{
              if(text==='售罄'){
                  return <Tag color={'red'}>{text}</Tag>
              }
              return <Tag color={'geekblue'}>{text}</Tag>
          }
        },
        {
          title: '编辑',
          key: 'action',
          align:'center',
          render: (data) => (
            <Tooltip placement="topLeft" title="此功能暂未开发哟">
            <EditOutlined style={{color:'rgba(247, 214, 30, 0.979)'}} onClick={()=>{this.handleEdit(data)}}/>
        </Tooltip>
          ),
        },
      ];
    handleEdit(){

    }
    componentDidMount(){
        Axios.get('http://localhost:7777/Menu').then(res=>{
            this.setState({
                dataSource:res.data[1].milkyTea
            })
        })
    }
    render(){
        return(
            <div>
                <Divider orientation="left" style={{fontSize:'25px',fontWeight:'800'}}>奶茶价格表</Divider>
                <Table columns={this.columns} dataSource={this.state.dataSource} bordered={true} 
                size={'middle'}
                rowKey={record=>record.id} pagination={
                    {
                        pageSize:5
                    }
                }/>
            </div>
        )
    }
}