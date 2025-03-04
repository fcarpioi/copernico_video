// DeviceChart.js
import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

// Función para convertir la duración de "HH:MM:SS" a segundos
const parseDuration = (durationStr) => {
  const parts = durationStr.split(':');
  if (parts.length !== 3) return 0;
  const [hours, minutes, seconds] = parts.map(Number);
  return hours * 3600 + minutes * 60 + seconds;
};

// Función para formatear el timestamp (suponiendo que es un objeto Timestamp de Firestore)
const formatTimestamp = (timestamp) => {
  const date = timestamp.toDate();
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const DeviceChart = ({ deviceData }) => {
  // Procesar datos para la gráfica
  const chartData = deviceData.map((item) => ({
    time: formatTimestamp(item.timestamp),
    battery: item.battery_level, // Se espera un número entre 0 y 100
    duration: parseDuration(item.duration), // Duración en segundos
  }));

  return (
    // ResponsiveContainer ajusta el tamaño del gráfico al contenedor padre
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis
          yAxisId="left"
          label={{ value: 'Battery Level (%)', angle: -90, position: 'insideLeft' }}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          label={{ value: 'Transmission (s)', angle: 90, position: 'insideRight' }}
        />
        <Tooltip />
        <Legend />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="battery"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
          name="Battery Level"
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="duration"
          stroke="#82ca9d"
          name="Transmission (s)"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default DeviceChart;