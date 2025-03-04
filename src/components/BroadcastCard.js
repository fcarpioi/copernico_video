// src/BroadcastCard.jsx
import React, { useState } from 'react';
import StatusBarChart from './StatusBarChart';
import MuxPlayer from '@mux/mux-player-react';
import '../index.css';

const extractPlaybackId = (url) => {
  const regex = /https:\/\/stream\.mux\.com\/(.*?)\.m3u8/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

const BroadcastCard = ({ deviceInfo, broadcast }) => {
  // Estado para controlar el modal y el playbackId del video a reproducir
  const [videoPlaybackId, setVideoPlaybackId] = useState(null);

  const handlePlayVideo = (url) => {
    const playbackId = extractPlaybackId(url);
    setVideoPlaybackId(playbackId);
  };

  const closeModal = () => {
    setVideoPlaybackId(null);
  };

  return (
    <div className="broadcast-card-container">
      <div className="broadcast-card">
        {/* Gráfico de barras de estado */}
        <div className="broadcast-card-chart">
          <h4>Video Streaming Status</h4>
          <StatusBarChart deviceData={deviceInfo} />
        </div>
        {/* Tabla de información */}
        <div className="device-info-table-container">
          <table className="device-info-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Network</th>
                <th>Status</th>
                <th>Battery</th>
                <th>Transmission</th>
                <th>Date</th>
                <th>Video</th>
              </tr>
            </thead>
            <tbody>
              {deviceInfo && deviceInfo.length > 0 ? (
                deviceInfo.map((device) => (
                  <tr key={device.id}>
                    <td>{device.name || 'Sin Nombre'}</td>
                    <td>{device.network_type}</td>
                    <td>{device.networkStatus}</td>
                    <td>{device.battery_level}%</td>
                    <td>{device.duration}</td>
                    <td>
                      {device.timestamp &&
                        new Date(device.timestamp.seconds * 1000).toLocaleString()}
                    </td>
                    <td>
                      {device.url ? (
                        <button onClick={() => handlePlayVideo(device.url)}>
                          ▶️
                        </button>
                      ) : (
                        'N/A'
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center' }}>
                    No hay device info disponible.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal para reproducir el video con MuxPlayer */}
      {videoPlaybackId && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              &times;
            </button>
            <MuxPlayer
              playbackId={videoPlaybackId}
              metadataVideoTitle="Video Stream"
              primaryColor="#ffffff"
              secondaryColor="#000000"
              accentColor="#fa50b5"
              streamType="on-demand"
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>
       )}
    </div>
  );
};

export default BroadcastCard;