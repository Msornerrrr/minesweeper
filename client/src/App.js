import { useState } from 'react';
import './App.css';

import Play from './components/Play';
import Design from './components/design/Design';
import Community from './components/community/Community';
import Icon from './components/Icon';

const MODES = {
  PLAY: 'Play',
  DESIGN: 'Design',
  COMMUNITY: 'Community'
}

function App() {
  const [mode, setMode] = useState(MODES.PLAY);
  // const [mineIcon, setMineIcon] = useState('M');

  return <>
    <nav className="nav-bar">
      <div className='icon'>
        <Icon initIcon="💣"/>
      </div>
      <div className='btn-wrapper'>
      {
        ["Play", "Design", "Community"].map((mod, index) => (
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
      {mode === MODES.PLAY && <Play/>}
      {mode === MODES.DESIGN && <Design/>}
      {mode === MODES.COMMUNITY && <Community/>}
    </main>
  </>;
}

export default App;
