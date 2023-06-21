import { useCallback, ChangeEvent, useContext } from "react";
import useLocalStorage from "hooks/useLocalStorage";
import { throttle } from "lodash";

import { ChatContext } from "../../../App";

import { KEY_LOCAL_STORAGE } from "constants/settings";

const TextArea = (): JSX.Element => {
  const { setStorageValue } = useLocalStorage(KEY_LOCAL_STORAGE, "");
  const { message } = useContext(ChatContext);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onInputThrottled = useCallback(throttle(setStorageValue, 100), []);
  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    onInputThrottled(newValue);
    if (message) message.current = newValue;
  };

  return (
    <textarea
      className='w-full h-24 shadow-lg outline-none p-3 border border-[var(--theme-bg-bt-default)]'
      placeholder='Type a message...'
      onChange={onChange}
      value={message?.current}
    />
  );
};
export default TextArea;
