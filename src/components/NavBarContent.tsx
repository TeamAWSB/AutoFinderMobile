import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export function NavBarContent(props:any){
    return(
        <View style={{ flex: 1 }}>
            <View style={styles.bgProfileContainer}>
                <Image style={styles.image} source={{ uri: 'https://i.pinimg.com/736x/27/b7/83/27b78322ff78d9514d1b61f37bfe55ac.jpg' }}/>
                <Text style={{ color: '#333' }}>AdamVox_153</Text>
            </View>
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props}/>
            </DrawerContentScrollView>
            <View style={styles.footer}>
                <Text style={{ color: '#fff', textAlign: 'center', fontWeight: '500' }}>❤︎ Miłośnicy nauk wszelakich ❤︎</Text>
            </View>
        </View>
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
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 10,
        borderColor: '#fc6b03',
        borderWidth: 2,
        margin: '5%'
    },
    image: {
        height: 60,
        width: 60,
        borderRadius: 360
    },
    footer:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#fc6b03',
        backgroundColor: '#fc6b03',
        margin: 10
    }
});

export default NavBarContent;