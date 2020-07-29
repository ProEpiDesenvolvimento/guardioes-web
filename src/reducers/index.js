import { combineReducers } from 'redux';
import user from './user';

const reducers = combineReducers({
  user,
});

const rootReducer = (state, action) => {
  if (action.type === 'RESET_STATE') {
    state = undefined;
  }
  return reducers(state, action);
};

export default rootReducer;
