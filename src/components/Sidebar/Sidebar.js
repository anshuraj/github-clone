import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, connect } from 'react-redux';
import { fetchUser } from '../../redux/actions/user';

import './sidebar.css';

const Sidebar = ({ user }) => {
  let { username } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser(username));
  }, [dispatch, username]);

  if (!user) {
    return <></>;
  }

  return (
    <div className="sidebar">
      <div className="usercard">
        <img src={user.avatar_url} alt="avatar" />
        <div className="namecard">
          <div className="name">{user.name}</div>
          <div className="uname">{user.login}</div>
        </div>
      </div>
      <button>Follow</button>
      <div className="desc">
        <div>{user.bio}</div>
        <div>{user.location}</div>
        <div>{user.email}</div>
        <div>{user.blog}</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({ user: state.user.user });

export default connect(mapStateToProps)(Sidebar);
