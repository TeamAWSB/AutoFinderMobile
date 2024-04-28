import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Dimensions, RefreshControl, Text, View, TouchableOpacity, Button, ActivityIndicator } from 'react-native';
import { popularModels } from '../../data/Example';
import ModelInfo from '../ModelInfoComponent';
import Api from '../../data/ApiRequests';
import { MultiSelect } from 'react-native-element-dropdown';

function PopularModelsPage({ navigation }: { navigation:any }) {
  const [data, setData] = useState<any[]>([]);
  const [fuelTypes, setFuelTypes] = useState<any[]>([]);
  const [marks, setMarks] = useState<any[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  const handleRefresh = () => {
    setLoading(true);
    fetchData();
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try{
      const jsonData = await Api.Vehicles(selectedMark, selectedFuelType);
      const jsonFuelTypes = await Api.FuelTypes();
      const jsonMarks = await Api.Marks();
      setData(jsonData);
      setFuelTypes(jsonFuelTypes);
      setMarks(jsonMarks);
      setLoading(false);
    }
    catch(error){
      console.error(error);
    }
    
  };

  const [selectedMark, setSelectedMark] = useState<string[]>([]);
  const [selectedFuelType, setSelectedFuelType] = useState<string[]>([]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView refreshControl={
        <RefreshControl
        refreshing={loading}
        onRefresh={handleRefresh}
      />
      }>
        <View style={styles.filterContainer}>
          <View style={styles.filterChild}>
            <MultiSelect 
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              containerStyle={styles.containerDropdown}
              iconStyle={styles.iconStyle}
              itemTextStyle={styles.itemTextStyle}
              data={marks}
              labelField="name"
              valueField="id"
              placeholder="Marka pojazdu"
              searchPlaceholder="Szukaj..."
              value={selectedMark}
              onChange={item => {
                setSelectedMark(item);
              }}
              selectedStyle={styles.selectedStyle}
              />
          </View>
          <View style={styles.filterChild}>
            <MultiSelect 
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              containerStyle={styles.containerDropdown}
              iconStyle={styles.iconStyle}
              itemTextStyle={styles.itemTextStyle}
              data={fuelTypes}
              labelField="name"
              valueField="id"
              placeholder="Typ paliwa"
              value={selectedFuelType}
              onChange={item => {
                setSelectedFuelType(item);
              }}
              selectedStyle={styles.selectedStyle}
              />
          </View>
          <View style={styles.filterChild}>
            <TouchableOpacity style={styles.buttonSearch} onPress={fetchData}>
              <Text style={styles.buttonText}>Szukaj</Text>
            </TouchableOpacity>
          </View>
        </View>
      {
        data?.length > 0 ? (
          data.map((e, index) => {
            return(
              <>
                <ModelInfo key={index} index={index} data={e} navigation={navigation}/>
              </>
            );
          })
        ) : (
          <View style={{
            height: '100%',
            width: '100%'
          }}>
            <Text style={{color: '#333', textAlign: 'center', flexWrap: 'wrap'}}>Nie znaleziono danych lub brak połączenia z serwerem. Spróbuj ponownie później lub zmień filtry</Text>
          </View>
        )
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
    height: '100%',
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
  filterContainer: {
    margin: 10,
    height: 'auto',
    minWidth: '90%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 10,
    backgroundColor: '#fff',
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
  filterChild: {
    height: 'auto',
    width: '95%',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 10,
  },
  dropdown: {
    height: 50,
    backgroundColor: '#fff',
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    color: '#333'
  },
  itemTextStyle: {
    color: '#333'
  },
  placeholderStyle: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#333'
  },
  selectedTextStyle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333'
  },
  iconStyle: {
    width: 20,
    height: 20,
    color: '#333'
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: '#333'
  },
  selectedStyle: {
    borderRadius: 12,
    borderWidth: 1,
    color: '#333'
  },
  containerDropdown: {
    height: 'auto',
    maxHeight: 250,
    width: '88%',
    borderRadius: 10,
    borderColor: '#333',
    borderWidth: 1,
    color: '#333',
    overflow: 'hidden'
  },
  buttonSearch: { 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    height: 40,
    borderWidth: 2, 
    borderColor: '#333', 
    backgroundColor: '#333',
    borderRadius: 10, 
  },
  buttonText:{
    color: '#fff'
  }
});

export default PopularModelsPage;