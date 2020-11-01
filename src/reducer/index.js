import { combineReducers } from 'redux';
import device from './device';

const rootReducer = combineReducers({
  device
});

export default (state, action) => {
  return rootReducer(state, action);
};
