import { initialState } from "./initialState";
import Axios from 'axios';
import { API_URL } from '../../src/config.js';

/* selectors */
export const getAll = ({examples}) => examples.data;
export const getOne = ({examples}) => examples.singleMaterial;

/* action name creator */
const reducerName = 'examples';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_SUCCESS_SINGLE = createActionName('FETCH_SUCCESS_SINGLE');
const FETCH_ERROR = createActionName('FETCH_ERROR');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const fetchSuccessSingle = payload => ({ payload, type: FETCH_SUCCESS_SINGLE });

/* thunk creators */
export const fetchPublished = () => {
  return (dispatch, getState) => {

    const state = getState();

    if(!state.examples.data.length && state.examples.loading.active === false){
      dispatch(fetchStarted());

      Axios
        .get(`${API_URL}api/examples`)
        .then(res => {
          dispatch(fetchSuccess(res.data));
        })
        .catch(err => {
          dispatch(fetchError(err.message || true));
        });

    }
  };
};

export const fetchOneMaterial = (id) => {
  return (dispatch, getState) => {
    dispatch(fetchStarted());

    Axios
      .get(`${API_URL}api/examples/${id}`)
      .then(res => {
        dispatch(fetchSuccessSingle(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

/* reducer */
export const reducer = (statePart = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: action.payload,
      };
    }
    case FETCH_SUCCESS_SINGLE: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        singleMaterial: action.payload,
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    default:
      return statePart;
  }
};
