import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';

function ModelInfoPage({ navigation }: { navigation:any } ) {
    const route = useRoute();
    //@ts-ignore
    const data: any = route.params?.data;
    
    return (
      <View style={styles.page}>
        <View style={styles.imgContainer}>
          <Image style={styles.img} source={{ uri: data.urlImage }}/>
          <View style={styles.inlineElementHorizontal}>
            <Text style={styles.largeText}>{ data.mark } { data.model }</Text>
            <Text style={styles.largeText}>{ data.year } </Text>
          </View>
        </View>
        <View style={styles.inlineElement}>
          <Text style={styles.smallText}>{ data.description }</Text>
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fff',
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  imgContainer: {
    borderRadius: 10,
    paddingBottom: -5,
    backgroundColor: '#ed7428',
    overflow: 'hidden'
  },
  img: {
    width: Dimensions.get('window').width - 40,
    height: 200,
    borderRadius: 10
  },
  inlineElement: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    height: 'auto',
    paddingLeft: 25,
    paddingRight: 25,
    marginTop: 5,
    marginBottom: 5
  },
  inlineElementHorizontal: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 'auto',
    paddingLeft: 25,
    paddingRight: 25,
  },
  largeText: {
    color: '#333',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    color: '#fff',
  },
  smallText: {
    color: '#333',
    fontSize: 17,
    fontWeight: '300',
    textAlign: 'justify'
  }
});

export default ModelInfoPage; 