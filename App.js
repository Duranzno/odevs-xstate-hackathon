import { Provider as PaperProvider } from 'react-native-paper';
import { InternalApp } from './src/InternalApp';

export default function App() {
  return (
    <PaperProvider>
      <InternalApp />
    </PaperProvider>
  )
}
