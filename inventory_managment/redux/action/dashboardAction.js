import axios from 'axios';

// Action Types
export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';


import { fetchDataRequest, fetchDataSuccess, fetchDataFailure } from '../slices/dashboardSlice';

export const fetchData = (urls) => async (dispatch) => {
  dispatch(fetchDataRequest());
  
  try {
    const responses = await Promise.all(urls.map(url => axios.get(url)));

    const data = responses.map(response => {
      if (response.status !== 200) {
        throw new Error(`Failed to fetch data from ${response.config.url}`);
      }
      return response.data;
    });

    dispatch(fetchDataSuccess(data));
  } catch (error) {
    dispatch(fetchDataFailure(error.message));
  }
};

