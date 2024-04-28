import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function SettingsPage(){
    return (
      <View style={{ backgroundColor: '#fff', height: '100%' }}>
        <Text style={styles.text}>strona ustawień</Text>
      </View>
    );
};

const styles = StyleSheet.create({
  text: {
    color: "black"
  }
});

export default SettingsPage; 