import React,{Component} from 'react'
import { Row, Col} from 'antd'
import axios from 'axios'
import './table.css'
export default class CoffeeTable extends Component{
    state = {
        data: [],
        current:0
    }
    componentDidMount() {
        axios.get('http://localhost:7777/table').then(res => {
            this.setState({
                data: res.data
            })
        })
    }
    order(id){
        this.setState({
            current:id
        })
    }
    orderNew(id){
        this.setState({
            current:id
        })
    }
    render(){
        return(
            <Row gutter={[16, 24]}>
                    {
                        this.state.data.map(item => {
                            if (item.state) {
                                return (
                                    <Col className="gutter-row" span={6} key={item.id}>
                                        <div onClick={()=>{this.orderNew(item.id)}} className={this.state.current===item.id?'active':'Greenstyle'}>{item.number}</div>
                                    </Col>
                                )
                            }
                            return (
                                <Col className="gutter-row" span={6} key={item.id}>
                                    <div onClick={()=>{this.order()}} className={this.state.current===item.id?'active':'Redstyle'}>{item.number}</div>
                                </Col>
                            )
                        })
                    }
                </Row>
        )
    }
}