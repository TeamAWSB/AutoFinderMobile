import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Button, ToastAndroid } from 'react-native';
import { Int32 } from 'react-native/Libraries/Types/CodegenTypes';

function ModelInfo({ index, data, navigation }: { index:number, data:any, navigation:any }){
  return (
    <TouchableOpacity onPress={ () => navigation.navigate('CarDetails', { data })} activeOpacity={1}>
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image style={styles.img} source={{ uri:data.generations[0].urlImage }} alt='No photo'/>
        </View>
        <View style={styles.contentDetails}>
          <View style={styles.rowStyle}>
            {index == 0 && <Image style={styles.imgFuel} source={require('../images/badgeGold.png')} alt='fuel type'/>}
            {index == 1 && <Image style={styles.imgFuel} source={require('../images/badgeSilver.png')} alt='fuel type'/>}
            {index == 2 && <Image style={styles.imgFuel} source={require('../images/badgeBronze.png')} alt='fuel type'/>}

            <Text style={styles.heading}>{ data.mark + ':' }</Text>
            <Text style={styles.heading}>{ data.model }</Text>
          </View>
          <Text style={styles.heading}> { data.class } </Text>
        </View>

        <View style={styles.contentDetails}>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Text style={styles.heading}>Generacje </Text>
            <Text style={styles.heading}>{ data.generations.length }</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width - 30,
    minHeight: 300,
    backgroundColor: "#fff",
    margin:10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 5,
    overflow: 'hidden'
  },
  generationContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 30,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 2,
    marginBottom: 2,
    paddingLeft: 4,
    paddingRight: 4
  },
  rowStyle: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    textAlign: 'justify',
    textAlignVertical: 'center',
    columnGap: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden'
  },
  imgFuel: {
    height: 20,
    width: 20
  },
  imgContainer: {
    flex:1,
    minHeight: 200,
    padding: 20,
    width: Dimensions.get('window').width - 34,
    alignSelf: "stretch",
    overflow: 'hidden'
  },
  img: {
    flex: 1,
    width: '100%',
    borderRadius: 7
  },
  heading: {
    fontSize: 20,
    fontWeight: "400",
    textAlign: "center",
    color:"black"
  },
  contentDetails: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 10,
    height: 45,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 20,
    paddingTop: 5,
    paddingBottom: 5,
    overflow: 'hidden'
  },
  details: {
    fontSize: 16,
    fontWeight: "300",
    textAlign: "center",
    color:"black",
    alignSelf: 'flex-end'
  }
});

export default ModelInfo;
