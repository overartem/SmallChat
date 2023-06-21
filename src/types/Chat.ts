
export interface IChat {
  comments: IComment[];
  total: number;
  skip: number;
  limit: number;
}

export interface IComment {
  id: number;
  body: string;
  postId: number;
  user: IUser;
}

export interface IUser {
  id: number;
  username: string;
}

export interface IContextType {
  message?: React.MutableRefObject<string>;
  isSend?: boolean;
  setIsSend?: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IAddComment {
  message?: React.MutableRefObject<string>;
  isSend?: boolean;
  setIsSend?: React.Dispatch<React.SetStateAction<boolean>>;
  newCommentsData: IChat | undefined;
  setNewCommentsData: React.Dispatch<React.SetStateAction<IChat | undefined>>;
}
