const INITIAL_STATE = {
  repos: [],
  repoCopy: [],
  languages: [],
};

const repos = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_REPOS':
      return {
        ...state,
        repos: action.payload,
        repoCopy: action.payload,
      };
    case 'SET_LANGUAGES':
      return {
        ...state,
        languages: action.payload,
      };
    case 'CLEAR_FILTER':
      return {
        ...state,
        repos: [...state.repoCopy],
      };
    case 'FILTER':
      return {
        ...state,
        repos: action.payload,
      };
    default:
      return state;
  }
};

export default repos;
