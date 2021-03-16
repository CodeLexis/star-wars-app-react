import { combineReducers } from 'redux';

import rootReducer from './root';
import urlContentReducer from './url-content';


export default combineReducers({
  root: rootReducer,
  urlContent: urlContentReducer,
});
