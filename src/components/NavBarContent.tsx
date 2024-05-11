import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import React from "react";
import { View, Text, Image, StyleSheet, ImageBackground } from "react-native";

export function NavBarContent(props:any){
    return(
        <ImageBackground style={{ flex: 1 }} 
                         source={require('../images/autoFinderNavBarBg.png')}
                         resizeMode="cover">
            <View style={styles.bgProfileContainer}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{ uri: 'https://static.hudl.com/users/prod/4120497_1c3e4a5dda88476393e66265b9bd1de5.jpg' }}/>
                </View>
                <Text style={{ color: '#fff', fontWeight: '500' }}>AdamVox_153</Text>
            </View>
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props}/>
            </DrawerContentScrollView>
            <View style={styles.footer}>
                <Text style={{ color: '#fff', textAlign: 'center', fontWeight: '500' }}>❤︎ Studenci AWSB ❤︎</Text>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    bgProfileContainer:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 80,
        width: '90%',
        backgroundColor: '#ff2f00',
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 10,
        borderColor: '#ff2f00',
        borderWidth: 2,
        margin: '5%'
    },
    imageContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 65,
        width: 65,
        borderRadius: 360,
        backgroundColor: '#fff'
    },
    image: {
        height: '93%',
        width: '93%',
        borderRadius: 360
    },
    footer:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#ff2f00',
        backgroundColor: '#ff2f00',
        margin: 10
    }
});

export default NavBarContent;