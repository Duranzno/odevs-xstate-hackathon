import React, { useEffect, useRef } from 'react'
import { useActor } from '@xstate/react'
import { List } from 'react-native-paper'

const ContactItem = (contact) => {
  const [state, send] = useActor(contact)
  const inputRef = useRef(null)

  useEffect(() => {
    if (state.actions.find((action) => action.type === 'focusInput')) {
      inputRef.current && inputRef.current.select()
    }
  }, [state.actions, todoRef])

  return (
    <List.Item
      onPress={() => send(contact)}
      title={contact.contact.name}
      left={(props) => <List.Icon {...props} icon='equal' />}
    />
  )
}

export default ContactItem
