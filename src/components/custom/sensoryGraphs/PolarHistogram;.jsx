import React from "react";
import { Chart } from "chart.js/auto";
import { PolarArea } from "react-chartjs-2";
import "chartjs-plugin-datalabels";

const PolarHistogram = ({
  sinData,
  cosData,
  color = "rgba(135, 206, 235, 0.7)",
  edgeColor = "black",
  title = "Distribución angular del reloj (heading)",
}) => {
  // Calcular los ángulos (en radianes)
  const angles = sinData.map((sinVal, i) => Math.atan2(sinVal, cosData[i]));

  // Convertir ángulos a grados (0-360)
  const degrees = angles.map((rad) => ((rad * 180) / Math.PI + 360) % 360);

  // Crear bins (36 bins = cada 10 grados)
  const binCount = 36;
  const binSize = 360 / binCount;
  const bins = Array(binCount).fill(0);

  degrees.forEach((deg) => {
    const binIndex = Math.floor(deg / binSize) % binCount;
    bins[binIndex]++;
  });

  // Configurar los datos para el gráfico polar
  const chartData = {
    labels: Array(binCount)
      .fill(0)
      .map((_, i) => `${i * binSize}°`),
    datasets: [
      {
        data: bins,
        backgroundColor: Array(binCount).fill(color),
        borderColor: edgeColor,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
          weight: "bold",
        },
        padding: {
          top: 10,
          bottom: 20,
        },
      },
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Frecuencia: ${context.raw}`;
          },
          title: function (context) {
            return `Ángulo: ${context[0].label}`;
          },
        },
      },
    },
    scales: {
      r: {
        angleLines: {
          display: true,
          color: "rgba(0, 0, 0, 0.1)",
        },
        suggestedMin: 0,
        ticks: {
          display: false,
        },
        grid: {
          circular: true,
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
    },
    elements: {
      arc: {
        borderWidth: 1,
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "800px", position: "relative" }}>
      <PolarArea data={chartData} options={options} />
    </div>
  );
};

export default PolarHistogram;
