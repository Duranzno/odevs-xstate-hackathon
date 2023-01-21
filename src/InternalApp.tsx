import { useMachine, useSelector } from '@xstate/react'
import { Contact } from 'expo-contacts'
import React from 'react'
import Contacts from './components/Contacts'
import { appMachine } from './machines/appMachine'
import { Text, Button } from 'react-native-paper'
import { prepareMSG, sendSMS } from './functions/sendSMS'
import { sendEmail } from './functions/sendEmail'
import { Item } from './types'
async function fn(references: Item[], recruiter?: Item) {
  try {

    await references?.forEach(async (c) => {
      console.log(c)
      const number = c.contact.phoneNumbers.find((e) => e.number).number
      console.log({ number, c })
      await sendSMS(prepareMSG(c.contact), number)
    })
    return Promise.resolve("finished")
  } catch (error) {
    return Promise.reject("error")
  }

}
export const InternalApp = () => {

  const [state, send, service] = useMachine(appMachine, {
    devTools: true,
  })
  React.useEffect(() => () => { service.stop() }, [])
  const isSaving = useSelector(service, s => s.value === "SENDING")
  const isEmailing = useSelector(service, s => s.value === "sending email")
  React.useEffect(() => {
    console.log(state.context)
    console.log(state.value)
    console.log({ isSaving, isEmailing })
    if (isSaving) {
      try {
        const { references, recruiter } = state.context
        send("finish")
      } catch (error) {
        console.log(error)
        send("finish")

      }
    }
    if (isEmailing) {
      try {
        const { references, recruiter } = state.context
        sendEmail(recruiter?.contact, references)
        send("finish")
      } catch (error) {
        console.log(error)
        send("finish")

      }
    }

  }, [isSaving, isEmailing, state])
  // const props = {
  //   addReference: (c: Contact) => send("ADD_REFERENCE", c),
  //   addRecruiter: (c: Contact) => send("ADD_RECRUITER", c),
  // }


  return (
    <>
      <Text>v10</Text>
      <Contacts
        addReferences={(c: Contact) => {
          send('SELECT_REFERENCES', c)
        }}
        addRecruiter={(c: Contact) => send('SELECT_RECRUITER', c)}
      />

      <Button mode='contained' onPress={() => send("sendEMAIL")}>Notify My Recruiter</Button>
      <Button mode='contained' onPress={() => send("sendSMS")}>Notify My Referrals</Button>

    </>
  )
}
