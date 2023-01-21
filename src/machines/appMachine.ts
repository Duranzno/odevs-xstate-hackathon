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

  /** @xstate-layout N4IgpgJg5mDOIC5QBcD2FWwMQGUCiAMngMIAqA+gEomUCqAkqXpQNoAMAuoqAA6YCWyfqgB23EAA9EARgCsAFgB0AJmnyAHPIDMAdlkAaEAE8ZbdYvmyt05bIC+dw2gzZ8RMlTwAxZngByxHg47FxIIHywgsJiYVIIajqKAGx6Ouo2BsYyyg5O6JiKAE5gAIYQRliwYCIQOACywZziEVGi4nHSKSrS6nqGJgjabIoAnGxJqiMayvKTuSDOBfh+ACL0fgDiWABm-CL8sAAWIc0CQm2xiMpsI4psOmzWtv2IWurD8uO284uwRaXlSrVCB4OoAQXoBBOYRa5xioA6XVUvUyAy0yluYwm9kcC3yfyqNT2UAABGAALYlfgAGx2ewOxyaMLO0XaVxudweT1RVx0t0+2IcuJE6Dg4l+p0icLZCAAtNIXvERtJRl8cXkXP8ygNeCyLgjEPIdIqMcMRrJBbjfoplmtNpLWvDJK8bIoMoq3uYRupzUl3jpLPJZuq8ZrCRBiWTKTSHdLLggnm7nlkEMpeqMfbJ1Foc7mc0K7EA */
  createMachine<Context>({
    id: 'todos',
    preserveActionOrder: true,
    predictableActionArguments: true,
    context: {
      references: [],
      recruiter: undefined
    },
    initial: 'ready',
    states: {
      ready: {
        on: {
          sendSMS: "SENDING",
          sendEMAIL: "sending email"
        }
      },

      SENDING: {
        on: {
          finish: "ready"
        }
      },

      "sending email": {
        on: {
          finish: "ready"
        }
      }
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
        ]
      },
    }
  }
  )