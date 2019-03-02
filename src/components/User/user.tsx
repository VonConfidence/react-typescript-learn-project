import { Avatar, Button, Card, Icon, Skeleton } from 'antd';
// import Axios from 'axios';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
// import { Redirect } from 'react-router-dom';
import { Dispatch } from 'redux';
import { getUserList } from '../../store/chatuser.redux';
import { IRegisterForm } from '../../store/user.redux';

import '../Admin/style.less';

interface IState {
  // data: IRegisterForm[];
  loading: boolean;
}

interface IProps {
  chat: any;
  getChatList: (type: string) => void;
}

const { Meta } = Card;

class UserPage extends React.PureComponent<IProps & RouteComponentProps, IState> {
  public state = {
    // data: [],
    loading: true,
  };

  public componentDidMount() {
    // Axios.get('/users/list').then(res => {
    //   this.setState({
    //     data: res.data.data.users,
    //     loading: false,
    //   });
    // });
    this.props.getChatList('admin');
    this.setState({ loading: false });
  }

  public render() {
    const { userList: data } = this.props.chat;
    const { loading } = this.state;
    return (
      <div className="admin-container">
        {data.map((cardItem: IRegisterForm) => (
          <Card
            style={{ width: 600, marginTop: 16 }}
            key={cardItem._id}
            actions={[
              <Icon type="setting" key={cardItem._id + 'setting'} />,
              <Icon type="edit" key={cardItem._id + 'edit'} />,
              <Icon type="ellipsis" key={cardItem._id + 'ellipsis'} />,
            ]}
          >
            <Skeleton loading={loading} avatar={true} active={true}>
              <Meta
                avatar={<Avatar src={cardItem.avatar} />}
                title={cardItem.username}
                description={cardItem.title}
              />
              <div className="desc">
                {cardItem.desc.map(item => (
                  <Button type="dashed" key={item} className="button-label">
                    {item}
                  </Button>
                ))}
              </div>
            </Skeleton>
          </Card>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    chat: state.chat,
  };
};

export const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  // register: (values: IRegisterForm) => dispatch(register(values)),
  getChatList: (type: string) => dispatch(getUserList(type)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPage);

// export default AdminPage;
