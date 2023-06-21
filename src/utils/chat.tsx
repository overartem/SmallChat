import { IAddComment, IComment } from "types/Chat";

import { KEY_LOCAL_STORAGE } from "constants/settings";

export const resetForm = (message: React.MutableRefObject<string>, setIsSend: React.Dispatch<React.SetStateAction<boolean>>) => {
  if (message) message.current = "";
  localStorage.removeItem(KEY_LOCAL_STORAGE);
  setIsSend(false);
};

export const addComment = ({message, isSend, newCommentsData, setNewCommentsData, setIsSend}:IAddComment) => {
  if (message?.current && isSend) {
    if (!newCommentsData?.total) return console.error("newCommentsData not found");
    const postId = newCommentsData.comments[newCommentsData.comments.length - 1]?.postId;
    const newPostId = postId ? postId : 0;

    const newComment: IComment = {
      id: newCommentsData?.total + 1,
      body: message?.current,
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
    if (typeof setIsSend === "function") {
      resetForm(message, setIsSend);
    }
  }
};
