import { createMachine, assign, spawn, actions, Actor, ActorRef, AnyActorRef, ActorRefFrom } from "xstate";
import uuid from "uuid-v4";
import { Item, UsableContact } from "../types";
import { createContactMachine } from "./contactMachine";

function createItem(contact: UsableContact): Item {
  return {
    id: uuid(),
    title: contact.name,
    contact,
    notified: false,
  };
}



type Context = {
  todo: string;
  todos: any[];
  references: any[]
  recruiter: any;
  filter: string;
};

export const appMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBcD2FWwMQGUCiAMngMIAqA+gEomUCqAkqXpQNoAMAuoqAA6YCWyfqgB23EAA9EANgDMAdgB0AJgAcATjbTlAVgA0IAJ6Idy6YtlsALNNXydAXwcG0GbPiJkqeAGLM8AHLEeOxcSCB8sILCYuFSCHJKapra+kYmZhbWtvZOLuiYWKQA8gAixYrExQCy1Yyh4pHRouLxAIyqbSoaWroGxghqqlk2do7OIK6FJeWKpYR4TA3hTUItcYiynYpsbeo6sm196YOqw5ajuRNT7gASxQDqy7wCa7Gg7dvJvWkDQyM5cb5NxYaoAQUoAGlFABjVAAWx4ABswMhIM8Iq8Yq1EMobIo9uplB17P1EG0rDpFDodKodOoFEDJgVsOCoYoAIYwoQANzAGNW2I2g1kilUVkZZIQe1FbTasjURyZNywxCIEPIVWqAAUiExSgKsesPogALQyglWSmHY4DKzyUUKNpsBlXCYidBwcQ3RpG96ScmyUXfVJS0zmC6AvLMtyKABOYA5EAGLyibxx0q+PVDJ2k8rF2TGTicQA */
  createMachine<Context>({
    id: "todos",
    preserveActionOrder: true,
    context: {
      todo: "", // new todo
      todos: [],
      references: [],
      recruiter: undefined,
      filter: "all"
    },
    initial: "ready",
    states: {
      ready: {}
    },
    on: {
      "SELECT_RECRUITER": {
        actions: [
          assign({
            recruiter: (context, event) => {
              const newContact = createItem(event.value);
              return spawn(createContactMachine(newContact));
            }
          }),
          "persist"
        ],
      },
      "SELECT_REFERENCE": {
        actions: [
          assign({
            // todo: "", // clear todo
            //@ts-ignore asd
            recruiter: (context, event) => {
              const newTodo = createItem(event.value);
              return context.todos.concat({
                ...newTodo,
                ref: spawn(createContactMachine(newTodo))
              });
            }
          }),
          "persist"
        ],
      },
      "TODO.COMMIT": {
        actions: [
          assign({
            todos: (context, event) =>
              context.references.map((reference) => {
                return reference.id === event.reference.id
                  ? { ...reference, ...event.reference, ref: reference.ref }
                  : reference;
              })
          }),
          "persist"
        ]
      },
      "TODO.DELETE": {
        actions: [
          // assign({
          //   todos: (context, event) =>
          //     context.todos.filter((todo) => todo.id !== event.id)
          // }),
          "persist"
        ]
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
    }
  });
