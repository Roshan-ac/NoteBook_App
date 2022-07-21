import { StyleSheet, View, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button, } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NoteAdd = ({ navigation, route }) => {

  const [noteTitle, setNoteTitle] = useState('');
  const [noteDesc, setNoteDesc] = useState('');
  const [date, setDate] = useState(new Date())
  const [showDate, setShowDate] = useState(false)


  const AddNote = async () => {
    const NoteArray = []
    if (noteTitle !== '' && noteDesc !== '') {
      const NoteObject = {
        title: noteTitle,
        date: date,
        description: noteDesc,
      }
      try {
        await AsyncStorage.getItem('Note', (err, result) => {
          const data = JSON.parse(result).concat(NoteObject)
          const NoteArray = data.map((_, i) => ({
            title: data[i].title,
            description: data[i].description,
            date: data[i].date,
            key: `${i}`
          }))
          AsyncStorage.setItem('Note', JSON.stringify(NoteArray))
        })
        navigation.replace('Home')
      } catch (error) {
        console.log(error)
      }
    } else {
      alert('Title and Note should not be empty')
    }
  }
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowDate(false);
    setDate(currentDate);
  };
  const EditNote = async (NoteKey) => {
    try {
      await AsyncStorage.getItem('Note', (err, result) => {
        const NoteArray = JSON.parse(result)
        const EditedNote = NoteArray.filter(note => {
          if (note.key === NoteKey) {
            note.title = noteTitle,
              note.description = noteDesc,
              note.date = date
          }
          return note
        })
        AsyncStorage.setItem('Note', JSON.stringify(EditedNote))
      })
      navigation.replace('Home')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (route.params !== undefined) {
      navigation.setOptions({
        title: 'Edit Note',
        headerTitleStyle: { color: 'white' },
        headerTintColor: 'white',
      })

      setNoteDesc(route.params.data.description)
      setNoteTitle(route.params.data.title)
      setDate(new Date(route.params.data.date))
    }
  }, [])

  return (
    <View style={styles.Container}>
      <TextInput defaultValue={noteTitle} placeholderTextColor={'white'} onChangeText={text => setNoteTitle(text)} style={{ borderColor: 'white', color: 'white', borderRadius: 10, width: 250, paddingHorizontal: 15, paddingVertical: 5, borderWidth: 1 }} placeholder='Add a title' />
      <TextInput defaultValue={noteDesc} placeholderTextColor={'white'} onChangeText={text => setNoteDesc(text)} multiline={true} numberOfLines={8} style={{ borderColor: 'white', color: 'white', marginTop: 10, borderRadius: 10, width: 250, paddingHorizontal: 15, paddingVertical: 5, borderWidth: 1 }} placeholder='Add a note' />
      <Button type='clear' titleStyle={{ color: 'white' }} buttonStyle={{ marginVertical: 10, borderRadius: 10 }} title='Choose Date' onPress={() => setShowDate(true)} />
      {
        route.params === undefined ?
          <Button type='outline' titleStyle={{ color: 'white' }} buttonStyle={{ borderWidth: 2, borderColor: 'white', borderRadius: 10, width: 100 }} title='Add' onPress={AddNote} />
          : <Button type='outline' titleStyle={{ color: 'white' }} buttonStyle={{ borderWidth: 2, borderColor: 'white', borderRadius: 10, width: 100 }} title='Save' onPress={() => EditNote(route.params.data.key)} />
      }
      {showDate &&
        <DateTimePicker value={date} is24Hour={true}
          onChange={onChange} />
      }
    </View>
  )
}

export default NoteAdd

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: '#263238'
  },
})