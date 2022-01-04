import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import { getUser } from './components/UserManagement';
import Labels from './components/labels/Page';
import Login from './components/Login';

export const AuthContext = React.createContext(null);

const App = () => {
  const [token, setToken] = useState();
  useEffect(() => {
    !token && getUser(setToken);
  }, []);

  return (
    <>
      {
        token ?
          (
            <BrowserRouter>
              <AuthContext.Provider value={token}>
                <Routes>
                  <Route path="*" element={<Labels />} />
                </Routes>
              </AuthContext.Provider>
            </BrowserRouter>
          ) : <Login />
      }
    </>
  );
};

export default App;
