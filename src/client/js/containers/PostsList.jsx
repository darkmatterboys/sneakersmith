import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import SingleBox from '../components/SingleBox';

const mapStateToProps = store => ({
  listings: store.posts.listings,
  showPopup: store.posts.showPopup,
});

const mapDispatchToProps = dispatch => ({
  togglePopup: (postId) => {
    dispatch(actions.togglePopup(postId));
  },
  getListing: () => {
    dispatch(actions.getListing());
  },
});

class PostsList extends Component {

  componentDidMount() {
    const { getListing } = this.props;
    getListing();
  }

  render() {
    // this.props.getListing();
    let { listings, showPopup, togglePopup, loggedInUser } = this.props;
    console.log('user obj ', loggedInUser);
    let listingPosts = listings.map((element) =>{
      return (
        <SingleBox key={element.key} showPopup={showPopup} content={element} togglePopup={togglePopup} />
      );
    });

    return(
      <div class="lists-containers">
        { listingPosts }
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsList);
