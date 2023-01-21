import { createMachine, assign, sendParent } from "xstate";

export const createTodoMachine = ({ id, title, completed }) =>
  machine;
  //** Message https://stately.ai/registry/editor/56f1034b-d743-4833-9eb3-47af444f9c8b?machineId=d197bd6a-c522-4797-a3d9-8b57a94a00ba */
  export const machine=
/** @xstate-layout N4IgpgJg5mDOIC5QBcD2FUGIAqB5A4vgDICiA+gMK4CyACqdiQNoAMAuoqAA6qwCWyPqgB2nEAA9EAJgDsAFgB0AZgCcLAGxKWK9TICsARjkq5AGhABPRPr0K5cvUoMmDADiXqWSgL7fzaDEwAERIGZnYxHn5BETFJBHUpcysEVwM7FUyVeVc9YyUpKV9-dFQFACcwAEMIPmEoTABlEmxKGnoWkiDWDiQQKIEhUT74vS8FFjl1V1cZAxYDAyU5s0tEQ3U7GRUDPVnjTINikACyypq6hrxCUja6MJ7I3kHYkcRjdJk0qXVnJTGpJlkohVEoJjIpK4VLNDPINHJjqcKtVavUmi0yABBCjYACSADVwr1uM8YsNQKMpJ89F9CqC5LskmsED8VAp1BzNDClMYWFI9IjSsiLmiurjsI8+gMyXEQTyFHoVMs9HkZBo0jJgQglMt2QV3NoWDTpkU-CchZBBmiKAAJTEAOXwRKe0SGstSLAUi31enUKrkLDVqxSOs98yVrkhrl0ch1gowCktgmtNGo4slJNdrwp0n+ChUjiWPJYRsBiS1scULFyBa0Op2iXjZSTl0wVGoaYlBmJ-VJbreLLztaLAdLOiZKSkfIUUgOStjHgDKqbidqyYaACEiABVABKGd7WfJElztmHOtHejLE-WWgVqkDGyn6ljK5b1odFFCB+l-Zzg7PQsLxLK9xy1RJNkyKlskBPkDCkHxjmEdA4DEU4XReY94iMLUAFpNhLQiiKIowV3OVEoAwmUBzydIpm0K8aUjGQX3A+wFBmWj9kjBkETNJF30oqU+2zE8EhvBBY3SX1+SNBY5ChJYVwgMAABswGQSAqL-MTaK9YcZjkQpNAMLUDBfL1OTULklHcI5fG8IA */
createMachine(
    {
      id: "todo",
      initial: "reading",
      context: {
        id,
        title,
        prevTitle: title,
        completed
      },
      on: {
        TOGGLE_COMPLETE: {
          actions: [
            assign({ completed: true }),
            sendParent((context) => ({ type: "TODO.COMMIT", todo: context }))
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
                assign({ completed: (context) => !context.completed }),
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
          entry: assign({ prevTitle: (context) => context.title }),
          on: {
            CHANGE: {
              actions: assign({
                title: (_, event) => event.value
              })
            },
            COMMIT: [
              {
                target: "reading",
                actions: sendParent((context) => ({
                  type: "TODO.COMMIT",
                  todo: context
                })),
                cond: (context) => context.title.trim().length > 0
              },
              { target: "deleted" }
            ],
            BLUR: {
              target: "reading",
              actions: sendParent((context) => ({
                type: "TODO.COMMIT",
                todo: context
              }))
            },
            CANCEL: {
              target: "reading",
              actions: assign({ title: (context) => context.prevTitle })
            }
          }
        },
        deleted: {
          onEntry: sendParent((context) => ({
            type: "TODO.DELETE",
            id: context.id
          }))
        }
      }
    },
    {
      actions: {
        commit: sendParent((context) => ({
          type: "TODO.COMMIT",
          todo: context
        })),
        focusInput: () => {}
      }
    }
  )