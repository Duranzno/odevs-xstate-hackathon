import * as MailComposer from 'expo-mail-composer'
import { sendSMS } from './sendSMS'

/**
 * @description Generate list of contacts
 * @param {Array} contacts
 * @return {string} String with list of contacts
 */
const generateList = (contacts) => {
  let list = ''

  for (let i = 0; i < contacts.length; i++) {
    const contactString = `Name: ${contacts[i].contact.name} \n Phone Number: ${contacts[i].contact.phoneNumbers[0].number
      } \n Email: ${contacts[i].contact.email || ''}\n Title: ${contacts[i].contact.title
      } \n Company: ${contacts[i].contact.company || ''}`

    list += '\n' + contactString + '\n'
  }

  return list
}

/**
 * @description Send email to recruiter with the list of selected contacts
 * @param {string} recruiterName
 * @param {string} recruiterEmail
 * @param {string} recruiterPhoneNumber
 * @param {Array} selectedContacts
 * @return {boolean} send or cancelled
 */
export const sendEmail = async (recruiter, selectedContacts) => {
  try {
    const list = generateList(selectedContacts)
    const message = `Hello ${recruiter.name}, I'm sending the list of referrals with their respective info: ${list}`


    const isAvailable = await MailComposer.isAvailableAsync()

    if (isAvailable) {
      const email = await MailComposer.composeAsync({
        body: message,
        recipients: `${recruiter.email || ''}`,
        subject: 'Referrals'
      })
      console.log(email)
    }
  } catch (error) {
    console.log(error)
  }
}
