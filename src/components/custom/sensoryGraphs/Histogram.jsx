import React from "react";
import { Chart } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import "chartjs-plugin-datalabels";

const HistogramWithKDE = ({
  data,
  color = "#1D3557",
  kdeColor = "#E63946",
  title = "Distribución de valores",
}) => {
  // Calcular bins automáticamente (puedes ajustar esto según tus necesidades)
  const binCount = Math.ceil(Math.sqrt(data.length));
  const minValue = Math.min(...data);
  const maxValue = Math.max(...data);
  const binSize = (maxValue - minValue) / binCount;

  // Crear bins y contar frecuencias
  const bins = Array(binCount)
    .fill(0)
    .map((_, i) => minValue + i * binSize);
  const frequencies = Array(binCount).fill(0);

  data.forEach((value) => {
    const binIndex = Math.min(
      Math.floor((value - minValue) / binSize),
      binCount - 1
    );
    frequencies[binIndex]++;
  });

  // Calcular KDE (estimación de densidad kernel)
  const bandwidth =
    1.06 * Math.sqrt(variance(data)) * Math.pow(data.length, -1 / 5);
  const kdePoints = 100;
  const kdeX = Array(kdePoints)
    .fill(0)
    .map((_, i) => minValue + ((maxValue - minValue) * i) / (kdePoints - 1));
  const kdeY = kdeX.map(
    (x) =>
      data.reduce((sum, d) => sum + gaussianKernel((x - d) / bandwidth), 0) /
      (data.length * bandwidth)
  );

  // Normalizar KDE para que coincida visualmente con el histograma
  const maxFrequency = Math.max(...frequencies);
  const maxKDE = Math.max(...kdeY);
  const scaledKDE = kdeY.map((y) => (y * maxFrequency) / maxKDE);

  const chartData = {
    labels: bins.map((bin, i) => bin.toFixed(2)),
    datasets: [
      {
        label: "Frecuencia",
        data: frequencies,
        backgroundColor: color,
        borderColor: color,
        borderWidth: 1,
        barPercentage: 0.9,
        categoryPercentage: 1.0,
      },
      {
        label: "KDE",
        data: scaledKDE,
        backgroundColor: "transparent",
        borderColor: kdeColor,
        borderWidth: 2,
        pointRadius: 0,
        type: "line",
        fill: false,
        tension: 0.4,
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
        position: "top",
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            if (context.datasetIndex === 0) {
              return `Frecuencia: ${context.raw}`;
            } else {
              const originalValue = (
                (context.raw * maxKDE) /
                maxFrequency
              ).toFixed(4);
              return `Densidad: ${originalValue}`;
            }
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Valores",
          font: {
            weight: "bold",
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Frecuencia / Densidad",
          font: {
            weight: "bold",
          },
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "400px", position: "relative" }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

// Función para calcular la varianza
function variance(arr) {
  const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
  return arr.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / arr.length;
}

// Función del kernel gaussiano
function gaussianKernel(u) {
  return (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * u * u);
}

export default HistogramWithKDE;
