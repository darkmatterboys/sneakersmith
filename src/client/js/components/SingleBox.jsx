import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

// const mapStateToProps = store => ({
//   formToggleState: store.posts.formToggleState,
// });

// const mapDispatchToProps = dispatch => ({
//   toggleForm: (event) => {
//     dispatch(actions.toggleForm(event));
//   },
//   togglePopup: (event) => {
//     dispatch(actions.togglePopup(event));
//   },
// });
class SingleBox extends Component {
  render() {
    const { imgurl, user, title, price, key, showPopup } = this.props.content;
    const { togglePopup } = this.props;
    const popupContent = this.props.content;
    console.log(this.props.content);
    //console.log('pop up content: ', content);
    const popupDisplay = [];
    if (showPopup) {
      // console.log(showPopup);
      popupDisplay.push(<Popup text="Close Me" togglePopup={togglePopup} allProps={popupContent} />);
    }

    return (
      <div className="singleBox">
                {/* <button type="button" className="fas fa-heart"></button> */}
          <button type="button" className="far fa-heart heartbtn"></button>
        <div className="singlebox-img-wrapper">
        {/* uid, title, brand, condition, size, price, imgurl */}
         <img className="imgBox" src={imgurl} alt="shoe-img" />
        </div>
        {/* <h4>imgurl: {this.props.content.imgurl}</h4> */}
        {/* <h4>brand: {this.props.content.brand}</h4> */}
        <div className="singlebox-info-wrapper">
          <h4>{user}</h4>
          <h5>{title}</h5>
          <h5 className="singlebox-price">{'$' + price}</h5>
        </div>
        <div className="singlebox-btn-wrapper">
          <button type="button" className="btn btn-outline-primary singlebox-showdetail-btn" onClick={() => togglePopup(key)}>Show more details</button>
        </div>
        {popupDisplay}
      </div>
    );
  }
}

const Popup = (props) => {
  const { allProps } = props;
  const { user, key, imgurl, brand, title, price, size, condition } = allProps;
  const { togglePopup } = props;

  return (
    <div id="popup-container">
      <div id="popup" class="modal-dial">
        <div id="detail-left">
          <img class="innerImgBox" src={imgurl} />
        </div>
        <div id="detail-right">
          <table id="detail-table">
            <tr>
              <td>User: </td><td>{user}</td>
            </tr>
            <tr>
              <td>Brand:</td><td>{brand}</td>
            </tr>
            <tr>
              <td>Title:</td><td>{title}</td>
            </tr>
            <tr>
              <td>Price:</td><td>{price}</td>
            </tr>
            <tr>
              <td>size:</td><td>{size}</td>
            </tr>
            <tr>
              <td>condition:</td><td>{condition}</td>
            </tr>
          </table>
        </div>
      <button class="btn-lg btn-outline-primary popup-close-btn" type="button" onClick={() => togglePopup(key)}>Back</button></div>
    </div>
  );
};

export default SingleBox;
