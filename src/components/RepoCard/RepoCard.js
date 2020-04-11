import React from 'react';
import './repocard.css';
const RepoCard = ({ repo }) => {
  return (
    <div className="repocard">
      <h3>
        <a href={repo.url}>{repo.name}</a>
      </h3>
      <div>
        <div>{repo.description}</div>
        <div className="info">
          {repo.language ? <span>{repo.language}</span> : ''}
          {repo.license ? <span>{repo.license.name}</span> : ''}
          <span>{` Updated on ${new Date(
            repo.updated_at
          ).toDateString()}`}</span>
        </div>
      </div>
    </div>
  );
};

export default RepoCard;
