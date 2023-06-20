import { useState } from "react";
import Form from "components/chat/Form/Form";
import List from "components/chat/List/List";

function App() {
  const [message, setMessage] = useState<string>('');

  const getNewMsg = (msg: string | undefined) => {
    if (msg) setMessage(msg);
  };
  return (
    <>
      {console.log("rerender app")}
      <div className='container px-5 lg:px-0 max-w-4xl mx-auto my-24'>
        <List newMsg={message} />
        <Form getMsg={(msg) => getNewMsg(msg)} />
      </div>
    </>
  );
}

export default App;
