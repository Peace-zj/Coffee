import React, { Component } from 'react'
import { Empty } from 'antd';
export default class Tea extends Component {
    render() {
        return (
            <div>
                <Empty description={
                        <span>
                            暂无权限
                        </span>
                    }
                >
                </Empty>
            </div>
        )
    }
}