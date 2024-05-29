import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ToastAndroid, Alert, BackHandler, TouchableOpacity, ImageBackground } from 'react-native';
import Api from '../../data/ApiRequests';
import UserData from '../../data/Interfaces/UserData';
import SessionApp from '../../data/storage/SessionApp';

function ProfilePage( { navigation }: { navigation:any } ){
    const [user, setUser] = useState<any>({ });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await SessionApp.Get();
                const user = await Api.GetUserData(data?.login);

                if(user && user.name)
                    setUser(user);
                else
                    setUser('Brak maila!');
            } catch (error) {
                console.error('Błąd podczas pobierania danych:', error);
            }
        };
        fetchData();
        
    }, []);

    const Logout = () => {
        SessionApp.Set(0, 'Nie zalogowany', '');
        navigation.navigate("Login");
    };

    return (
      <ImageBackground style={styles.container} source={require('../../images/autoFinderBg.png')}>
        <View style={styles.avatar}>
            <Image style={styles.image} source={require('../../images/NavigationIcons/profileIcon.png')}/>
            <Text style={styles.text}>{ user?.email }</Text>
        </View>
        
        <TouchableOpacity style={styles.button} onPress={Logout}>
            <Text style={styles.buttonText}>Wyloguj</Text>
        </TouchableOpacity>
      </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: '100%'
    },
    image: {
        height: '70%',
        width: '70%'
    },
    avatar: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderColor: '#ff2f00',
        borderWidth: 2,
        borderRadius: 360,
        height: 250,
        width: 250,
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 7,
        },
        shadowOpacity: 0.8,
        shadowRadius: 8,
        elevation: 6,
        overflow: 'hidden',
        margin: 10
    },
    text: {
        color: '#333',
        fontWeight: '600',
        fontSize: 18
    },
    button: {
        display: 'flex',
        justifyContent: 'center',
        height: 45,
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 15
    },
    buttonText: {
        fontSize: 20,
        fontWeight: '500',
        textAlign: 'center',
        color: '#ff2f00'
    }
});

export default ProfilePage;