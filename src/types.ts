import { Contact } from "expo-contacts";

export type UsableContact = Pick<Contact, 'name' | "phoneNumbers" | 'emails'>;
export type Item = {
  contact?: UsableContact;
  title: string;
  id: string; notified: boolean;
};
