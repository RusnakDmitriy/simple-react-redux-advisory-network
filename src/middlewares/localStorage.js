import {ROUTING} from '../constants';

export default store => next => action => {
  if (action.type === ROUTING) {
      const userData=JSON.stringify({
        username: `${action.payload.user.username}`,
        password: `${action.payload.user.password}`
      });
      localStorage.setItem("smktesting", userData);
  }

  return next(action)
}