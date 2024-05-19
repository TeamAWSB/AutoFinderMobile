import { createStackNavigator } from '@react-navigation/stack';
import FavoriteVehiclesPage from './FavoriteVehiclesPage';
import ModelInfoPage from './ModelInfoPage';

const Stack = createStackNavigator();

function FavoriteVehiclesNavPage(){
    return (
        <Stack.Navigator initialRouteName="FavoriteList"> 
            <Stack.Screen name="FavoriteList" component={FavoriteVehiclesPage} options={{ headerShown: false }}/>
            <Stack.Screen name="CarDetails" component={ModelInfoPage} options={{ headerShown: false }}/>
        </Stack.Navigator>
    );
};

export default FavoriteVehiclesNavPage;