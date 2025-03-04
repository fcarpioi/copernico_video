// src/StatusBarChart.jsx
import React from 'react';
import { ResponsiveContainer, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
var StatusBarChart = function StatusBarChart(_ref) {
  var deviceData = _ref.deviceData;
  // Mapea los datos: para cada dispositivo se asigna un índice en X y se convierte networkStatus a 1 (On) o 0 (Off)
  var data = deviceData.map(function (device, index) {
    return {
      x: index + 1,
      // índice para posicionar la barra
      name: device.name,
      status: device.networkStatus === 'connected' ? 1 : 0.5
    };
  });

  // Tooltip personalizado: muestra "On" o "Off" en lugar de 1/0
  var CustomTooltip = function CustomTooltip(_ref2) {
    var active = _ref2.active,
      payload = _ref2.payload,
      label = _ref2.label;
    if (active && payload && payload.length) {
      var value = payload[0].value;
      return /*#__PURE__*/React.createElement("div", {
        style: {
          background: '#fff',
          border: '1px solid #ccc',
          padding: '5px'
        }
      }, /*#__PURE__*/React.createElement("p", null, "Name: ".concat(payload[0].payload.name)), /*#__PURE__*/React.createElement("p", null, "Status: ".concat(value === 1 ? 'On' : 'Off')));
    }
    return null;
  };
  return /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: 300
  }, /*#__PURE__*/React.createElement(BarChart, {
    data: data,
    margin: {
      top: 20,
      right: 30,
      left: 20,
      bottom: 5
    }
  }, /*#__PURE__*/React.createElement(CartesianGrid, {
    strokeDasharray: "3 3"
  }), /*#__PURE__*/React.createElement(XAxis, {
    dataKey: "x",
    tick: false
  }), /*#__PURE__*/React.createElement(YAxis, {
    domain: [0, 1],
    ticks: [0, 0.5, 1]
  }), /*#__PURE__*/React.createElement(Tooltip, {
    content: /*#__PURE__*/React.createElement(CustomTooltip, null)
  }), /*#__PURE__*/React.createElement(Bar, {
    dataKey: "status",
    maxBarSize: 50
  }, data.map(function (entry, index) {
    return /*#__PURE__*/React.createElement(Cell, {
      key: "cell-".concat(index),
      fill: entry.status === 1 ? '#8884d8' : '#ff7300' // Por ejemplo, azul para "On" y naranja para "Off"
    });
  }))));
};
export default StatusBarChart;