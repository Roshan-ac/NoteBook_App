import { StyleSheet, View } from 'react-native'
import React from 'react'
import moment from 'moment';
import { MaterialIcons } from '@expo/vector-icons';
import {Text } from 'react-native-elements';

const NoteView = ({ navigation, route }) => {

  const { date, description, title } = route.params.data
  const calender = moment(date).format('dddd - MMMM Do YYYY')

  return (
    <View style={styles.Container}>
      <Text h4 h4Style={{ color: 'white', marginVertical: 10 }}>{title}</Text>
      <Text h4 h4Style={{ color: 'white', fontSize: 15 }}>{calender}</Text>
      <Text h4 h4Style={{ color: 'white', fontSize: 18, marginVertical: 35, lineHeight: 22, letterSpacing: 1.2 }}>{description}</Text>
      <MaterialIcons style={{backgroundColor:'grey',padding:10,borderRadius:30}}  name="edit" size={30} color="white" onPress={() => { navigation.replace('NoteAdd', { data: route.params.data }) }}/>
    </View>
  )
}

export default NoteView

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#263238',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10
  },
})










