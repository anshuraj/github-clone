import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Main from '../Main/Main';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  let { username } = useParams();

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}`)
      .then((res) => res.json())
      .then((res) => {
        setUser(res);
      })
      .catch((err) => console.log(err));
  }, [username]);
  return (
    <div className="App">
      {user ? <Sidebar user={user} /> : ''}
      <Main />
    </div>
  );
}

export default App;
