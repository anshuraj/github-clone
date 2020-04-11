import React, { useEffect, useState } from 'react';
import './App.css';
import Sidebar from '../Sidebar/Sidebar';
import Main from '../Main/Main';

const userName = 'anshuraj';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`https://api.github.com/users/${userName}`)
      .then((res) => res.json())
      .then((res) => {
        setUser(res);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="App">
      {user ? <Sidebar user={user} /> : ''}
      <Main />
    </div>
  );
}

export default App;
