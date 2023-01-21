import { createMachine, assign, sendParent } from "xstate";
import { Item } from "../../types";
export const createContactMachine = (item: Item) =>
  /** @xstate-layout N4IgpgJg5mDOIC5QGMD2A7ALgQ2ZgxACoDyA4qQDICiA+gMLECyACtYVQNoAMAuoqAAdUsAJaYRGfiAAeiAJwBmAHQAOAKwB2NQs1yATIu0AaEAE9EKgCx6lGxXq6WNeu4oUBfdybRZcBACJUbJy8UkKi4pJIMogAbGpKAIx6aibmCCqJSmqe3hg4eEoATmDYECLoUPgAylSE9EysdVT+3HzR4WIS6FKyCJaxsaoOCsmpZoiWCkNOcomDCwsauSA+BZjFpeWVRGSUtAwswW1hwl1RoH2Wagk3AypaaYijylzOc4tLK2t+m2UVVVq9QAgnRCABJABqIXagjOkR60Su6myoxSTwQiRUciUnzxgzk33yvxK-x2LXBhBOHXh3V6zy4KiU0w0WMeEwQCgGSi4XD0sUc80Wyy8q2JhUgXR2dAAEsCAHKkGGnCJ0pGITQYtSDXFybRjIm+CXlcTSpiMSnUuGqi4xBAOHHOeKxdEcyzWJTXTQGIVfUU-Y1SqqHC1UxKwkCdBH0+1cR387Wu9LJGwpXnpjO8xKG9ZKSWmqoAIQoAFUAEpWyO0219B22BMu8bpbRMuSM9SWX2DEV5I0bfMA-B0BV0IKVqNqy6IRJ6z1TDQ6FOxFRcQYY5dcJIqeKMhQqPd8vSeUXoVAQOBSAOYFXnRFThAAWmSllRGndM7mcjbLoxD6GGb0a59HdPc9CPf1xQ2UltigG9o3VBA1C4BI9C5BR2WbWIXxUDsuz9XtcwHSo4MnO0Hw0IZtDfTsvw-Vc9HXZclAMORBksPUcIURkc1+c8ABswEwSASJrDVHCUViHibCwXzw-FCWPIA */
  createMachine(
    {
      id: "contact",
      initial: "reading",
      context: item,
      on: {
        TOGGLE_COMPLETE: {
          actions: [
            assign({ completed: true }),
            sendParent((context: Item) => ({ type: "TODO.COMMIT", todo: context }))
          ]
        },
        DELETE: "deleted"
      },
      states: {
        reading: {
          on: {
            SET_COMPLETED: {
              actions: [assign({ completed: true }), "commit"]
            },
            TOGGLE_COMPLETE: {
              actions: [
                assign({ completed: (context: Item) => !context.completed }),
                "commit"
              ]
            },
            SET_ACTIVE: {
              actions: [assign({ completed: false }), "commit"]
            },
            EDIT: {
              target: "editing",
              actions: "focusInput"
            }
          }
        },
        editing: {
          // entry: assign({ prevTitle: (context: Item) => context.title }),
          on: {
            CHANGE: {
              // actions: assign({
              //   title: (_, event) => event.value
              // })
            },
            COMMIT: [
              {
                target: "reading",
                actions: sendParent((context: Item) => ({
                  type: "TODO.COMMIT",
                  todo: context
                })),
                cond: (context: Item) => context.title.trim().length > 0
              },
              { target: "deleted" }
            ],
            BLUR: {
              target: "reading",
              actions: sendParent((context: Item) => ({
                type: "TODO.COMMIT",
                todo: context
              }))
            },
            CANCEL: {
              target: "reading",
              // actions: assign({ title: (context: Item) => context.prevTitle })
            }
          }
        },
        deleted: {
          onEntry: sendParent((context: Item) => ({
            type: "TODO.DELETE",
            id: context.id
          }))
        }
      }
    },
    {
      actions: {
        commit: sendParent((context: Item) => ({
          type: "TODO.COMMIT",
          todo: context
        })),
        focusInput: () => { }
      }
    },

  )