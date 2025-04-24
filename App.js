import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import StackNavigator from './src/navigation/StackNavigator';
import { store } from './src/redux/store';


const App = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
      <StackNavigator />
      </Provider>
    </NavigationContainer>
  );
};

export default App;
