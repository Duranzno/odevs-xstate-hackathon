import React, { useEffect, useState } from 'react'
import { getContacts } from '../functions/getContacts'
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

  // Handle add to selected list
  const [expanded, setExpanded] = React.useState(true)

  const accordionRecruiter =
    contacts.length > 0 &&
    contacts.map((contact, index) => {
      return <ContactItem key={index} contact={contact} />
    })

  const accordionReferences =
    contacts.length > 0 &&
    contacts.map((contact, index) => {
      return <ContactItem key={index} contact={contact} />
    })

  const accordionSelected =
    selected.length > 0 &&
    selected.map((contact, index) => {
      return <ContactSelected key={index} contact={contact} />
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
