import { createMachine, assign, sendParent } from "xstate";
import { Item } from "../types";

export const createContactMachine = ({ id, title, notified, contact }: Item) =>
  createMachine(
    {
      id: "todo",
      initial: "reading",
      context: {
        id,
        contact,
        notified,
      },
      on: {
        TOGGLE_COMPLETE: {
          actions: [
            assign({ notified: true }),
            sendParent((context: any) => ({ type: "TODO.COMMIT", todo: context }))
          ]
        },
        DELETE: "deleted"
      },
      states: {
        reading: {
          on: {
            SET_COMPLETED: {
              actions: [assign({ notified: true }), "commit"]
            },
            TOGGLE_COMPLETE: {
              actions: [
                assign({ notified: (context: any) => !context.notified }),
                "commit"
              ]
            },
            SET_ACTIVE: {
              actions: [assign({ notified: false }), "commit"]
            },
            EDIT: {
              target: "editing",
              actions: "focusInput"
            }
          }
        },
        editing: {
          on: {
            COMMIT: [
              {
                target: "reading",
                actions: sendParent((context: any) => ({
                  type: "TODO.COMMIT",
                  todo: context
                })),
              },
            ],
            BLUR: {
              target: "reading",
              actions: sendParent((context: any) => ({
                type: "TODO.COMMIT",
                todo: context
              }))
            },
            CANCEL: {
              target: "reading",
            }
          }
        },
        deleted: {
          onEntry: sendParent((context: any) => ({
            type: "TODO.DELETE",
            id: context.id
          }))
        }
      }
    },
    {
      actions: {
        commit: sendParent((context: any) => ({
          type: "TODO.COMMIT",
          todo: context
        })),
        focusInput: () => { }
      }
    }
  );
