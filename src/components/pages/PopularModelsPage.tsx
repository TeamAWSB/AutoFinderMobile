import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Dimensions, RefreshControl, Text } from 'react-native';
import { popularModels } from '../../data/Example';
import ModelInfo from '../ModelInfoComponent';
import Api from '../../data/ApiRequests';

function PopularModelsPage({ navigation }: { navigation:any }) {
  const [data, setData] = useState<any[]>([]);
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
    const jsonData = await Api.Vehicles();
    setData(jsonData);
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
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
              <>
                <ModelInfo key={index} index={index} data={e} navigation={navigation}/>
              </>
            );
          })
        ) : (
          <Text>Brak połączenia z serwerem lub brak danych</Text>
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