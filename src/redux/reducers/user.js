const INITIAL_STATE = {
  user: null,
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_USER':
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};

export default user;
