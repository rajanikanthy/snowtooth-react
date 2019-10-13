import React, { Component } from 'react';
<<<<<<< HEAD
import 'antd/dist/antd.css';
import MainLayout from "./container/layout";


class App extends Component {
  render() {
    return (
        <div>
            <MainLayout/>
        </div>
    );
  }
=======
import logo from './logo.svg';
import './App.css';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import InMemoryCache from 'apollo-cache-inmemory';
import HttpLink from 'apollo-link-http';
import LiftDashboard from './components/dashboards/lifts/dashboard';


// const cache = new InMemoryCache();
// const link = new HttpLink({
//   uri: 'http://localhost:3000/'
// })


// const client = new ApolloClient({
//   cache,
//   link
// });

const App = () => {
  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>SnowTooth Mountain Resort</h2>
      </div>
      <LiftDashboard/>
    </div>
  );
>>>>>>> 5cbb1dcaaaeb83d71c043ce547286ef6b1aaf65b
}

export default App;
