import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { UserProvider } from './contexts/User/context.tsx'
import { MatchProvider } from './contexts/Matches/context.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
      <MatchProvider>
        <App />
      </MatchProvider>
    </UserProvider>
  </React.StrictMode>,
)
