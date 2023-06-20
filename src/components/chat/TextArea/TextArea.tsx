import { useCallback, ChangeEvent, forwardRef, useState, useEffect } from "react";
import useLocalStorage from "hooks/useLocalStorage";
import { throttle } from "lodash";

// interface TextAreaProps {
//   ref: React.RefObject<HTMLTextAreaElement>;
//   resetField: () => void;
// }
const TextArea = forwardRef<HTMLTextAreaElement>((_props, ref) => {
  const [storageMessage, setStorageMessage] = useLocalStorage("message", "");
  const [value, setValue] = useState(storageMessage);
  //   const onInputThrottled = useCallback(throttle(onInput, 400), [onInput]);
  //   const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
  //     const newValue = e.target?.value;
  //     setStorageMessage(newValue);
  //     // onInputThrottled(newValue);
  //   };
  const setLocalStorage = (e: string) => {
    setStorageMessage(e);
  };
  const onInputThrottled = useCallback(throttle(setLocalStorage), []);
  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (newValue.length > 0) {
      onInputThrottled(newValue);
      setValue(newValue);
    }
  };

  useEffect(() => {
    // localStorage.removeItem("message");
    //  props.resetField();
    // console.log(ref.current.value, "TextArea");
  }), [];
  return (
    <textarea
      ref={ref}
      className='w-full h-24 shadow-lg outline-none p-3 border border-[var(--theme-bg-bt-default)]'
      placeholder='Type a message...'
      onChange={onChange}
      value={value}
    />
  );
});
TextArea.displayName = "TextArea";
export default TextArea;
{
  /* <textarea
  ref={newMsg}
  className='w-full h-24 shadow-lg outline-none p-3 border border-[var(--theme-bg-bt-default)]'
  placeholder='Type a message...'
  onChange={(e) => setLocalStorage(e.target.value)}
  value={storageMessage}
/>; */
}
