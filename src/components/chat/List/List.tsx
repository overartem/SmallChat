import { useContext, useEffect, useState } from "react";
import loader from "assets/images/loader.gif";
import useFetchChatData from "hooks/useFetchChatData";
import { produce } from "immer";
import { IChat } from "types/Chat";
import { addComment } from "utils/chat";

import { ChatContext } from "../../../App";
import Item from "../Item/Item";

import { USER_CHAT_URL, USER_INIT_COMMENTS_COUNT } from "constants/settings";

function List(): JSX.Element {
  const [newCommentsData, setNewCommentsData] = useState<IChat>();
  const { message, isSend, setIsSend } = useContext(ChatContext);
  const { data: fetchData, isLoading } = useFetchChatData(USER_CHAT_URL, USER_INIT_COMMENTS_COUNT);

  useEffect(() => {
    if (fetchData?.total) setNewCommentsData(fetchData);
  }, [fetchData]);

  useEffect(() => {
    addComment({message, isSend, newCommentsData, setNewCommentsData, setIsSend});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSend]);

  const removeComment = (id: number) => {
    if (!newCommentsData) return console.error("newCommentsData not found");
    const updatedComments = produce(newCommentsData, (draft) => {
      draft.comments = draft.comments.filter((comment) => comment.id !== id);
    });
    setNewCommentsData(updatedComments);
  };

  return (
    <>
      {isLoading ? (
        <img src={loader} className='mx-auto' alt='Loading Messages' />
      ) : (
        <ul>
          {newCommentsData?.comments.map((comment) => (
            <Item
              key={comment.id}
              author={comment.user.username}
              removeComment={() => removeComment(comment.id)}
              comment={comment.body}
            />
          ))}
        </ul>
      )}
    </>
  );
}

export default List;
