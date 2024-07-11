import React from 'react';
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "./auth";
import './App.css';

const Home = () => {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance.loginPopup(loginRequest).catch(e => {
      console.error(e);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome!</h1>
        <p>This is the home page.</p>
        <button className="login-btn" onClick={handleLogin}>Log in</button>
      </header>
    </div>
  );
};

export default Home;