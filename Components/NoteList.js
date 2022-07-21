import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState, useLayoutEffect } from 'react'
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { SwipeListView } from 'react-native-swipe-list-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { ListItem, Text } from 'react-native-elements';





const NoteList = ({ navigation }) => {
  const [Note, setNote] = useState(null)
  const [swipedOpenKey, setSwipedOpenKey] = useState(null)


  useEffect(() => {
    getData().then(data => setNote(data));

  }, [])


  const RenderItem = ((data) => {
    const rowItemKey = swipedOpenKey === data.item.key ? true : false
    const { date, title } = data.item
    let calender = moment(date).format('dddd - MMMM Do YYYY')

    return (
      <>
        {
          !rowItemKey ?
            <ListItem containerStyle={{ marginVertical: 5, borderRadius: 10, borderBottomWidth: 2, borderTopWidth: 2, backgroundColor: '#1e2b32', height: 80 }}>
              <ListItem.Content key={data.item.key} >

                <ListItem.Title style={{ paddingVertical: 10, alignSelf: 'center', color: 'white', fontSize: 18, letterSpacing: 1 }}>{title}</ListItem.Title>
                <ListItem.Subtitle style={{ alignSelf: 'center', color: 'white', fontSize: 12 }}>{calender}</ListItem.Subtitle>

              </ListItem.Content>
            </ListItem>
            :
            <ListItem containerStyle={{ marginVertical: 5, borderRadius: 10, borderBottomWidth: 2, borderTopWidth: 2, backgroundColor: '#132432', height: 80 }}>
              <ListItem.Content key={data.item.key} >

                <ListItem.Title style={{ paddingVertical: 10, alignSelf: 'center', color: '#f6581a', fontSize: 18, letterSpacing: 1 }}>{title}</ListItem.Title>
                <ListItem.Subtitle style={{ color: '#d58261', alignSelf: 'center', fontSize: 12 }}>{calender}</ListItem.Subtitle>

              </ListItem.Content>
            </ListItem>
        }
      </>
    )
  })


  const RenderHiddenItem = ((data, rowMap) => {
    return (
      <ListItem containerStyle={{ height: 79, marginVertical: 5, borderRadius: 12 }}>
        <ListItem.Content style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Feather name="eye" size={25} color="black" onPress={() => { navigation.navigate('NoteItem', { data: data.item }) }} />
          <MaterialIcons name="delete" size={30} color="red" onPress={() => deleteShedule(data.index, rowMap)} />
        </ListItem.Content>
      </ListItem>
    )
  })


  const deleteShedule = (async (rowKey) => {
    const newNote = [...Note]
    const noteIndex = newNote.findIndex(note => note.key == rowKey)
    newNote.splice(noteIndex, 1)
    setNote(newNote)
    await AsyncStorage.removeItem('Note')
    await AsyncStorage.setItem('Note', JSON.stringify(newNote))


  })

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('Note')
      return JSON.parse(jsonValue)
    } catch (e) {
    }
  }



  return (
    <>
      <SwipeListView
        data={Note}
        useNativeDriver
        renderItem={RenderItem}
        renderHiddenItem={RenderHiddenItem}
        rightOpenValue={-60}
        leftOpenValue={60}
        previewRowKey={""}
        showsVerticalScrollIndicator={false}
        style={{ marginVertical: 20, width: 340 }}
        onRowOpen={(rowKey, rowMap) => {
          setSwipedOpenKey(rowKey)
        }}
        onRowClose={(rowKey) => {
          setSwipedOpenKey(null)
        }}


        ListEmptyComponent={() => {
          return (
            <View style={styles.EmptyShow}>
              <Text style={{ color: 'white', fontSize: 15, marginVertical: 10 }}>Nothing to Show !</Text>
              <Text style={{ color: 'white', fontSize: 12 }}>Click on add icon to add Some Note</Text>
            </View>
          )
        }}
      />
    </>
  )
}



export default NoteList

const styles = StyleSheet.create({
  EmptyShow: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 550
  }
})


