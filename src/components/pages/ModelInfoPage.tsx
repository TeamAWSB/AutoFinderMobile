import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';

function ModelInfoPage({ navigation }: { navigation:any } ) {
    const route = useRoute();
    //@ts-ignore
    const data: any = route.params?.data;

    useEffect(() => {
      if (data.generations.length > 0) {
        setValue(data.generations[0]);
      }
    }, [data]);

    const generations = () =>{
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
    
    const [value, setValue] = useState(generations()[0]);
    return (
      <View style={styles.page}>
        <View style={styles.imgContainer}>
          <Image style={styles.img} source={{ uri: value?.urlImage }}/>
          <View style={styles.inlineElementHorizontal}>
            <Text style={styles.largeText}>{ data.mark } { data.model }</Text>
            <Text style={styles.mediumText}>{ value?.generation } </Text>
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
          onChange={item => {
            setValue(item.data);
          }}
      />
        <View style={styles.inlineElement}>
          <Text style={styles.boldText}>{ value?.fuelType } • { data.class } • { value?.engineGeneration } { value?.horsepower }KM • { value?.transmissionType }</Text>
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