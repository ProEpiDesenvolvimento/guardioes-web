import { createStore, applyMiddleware, compose } from 'redux';
import { sessionService } from 'redux-react-session';
import rootReducer from '../reducers/index';
import getUser from './services/getUser';

const middlewares = [];

if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);
  middlewares.push(logger);
}

export const Store = compose(applyMiddleware(...middlewares))(createStore)(rootReducer);

const validateSession = async (session) => {
  // check if your session is still valid
  const user = await sessionService.loadUser();
  const response = await getUser(user.id, user.type, session.token);
  
  if (response.errors) {
    window.location.reload();
    return false;
  }
  return true;
}
const options = { refreshOnCheckAuth: true, redirectPath: '/login', driver: 'COOKIES', validateSession };

sessionService.initSessionService(Store, options)
  .then(() => console.log('Redux React Session is ready and a session was refreshed from your storage'))
  .catch(() => console.log('Redux React Session is ready and there is no session in your storage'));