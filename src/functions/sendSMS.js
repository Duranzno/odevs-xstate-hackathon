import * as SMS from 'expo-sms'

/**
 * @description Send sms to contact
 * @param {string} phoneNumber
 * @param {string} message
 * @return {boolean} sent or not sent
 */
export const sendSMS = async (message, phoneNumber) => {
  try {
    const isAvailable = await SMS.isAvailableAsync()

    if (isAvailable) {
      const { result } = await SMS.sendSMSAsync([phoneNumber], message)
      return result
    } else {
      console.log('Unable to send sms')
    }
  } catch (error) {
    console.log(error)
  }
}
