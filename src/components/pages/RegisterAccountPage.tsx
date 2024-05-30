import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import Api from '../../data/ApiRequests';
import { Dropdown } from 'react-native-element-dropdown';
import Slider from '@react-native-community/slider';
import UserData from '../../data/Interfaces/UserData';

function RegisterAccountPage({ navigation }: { navigation:any }){
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [birthOfYear, setBirthOfYear] = useState(0);
    const [country, setCountry] = useState<any>('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');

    const GoToLoginPage = () => {
        navigation.navigate('Login', {  });
    };

    const Register = async () => {
        if(name.length == 0 &&
            surname.length == 0 &&
            email.length == 0 &&
            country.length == 0 &&
            password1.length == 0
        ){
            ToastAndroid.show('Nie wprowadziłeś wszystkich informacji', 2000);
            return;
        }

        if(password1 != password2){
            ToastAndroid.show('Wprowadzone hasła różnią się od siebie', 2000);
            return;
        }

        //@ts-ignore
        const data: UserData = {
            name: name,
            surname: surname,
            email: email,
            birthOfYear: birthOfYear,
            country: country.label,
            password: password1
        };
        var result = await Api.Register(data);

        if(!result)
            ToastAndroid.show(`Nie udało się zarejestrować`, 2000);
        else{
            ToastAndroid.show(`Witaj ${name}`, 2000);
            navigation.navigate("Profile", { 'email': email });
        }
    }

    useEffect(() => {
        setBirthOfYear(new Date().getFullYear() - 18);
    }, []);

    const data = [
        { label: 'Polska', value: '1' },
        { label: 'Niemcy', value: '2' },
        { label: 'Norwegia', value: '3' },
        { label: 'Czechy', value: '4' },
        { label: 'Słowacja', value: '5' },
        { label: 'Chorwacja', value: '6' },
      ];

    return(
        <SafeAreaView>
            <ScrollView>
                <ImageBackground style={styles.body}
                                source={require('../../images/autoFinderBg.png')}>
                    <View style={styles.logoContainer}>
                        <Image style={styles.logImg}
                            source={require('../../images/NavigationIcons/profileIcon.png')}/>
                        <Text style={styles.title}>Odkryj możliwości AutoFindera!</Text>
                    </View>             
                    <View style={styles.form}>
                        <Dropdown
                            style={dropdownStyle.dropdown}
                            placeholderStyle={dropdownStyle.placeholderStyle}
                            selectedTextStyle={dropdownStyle.selectedTextStyle}
                            inputSearchStyle={dropdownStyle.inputSearchStyle}
                            iconStyle={dropdownStyle.iconStyle}
                            itemTextStyle={dropdownStyle.itemText}
                            containerStyle={dropdownStyle.containerDropdown}
                            data={data}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder="Narodowość"
                            searchPlaceholder="Szukaj..."
                            value={country}
                            onChange={item => {
                                setCountry(item);
                            }}
                        />
                        <TextInput style={styles.textBox} placeholderTextColor={'#333'}
                                placeholder='Imię'
                                onChangeText={value => setName(value)}/>
                        <TextInput style={styles.textBox} placeholderTextColor={'#333'}
                                placeholder='Nazwisko'
                                onChangeText={value => setSurname(value)}/>
                        <TextInput style={styles.textBox} placeholderTextColor={'#333'}
                                placeholder='Email'
                                onChangeText={value => setEmail(value)}/>
                        <TextInput style={styles.textBox} placeholderTextColor={'#333'}
                                placeholder='Hasło'
                                onChangeText={value => setPassword1(value)}/>
                        <TextInput style={styles.textBox} placeholderTextColor={'#333'}
                                placeholder='Powtórz hasło'
                                onChangeText={value => setPassword2(value)}/>
                        <View style={styles.sliderView}>
                            <Text style={{ fontSize: 18, fontWeight: '400', color: '#ff2f00' }}>Rok urodzenia <Text style={{ fontWeight: '600', color:'#ff2f00' }}>{birthOfYear}</Text></Text>
                            <Slider
                                style={{width: '100%', height: 40}}
                                onValueChange={year => setBirthOfYear(year)}
                                value={birthOfYear}
                                step={1}
                                minimumValue={new Date().getFullYear() - 100}
                                maximumValue={new Date().getFullYear()}
                                minimumTrackTintColor="#ff2f00"
                                maximumTrackTintColor="#000000"
                                thumbImage={require('../../images/thumbSlider.png')}
                            />
                        </View>
                        <TouchableOpacity style={styles.button} onPress={Register}>
                            <Text style={styles.buttonText}>Zarejestruj</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginTop: 10 }} onPress={GoToLoginPage}>
                            <Text style={styles.link}>Mam już konto</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    body: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        minHeight: Dimensions.get('window').height,
        width: '100%',
        backgroundColor: '#fff'
    },
    logoContainer:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        height: 'auto',
        width: '80%'
    },
    logImg: {
        height: 35,
        width: 35
    },
    form: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'auto',
        width: '100%',
        marginTop: 10
    },
    title: {
        fontSize: 18,
        fontWeight: '500',
        width: '80%',
        textAlign: 'center',
        color: '#ff2f00'
    },
    textBox: {
        backgroundColor: 'rgba(229, 229, 229, 0.71)',
        borderRadius: 10,
        width: '80%',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '400',
        marginTop: 10,
        marginBottom: 10,
        color: '#ff2f00'
    },
    button: {
        display: 'flex',
        justifyContent: 'center',
        height: 45,
        width: '80%',
        backgroundColor: '#ff2f00',
        borderRadius: 10,
        marginTop: 20
    },
    buttonText: {
        fontSize: 20,
        fontWeight: '500',
        textAlign: 'center',
        color: '#fff'
    },
    link: {
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',
        color: '#ff2f00'
    },
    sliderView:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        backgroundColor: 'rgba(229, 229, 229, 0.71)',
        borderRadius: 10,
        paddingTop: 5
    }
});

const dropdownStyle = StyleSheet.create({
    dropdown: {
        margin: 16,
        height: 50,
        width: '80%',
        backgroundColor: 'white',
        borderColor: '#ff2f00',
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
      containerDropdown: {
        height: 'auto',
        maxHeight: 250,
        width: '80%',
        backgroundColor: '#fff',
        borderColor: '#ff2f00',
        borderWidth: 1,
        borderRadius: 10,
        color: '#333',
        overflow: 'hidden'
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
      },
      placeholderStyle: {
        fontSize: 17,
        color: '#333'
      },
      selectedTextStyle: {
        fontSize: 16,
        fontWeight: '400',
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
      itemText: {
        color: '#333'
      }
});

export default RegisterAccountPage;