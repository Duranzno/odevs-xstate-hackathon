import { useMachine } from '@xstate/react'
import { Contact } from 'expo-contacts'
import React from 'react'
import Contacts from './components/Contacts'
import { appMachine } from './machines/appMachine'

export const InternalApp = () => {

  const [state, send, service] = useMachine(appMachine, {
    devTools: true,
    // services: {
    //   sendSMS: () => { return Promise.resolve() },
    //   sendMail: () => Promise.resolve(),
    // },
    // actions: {
    //   sendSMS: (...args) => console.log("sendsms", args),
    //   sendMail: (...args) => console.log("sendmail", args),
    // },
  })
  React.useEffect(() => () => { service.stop() }, [])
  // const props = {
  //   addReference: (c: Contact) => send("ADD_REFERENCE", c),
  //   addRecruiter: (c: Contact) => send("ADD_RECRUITER", c),
  // }

  return (
    <Contacts />
  )
}