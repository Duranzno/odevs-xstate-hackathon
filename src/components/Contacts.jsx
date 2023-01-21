import React, { useEffect, useState } from 'react'
import { getContacts } from '../functions/getContacts'
import * as ContactsExpo from 'expo-contacts'
import * as SMS from 'expo-sms'
import * as MailComposer from 'expo-mail-composer'
import { View, ScrollView } from 'react-native'
import ContactItem from './ContactItem'
import { List } from 'react-native-paper'

const Contacts = () => {
  const [contacts, setContacts] = useState([]) // List from user's device
  const [recruiter, setRecruiter] = useState({})
  const [selected, setSelected] = useState([])

  // Get contacts on load
  useEffect(() => {
    const getInitial = async () => {
      const data = await getContacts()
      setContacts(data)
    }

    getInitial()
    return
  }, [])

  useEffect(() => {
    console.log(selected)
  }, [selected])
  useEffect(() => {
    console.log(recruiter)
  }, [recruiter])

  // Handle add to selected list
  const handleSelect = (contact) => setSelected((prev) => [...prev, contact])
  const handleSelectRecruiter = (contact) => setRecruiter(contact)

  const [expanded, setExpanded] = React.useState(true)

  const handlePress = () => setExpanded(!expanded)
  const onSelectContact = (c) => console.log(c)

  const accordionRecruiter =
    contacts.length > 0 &&
    contacts.map((contact, index) => {
      return (
        <ContactItem
          key={index}
          contact={contact}
          handlePress={handleSelectRecruiter}
        />
      )
    })

  const accordionReferences =
    contacts.length > 0 &&
    contacts.map((contact, index) => {
      return (
        <ContactItem key={index} contact={contact} handlePress={handleSelect} />
      )
    })

  const accordionSelected =
    selected.length > 0 &&
    selected.map((contact, index) => {
      return (
        <ContactItem
          key={index}
          contact={contact}
          handlePress={() => alert('Hi')}
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

      <List.Section title='Selected'>
        <List.Accordion title='Your References'>
          {accordionSelected}
        </List.Accordion>
      </List.Section>
    </View>
  )
}

export default Contacts
