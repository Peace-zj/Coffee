import React,{Component} from 'react'
import {HashRouter,Route,Switch,Redirect} from 'react-router-dom'
import Login from '../views/login/Login'
import Dashboard from '../views/dashboard/Dashboard'
export default class MRouter extends Component{
    render(){
        return(
            <HashRouter>
                <Switch>
                    <Route path='/login' component={Login} />
                    <Route path='/' render={()=>
                        localStorage.getItem('cookie')?
                        <Dashboard/>:
                        <Redirect to='/login' />
                    }/>
                </Switch>
            </HashRouter>
        )
    }
}