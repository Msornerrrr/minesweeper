import { useState } from 'react';
import './App.css';

import Home from './components/Home';
import Customize from './components/customize/Customize';
import Community from './components/community/Community';

import Icon from './components/Icon';

const MODES = {
  HOME: 'Home',
  CUSTOMIZE: 'Customize',
  COMMUNITY: 'Community'
}

function App() {
  const [mode, setMode] = useState(MODES.HOME);
  // const [mineIcon, setMineIcon] = useState('M');

  return <>
    <nav className="nav-bar">
      <div className='icon'>
        <Icon initIcon="💣"/>
      </div>
      <div className='btn-wrapper'>
      {
        ["Home", "Customize", "Community"].map((mod, index) => (
          <div
            key={index} 
            className='btn' 
            style={{ backgroundColor: mode === mod ? "#50c6ed" : "" }}
            onClick={() => setMode(mod)}
          >{mod}</div>
        ))
      }
      </div>
      <div className='user-auth'>
        login
      </div>
    </nav>

    <main className='main-content'>
      <h1>Welcome to Minesweeper!</h1>
      {mode === MODES.HOME && <Home/>}
      {mode === MODES.CUSTOMIZE && <Customize/>}
      {mode === MODES.COMMUNITY && <Community/>}
    </main>
  </>;
}

export default App;
