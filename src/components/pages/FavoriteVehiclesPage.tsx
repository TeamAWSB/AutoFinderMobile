import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, ToastAndroid, RefreshControl, TouchableOpacity, Text, Dimensions } from 'react-native';
import Api from '../../data/ApiRequests';
import SimpleModelInfo from '../SimpleModelInfoComponent';
import SessionApp from '../../data/storage/SessionApp';

function FavoriteVehiclesPage({ navigation }: { navigation:any }){
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    fetchData();
    setLoading(false);
  }, []);

  const fetchData = async () => {
    try{
      var user = await SessionApp.Get();
      var result = await Api.Login(user?.login, user?.password);

      if(result != null && result.id != 0){
        const jsonData = await Api.GetLikedVehicles(result.id);
        setData(jsonData);
      }
    }
    catch(error){
      console.error(error);
    }
  };

  const handleRefresh = useCallback(() => {
    setLoading(true);
    fetchData()
      .finally(() => {
      setTimeout(() => {
          setLoading(false);
      }, 500);
    })
    .catch(() => {
      ToastAndroid.show("Nie udało się załadować danych", 1500);
      setLoading(false);
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1,
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff' }}>
      <ScrollView refreshControl={
        <RefreshControl
        refreshing={loading}
        onRefresh={handleRefresh}
        
      />
      }>
        {
          data?.length > 0 ? (
            data.map((e, index) => {
              return(
                <SimpleModelInfo key={index} data={e} navigation={navigation}/>
              );
            })
          ) : (<View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: Dimensions.get('window').height }}>
                <Text style={{ color: '#ff2f00', fontSize: 18, margin: 20, textAlign: 'center' }}>Brak polubionych pojazdów. Możliwe, że jeszcze nic nie polubiłe(a)ś pojazdów bądź nie zalogowałeś się do serwisu</Text>

                <TouchableOpacity style={styles.button} onPress={handleRefresh}>
                  <Text style={styles.buttonText}>Odśwież dane</Text>
                </TouchableOpacity>
          </View>)
        }
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "black"
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    height: 45,
    minWidth: '80%',
    backgroundColor: '#ff2f00',
    borderRadius: 10,
    marginBottom: 15
  },
  buttonText: {
      fontSize: 20,
      fontWeight: '500',
      textAlign: 'center',
      color: '#fff'
  }
});

export default FavoriteVehiclesPage; 