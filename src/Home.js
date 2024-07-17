import React, { useEffect, useState } from 'react';
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "./auth.js";
import { callMsGraph } from "./graph.js";
import './App.css';

const Home = () => {
  const { instance, accounts } = useMsal();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    if (accounts.length > 0) {
      instance.acquireTokenSilent({
        ...loginRequest,
        account: accounts[0]
      }).then(response => {
        callMsGraph(response.accessToken).then(response => {
          setUserProfile(response);
        });
      }).catch(e => {
        console.error(e);
      });
    } else {
      handleLogin();
    }
  }, [accounts, instance]);

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
        {userProfile && (
          <div>
            <h2>Hello, {userProfile.displayName}</h2>
            <p>{userProfile.mail}</p>
          </div>
        )}
      </header>
    </div>
  );
};

export default Home;
