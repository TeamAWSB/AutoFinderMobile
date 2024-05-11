import React from 'react';
import { Dimensions, ImageBackground, View } from 'react-native';

function RegisterAccountPage({ navigation }: { navigation:any }){
    const GoToRegisterPage = () => {
        navigation.navigate('Register', {  });
    };

    return(
        <ImageBackground style={{ height: Dimensions.get('window').height, backgroundColor: '#fff' }}
                        source={require('../../images/autoFinderBg.png')}>
            
        </ImageBackground>
    );
}

export default RegisterAccountPage;