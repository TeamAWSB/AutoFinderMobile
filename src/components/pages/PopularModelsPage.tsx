import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Image, View, Dimensions } from 'react-native';
import { popularModels } from '../../data/Example';
import ModelInfo from '../ModelInfoComponent';

function PopularModelsPage({ navigation }: { navigation:any }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      {
        popularModels.map((e, index) => {
          return(
            <>
              <ModelInfo key={index} index={index} data={e} navigation={navigation}/>
            </>
          );
        })
      }
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    height: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoApp: {
    width: Dimensions.get('window').width - 30,
    height: 80,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
    color: '#fcb103'
  },
});

export default PopularModelsPage;