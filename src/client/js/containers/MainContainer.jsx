import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navigation from '../components/Navigation';
import PostCreator from './PostCreator';
import PostsList from './PostsList';

const mapStateToProps = store => ({
  isLoggedin: store.posts.isLoggedin,
  username: store.posts.username,
  password: store.posts.password,
  email: store.posts.email,
});

const mapDispatchToProps = dispatch => ({

});

class MainContainer extends Component {
  render() {
    const { loggedInUser } = this.props;
    return (
      <div className="MainContainer">
        {/* <Navigation /> */}
        <PostCreator loggedInUser={loggedInUser} />
        <PostsList loggedInUser={loggedInUser} />
      </div>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
