import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import Contacts from './Contacts'
import { Provider as PaperProvider } from 'react-native-paper';
import {MyComponent} from './MyComponent'
export default function App() {
  
  return (
    <PaperProvider>
      <Provider>
      {/* <StatusBar style='auto' /> */}
      </Provider>
    </PaperProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
