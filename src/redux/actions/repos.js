export const setRepos = (repos) => {
  return {
    type: 'SET_REPOS',
    payload: repos,
  };
};

export const setLanguages = (languages) => {
  return {
    type: 'SET_LANGUAGES',
    payload: languages,
  };
};

export const filterByLanguage = (language) => {
  return (dispatch, getState) => {
    const state = getState();
    const repos = state.repos.repoCopy;

    if (language === 'all') {
      dispatch(clearFilter());
    } else {
      const filteredList = repos.filter((rep) => rep.language === language);
      dispatch(filter(filteredList));
    }
  };
};

const clearFilter = () => {
  return {
    type: 'CLEAR_FILTER',
  };
};

const filter = (filteredList) => {
  return {
    type: 'FILTER',
    payload: filteredList,
  };
};

export const filterByType = (type) => {
  return (dispatch, getState) => {
    const state = getState();
    const repos = state.repos.repoCopy;
    let filteredList;
    console.log(type);
    switch (type) {
      case 'sources':
        filteredList = repos.filter((rep) => rep.private);
        break;
      case 'forks':
        filteredList = repos.filter((rep) => rep.fork);
        break;
      case 'archived':
        filteredList = repos.filter((rep) => rep.archived);
        break;
      case 'mirrors':
        filteredList = repos.filter((rep) => rep.mirror_url);
        break;
      default:
        dispatch(clearFilter());
    }
    if (type === 'all') {
      dispatch(clearFilter());
    } else {
      dispatch(filter(filteredList));
    }
  };
};

export const search = (keyword) => {
  return (dispatch, getState) => {
    const state = getState();
    const repos = state.repos.repoCopy;

    const filteredList = repos.filter((rep) =>
      rep.name.toLowerCase().includes(keyword.toLowerCase())
    );
    dispatch(filter(filteredList));
  };
};

export const fetchRepos = (username) => {
  return (dispatch) => {
    return fetch(` https://api.github.com/users/${username}/repos`)
      .then((res) => res.json())
      .then((res) => {
        dispatch(setRepos(res));

        let languages = [];
        res.forEach((repo) => {
          if (repo.language) {
            languages.push(repo.language);
          }
        });
        dispatch(setLanguages(Array.from(new Set(languages))));
      });
  };
};
