import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, SafeAreaView, ScrollView, TouchableOpacity, ToastAndroid } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import Api from '../../data/ApiRequests';
import SessionApp from '../../data/storage/SessionApp';

function ModelInfoPage({ navigation }: { navigation:any } ) {
    const route = useRoute();
    const [like, setLike] = useState<boolean>(false); 

    //@ts-ignore
    const data: any = route.params?.data;

    const generations = () => {
      let generations = new Array();
      for(let index in data.generations){
        const item = data.generations[index];
        generations.push({
          id: index,
          name: `${item.generation} (${item.yearBegin}-${item.yearEnd})`,
          data: item
        });
      }
      return generations;
    };

    const [value, setValue] = useState<any>(null); 

    useEffect(() => {
      if (data.generations && data.generations.length > 0) {
        const initialGeneration = generations()[0];
        setValue(initialGeneration.id); 
        handleDropChange(initialGeneration);
      }
    }, [data]);

    const getStatusLikeCurrentGenerationModel = async (model:any) => {
      let user = await SessionApp.Get();
      console.warn(user.login);

      const likedVehicles: any[] = await Api.GetLikedVehicles(user?.userId);

      for(let index = 0; index < likedVehicles.length; index++){
        if(likedVehicles[index].id == model.vehicleId && likedVehicles[index].generations[0].generation == model.generation){
          setLike(true);
          return;
        }
      }
      setLike(false);
    };

    const handleClickLike = async () => {
      let user = await SessionApp.Get();

      if(user?.userId != 0 && user != undefined){
        const success = await Api.SetLikeVehicle(user.userId, data.generations[value].vehicleId, !like);
        
        if(success)
          setLike(!like);
      }
    };

    const handleDropChange = (item:any) => {
      setValue(item.id);
      getStatusLikeCurrentGenerationModel(item.data);
    };

    return (
      <SafeAreaView>
        <ScrollView style={{ backgroundColor: '#fff', minHeight: '100%' }}>
          <View style={styles.page}>
            <View style={styles.imgContainer}>
              <Image style={styles.img} source={{ uri: data.generations[value]?.urlImage }}/>
              <View style={styles.inlineElementHorizontal}>
                <Text style={styles.largeText}>{ data.mark } { data.model }</Text>
                <Text style={styles.mediumText}>{ data.generations[value]?.generation } </Text>
              </View>
            </View>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              itemTextStyle={styles.itemTextStyle}
              data={generations()}
              search
              maxHeight={300}
              labelField="name"
              valueField="id"
              placeholder="Wybierz generacje"
              searchPlaceholder="Wyszukiwanie"
              value={value}
              onChange={handleDropChange}
          />
          <View style={[styles.inlineElementHorizontal, { width: '100%' }]}>
            <Text style={[styles.boldText, { color: '#ff2f00' }]}>{like ? "Polubiono pojazd" : "Polub pojazd"}</Text>
            <TouchableOpacity onPress={handleClickLike}>
                  <Image style={{ width: 35, height: 35 }} source={like ? require('../../images/NavigationIcons/favoriteFilledIcon.png') :
                    require('../../images/NavigationIcons/favoriteIcon.png')
                  }/>
            </TouchableOpacity>
          </View>
            <View style={styles.inlineElement}>
              <Text style={styles.boldText}>{ data.generations[value]?.fuelType } • { data.class } • { data.generations[value]?.engineGeneration } { data.generations[value]?.horsepower }KM • { data.generations[value]?.transmissionType }</Text>
            </View>
            <View style={styles.inlineElement}>
              <Text style={styles.smallText}>{ data.description }</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  page: {
    height: 'auto',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  imgContainer: {
    borderRadius: 10,
    paddingBottom: -5,
    backgroundColor: '#ff2f00',
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
    alignItems: 'center',
    height: 'auto',
    paddingLeft: 25,
    paddingRight: 25,
  },
  largeText: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    color: '#fff',
  },
  mediumText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#fff',
  },
  smallText: {
    color: '#333',
    fontSize: 17,
    fontWeight: '300',
    textAlign: 'justify'
  },
  boldText: {
    color: '#333',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'justify'
  },
  dropdown: {
    margin: 16,
    height: 50,
    width: '90%',
    backgroundColor: 'white',
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
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
    color: '#333'
  },
  placeholderStyle: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#333'
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#333'
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  itemTextStyle: {
    color: '#333'
  }
});

export default ModelInfoPage; 