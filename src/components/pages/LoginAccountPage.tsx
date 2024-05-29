import React, { useState } from 'react';
import { Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View, ToastAndroid, Alert } from 'react-native';
import Api from '../../data/ApiRequests';
import SessionApp from '../../data/storage/SessionApp';
import CryptoJS from 'crypto-js';

function LoginAccountPage({ navigation }: { navigation:any }){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const GoToRegisterPage = () => {
        navigation.navigate('Register', {  });
    };

    const ToLogin = async ( fromStorage:boolean ) => {
        const encryptedPassword = fromStorage ? password : CryptoJS.SHA256(password).toString();
        //@ts-ignore
        const data = await Api.Login(email, encryptedPassword);

        if(data?.error != null || data?.email.length == 0)
            Alert.alert('Informacja', `Nie udało się zalogować`);
        else{
            //@ts-ignore
            await SessionApp.Set(data.id, email, encryptedPassword)
            ToastAndroid.show(`Witaj ponownie!`, 2000);
            navigation.navigate("Profile", { 'email': data?.email });
        }
    };

    return (
      <ImageBackground style={styles.body}
                       source={require('../../images/autoFinderBg.png')}
                       resizeMode='cover'>
        <View style={styles.logoContainer}>
            <Image style={styles.logImg}
                   source={require('../../images/NavigationIcons/profileIcon.png')}/>
            <Text style={styles.title}>Witaj ponownie!</Text>
        </View>
        <View style={styles.form}>
            <TextInput style={styles.textBox}
                       placeholder='Login'
                       onChangeText={email => setEmail(email)}/>
            <TextInput style={styles.textBox}
                       placeholder='Hasło'
                       onChangeText={password => setPassword(password)}/>
            <TouchableOpacity style={styles.button} onPress={() => ToLogin(false)}>
                <Text style={styles.buttonText}>Zaloguj</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginTop: 10 }} onPress={GoToRegisterPage}>
                <Text style={styles.link}>Nie posiadam konta</Text>
            </TouchableOpacity>
        </View>
      </ImageBackground>
    );
};

const styles = StyleSheet.create({
    body: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: '#fff'
    },
    logoContainer:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 80,
        height: 160,
        width: '80%'
    },
    logImg: {
        height: 120,
        width: 120
    },
    form: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 300,
        width: '100%'
    },
    title: {
        fontSize: 20,
        fontWeight: '500',
        width: '80%',
        textAlign: 'center',
        color: '#ff2f00'
    },
    textBox: {
        backgroundColor: 'rgba(229, 229, 229, 0.71)',
        borderRadius: 10,
        width: '80%',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '400',
        marginTop: 10,
        marginBottom: 10,
        color: '#ff2f00'
    },
    button: {
        display: 'flex',
        justifyContent: 'center',
        height: 45,
        width: '80%',
        backgroundColor: '#ff2f00',
        borderRadius: 10,
        marginTop: 20
    },
    buttonText: {
        fontSize: 20,
        fontWeight: '500',
        textAlign: 'center',
        color: '#fff'
    },
    link: {
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',
        color: '#ff2f00'
    }
});

export default LoginAccountPage;