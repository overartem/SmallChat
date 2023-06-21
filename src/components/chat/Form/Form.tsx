import { useCallback, useContext } from "react";

import { ChatContext } from "../../../App";
import TextArea from "../TextArea/TextArea";

function Form(): JSX.Element {
  const { message, setIsSend } = useContext(ChatContext);

  const submitForm = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (message?.current && typeof setIsSend === "function") {
        setIsSend(true);
      }
    },
    [message, setIsSend]
  );

  return (
    <>
      <form action='#' onSubmit={submitForm} className='flex flex-wrap relative'>
        <TextArea />
        <button
          type='submit'
          className='absolute -bottom-4 right-0 lg:-right-6 bg-[var(--theme-bg-bt-default)] text-white px-6 py-3 
          hover:bg-[var(--theme-bg-color)] focus:hover:bg-[var(--theme-bg-color)]'
        >
          Send
        </button>
      </form>
    </>
  );
}

export default Form;
