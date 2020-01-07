import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
const middleware = [thunk];
export default function configureStore(initialState) {
  if (__DEV__) {
    const store = createStore(
      rootReducer,
      initialState,
      compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__(),
      ),
    );
    return store;
  } else {
    const store = createStore(
      rootReducer,
      initialState,
      compose(applyMiddleware(...middleware)),
    );
    return store;
  }
}
