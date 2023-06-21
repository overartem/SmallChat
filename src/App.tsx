import { useState, createContext, useRef } from "react";
import Form from "components/chat/Form/Form";
import List from "components/chat/List/List";
import useLocalStorage from "hooks/useLocalStorage";
import { IContextType } from "types/Chat";

import { KEY_LOCAL_STORAGE } from "constants/settings";

export const ChatContext = createContext<IContextType>({});
function App(): JSX.Element {
  const [isSend, setIsSend] = useState<boolean>(false);
  const { valueStorage } = useLocalStorage(KEY_LOCAL_STORAGE, "");
  const message = useRef(valueStorage);
  return (
    <ChatContext.Provider value={{ message, isSend, setIsSend }}>
      <>
        <div className='container px-5 lg:px-0 max-w-4xl mx-auto my-24'>
          <List />
          <Form />
        </div>
      </>
    </ChatContext.Provider>
  );
}

export default App;