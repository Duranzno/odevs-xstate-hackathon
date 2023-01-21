import React, { useEffect, useState } from 'react'
import { getContacts } from '../functions/getContacts'
import * as ContactsExpo from 'expo-contacts'
import * as SMS from 'expo-sms'
import * as MailComposer from 'expo-mail-composer'
import { View, ScrollView } from 'react-native'
import { List } from 'react-native-paper'

const Contacts = () => {
  const [contacts, setContacts] = useState([]) // List from user's device
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

  // Handle add to selected list
  const handleSelect = (contact) => setSelected((prev) => [...prev, contact])

  const [expanded, setExpanded] = React.useState(true)

  const handlePress = () => setExpanded(!expanded)
  const onSelectContact = (c) => console.log(c)

  const accordionItems =
    contacts.length > 0 &&
    contacts.map((contact, index) => {
      const phoneNumbers = contact.phoneNumbers

      const description = `Phone Number: ${phoneNumbers && phoneNumbers[0].number
        }`
      return (
        <List.Item
          onPress={() => handleSelect(contact)}
          key={index}
          title={contact.name}
          description={description}
          left={(props) => <List.Icon {...props} icon='equal' />}
        />
      )
    })

  return (
    <View>
      <List.Section title='Contacts List'>
        <ScrollView>
          <List.Accordion title='Select Recruiter'>
            {accordionItems}
          </List.Accordion>
        </ScrollView>
      </List.Section>
    </View>
  )
}

export default Contacts
