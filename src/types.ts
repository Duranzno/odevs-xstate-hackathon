import { Contact } from 'expo-contacts'

export type UsableContact = Pick<Contact, 'name' | 'phoneNumbers' | 'emails'>
export type Item = {
  contact?: UsableContact
  id: string
  notified: boolean
}
