import { createStackNavigator } from '@react-navigation/stack';
import ProfilePage from '../pages/ProfilePage';
import LoginAccountPage from '../pages/LoginAccountPage';
import RegisterAccountPage from './RegisterAccountPage';

const Stack = createStackNavigator();

function AccountNavPage(){
    return (
        <Stack.Navigator initialRouteName="Login"> 
            <Stack.Screen name="Login" component={LoginAccountPage} options={{ headerShown: false }}/>
            <Stack.Screen name="Register" component={RegisterAccountPage} options={{ headerShown: false }}/>
            <Stack.Screen name="Profile" component={ProfilePage} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};

export default AccountNavPage;