import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import RegisterPage from './Register';
import { changeRegisterActions } from './store/actions';

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    registerStatus: state.register.registerStatus,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  changeRegisterStatus: () => dispatch(changeRegisterActions()),
  // fetchMemberById: (id: number) => dispatch(fetchMemberByIdAction(id)),
  // onChange: (member: MemberEntity, fieldName: string, value: string) =>
  //   dispatch(memberFieldChangeAction(member, fieldName, value)),
  // onSave: (member: MemberEntity) => dispatch(saveMemberAction(member)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterPage);
