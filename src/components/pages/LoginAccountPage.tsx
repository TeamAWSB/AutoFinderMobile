import React from 'react';
import { Dimensions, Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

function LoginAccountPage({ navigation }: { navigation:any }){
    const GoToRegisterPage = () => {
        navigation.navigate('Register', {  });
    };

    return (
      <ImageBackground style={styles.body}
                       source={require('../../images/autoFinderBg.png')}
                       resizeMode='cover'>
        <View style={styles.logoContainer}>
            <Image style={styles.logImg}
                   source={require('../../images/NavigationIcons/profileIcon.png')}/>
            <Text style={styles.title}>Witaj w AutoFinder!</Text>
        </View>
        <View style={styles.form}>
            <TextInput style={styles.textBox}
                       placeholder='Login'/>
            <TextInput style={styles.textBox}
                       placeholder='Hasło'/>
            <TouchableOpacity style={styles.button}>
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
        height: Dimensions.get('window').height,
        width: '100%',
        backgroundColor: '#fff'
    },
    logoContainer:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '10%',
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
        marginBottom: 10
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