import React, { useEffect, useState } from 'react'
import * as ContactsExpo from 'expo-contacts'
import * as SMS from 'expo-sms'
import { View } from 'react-native'

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

        setSelected(alejandro[0].phoneNumbers[0].number)

        setContacts(data)
      }
    }

    getData()

    return
  }, [])

  useEffect(() => {
    if (selected) {
      const sendSMS = async () => {
        const isAvailable = await SMS.isAvailableAsync()
        console.log(isAvailable)

        if (isAvailable) {
          const { result } = await SMS.sendSMSAsync([selected], 'Que pedos')
          console.log(result)
        } else {
          console.log('Unable to send sms')
        }
      }
      sendSMS()
    }
  }, [selected])

  // Send sms draft function

  // Handle add to selected list
  const handleAdd = (contact) => setSelected((prev) => [...prev, contact])

  // Handle Delete
  const handleRemove = (id) => {
    const filtered = selected.filter((contact) => contact.id !== id)
    setSelected(filtered)
  }

  return <View></View>
}

export default Contacts
