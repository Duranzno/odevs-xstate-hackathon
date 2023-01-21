import * as Contacts from 'expo-contacts'

/**
 * @description Get permission and set contacts
 * @returns {Array} data
 */
export const getContacts = async () => {
  try {
    const { status } = await Contacts.requestPermissionsAsync()

    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.FirstName],
        fields: [Contacts.Fields.LastName],
        fields: [Contacts.Fields.Emails],
        fields: [Contacts.Fields.PhoneNumbers]
      })

      return data
    } else {
      return []
    }
  } catch (error) {
    console.log(error)
  }
}
