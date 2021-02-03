import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/index';
import logger from 'redux-logger';
import { sessionService } from 'redux-react-session';

export const Store = createStore(
  rootReducer,
  applyMiddleware(logger),
);

const validateSession = (session) => {
  // check if your session is still valid
  return true;
}
const options = { refreshOnCheckAuth: true, redirectPath: '/panel', driver: 'COOKIES', validateSession };

sessionService.initSessionService(Store, options)
  .then(() => console.log('Redux React Session is ready and a session was refreshed from your storage'))
  .catch(() => console.log('Redux React Session is ready and there is no session in your storage'));