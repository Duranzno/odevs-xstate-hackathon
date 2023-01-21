import { useMachine } from '@xstate/react'
import { Contact } from 'expo-contacts'
import React from 'react'
import Contacts from './components/Contacts'
import { appMachine } from './machines/appMachine'
import { Text, Button } from 'react-native-paper'
export const InternalApp = () => {
  const [state, send, service] = useMachine(appMachine, {
    devTools: true
    // services: {
    //   sendSMS: () => { return Promise.resolve() },
    //   sendMail: () => Promise.resolve(),
    // },
    // actions: {
    //   sendSMS: (...args) => console.log("sendsms", args),
    //   sendMail: (...args) => console.log("sendmail", args),
    // },
  })
  React.useEffect(
    () => () => {
      service.stop()
    },
    []
  )
  // const props = {
  //   addReference: (c: Contact) => send("ADD_REFERENCE", c),
  //   addRecruiter: (c: Contact) => send("ADD_RECRUITER", c),
  // }
  React.useEffect(() => {
    console.log('state', JSON.stringify(state.context))
  }, [state.context])

  return (
    <>
      <Text>v8</Text>
      <Contacts
        addReferences={(c: Contact) => {
          send('SELECT_REFERENCES', c)
        }}
        addRecruiter={(c: Contact) => send('SELECT_RECRUITER', c)}
      />
      {state.context.recruiter && (
        <Button>{JSON.stringify(state.context.recruiter)}</Button>
      )}
      {state.context.references.map((c) => (
        <Button key={c.id}>{JSON.stringify(c)}</Button>
      ))}
      {/* <List.Section title='Selected'>
        <List.Accordion title='Your References'>
          {accordionSelected}
        </List.Accordion>
      </List.Section> */}
    </>
  )
}
