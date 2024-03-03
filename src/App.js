import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginContainer from './LoginContainer/LoginContainer';
import FeedContainer from './FeedContainer/FeedContainer';
import SignUpContainer from './SignUpContainer/SignUpContainer';

function App() {
  const [usersData, setUsersData] = useState({});
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');


  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Redirect to login page if the user is not logged in */}
          {!username && <Route path="/feed" element={<Navigate to="/" />} />}
          <Route path="/feed" element={<FeedContainer usersData={usersData} username={username} token={token}/>} />
          <Route path="/signup" element={<SignUpContainer  usersData={usersData} setUsersData={setUsersData} username={username} setUsername={setUsername}/>} />
          <Route path="/" element={<LoginContainer usersData={usersData} setUsersData={setUsersData} username={username} setUsername={setUsername} setToken={setToken}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
