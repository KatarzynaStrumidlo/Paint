import React from 'react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import { API_URL } from '../../../config';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getOne, fetchOnePainting } from '../../../redux/paintingsRedux';
import { addToCart } from '../../../redux/cartRedux';

import styles from './Painting.module.scss';

const Component = ({ className, painting, fetchOnePainting, addToCart }) => {

  useEffect(() => {
    fetchOnePainting();
  }, []);

  const isInCart = () => {
    painting.inCart === true ? alert('This painting already is in cart') : addToCart(painting);
  };

  return (
    <div className={clsx(className, styles.root)} key={painting.id}>
      <img className={clsx(className, styles.picture)} src={`${API_URL}images/${painting.picture}`} alt='' />
      <div className={clsx(className, styles.description)}>
        <Link className={clsx(className, styles.back)} to={'/paintings'}><ArrowBackIosIcon /></Link>
        <h3 className={clsx(className, styles.title)}>{painting.title}</h3>
        <p className={clsx(className, styles.description)}>{painting.description}</p>
        <p className={clsx(className, styles.price)}>$ {painting.price}</p>
        <Link className={clsx(className, styles.order)} to={'/cart'} onClick={isInCart}>Add to cart</Link>
      </div>
    </div>
  )
};

Component.propTypes = {
  className: PropTypes.string,
};

const mapStateToProps = (state) => ({
  painting: getOne(state),
});

const mapDispatchToProps = (dispatch, props) => ({
  fetchOnePainting: () => dispatch(fetchOnePainting(props.match.params.id)),
  addToCart: (painting) => dispatch(addToCart(painting)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Container as Painting,
  Component as PaintingComponent,
};