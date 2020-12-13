import React, { Component } from 'react'
import { Result,Button } from 'antd';
import {withRouter} from 'react-router-dom'
import {
    CheckCircleOutlined
} from '@ant-design/icons';
export default class Time extends Component {
    render() {
        console.log(this.props)
        return (
            <Result
                icon={<CheckCircleOutlined style={{color:"rgba(247, 214, 30, 0.979)"}}/>}
                title="预订成功!"
                subTitle=""
            />
        )
    }
}
