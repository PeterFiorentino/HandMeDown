import React from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';

import './App.css';

import PrivateRoute from './Components/PrivateRoute';
import AuthContainer from './Containers/AuthContainer';

import NavBar from './Components/NavBar';
import Home from './Components/Home';
import Wardrobe from './Components/Wardrobe';
import About from './Components/About';
import Garment from './Components/Garment';

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
      const { data } = axios.get("https://handmedown.herokuapp.com/auth/isUserLoggedIn");
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

  renderWardrobe = (routeprops) => {
    return <Wardrobe routeprops={routeprops} user={this.state.user} />
  }

  renderGarment = (routeprops) => {
    return <Garment routeprops={routeprops} user={this.state.user} />
  }

  logoutUser = async () => {
    console.log('logging out user');
    try {
      await axios.get('https://handmedown.herokuapp.com/auth/logout');
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
          <Route path='/user/wardrobe/garment/:id' render={this.renderGarment} />
          <PrivateRoute path='/user/wardrobe' render={this.renderWardrobe} isUserLoggedIn={this.state.isUserLoggedIn} />
          
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
