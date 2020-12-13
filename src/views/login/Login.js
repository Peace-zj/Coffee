import React, { Component } from 'react'
import Particles from "react-tsparticles";
import './Login.css'
import { Form, Input, Button,message} from 'antd';
import axios from 'axios'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
export default class Login extends Component {
    state={
        height:'0px'
    }
    componentDidMount(){
        this.setState({
            height:document.documentElement.clientHeight-6+'px'
        })
    }
    onFinish = values => {
        // console.log('Received values of form: ', values);
        // console.log(typeof localStorage.getItem("cookie"))
        // let {roleType} = localStorage.getItem("cookie")
        // console.log(roleType)
        axios.get(`http://localhost:7777/users?username=${values.username}&password=${values.password}`).then(res=>{
            console.log(res.data)
            if(res.data.length===0){
                message.error('用户名或密码错误')
            }else{
                localStorage.setItem("cookie", JSON.stringify(res.data[0]))
                this.props.history.push('/')
            }
        })
    };
    render() {
        return (
            <div>
                <h1 className='CH'>Coffee     House</h1>
                <Particles id="tsparticles" height={this.state.height} options={{
                    "background": {
                        "color": {
                            "value": "rgb(0,0,0)"
                        },
                        "position": "50% 50%",
                        "repeat": "no-repeat",
                        "size": "cover"
                    },
                    "fpsLimit": 60,
                    "interactivity": {
                        "events": {
                            "onClick": {
                                "enable": true,
                                "mode": "push"
                            },
                            "onHover": {
                                "enable": true,
                                "mode": "grab",
                                "parallax": {
                                    "enable": true,
                                    "force": 60
                                }
                            }
                        },
                        "modes": {
                            "bubble": {
                                "distance": 400,
                                "duration": 2,
                                "opacity": 0.8,
                                "size": 40
                            },
                            "grab": {
                                "distance": 400
                            }
                        }
                    },
                    "particles": {
                        "color": {
                            "value": "#ffffff"
                        },
                        "links": {
                            "color": {
                                "value": "#ffffff"
                            },
                            "distance": 150,
                            "enable": true,
                            "opacity": 0.4
                        },
                        "move": {
                            "attract": {
                                "rotate": {
                                    "x": 600,
                                    "y": 1200
                                }
                            },
                            "enable": true,
                            "outModes": {
                                "bottom": "out",
                                "left": "out",
                                "right": "out",
                                "top": "out"
                            }
                        },
                        "number": {
                            "density": {
                                "enable": true
                            }
                        },
                        "opacity": {
                            "random": {
                                "enable": true
                            },
                            "value": 0.5,
                            "animation": {
                                "enable": true,
                                "minimumValue": 0.1,
                                "speed": 3
                            }
                        },
                        "shape": {
                            "options": {
                                "polygon": {
                                    "nb_sides": 5
                                },
                                "star": {
                                    "nb_sides": 5
                                },
                                "image": {
                                    "src": "https://cdn.matteobruni.it/images/particles/github.svg",
                                    "width": 100,
                                    "height": 100
                                },
                                "images": {
                                    "src": "https://cdn.matteobruni.it/images/particles/github.svg",
                                    "width": 100,
                                    "height": 100
                                }
                            }
                        },
                        "size": {
                            "random": {
                                "enable": true
                            },
                            "value": 10,
                            "animation": {
                                "enable": true,
                                "minimumValue": 0.1,
                                "speed": 20
                            }
                        },
                        "stroke": {
                            "color": {
                                "value": "#000000",
                                "animation": {
                                    "enable": false,
                                    "speed": 1,
                                    "sync": true
                                }
                            }
                        }
                    }
                }}
                />
                <div className="loginForm">
                    <Form
                        name="normal_login"
                        className='ffff'
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Please input your Username!' }]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                        </Button>
                        </Form.Item>
                    </Form>
                </div>

            </div>
        )
    }
}