import { Contact } from "expo-contacts";

type UsableContact = Pick<Contact, 'name' | "phoneNumbers" | 'emails'>;
export type Item = { contact?: UsableContact; title: string; id: string; completed: boolean; };
