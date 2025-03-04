// App.js
import React from 'react';
import DeviceInfoBox from './components/DevicesInfoBox';
function App() {
  var idRace = '000010000101470';
  console.log('Ejecutando fetchBroadcasts con idRace:', idRace);
  return /*#__PURE__*/React.createElement("div", {
    className: "App"
  }, /*#__PURE__*/React.createElement("h1", null, "Device Info"), /*#__PURE__*/React.createElement(DeviceInfoBox, {
    idRace: idRace
  }));
}
export default App;