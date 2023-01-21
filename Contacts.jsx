import React, { useEffect, useState } from 'react'
import * as ContactsExpo from 'expo-contacts'
import { View } from 'react-native'

const Contacts = () => {
  const [contacts, setContacts] = useState([]) // List from user's device
  const [selected, setSelected] = useState([])

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

        setContacts(data)
      }
    }

    getData()

    return
  }, [])
  console.log(contacts[0])

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
