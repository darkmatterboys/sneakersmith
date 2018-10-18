import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import Form from '../components/Form';

const mapStateToProps = store => ({
  userId: store.posts.userId,
  imgUrl: store.posts.imgUrl,
  title: store.posts.title,
  price: store.posts.price,
  brand: store.posts.brand,
  size: store.posts.size,
  condition: store.posts.condition,
  categories: store.posts.categories,
  filterBy: store.posts.filterBy,
  formToggleState: store.posts.formToggleState,
});

const mapDispatchToProps = dispatch => ({
  createNewListing: (input) => {
    dispatch(actions.createNewListing(input));
  },
  updateSelectedBrand: (event) => {
    dispatch(actions.updateSelectedBrand(event));
  },
  updateSelectedCondition: (event) => {
    dispatch(actions.updateSelectedCondition(event));
  },
  updateSelectedSize: (event) => {
    dispatch(actions.updateSelectedSize(event));
  },
  updatePrice: (event) => {
    dispatch(actions.updatePrice(event));
  },
  updateTitle: (event) => {
    dispatch(actions.updateTitle(event));
  },
  uploadImage: (event) => {
    dispatch(actions.uploadImage(event));
  },
  getFilters: (event) => {
    dispatch(actions.getFilters(event));
  },
  filterProducts: (event) => {
    dispatch(actions.filterProducts(event));
  },
  toggleForm: (event) => {
    dispatch(actions.toggleForm(event));
  },
});

class PostCreator extends Component {
  render() {
    const { formToggleState, createNewListing, toggleForm, updateSelectedBrand, updateSelectedSize, updateSelectedCondition, updateTitle, updatePrice, updateUrl, uploadImage, brand, condition, userId, imgUrl, title, price, size, loggedInUser } = this.props;
    return (
      <div>
        <div id="banner">
          {/* <img  className="banner-image" src="https://cdn.shopify.com/s/files/1/1434/2870/products/IMG_4567_1024x1024.JPG?v=1533897343" ></img> */}
          <div>
            <h1 className="post-heading">BUY AND SELL SNEAKERS</h1>
          </div>
        </div>
        <div>
          <div>
            <nav className="post-button-containers">
              <div>
                <select className="filter-buttons" onChange={event => getFilters(event)}>
                  <option value="Filter"> Filter </option>
                  <option value="brand">brand</option>
                  {/* <option>size</option> */}
                  <option value="condition">condition</option>
                  <option value="size">size</option>
                </select>
                <select className="filter-buttons" onChange={event => filterProduct(event)}>
                  <option value="Filter By"> Filter By </option>
                  {/* {options} */}
                </select>
              </div>
              <button type="button" className="post-button" onClick={toggleForm}>Post</button>
            </nav>
          </div>
          {formToggleState
            ? (
              <Form
                createNewListing={createNewListing}
                toggleForm={toggleForm}
                updateSelectedBrand={updateSelectedBrand}
                updateSelectedSize={updateSelectedSize}
                updateSelectedCondition={updateSelectedCondition}
                updateTitle={updateTitle}
                updatePrice={updatePrice}
                updateUrl={updateUrl}
                uploadImage={uploadImage}
                brand={brand}
                condition={condition}
                size={size}
                price={price}
                title={title}
                userId={userId}
                imgUrl={imgUrl}
                loggedInUser={loggedInUser}
              />
            ) : null
          }
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostCreator);
