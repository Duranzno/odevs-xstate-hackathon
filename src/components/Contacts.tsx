import React, { useEffect, useState } from 'react'
//@ts-ignore no declaration
import { getContacts } from '../functions/getContacts'
import { View, ScrollView } from 'react-native'
import ContactItem from './ContactItem'
import { List } from 'react-native-paper'
import { Contact } from 'expo-contacts'
const Contacts: React.FC<{
  addReferences: (c: Contact) => void
  addRecruiter: (c: Contact) => void
}> = ({ addRecruiter, addReferences }) => {
  const [contacts, setContacts] = useState([]) // List from user's device

  // Get contacts on load
  useEffect(() => {
    const getInitial = async () => {
      const data = await getContacts()
      setContacts(data)
    }

    getInitial()
    return
  }, [])

  // Handle add to selected list
  const [expanded, setExpanded] = React.useState(true)

  const accordionRecruiter =
    contacts.length > 0 &&
    contacts.map((contact, index) => {
      return (
        <ContactItem
          key={index}
          contact={contact}
          onPress={() => {
            addRecruiter(contact)
          }}
        />
      )
    })

  const accordionReferences =
    contacts.length > 0 &&
    contacts.map((contact, index) => {
      return (
        <ContactItem
          key={index}
          contact={contact}
          onPress={() => addReferences(contact)}
        />
      )
    })

  return (
    <View>
      <List.Section title='Contacts List'>
        <ScrollView>
          <List.Accordion title='Select Recruiter'>
            {accordionRecruiter}
          </List.Accordion>
          <List.Accordion title='Select Your References'>
            {accordionReferences}
          </List.Accordion>
        </ScrollView>
      </List.Section>
    </View>
  )
}

export default Contacts
