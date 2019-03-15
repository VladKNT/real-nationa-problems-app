import { IMessage } from "../../../../constants/types/message"
import { initUser } from "../user/userReducer";

export const initMessage: IMessage =  {
  id: "",
  message: "",
  chatId: "",
  ownerId: "",
  owner: initUser,
  deleted: false,
  deletedForAll: false,
  edited: false,
  createdAt: "",
  updatedAt: ""
};
