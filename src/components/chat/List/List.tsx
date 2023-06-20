import { useEffect, useState } from "react";
import loader from "assets/images/loader.gif";
import useFetchChatData from "hooks/useFetchChatData";
import { produce } from "immer";
import { Chat, Comment } from "types/Chat";

import Item from "../Item/Item";

import { USER_CHAT_URL, USER_INIT_COMMENTS_COUNT } from "constants/settings";

function List({ newMsg }: { newMsg: string }) {
  const [newCommentsData, setNewCommentsData] = useState<Chat>();
  const { data: fetchData, isLoading } = useFetchChatData(USER_CHAT_URL, USER_INIT_COMMENTS_COUNT);

  useEffect(() => {
    if (fetchData?.total) setNewCommentsData(fetchData);
  }, [fetchData]);

  useEffect(() => {
    if (newMsg.length > 0) {
      if (!newCommentsData?.total) return console.error("newCommentsData not found");
      const postId = newCommentsData.comments[newCommentsData.comments.length - 1]?.postId;
      const newPostId = postId ? postId : 0;

      const newComment: Comment = {
        id: newCommentsData?.total + 1,
        body: newMsg,
        postId: newPostId + 1,
        user: {
          id: Math.floor(Math.random() * 100) + 1,
          username: "newUser",
        },
      };

      setNewCommentsData((pre) => {
        if (pre) {
          return {
            ...pre,
            comments: [...pre.comments, newComment],
            total: pre.total + 1,
            skip: pre.skip + 1,
          };
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newMsg]);

  const removeComment = (id: number) => {
    if (!newCommentsData) return console.error("newCommentsData not found");
    const updatedComments = produce(newCommentsData, (draft) => {
      draft.comments = draft.comments.filter((comment) => comment.id !== id);
    });
    setNewCommentsData(updatedComments);
  };

  return (
    <>
      {console.log(newCommentsData, "rerender LIST")}
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
