import { Affix, Avatar, Input, List, Skeleton } from 'antd';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import * as io from 'socket.io-client';
// import Axios from 'axios';

interface IParams {
  user: any;
}

interface IState {
  initLoading: boolean;
  loading: boolean;
  data: any[];
  list: any[];
  //  输入框中的内容
  inputText: string;
}
/*
interface IMsgItem {
  avatar: string,
  msg: string,
  uid: string,
  isMe: boolean;
}
*/

type IProps = RouteComponentProps<IParams>;

const Search = Input.Search;
const socket = io('ws://localhost:8080');

export default class Chat extends React.Component<IProps, IState> {
  public state = {
    data: [],
    initLoading: true,
    inputText: '',
    list: [],
    loading: false,
  };
  constructor(props: IProps) {
    super(props);
  }
  public componentDidMount() {
    // console.log(socket);
    // this.getData((res: any) => {
    //   this.setState({
    //     initLoading: false,
    //     data: res.results,
    //     list: res.results,
    //   });
    // });
  }

  public getData = async (callback: any) => {
    // const res = await Axios(fakeDataUrl);
    // callback(res);
  };

  public sendMsg = (value: string) => {
    const {
      match: {
        params: { user: uid },
      },
    } = this.props;
    socket.emit('chat:user', { text: value, to: uid, from: '' });
    const { list } = this.state;
    this.setState({
      inputText: '',
      list: [
        ...list,
        {
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          msg: value,
          uid,
        },
      ],
    });
  };

  public handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputText: (event.target as HTMLInputElement).value });
  };

  public renderItem = (item: any) => {
    return (
      <List.Item>
        <Skeleton avatar={true} title={false} loading={item.loading} active={true}>
          <List.Item.Meta
            avatar={<Avatar src={item.avatar} />}
            title={<a href={item.uid}>{item.uid}</a>}
            description={item.msg}
          />
        </Skeleton>
      </List.Item>
    );
  };

  public render() {
    const {
      match: {
        params: { user },
      },
    } = this.props;
    const { list } = this.state;
    return (
      <div style={{ paddingLeft: '200px', paddingRight: '200px' }}>
        Chat 页面: {user}
        <List
          className="demo-loadmore-list"
          // loading={initLoading}
          itemLayout="horizontal"
          // loadMore={loadMore}
          dataSource={list}
          renderItem={this.renderItem}
        />
        <Affix offsetTop={840}>
          <Search
            placeholder="输入聊天信息"
            enterButton="Send"
            size="small"
            onSearch={this.sendMsg}
            value={this.state.inputText}
            onChange={this.handleInputChange}
          />
        </Affix>
      </div>
    );
  }
}
