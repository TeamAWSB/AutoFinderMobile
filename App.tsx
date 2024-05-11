import * as React from 'react';
import { StatusBar, StyleSheet, View, Image, Dimensions } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import SettingsPage from './src/components/pages/SettingsPage';
import HomeStackNavigator from './src/navigation/HomeStackNavigator';
import NavBarContent from './src/components/NavBarContent';
import AccountNavPage from './src/components/pages/AccountNavPage';

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
  return (
    <>
      <StatusBar backgroundColor={'#ff2f00'}/>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home"
          screenOptions={{
            drawerType: 'slide',
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
              title: 'Popularne modele',
              headerTitle: () => null,
              headerBackground: () => <CustomDrawerHeader/>,
              drawerIcon: ({ size }) => (
                <Image source={require('./src/images/NavigationIcons/popularIcon.png')} style={{ width: size, height: size }}/>
              ),
            }}/>
          {false && ( // Wyświetlenie opcji Ulubione tylko dla zalogowanych użytkowników
          <Drawer.Screen
            name="Favorite"
            component={SettingsPage}
            options={{
              title: 'Ulubione',
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