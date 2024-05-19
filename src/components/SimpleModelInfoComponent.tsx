import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';

function SimpleModelInfo({ data, navigation }: { data:any, navigation:any }){
  return (
    <TouchableOpacity onPress={ () => navigation.navigate('CarDetails', { data })} activeOpacity={1}>
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image style={styles.img} source={{ uri:data.generations[0].urlImage }} alt='No photo'/>
        </View>
        
        <View style={styles.stackContainer}>
            <View style={styles.dockContainer}>
                <View style={{ marginRight: 15 }}>
                    <Text style={styles.details}>{ data.generations[0].engineCapacity }</Text>
                    <Text style={styles.details}>{ data.generations[0].horsepower }KM</Text>
                </View>
                <View style={{ marginLeft: 15 }}>
                    <Text style={styles.title}>{ data.mark } { data.model }</Text>
                    <Text style={styles.subTitle}>{ data.class }</Text>
                </View>
            </View>

            <View style={styles.dockContainer}>
                <View style={{ marginRight: 10 }}>
                <Text style={styles.details}>{ data.generations[0].transmissionType }</Text>
                    <Text style={styles.details}>{ data.generations[0].yearBegin }-{ data.generations[0].yearEnd }</Text>
                    <Text style={styles.details}>Generacja { data.generations[0].generation }</Text>
                </View>
                <View style={{ marginLeft: 5 }}>
                    
                </View>
            </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    width: Dimensions.get('window').width - 30,
    height: 180,
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
  imgContainer: {
    flex:1,
    maxHeight: 200,
    maxWidth: 170,
    paddingLeft: 20,
    paddingBottom: 20,
    paddingTop: 20,
    paddingRight: 10,
    width: Dimensions.get('window').width - 34,
    alignSelf: "stretch",
    overflow: 'hidden'
  },
  img: {
    flex: 1,
    height: 'auto',
    width: 'auto',
    borderRadius: 7
  },
  dockContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 'auto',
    marginTop: 17,
    marginBottom: 15,
    marginRight: 'auto'
  },
  title: {
    fontSize: 19,
    fontWeight: '500',
    textAlign: 'center',
    color: '#ff2f00'
  },
  subTitle: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'right'
  },
  details: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'left'
  },
  stackContainer:{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: 'auto',
    marginRight: 'auto',
    marginLeft: 5
  }
});

export default SimpleModelInfo;
