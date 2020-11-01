import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import rootReducer from './reducer';

export default function configureStore(onCompletion) {
  const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
  );
  persistStore(store, { storage: AsyncStorage }, onCompletion);

  return store;
}
