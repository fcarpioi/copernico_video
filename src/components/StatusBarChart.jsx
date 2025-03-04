// src/StatusBarChart.jsx
import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

const StatusBarChart = ({ deviceData }) => {
  // Mapea los datos: para cada dispositivo se asigna un índice en X y se convierte networkStatus a 1 (On) o 0 (Off)
  const data = deviceData.map((device, index) => ({
    x: index + 1, // índice para posicionar la barra
    name: device.name,
    status: device.networkStatus === 'connected' ? 1 : 0.5,
  }));

  // Tooltip personalizado: muestra "On" o "Off" en lugar de 1/0
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
      return (
        <div style={{
          background: '#fff',
          border: '1px solid #ccc',
          padding: '5px'
        }}>
          <p>{`Name: ${payload[0].payload.name}`}</p>
          <p>{`Status: ${value === 1 ? 'On' : 'Off'}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="x" tick={false} />
        <YAxis domain={[0, 1]} ticks={[0, 0.5, 1]} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="status" maxBarSize={50}>
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.status === 1 ? '#8884d8' : '#ff7300'} // Por ejemplo, azul para "On" y naranja para "Off"
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StatusBarChart;