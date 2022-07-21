import { StyleSheet, View, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Text, Image } from 'react-native-elements'
import { NoteList } from '../Components/index'
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({ navigation }) => {


  return (
    <SafeAreaView style={styles.Container}>
      <StatusBar style='light' />
      <View style={styles.HeaderContainer}>
        <Image source={require('../assets/notebook.png')} style={{
          resizeMode: 'cover',
          height: 40,
          width: 200
        }} />
       
        <TouchableOpacity style={styles.addButton} activeOpacity={0.5} onPress={() => { navigation.navigate('NoteAdd') }}>
          <Ionicons name="md-add-circle-outline" size={45} color="#f6581a" />
        </TouchableOpacity>
      </View>
      <NoteList navigation={navigation} />
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "#263238",
  },
  HeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 25,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#192129',
    borderBottomWidth:2,
    borderColor:'#f6581a'
  },
  addButton: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },

})