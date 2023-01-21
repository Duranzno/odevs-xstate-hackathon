import { Provider as PaperProvider } from 'react-native-paper'
import Contacts from './src/components/Contacts'
export default function App() {
  return (
    <PaperProvider>
      <Contacts />
    </PaperProvider>
  )
}
