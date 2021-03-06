import React from 'react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { API_URL } from '../../../config';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll, fetchAllPaintings } from '../../../redux/paintingsRedux';

import styles from './AllPaintings.module.scss';

const Component = ({ className, allPantings, fetchPaintings, loading }) => {

  useEffect(() => {
    fetchPaintings();
  }, [fetchPaintings]);

  if(loading.active) return (<div>Loading...</div>)
  else {
  return (<div className={clsx(className, styles.root)}>
    {allPantings.map(item => (<div className={clsx(className, styles.ad)} key={item._id}>
    <Link to={`/painting/${item._id}`}><img className={clsx(className, styles.picture)} src={`${API_URL}images/${item.picture}`} alt=''/></Link>
      <Link className={clsx(className, styles.info)} to={`/painting/${item._id}`}>
        <h6 className={clsx(className, styles.name)}>{item.title}</h6>
        <p className={styles.price}>$ {item.price}</p>
      </Link>
    </div>))}
  </div>)
  }
};

Component.propTypes = {
  className: PropTypes.string,
  allPantings: PropTypes.arrayOf(PropTypes.object),
  fetchPaintings: PropTypes.func,
  loading: PropTypes.object,
};

const mapStateToProps = state => ({
  allPantings: getAll(state),
  loading: state.paintings.loading
});

const mapDispatchToProps = dispatch => ({
  fetchPaintings: () => dispatch(fetchAllPaintings()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Container as AllPaintings,
  Component as AllPantingsComponent,
};
