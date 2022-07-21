import { StyleSheet, SafeAreaView } from 'react-native';
import {NoteView, Home, NoteAdd } from "./Screens/index"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
        <Stack.Screen name='NoteAdd' options={{ headerTintColor: 'white', title: 'Add Note', headerTitleAlign: 'center', headerBackVisible: true, headerStyle: { backgroundColor: '#192129' } }} component={NoteAdd} />
        <Stack.Screen name='NoteItem' options={{ headerTintColor: 'white', title: 'My Note', headerTitleAlign: 'center', headerBackVisible: true, headerStyle: { backgroundColor: '#192129' } }} component={NoteView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
});
