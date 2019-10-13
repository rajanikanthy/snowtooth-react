import React from 'react';
import { Layout, Card, Menu } from "antd";
import MainHeader from './header';
import './mainlayout.css';
import AppFooter from "./footer";
import AppMenu from "./sidemenu";
import AppContent from "./AppContent";
import { BrowserRouter as Router, Link, Route, Switch, NavLink } from "react-router-dom";
import { withRouter } from 'react-router';
import LiftDashboard from "../components/lifts/liftdashboard";
import TrailDashboard from "../components/trails/traildashboard";
import { ApolloProvider } from 'react-apollo';
import ApolloClient, { gql } from 'apollo-boost';

const { Header, Sider, Content, Footer } = Layout

const client = new ApolloClient({ uri: 'http://snowtooth.herokuapp.com/' })

export const LIFT_ROOT_QUERY = gql `
{
    allLifts {
        id
        name
        status
        capacity
        night
        elevationGain
    }
}
`;

export const TRAILS_ROOT_QUERY = gql`
    {
        allTrails {
        id
        name
        status
        difficulty
        groomed
        trees
        night
        accessedByLifts {
        name
        }
    }
}`;


export const UPDATE_LIFT_STATUS = gql`
    mutation setLifStatus($liftId: ID!, $liftStatus: LiftStatus!) {
        setLiftStatus(id: $liftId, status: $liftStatus) {
            id
            name
            status
        }
}`;



const MainLayout = (props) => {

    const onSelectHandler = (args) => {
        console.log(args);
    }

    const routes = [
        {
            path: "/",
            exact: true,
            sidebar: () => <LiftDashboard />
        }, {
            path: "/lifts",
            sidebar: () => <LiftDashboard />
        }, {
            path: "/trails",
            sidebar: () => <TrailDashboard />
        }
    ]

  

    return (
        <ApolloProvider client={client}>
            <Router>
                <Layout>
                    <Header><MainHeader /></Header>
                    <Layout>
                        <Sider>
                            <Menu
                                onSelect={onSelectHandler}
                                mode="inline">
                                <Menu.Item key="lifts">
                                    <Link to='/lifts'>Lifts</Link>
                                </Menu.Item>
                                <Menu.Item key="trails">
                                    <Link to='/trails'>Trails</Link>
                                </Menu.Item>
                            </Menu>

                        </Sider>
                        <Content>
                            <Router>
                                <Card style={{ textAlign: 'center' }}>
                                    {
                                        routes.map((route, index) => (
                                            <Route
                                                key={index}
                                                path={route.path}
                                                exact={route.exact}
                                                component={route.sidebar} />
                                        ))
                                    }
                                </Card>
                            </Router>
                        </Content>
                    </Layout>

                    <Footer><AppFooter /></Footer>
                </Layout>
            </Router>
        </ApolloProvider>


    );
}

export default MainLayout;