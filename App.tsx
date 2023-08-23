import 'react-native-gesture-handler';
import MyStack from './src/business_logic/navigation/stack';
import { Provider } from 'react-redux';
import store from './src/business_logic/redux/store';

function App(): JSX.Element {

  return <Provider store={store}>
  <MyStack/>
  </Provider>

}

export default App; 