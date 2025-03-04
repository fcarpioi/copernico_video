function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
// DeviceChart.js
import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// Función para convertir la duración de "HH:MM:SS" a segundos
var parseDuration = function parseDuration(durationStr) {
  var parts = durationStr.split(':');
  if (parts.length !== 3) return 0;
  var _parts$map = parts.map(Number),
    _parts$map2 = _slicedToArray(_parts$map, 3),
    hours = _parts$map2[0],
    minutes = _parts$map2[1],
    seconds = _parts$map2[2];
  return hours * 3600 + minutes * 60 + seconds;
};

// Función para formatear el timestamp (suponiendo que es un objeto Timestamp de Firestore)
var formatTimestamp = function formatTimestamp(timestamp) {
  var date = timestamp.toDate();
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });
};
var DeviceChart = function DeviceChart(_ref) {
  var deviceData = _ref.deviceData;
  // Procesar datos para la gráfica
  var chartData = deviceData.map(function (item) {
    return {
      time: formatTimestamp(item.timestamp),
      battery: item.battery_level,
      // Se espera un número entre 0 y 100
      duration: parseDuration(item.duration) // Duración en segundos
    };
  });
  return (
    /*#__PURE__*/
    // ResponsiveContainer ajusta el tamaño del gráfico al contenedor padre
    React.createElement(ResponsiveContainer, {
      width: "100%",
      height: 300
    }, /*#__PURE__*/React.createElement(LineChart, {
      data: chartData
    }, /*#__PURE__*/React.createElement(CartesianGrid, {
      strokeDasharray: "3 3"
    }), /*#__PURE__*/React.createElement(XAxis, {
      dataKey: "time"
    }), /*#__PURE__*/React.createElement(YAxis, {
      yAxisId: "left",
      label: {
        value: 'Battery Level (%)',
        angle: -90,
        position: 'insideLeft'
      }
    }), /*#__PURE__*/React.createElement(YAxis, {
      yAxisId: "right",
      orientation: "right",
      label: {
        value: 'Transmission (s)',
        angle: 90,
        position: 'insideRight'
      }
    }), /*#__PURE__*/React.createElement(Tooltip, null), /*#__PURE__*/React.createElement(Legend, null), /*#__PURE__*/React.createElement(Line, {
      yAxisId: "left",
      type: "monotone",
      dataKey: "battery",
      stroke: "#8884d8",
      activeDot: {
        r: 8
      },
      name: "Battery Level"
    }), /*#__PURE__*/React.createElement(Line, {
      yAxisId: "right",
      type: "monotone",
      dataKey: "duration",
      stroke: "#82ca9d",
      name: "Transmission (s)"
    })))
  );
};
export default DeviceChart;