import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, connect } from 'react-redux';
import {
  fetchRepos,
  filterByLanguage,
  filterByType,
  search,
} from '../../redux/actions/repos';
import RepoCard from '../RepoCard';
import './main.css';

const Main = ({ repos, languages }) => {
  const [keyword, setKeyword] = useState('');
  let { username } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRepos(username));
  }, [dispatch, username]);

  const handleSearch = (e) => {
    const keyword = e.target.value;
    setKeyword(keyword);
    dispatch(search(keyword));
  };

  const handleTypeFilter = (e) => {
    const type = e.target.value;
    dispatch(filterByType(type));
  };

  const handleLanguageFilter = (e) => {
    const lang = e.target.value;
    dispatch(filterByLanguage(lang));
  };

  return (
    <div className="main">
      <div className="tabs">
        <div>Overview</div>
        <div className="active">
          Repositories <span>{repos.length}</span>
        </div>
        <div>Project</div>
        <div>Stars</div>
        <div>Followers</div>
        <div>Following</div>
      </div>

      <div className="filter">
        <input
          placeholder="Find a repository..."
          type="text"
          onChange={handleSearch}
          value={keyword}
        />
        Type:
        <select onChange={handleTypeFilter}>
          <option value="all">All</option>
          <option value="sources">Sources</option>
          <option value="forks">Forks</option>
          <option value="archived">Archived</option>
          <option value="mirrors">Mirrors</option>
        </select>
        Language:
        <select onChange={handleLanguageFilter}>
          <option value="all">All</option>
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>
      {(repos || []).map((repo) => (
        <RepoCard key={repo.name} repo={repo} />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  repos: state.repos.repos,
  languages: state.repos.languages,
});

export default connect(mapStateToProps)(Main);
