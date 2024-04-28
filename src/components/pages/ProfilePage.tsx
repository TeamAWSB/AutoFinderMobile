import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

function ProfilePage(){
    return (
      <View style={styles.container}>
        <View style={styles.avatar}>
            <Image style={styles.image} source={require('../../images/NavigationIcons/profileIcon.png')}/>
            <Text style={styles.text}>Nazwa konta</Text>
        </View>
        
        
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'flex-start',
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
        borderColor: '#333',
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
        fontSize: 20
    }
});

export default ProfilePage;