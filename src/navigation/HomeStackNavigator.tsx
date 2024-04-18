import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import PopularModelsPage from '../components/pages/PopularModelsPage';
import ModelInfoPage from '../components/pages/ModelInfoPage';

const Stack = createStackNavigator();

function HomePageNavigator(){
    return (
        <Stack.Navigator initialRouteName="PopularModels"> 
          <Stack.Screen name="PopularModels" component={PopularModelsPage} options={{ headerShown: false }} />
          <Stack.Screen name="CarDetails" component={ModelInfoPage} options={{ headerShown: false }}/>
        </Stack.Navigator>
      );
}

export default HomePageNavigator;