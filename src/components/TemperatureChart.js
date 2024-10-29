import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import '../styles/TemperatureChart.css';

function TemperatureChart({ hourlyData }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null); // riferimento all'istanza del grafico

  useEffect(() => {
    if (!hourlyData) return;

    const ctx = chartRef.current.getContext('2d');

    // Se esiste già un'istanza del grafico, distruggila prima di crearne una nuova
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Creazione di una nuova istanza del grafico
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: hourlyData.time.slice(0, 24),
        datasets: [
          {
            label: 'Temperature (°C)',
            data: hourlyData.temperature_2m.slice(0, 24),
            borderColor: 'blue',
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: { display: true },
          y: { display: true, beginAtZero: true },
        },
      },
    });

    // Funzione di cleanup per distruggere il grafico all'aggiornamento o smontaggio
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [hourlyData]);

  return <canvas ref={chartRef} />;
}

export default TemperatureChart;
