import React, { useEffect, useRef } from 'react'
import { useActor } from '@xstate/react'
import { List } from 'react-native-paper'
import { Contact } from 'expo-contacts'
const ContactItem: React.FC<{
  onPress: Function
  contact: Contact
  ref?: any
}> = ({ contact, onPress }) => {
  // const [state, send] = useActor()
  // const inputRef = useRef(null)

  // useEffect(() => {
  //   if (state.actions.find((action) => action.type === 'focusInput')) {
  //     inputRef.current && inputRef.current.select()
  //   }
  // }, [state.actions, todoRef])

  return (
    <List.Item
      onPress={() => onPress()}
      title={contact?.name}
      left={(props) => <List.Icon {...props} icon='equal' />}
    />
  )
}

export default ContactItem
