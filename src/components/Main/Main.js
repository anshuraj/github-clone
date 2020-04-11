import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RepoCard from '../RepoCard/RepoCard';
import './main.css';

const Main = () => {
  const [repos, setRepos] = useState([]);
  const [reposCopy, setReposCopy] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [keyword, setKeyword] = useState('');
  let { username } = useParams();

  useEffect(() => {
    fetch(` https://api.github.com/users/${username}/repos`)
      .then((res) => res.json())
      .then((res) => {
        setRepos(res);
        setReposCopy(res);

        let languages = [];
        res.forEach((repo) => {
          if (repo.language) {
            languages.push(repo.language);
          }
        });
        setLanguages(Array.from(new Set(languages)));
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSearch = (e) => {
    const keyword = e.target.value;

    setKeyword(keyword);

    const filteredRepos = repos.filter((rep) =>
      rep.name.toLowerCase().includes(keyword.toLowerCase())
    );
    setReposCopy(filteredRepos);

    // debounced(() => console.log(keyword), 1000);
  };

  const handleFilter = (e) => {
    const value = e.target.value;
    let filteredRepos;

    switch (value) {
      case 'all':
        setReposCopy(repos);
        break;
      case 'public':
        filteredRepos = repos.filter((rep) => !rep.private);
        setReposCopy(filteredRepos);
        break;
      case 'private':
        filteredRepos = repos.filter((rep) => rep.private);
        setReposCopy(filteredRepos);
        break;
      case 'sources':
        filteredRepos = repos.filter((rep) => rep.private);
        setReposCopy(filteredRepos);
        break;
      case 'forks':
        filteredRepos = repos.filter((rep) => rep.fork);
        setReposCopy(filteredRepos);
        break;
      case 'archived':
        filteredRepos = repos.filter((rep) => rep.archived);
        setReposCopy(filteredRepos);
        break;
      case 'mirrors':
        filteredRepos = repos.filter((rep) => rep.mirror_url);
        setReposCopy(filteredRepos);
        break;
      default:
    }
  };

  const handleLanguageFilter = (e) => {
    const lang = e.target.value;

    if (lang === 'all') {
      setReposCopy(repos);
    } else {
      let repo = repos.filter((rep) => rep.language === lang);
      setReposCopy(repo);
    }
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
        <select onChange={handleFilter}>
          <option value="all">All</option>
          <option value="public">Public</option>
          <option value="private">Private</option>
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
      {(reposCopy || []).map((repo) => (
        <RepoCard key={repo.name} repo={repo} />
      ))}
    </div>
  );
};

export default Main;
