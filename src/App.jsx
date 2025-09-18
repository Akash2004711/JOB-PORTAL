import React from 'react';
import { Helmet } from 'react-helmet';
import Routes from './Routes';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Helmet>
          <title>TalentStrike Analytics - Recruitment Intelligence Platform</title>
          <meta name="description" content="Advanced recruitment analytics and intelligence platform for data-driven hiring decisions." />
        </Helmet>
        <Routes />
      </div>
    </AuthProvider>
  );
}

export default App;