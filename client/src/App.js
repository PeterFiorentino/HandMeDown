import React from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';

import './App.css';
import AuthContainer from './Containers/AuthContainer'
import NavBar from './Components/NavBar';
import Home from './Components/Home';
import About from './Components/About';

class App extends React.Component {
  state = {
    user: null,
    isUserLoggedIn: false,
    loadingUser: true
  }

  componentDidMount() {
    this.checkUserLoggedIn();
  }

  setUser = (user) => {
    this.setState({
      user: user,
      isUserLoggedIn: true,
      loadingUser: false
    });
  }

  checkUserLoggedIn = async () => {
    try {
      const { data } = axios.get("/auth/isUserLoggedIn");
      this.props.setUser(data.payload);
    } catch (err) {
      if (err.message.includes(401)) {
        this.setState({
          loadingUser: false
        })
      }
    }
    console.log('Checking if user logged in');
  }

  renderAuthContainer = () => {
    const { isUserLoggedIn } = this.state;
    return <AuthContainer isUserLoggedIn={isUserLoggedIn} setUser={this.setUser} />
  }

  logoutUser = async () => {
    console.log('logging out user');
    try {
      await axios.get('/auth/logout');
      this.setState({
        user: null,
        isUserLoggedIn: false
      });
      this.props.history.push('/');
    } catch (err) {
      console.log('ERROR', err);
    }
  }

  render() {
    return (
      <div className="App">
        <NavBar
          user={this.state.user}
          logoutUser={this.logoutUser}
          isUserLoggedIn={this.state.isUserLoggedIn}
        />

        <Switch>
          <Route path='/login' render={this.renderAuthContainer} />
          <Route path='/signup' render={this.renderAuthContainer} />
          <Route path='/about' component={About} />
          <Route path='/' component={Home} />
        </Switch>
      </div>
    );
  }
}

export default App;
