import * as React from 'react';
import { StatusBar, StyleSheet, View, Image, Dimensions, ToastAndroid } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import HomeStackNavigator from './src/navigation/HomeStackNavigator';
import NavBarContent from './src/components/NavBarContent';
import AccountNavPage from './src/components/pages/AccountNavPage';
import FavoriteVehiclesNavPage from './src/components/pages/FavoriteVehicleNavPage';
import { useEffect, useState } from 'react';
import SessionApp from './src/data/storage/SessionApp';
import Api from './src/data/ApiRequests';

const Drawer = createDrawerNavigator();
const styles = StyleSheet.create({
  drawerHeader: {
    backgroundColor: '#fff',
    width: 240,
  },
  headerBg: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: Dimensions.get('window').width,
    height: 57,
    paddingLeft: 60,
    backgroundColor: '#fff'
  },
  img: {
    width: '120%',
    height: '120%',
    resizeMode: 'contain'
  }
});

const CustomDrawerHeader = () => {
  return (
    <View style={styles.headerBg}>
      <Image
        source={require('./src/images/autoFinderLogo.png')}
        style={styles.img} />
    </View>
  );
};

export default function App() {
  const[logged, setLogged] = useState<boolean>(false);

  useEffect(() => {
    const initializeUserData = async () => {
      try {
        var user = await SessionApp.Get();
        let result = await Api.Login(user.login, user.password);

        if(result?.error != null) setLogged(false);
        else setLogged(true);

      } catch (error) {
        console.error('Error creating user data:', error);
      }
    };

    initializeUserData();
  }, []);

  return (
    <>
      <StatusBar backgroundColor={'#ff2f00'}/>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home"
          screenOptions={{
            drawerType: 'back',
            headerStyle: styles.drawerHeader,
            drawerActiveTintColor: '#ff2f00'
          }}
          drawerContent={props => <NavBarContent {...props}/>}>
            <Drawer.Screen name="Account" component={AccountNavPage} 
            options={{
              title: 'Konto',
              headerTitle: () => null,
              headerBackground: () => <CustomDrawerHeader/>,
              drawerIcon: ({ size }) => (
                <Image source={require('./src/images/NavigationIcons/profileIcon.png')} style={{ width: size, height: size }}/>
              ), 
            }}/>
          <Drawer.Screen name="Home" component={HomeStackNavigator} 
            options={{ 
              title: 'Popularne',
              headerTitle: () => null,
              headerBackground: () => <CustomDrawerHeader/>,
              drawerIcon: ({ size }) => (
                <Image source={require('./src/images/NavigationIcons/popularIcon.png')} style={{ width: size, height: size }}/>
              ),
            }}/>
          {true && ( // Wyświetlenie opcji Ulubione tylko dla zalogowanych użytkowników
          <Drawer.Screen name="Favorite" component={FavoriteVehiclesNavPage}
            options={{
              title: 'Polubione',
              headerTitleStyle: { color: '#ff2f00' },
              headerStyle: { alignSelf: 'center', width: '100%' },
              drawerIcon: ({ size }) => (
                <Image source={require('./src/images/NavigationIcons/favoriteIcon.png')} style={{ width: size, height: size }}/>
              ),
            }}
          />
        )}
        </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
}