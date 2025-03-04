// App.js
import React from 'react';
import DeviceInfoBox from './components/DevicesInfoBox';

function App() {
  const idRace = '000010000101470';
  console.log('Ejecutando fetchBroadcasts con idRace:', idRace);
  return (
    <div className="App">
      <h1>Device Info</h1>
      <DeviceInfoBox idRace={idRace} />
    </div>
  );
}

export default App;