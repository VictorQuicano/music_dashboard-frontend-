import React from "react";
import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
} from "chart.js";

// Registrar los componentes necesarios de Chart.js
ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale
);

const ScatterChart = ({
  data,
  title = "Gráfico de Dispersión",
  xLabel = "Eje X",
  yLabel = "Eje Y",
  pointRadius = 6,
  pointHoverRadius = 8,
  showLine = false,
  aspectRatio = 1,
}) => {
  // Opciones del gráfico
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: aspectRatio,
    plugins: {
      title: {
        display: true,
        text: title,
        font: {
          size: 18,
          weight: "bold",
        },
        padding: {
          top: 10,
          bottom: 20,
        },
      },
      legend: {
        position: "top",
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `(${context.parsed.x}, ${context.parsed.y})`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: xLabel,
          font: {
            size: 14,
            weight: "bold",
          },
        },
        grid: {
          display: true,
          color: "rgba(0, 0, 0, 0.05)",
        },
      },
      y: {
        title: {
          display: true,
          text: yLabel,
          font: {
            size: 14,
            weight: "bold",
          },
        },
        grid: {
          display: true,
          color: "rgba(0, 0, 0, 0.05)",
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "100%", minHeight: "800px" }}>
      <Scatter data={data} options={options} />
    </div>
  );
};

export default ScatterChart;
