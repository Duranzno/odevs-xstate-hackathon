import { useActor } from "@xstate/react";
import { Item } from '../types'
export function contact({ todoRef }) {
  const [state, send] = useActor(todoRef);
  // const inputRef = useRef(null);
  const { contact } = state.context;

  useEffect(() => {
    if (state.actions.find((action) => action.type === "focusInput")) {
      inputRef.current && inputRef.current.select();
    }
  }, [state.actions, todoRef]);
  const handleSelect = () => send("")
  return (
    <List.Item
      onPress={handleSelect}
      key={index}
      title={contact.name}
      description={description}
      left={(props) => <List.Icon {...props} icon='equal' />}
    />
  );
}