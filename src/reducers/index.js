import { combineReducers } from 'redux';

const reducers = combineReducers({
});

const rootReducer = (state, action) => {
  if (action.type === 'RESET_STATE') {
    state = undefined;
  }
  return reducers(state, action);
};

export default rootReducer;