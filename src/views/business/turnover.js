import React,{Component} from 'react'
import echarts from "echarts"
import axios from 'axios'
// import _ from 'lodash'
import {Statistic} from 'antd'
export default class Askforleave extends Component{
    state={
        sum:0
    }
    myCoffee_xlist = []
    myCoffee_ylist = []
    myMilkyTea_xlist = []
    myMilkyTea_ylist = []
    myTea_xlist = []
    myTea_ylist = []
    allkinds_xlist = []
    allkinds_ylist = []
    myCoffee = null
    myMilkyTea = null
    myTea = null
    allkinds = null
    coffeeSum = 0
    milkyTeaSum = 0
    teaSum = 0

    componentDidMount() {
        axios.get("http://localhost:7777/Menu").then(res => {
            console.log(Object.values(res.data[0])[0])
            console.log(Object.keys(res.data[0])[0])
            
            res.data.forEach(item=>{
                this.allkinds_xlist.push(Object.keys(item)[0])
                // console.log(this.allkinds_xlist)
            })
            Object.values(res.data[0])[0].forEach(item=>{
                this.myCoffee_xlist.push(item.name)
                this.myCoffee_ylist.push(item.num)
                this.coffeeSum += item.num
                //  console.log(this.myCoffee_ylist)
            })
            Object.values(res.data[1])[0].forEach(item=>{
                this.myMilkyTea_xlist.push(item.name)
                this.myMilkyTea_ylist.push(item.num)
                //  console.log(this.myCoffee_ylist)
                this.milkyTeaSum += item.num

            })
            Object.values(res.data[2])[0].forEach(item=>{
                this.myTea_xlist.push(item.name)
                this.myTea_ylist.push(item.num)
                this.teaSum += item.num
                //  console.log(this.myCoffee_ylist)
            })
            this.setState({
                sum:this.teaSum+this.milkyTeaSum+this.coffeeSum
            })
            // console.log(this.coffeeSum,this.milkyTeaSum,this.teaSum)
            this.renderEchart()
        })

        window.onresize = ()=>{
            // console.log(11)
            this.myCoffee && this.myCoffee.resize()
            this.myMilkyTea && this.myMilkyTea.resize()
            this.myTea && this.myTea.resize()
            this.allkinds && this.allkinds.resize()
        }
    }

    componentWillUnmount(){
        window.onresize = null
    }

    renderEchart() {
        this.myCoffee = echarts.init(document.getElementById('coffee'));
        this.allkinds = echarts.init(document.getElementById('allkinds'));
        this.myMilkyTea = echarts.init(document.getElementById('MilkyTea'));
        this.myTea = echarts.init(document.getElementById('Tea'));
        // 指定图表的配置项和数据
        var Coffee_option = {
            title: {
                text: '咖啡'
            },
            tooltip: {},
            xAxis: {
                data: this.myCoffee_xlist,
                axisLabel:{
                    
                    rotate:30 //旋转
                }
            },
            yAxis: {
                minInterval: 20
            },
            series: [{
                name: '数量',
                type: 'bar',
                data: this.myCoffee_ylist,
                itemStyle: {
                    normal: {
                        color: function (params) {
                            var colorList = [
                                '#363636', '#555', '#707070', '#898989',
                                '#A0A0A0', '#B7B7B7','#C2C2C2', '#D7D7D7'
                            ]
                            return colorList[params.dataIndex]
                        }
                    }
                }, //不同柱颜色不一样
            }]
        };
        var MilkyTea_option = {
            title: {
                text: '奶茶'
            },
            tooltip: {},
            xAxis: {
                data: this.myMilkyTea_xlist,
                axisLabel:{
                    
                    rotate:40 //旋转
                }
            },
            yAxis: {
                minInterval: 20
            },
            series: [{
                name: '数量',
                type: 'bar',
                data: this.myMilkyTea_ylist,
                itemStyle: {
                    normal: {
                        color: function (params) {
                            var colorList = [
                                 '#211511','#2D1E69', '#322275',
                                '#3A2885', '#511F90','#635BA2', '#8273BD','A098C4'
                            ]
                            return colorList[params.dataIndex]
                        }
                    }
                }, //不同柱颜色不一样
            }]
        };
        var Tea_option = {
            title: {
                text: '茶'
            },
            tooltip: {},
            xAxis: {
                data: this.myTea_xlist,
                axisLabel:{
                    
                    rotate:30 //旋转
                }
            },
            yAxis: {
                minInterval: 20
            },
            series: [{
                name: '数量',
                type: 'bar',
                data: this.myTea_ylist,
                itemStyle: {
                    normal: {
                        color: function (params) {
                            var colorList = [
                                '#103667', '#184785', '#1B4F93', '#205AA7',
                                '#426EB4', '#7388C1','#94AAD6', '#BFCAE6'
                            ]
                            return colorList[params.dataIndex]
                        }
                    }
                }, //不同柱颜色不一样
            }]
        };
        var Allkinds_option = {
            title: {
                text: '各类饮品销售量',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: this.allkinds_xlist
            },
            series: [
                {
                    name: '饮品种类',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: [
                        {value: this.coffeeSum, name:this.allkinds_xlist[0]},
                        {value: this.milkyTeaSum, name: this.allkinds_xlist[1]},
                        {value: this.teaSum, name:this.allkinds_xlist[2]}
                    ],
                    itemStyle: {
                        normal: {
                            color: function (params) {
                                var colorList = [
                                     '#D7D7D7','#A098C4', '#426EB4','#7388C1','#94AAD6',
                                    '#3A2885', '#511F90','#635BA2', '#8273BD','A098C4'
                                ]
                                return colorList[params.dataIndex]
                            }
                        }
                    },
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        
        this.myCoffee.setOption(Coffee_option);
        this.myMilkyTea.setOption(MilkyTea_option);
        this.myTea.setOption(Tea_option);
        this.allkinds.setOption(Allkinds_option);
    }

    render() {
        return (
            <div style={{display:"flex",flexWrap:'wrap'}}>
                <div id="allkinds" style={{ width: "300px", height: '230px' }}></div>
                <div id="coffee" style={{ width: "300px", height: '230px' }}></div>
                <Statistic title="今日总销售量" value={this.state.sum} />
                <div id="MilkyTea" style={{ width: "300px", height: '230px' }}></div>
                <div id="Tea" style={{ width: "350px", height: '230px' }}></div>
            </div>
        )
    }
}