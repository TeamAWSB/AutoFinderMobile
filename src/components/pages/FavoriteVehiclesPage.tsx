import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, ToastAndroid, RefreshControl } from 'react-native';
import Api from '../../data/ApiRequests';
import SimpleModelInfo from '../SimpleModelInfoComponent';

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
      const jsonData = await Api.GetLikedVehicles(78);
      setData(jsonData);
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
          ) : (<View>

          </View>)
        }
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "black"
  }
});

export default FavoriteVehiclesPage; 