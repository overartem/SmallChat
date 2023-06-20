import { useRef, startTransition, useState } from "react";

// import useLocalStorage from "hooks/useLocalStorage";
//import useLocalStorage from "hooks/useLocalStorage";
import TextArea from "../TextArea/TextArea";

// import { useDebounceLocalStorage } from "hooks/useDebounceLocalStorage";
// import { throttle } from "lodash";
// import useLocalStorage from "hooks/useLocalStorage";
function Form({ getMsg }: { getMsg: (msg: string | undefined) => void }) {
  const newMsg = useRef<HTMLTextAreaElement>(null);
  const [state, setState] = useState<()=>void>();
  //  const [storageMessage, setStorageMessage] = useLocalStorage("message", "");
  //   const [inputValue, setInputValue] = useDebounceLocalStorage(200);

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = newMsg.current?.value;
    if (msg) {
      getMsg(msg);
      console.log("SUBMIT");
      setState(()=>{
        return localStorage.removeItem("message");
      });
    //   startTransition(() => {
    //     console.log("DADAD");
    //     localStorage.removeItem("message");
    //     if (newMsg.current?.value) newMsg.current.value = "";
    //   });
    }
  };

  //   const resetField = () => {
  //     console.log("submit reset");
  //   };

  // const setLocalStorage = (e:string) => {
  //   if (e) throttle(() => setStorageMessage(e), 400);
  // };

  //   useEffect(() => {
  //     console.log("asdasda");
  //     localStorage.removeItem("message");
  //   });
  //resetField={() => resetField()}
  return (
    <>
      {console.log("form reremnder")}
      <form action='#' className='flex flex-wrap relative'>
        <TextArea ref={newMsg} />
        <button
          onClick={submitForm}
          className='absolute -bottom-4 right-0 lg:-right-6 bg-[var(--theme-bg-bt-default)] text-white px-6 py-3 hover:bg-[var(--theme-bg-color)] focus:hover:bg-[var(--theme-bg-color)]'
        >
          Send
        </button>
      </form>
    </>
  );
}

export default Form;
