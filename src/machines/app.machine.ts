import { createMachine, assign, spawn, actions } from "xstate";
import uuid from "uuid-v4";
import { createContactMachine } from "./contact.machine";
import { Contact, ContactResponse } from "expo-contacts";

function createTodo(title) {
  return {
    id: uuid(),
    title,
    completed: false
  };
}

export const appMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QFsCGBjAFgSwHZgGIB5AOQH0SiAVASQDEBNAbQAYBdRUABwHtZsALth65OIAB6IALAEYAzADoZADgDsAVhbqZMgJyrdAJmUAaEAE9EuloqlT1cubqNTlLFroC+ns2ix5CEgBRAHUqIgARIgUAYSIAWXiaKlYOJBBefiERMUkEAFoZADZFFmVdZTkZGw85FlVDM0sEauKFG21lYqLVOr1vXwwcfAJwqNiEpJT2MUzBYVF0vJl1VQUpIxUe1R69GSbEavqFIvUiw16pDzdDLx8QP2HCMeiIoIAZIKog1Nm+eZyS0ORRkSjUmjsFxYUiKRQOCGUyikCkMmhYhhkV0MdSkAweQwCBAAygAJIghX7pObZRagZaIhQGW4aDRFKRVOTw1RqRm6IqI5xyXpFO6DfwjeIAQQASgBpBToHjILgAGzAAkglO4-xpuUOmnaUmZMlR1RhqPhItBcnZGiRDXZTjxj0JUrlCgwQgAbmAtRkdQs9S1YSciiwVpUSnJVo0LIh1LpkeUWOdVO5VBtys6CSMYp8ZWQ4vEAAqfb4RP3UwNAlpyZTrIWaFSJ3TRwyx5pSVSg1y29TZ8VgBQqnioCB4KAESsBwF0-X1oXlFZh9Rd1twuO1jMKOTGYoyDMHiEDp7D0fj3CTpgyNLarLVuctXo7hN19nqVcGOQb5oRtYm8o7CjdQ3Fxe4XXwBQSSVQgRElWAAGtizAAAnZBsFgfgRGne9ZwkRB8nUQwFAcbQzgtTcVg0Rku3qGwTX7cCc0CUIXliElJRIABxH4ZipGdaXwhA62IzRuUMI0nBTBxVHhap+V5W59A8Qx6mKbx7lwHgIDgMQILAP5cMEvJCncEjo2XCjf2MIoSOXEFEwxD8TwCM8xwnQyAWMgjbKNVYuisw4hWRcMzgco0VkYsVTxQsAx2aO8vKDRxdBIz93H0D81E5SiiNShibAuVFI1UFzIOg5ADP4oyg2UdQUXowLg2jGi0zTKpUQ0zwgA */
  createMachine<{ todos: Contact[], todo: string, filter: string }>({
    id: "machine",
    preserveActionOrder: true,
    context: {
      todo: "", // new todo
      todos: [] as Contact[],
      filter: "all"
    },
    initial: "loading",
    states: {
      loading: {
        entry: assign({
          todos: (context) => {
            console.log(context);
            // "Rehydrate" persisted todos
            return context.todos.map((todo) => ({
              ...todo,
              ref: spawn(createContactMachine(todo))
            }));
          }
        }),
        always: [{
          target: "ready",
          cond: "isPermissionEnabled"
        }, "Home"]
      },

      ready: {},

      Home: {
        on: {
          onAskPermission: "loading"
        }
      }
    },
    on: {
      "ON_NOTIFY": {

      },

      "NEWTODO.COMMIT": {
        actions: [
          assign({
            todo: "", // clear todo
            todos: (context, event) => {
              const newTodo = createTodo(event.value.trim());
              return context.todos.concat({
                ...newTodo,
                ref: spawn(createTodoMachine(newTodo))
              });
            }
          }),
          "persist"
        ],
        cond: (_, event) => event.value.trim().length
      },

      "TODO.COMMIT": {
        actions: [
          assign({
            todos: (context, event) =>
              context.todos.map((todo) => {
                return todo.id === event.todo.id
                  ? { ...todo, ...event.todo, ref: todo.ref }
                  : todo;
              })
          }),
          "persist"
        ]
      },

      "TODO.DELETE": {
        actions: [
          assign({
            todos: (context, event) =>
              context.todos.filter((todo) => todo.id !== event.id)
          }),
          "persist"
        ]
      },

      SHOW: {
        actions: assign({
          filter: (_, event) => event.filter
        })
      },

      "MARK.completed": {
        actions: (context) => {
          context.todos.forEach((todo) => todo.ref.send("SET_COMPLETED"));
        }
      },

      "MARK.active": {
        actions: (context) => {
          context.todos.forEach((todo) => todo.ref.send("SET_ACTIVE"));
        }
      },

      CLEAR_COMPLETED: {
        actions: [
          actions.pure((context) => {
            return context.todos
              .filter((todo) => todo.completed)
              .map((todo) => actions.stop(todo.ref));
          }),
          assign({
            todos: (context) => {
              return context.todos.filter((todo) => !todo.completed);
            }
          })
        ]
      },

      "NEWTODO.CHANGE": {
        actions: assign({
          todo: (_, event) => event.value
        })
      }
    }
  });
