import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import LoginPage from './Login';
import { changeLoginStatusAction } from './store/actions';

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    loginStatus: state.login.loginStatus,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  changeLoginStatus: () => dispatch(changeLoginStatusAction()),
  // fetchMemberById: (id: number) => dispatch(fetchMemberByIdAction(id)),
  // onChange: (member: MemberEntity, fieldName: string, value: string) =>
  //   dispatch(memberFieldChangeAction(member, fieldName, value)),
  // onSave: (member: MemberEntity) => dispatch(saveMemberAction(member)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
