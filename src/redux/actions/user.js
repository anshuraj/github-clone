export const getUser = (user) => {
  return {
    type: 'GET_USER',
    payload: user,
  };
};

export const fetchUser = (username) => {
  return (dispatch) => {
    return fetch(`https://api.github.com/users/${username}`)
      .then((res) => res.json())
      .then((res) => {
        dispatch(getUser(res));
      });
  };
};
