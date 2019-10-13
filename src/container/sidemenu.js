import React from 'react';
import {Menu} from 'antd';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import LiftDashboard from "../components/lifts/liftdashboard";
import AppContent from "./AppContent";

const AppMenu = () => {

    return (
        <Router>
            <Menu style={{width: 256}}
                  defaultSelectedKeys={['1']}
                  mode="inline">
                <Menu.Item key="1"> Lifts
                    <Link to='/lifts'>Lifts</Link>
                </Menu.Item>
                <Menu.Item key="2"> Trails
                    <Link to='/tails'>Trails</Link>
                </Menu.Item>
            </Menu>
            <Switch>
                <Route path={'/'}>
                    <LiftDashboard/>
                </Route>
                <Route path={'/lifts'}>
                    <div>Lift Dashboard </div>
                </Route>
                <Route path={'/trails'}>
                    <div>Trails Dashboard</div>
                </Route>
            </Switch>
        </Router>
    )

}

export default AppMenu;