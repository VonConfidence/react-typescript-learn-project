import Axios from 'axios';
import { Dispatch } from 'redux';
import * as io from 'socket.io-client';

import { IChat } from './user.redux';

const socket = io('ws://localhost:8080');

// 获取聊天信息
const MSG_LIST = 'MSG_LIST';

// 读取信息
const MSG_RECV = 'MSG_RECV';

// 标识已读
const MSG_READ = 'MSG_READ';

export interface IChatState {
  chatList: IChat[];
  unread: number;
}

const initState: IChatState = {
  chatList: [],
  unread: 0,
};

interface IActionType {
  type: string;
  payload: any;
}

export function chat(state = initState, action: IActionType) {
  switch (action.type) {
    case MSG_LIST: {
      return {
        ...state,
        chatList: action.payload,
        unread: action.payload.filter((v: any) => !v.read).length,
      };
    }
    case MSG_RECV: {
      return {
        ...state,
        chatList: [...state.chatList, action.payload],
        unread: state.unread + 1,
      };
    }
    case MSG_READ: {
      return state;
    }
    default:
      return state;
  }
}

function msgList(msgs: IChat[]) {
  return { type: MSG_LIST, payload: msgs };
}

function msgRecv(msg: IChat) {
  return { type: MSG_RECV, payload: msg };
}

export function getMsgList() {
  return async (dispatch: Dispatch) => {
    const res = await Axios.get('/chats/list');
    if (res.status === 200 && res.data.statusCode === 0) {
      dispatch(msgList(res.data.data.msgs));
    }
  };
}

export function sendMsg({ from, to, content, toUserAvatar }: IChat) {
  return (dispatch: Dispatch) => {
    socket.emit('chat:one', { from, to, content, toUserAvatar });
  };
}

export function recvMsg() {
  return (dispatch: Dispatch) => {
    socket.on('chat:recvmsg', (data: IChat) => {
      console.log('接收到服务器数据: ', data);
      dispatch(msgRecv(data));
    });
  };
}
