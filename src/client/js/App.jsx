import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import Login from './components/Login';
import Signup from './components/Signup';
import Navigation from './components/Navigation';
import MainContainer from './containers/MainContainer';

// import MoreInfo from "./components/MoreInfo";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      userProfile: { username: '', email: '' },
    };

    this.updateLoggedInStatus = this.updateLoggedInStatus.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
  }

  logoutUser(username) {
    this.setState({ isLoggedIn: false, userProfile: { username: "", email: ""} });
    alert("User logout.");
  }

  updateLoggedInStatus(username, email) {
    this.setState({ isLoggedIn: true, userProfile: { username, email} });
    //const { isLoggedIn } = this.state;
  }

  render() {
    const { isLoggedIn, userProfile } = this.state;
    
    return (
      <BrowserRouter>
        <div>
          <Navigation isLoggedIn={isLoggedIn} logoutUser={this.logoutUser} username={userProfile.username} />
          <Switch>
            <Route path="/login" render={(props) =>
              <Login isLoggedIn={isLoggedIn} updateLoggedInStatus={this.updateLoggedInStatus} />} />
            <Route path="/signup" component={Signup} />
            <Route path="/" component={MainContainer} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
