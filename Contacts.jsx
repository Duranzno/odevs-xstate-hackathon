import React, { useEffect, useState } from 'react'
import * as ContactsExpo from 'expo-contacts'
import * as SMS from 'expo-sms'
import * as MailComposer from 'expo-mail-composer'
import { View, Text } from 'react-native'

const Contacts = () => {
  const [contacts, setContacts] = useState([]) // List from user's device
  const [selected, setSelected] = useState(null)

  // Get contacts on load
  useEffect(() => {
    const getData = async () => {
      const { status } = await ContactsExpo.requestPermissionsAsync()

      if (status === 'granted') {
        const { data } = await ContactsExpo.getContactsAsync({
          fields: [ContactsExpo.Fields.FirstName],
          fields: [ContactsExpo.Fields.LastName],
          fields: [ContactsExpo.Fields.Emails],
          fields: [ContactsExpo.Fields.PhoneNumbers]
        })

        const alejandro = data.filter(
          (contact) => contact.firstName === 'Duran'
        )

        setSelected(alejandro[0])

        setContacts(data)
      }
    }

    getData()

    return
  }, [])

  useEffect(() => {
    if (selected) {
      const sendSMS = async () => {
        try {
          const isAvailable = await SMS.isAvailableAsync()
          console.log(isAvailable)

          // alejandro[0].phoneNumbers[0].number
          // alejandro[0]

          if (isAvailable) {
            const { result } = await SMS.sendSMSAsync(
              [selected.phoneNumbers[0].number],
              `Hello, ${selected.name}, I'm reaching out because I'd like to add you as my referral for X - Job. You may receive a call from this number.`
            )
            console.log(result)
          } else {
            console.log('Unable to send sms')
          }
        } catch (error) {
          console.log(error)
        }
      }
      // sendSMS()

      const sendEmail = async () => {
        try {
          const isAvailable = await MailComposer.isAvailableAsync()

          if (isAvailable) {
            const email = await MailComposer.composeAsync({
              body: `Hello {recruiter}, I'm sending the list of referrals with their respective info: [List]`,
              recipients: `Aledurax@gmail.com`,
              subject: 'Referrals'
            })

            console.log(email)
          } else {
            console.log('Error')
          }
        } catch (error) {
          console.log(error)
        }
      }

      // sendEmail()
    }
  }, [selected])

  // Send sms draft function
  const handleSendSMS = async () => {
    try {
      const isAvailable = await SMS.isAvailableAsync()

      if (isAvailable) {
        const { result } = await SMS.sendSMSAsync(
          [selected.phoneNumbers[0].number],
          `Hello, ${selected.name}, I'm reaching out because I'd like to add you as my referral for X - Job. You may receive a call from this number.`
        )
        console.log(result)
      } else {
        console.log('Unable to send sms')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleSendEmail = async () => {
    try {
      const isAvailable = await MailComposer.isAvailableAsync()

      if (isAvailable) {
        const email = await MailComposer.composeAsync({
          body: `Hello {recruiter}, I'm sending the list of referrals with their respective info: [List]`,
          recipients: `Aledurax@gmail.com`,
          subject: 'Referrals'
        })

        console.log(email)
      } else {
        console.log('Error')
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Handle add to selected list
  const handleAdd = (contact) => setSelected((prev) => [...prev, contact])

  // Handle Delete
  const handleRemove = (id) => {
    const filtered = selected.filter((contact) => contact.id !== id)
    setSelected(filtered)
  }

  return (
    <View>
      <Text>Select Contact</Text>
    </View>
  )
}

export default Contacts
