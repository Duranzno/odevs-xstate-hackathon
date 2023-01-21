import React, { useEffect, useRef } from 'react'
import { useActor } from '@xstate/react'
import { List, IconButton } from 'react-native-paper'
import { IconButton, MD3Colors } from 'react-native-paper'

const ContactSelected = (contact) => {
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
      right={(props) => (
        <IconButton {...props} icon='camera' onPress={() => alert('sent')} />
      )}
    />
  )
}

export default ContactSelected
