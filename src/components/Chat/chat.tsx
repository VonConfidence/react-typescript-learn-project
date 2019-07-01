import { Avatar, Button, Comment, Form, Input, List } from 'antd';
import Axios from 'axios';
import * as moment from 'moment';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Dispatch } from 'redux';
// import * as io from 'socket.io-client';
import { IRootState } from 'src/store';
import { getMsgList, IChatState, recvMsg, sendMsg } from 'src/store/chat.redux';
import { IChat, IRegisterForm } from 'src/store/user.redux';

import MyComment from './MyComment';

export interface ICommentItem {
  author: string;
  avatar: string;
  content: any;
  datetime: string;
}

interface IParams {
  user: string;
}

interface IState {
  // comments: ICommentItem[]; // 从props redux中获取
  submitting: boolean;
  value: string;
  toUser: IRegisterForm;
}

interface IReduxProps {
  chat: IChatState;
  user: IRegisterForm;
  getMsgList: () => void;
  sendMsg: (value: IChat) => void;
  recvMsg: () => void;
}

type IProps = RouteComponentProps<IParams> & IReduxProps;

const Search = Input.Search;
// const socket = io('ws://localhost:8080');

/*
function ReverseComment({ comments }: any) {
  function renderReverseItem(props: ICommentItem) {
    const { isMe } = props;
    // 如果是对方的发言
    if (!isMe) {
      return <Comment {...props} />;
    }
    // 如果是自己发言: 需要自己定制组件
    return <MyComment {...props} />;
  }

  return (
    <List
      dataSource={comments}
      header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
      itemLayout="horizontal"
      renderItem={renderReverseItem}
    />
  );
}
*/

// 函数式组件
const CommentList = ({ comments, user, toUser }: any) => {
  function renderItem(item: any) {
    // 如果当前信息的发送者是自己的话
    const isme = user._id === item.from;
    const avatar = isme ? user.avatar : toUser.avatar;
    const msgItem: ICommentItem = {
      author: user.from,
      // user表示自己, props.params.user 表示对方
      avatar,
      content: <p>{item.content}</p>,
      datetime: moment().fromNow(),
    };
    return isme ? <MyComment {...msgItem} /> : <Comment {...msgItem} />;
  }

  return (
    <List
      dataSource={comments}
      header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
      itemLayout="horizontal"
      renderItem={renderItem}
    />
  );
};

const Editor = ({ onChange, onSubmit, submitting, value }: any) => (
  <div>
    <Form.Item>
      <Search
        onChange={onChange}
        value={value}
        enterButton={
          <Button loading={submitting} type="primary">
            Send
          </Button>
        }
        onSearch={onSubmit}
      />
    </Form.Item>
  </div>
);

class ChatPage extends React.Component<IProps, IState & React.ComponentState> {
  public state = {
    // comments: [],
    submitting: false,
    toUser: { avatar: 'https://www.tslang.cn/assets/images/icons/apple-touch-icon-144x144.png' },
    value: '',
  };

  public componentDidMount() {
    const {
      match: {
        params: { user: touid },
      },
    } = this.props;
    Axios.get(`/users/find?touid=${touid}`).then(res => {
      this.setState({ toUser: res.data.data.user });
    });
    // socket.on('recvmsg', data=> {});
    this.props.getMsgList();
    this.props.recvMsg();
  }

  public handleSubmit = () => {
    // 路由传递的组件params:userid 表示和谁聊天
    const {
      match: {
        params: { user: touid },
      },
      user: { _id },
    } = this.props;

    const {
      value,
      // comments
      toUser: { avatar: toUserAvatar },
    } = this.state;
    if (!value) {
      return;
    }
    this.props.sendMsg({ content: value, to: touid, from: _id, toUserAvatar });
    this.setState({
      /*
      comments: [
        ...comments,
        {
          author: uid,
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          content: <p>{value}</p>,
          datetime: moment().fromNow(),
          // isme: true,
          isme: 1,
        },
      ],
      */
      submitting: false,
      value: '',
    });
    /*
    setTimeout(() => {
      socket.emit('chat:user', { text: value, to: touid, from: _id });
      this.setState({
        comments: [
          ...comments,
          {
            author: uid,
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: <p>{value}</p>,
            datetime: moment().fromNow(),
            // isme: true,
            isme: 1,
          },
        ],
        submitting: false,
        value: '',
      });
    }, 500);
    */
  };

  public handleChange = (e: React.ChangeEvent) => {
    this.setState({
      value: (e.target as HTMLInputElement).value,
    });
  };

  public render() {
    const { submitting, value, toUser } = this.state;
    const {
      chat: { chatList: comments },
      user,
    } = this.props;
    return (
      <div style={{ paddingLeft: '50px', paddingRight: '50px' }}>
        {comments.length > 0 && <CommentList comments={comments} user={user} toUser={toUser} />}
        <Comment
          avatar={
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
            />
          }
          content={
            <Editor
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              submitting={submitting}
              value={value}
            />
          }
        />
      </div>
    );
  }
}
const mapStateToProps = (state: IRootState) => {
  return {
    chat: state.chatMsg,
    user: state.user,
  };
};

export const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  // register: (values: IRegisterForm) => dispatch(register(values)),
  getMsgList: (type: string) => dispatch(getMsgList()),
  recvMsg: (value: IChat) => dispatch(recvMsg()),
  sendMsg: (value: IChat) => dispatch(sendMsg(value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatPage);
