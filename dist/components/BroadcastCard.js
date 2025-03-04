function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
// src/BroadcastCard.jsx
import React, { useState } from 'react';
import StatusBarChart from './StatusBarChart';
import MuxPlayer from '@mux/mux-player-react';
import '../index.css';
var extractPlaybackId = function extractPlaybackId(url) {
  var regex = /https:\/\/stream\.mux\.com\/(.*?)\.m3u8/;
  var match = url.match(regex);
  return match ? match[1] : null;
};
var BroadcastCard = function BroadcastCard(_ref) {
  var deviceInfo = _ref.deviceInfo,
    broadcast = _ref.broadcast;
  // Estado para controlar el modal y el playbackId del video a reproducir
  var _useState = useState(null),
    _useState2 = _slicedToArray(_useState, 2),
    videoPlaybackId = _useState2[0],
    setVideoPlaybackId = _useState2[1];
  var handlePlayVideo = function handlePlayVideo(url) {
    var playbackId = extractPlaybackId(url);
    setVideoPlaybackId(playbackId);
  };
  var closeModal = function closeModal() {
    setVideoPlaybackId(null);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "broadcast-card-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "broadcast-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "broadcast-card-chart"
  }, /*#__PURE__*/React.createElement("h4", null, "Video Streaming Status"), /*#__PURE__*/React.createElement(StatusBarChart, {
    deviceData: deviceInfo
  })), /*#__PURE__*/React.createElement("div", {
    className: "device-info-table-container"
  }, /*#__PURE__*/React.createElement("table", {
    className: "device-info-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Name"), /*#__PURE__*/React.createElement("th", null, "Network"), /*#__PURE__*/React.createElement("th", null, "Status"), /*#__PURE__*/React.createElement("th", null, "Battery"), /*#__PURE__*/React.createElement("th", null, "Transmission"), /*#__PURE__*/React.createElement("th", null, "Date"), /*#__PURE__*/React.createElement("th", null, "Video"))), /*#__PURE__*/React.createElement("tbody", null, deviceInfo && deviceInfo.length > 0 ? deviceInfo.map(function (device) {
    return /*#__PURE__*/React.createElement("tr", {
      key: device.id
    }, /*#__PURE__*/React.createElement("td", null, device.name || 'Sin Nombre'), /*#__PURE__*/React.createElement("td", null, device.network_type), /*#__PURE__*/React.createElement("td", null, device.networkStatus), /*#__PURE__*/React.createElement("td", null, device.battery_level, "%"), /*#__PURE__*/React.createElement("td", null, device.duration), /*#__PURE__*/React.createElement("td", null, device.timestamp && new Date(device.timestamp.seconds * 1000).toLocaleString()), /*#__PURE__*/React.createElement("td", null, device.url ? /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return handlePlayVideo(device.url);
      }
    }, "\u25B6\uFE0F") : 'N/A'));
  }) : /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: "7",
    style: {
      textAlign: 'center'
    }
  }, "No hay device info disponible.")))))), videoPlaybackId && /*#__PURE__*/React.createElement("div", {
    className: "modal-overlay",
    onClick: closeModal
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-content",
    onClick: function onClick(e) {
      return e.stopPropagation();
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "modal-close",
    onClick: closeModal
  }, "\xD7"), /*#__PURE__*/React.createElement(MuxPlayer, {
    playbackId: videoPlaybackId,
    metadataVideoTitle: "Video Stream",
    primaryColor: "#ffffff",
    secondaryColor: "#000000",
    accentColor: "#fa50b5",
    streamType: "on-demand",
    style: {
      width: '100%',
      height: '100%'
    }
  }))));
};
export default BroadcastCard;