import React from 'react';
import './sidebar.css';

const Sidebar = ({ user }) => {
  return (
    <div className="sidebar">
      <img src={user.avatar_url} alt="avatar" />
      <div className="namecard">
        <div className="name">{user.name}</div>
        <div className="uname">{user.login}</div>
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

export default Sidebar;
