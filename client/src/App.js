import { useState } from 'react';
import './App.css';

import Home from './components/Home';
import Customize from './components/customize/Customize';
import Community from './components/community/Community';

import Icon from './components/Icon';


function App() {
  const [mode, setMode] = useState('Home');
  // const [mineIcon, setMineIcon] = useState('M');

  return <>
    <nav className="nav-bar">
      <div className='icon'>
        <Icon initIcon="💣"/>
      </div>
      {
        ["Home", "Customize", "Community"].map((mod, index) => (
          <div
            key={index} 
            className='btn' 
            style={{ backgroundColor: mode === mod ? "coral" : "lightcoral" }}
            onClick={() => setMode(mod)}
          >{mod}</div>
        ))
      }
    </nav>

    <main className='main-content'>
      <h1>Welcome to Minesweeper!</h1>
      {mode === 'Home' && <Home/>}
      {mode === 'Customize' && <Customize/>}
      {mode === 'Community' && <Community/>}
    </main>
  </>;
}

export default App;
