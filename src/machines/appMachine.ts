import {
  createMachine,
  assign,
  spawn,
  actions,
  Actor,
  ActorRef,
  AnyActorRef,
  ActorRefFrom
} from 'xstate'
import uuid from 'uuid-v4'
import { Item, UsableContact } from '../types'
import { createContactMachine } from './contactMachine'

function createItem(contact: UsableContact): Item {
  return {
    id: uuid(),
    contact,
    notified: false
  }
}

type Context = {
  references: Item[]
  recruiter: Item
}

export const appMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBcD2FWwMQGUCiAMngMIAqA+gEomUCqAkqXpQNoAMAuoqAA6YCWyfqgB23EAA9EANgDMAdgB0AJgAcATjbTlAVgA0IAJ6Idy6YtlsALNNXydAXwcG0GbPiJkqeAGLM8AHLEeOxcSCB8sILCYuFSCHJKapra+kYmZhbWtvZOLuiYWKQA8gAixYrExQCy1Yyh4pHRouLxAIyqbSoaWroGxghqqlk2do7OIK6FJeWKpYR4TA3hTUItcYiynYpsbeo6sm196YOqw5ajuRNT7gASxQDqy7wCa7Gg7dvJvWkDQyM5cb5NxYaoAQUoAGlFABjVAAWx4ABswMhIM8Iq8Yq1EMobIo9uplB17P1EG0rDpFDodKodOoFEDJgVsOCoYoAIYwoQANzAGNW2I2g1kilUVkZZIQe1FbTasjURyZNywxCIEPIVWqAAUiExSgKsesPogALQyglWSmHY4DKzyUUKNpsBlXCYidBwcQ3RpG96ScmyUXfVJS0zmC6AvLMtyKABOYA5EAGLyibxx0q+PVDJ2k8rF2TGTicQA */
  createMachine<Context>({
    id: 'todos',
    preserveActionOrder: true,
    context: {
      references: [],
      recruiter: undefined
    },
    initial: 'ready',
    states: {
      ready: {}
    },
    on: {
      SELECT_RECRUITER: {
        actions: [
          assign({
            recruiter: (context, event) => {
              //@ts-ignore
              const newContact = createItem({ ...event })
              return newContact
            }
          }),
          'persist'
        ]
      },
      SELECT_REFERENCES: {
        actions: [
          assign({
            references: (context, event) => {
              //@ts-ignore
              const newContact = createItem(event)

              return context.references.concat(newContact)
            }
          }),
          'persist'
        ]
      }
    }
  })
