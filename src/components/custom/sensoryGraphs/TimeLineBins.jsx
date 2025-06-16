import React, { useState } from "react";
import { Chart } from "chart.js/auto";
import { Line } from "react-chartjs-2";

const TimeLineBins = ({ data }) => {
  // Estado para el bin seleccionado
  const [selectedBin, setSelectedBin] = useState(0);

  // Extraer los bins disponibles (bin_10, bin_30, etc.)
  const binsAvailable = Object.keys(data);

  // Obtener datos del bin seleccionado
  const selectedBinData = data[binsAvailable[selectedBin]] || [];

  // Procesar los datos para el gráfico
  const values = selectedBinData.map((item) => item.mean);
  const stds = selectedBinData.map((item) => item.std);
  const timeLabels = selectedBinData.map((item) => item.label);

  // Encontrar índices de valores máximos y mínimos
  const maxIndex = values.indexOf(Math.max(...values));
  const minIndex = values.indexOf(Math.min(...values));

  const chartData = {
    labels: timeLabels,
    datasets: [
      {
        label: `Valor medio (${binsAvailable[selectedBin] || "Bin"})`,
        data: values,
        borderColor: "#1D3557",
        backgroundColor: "#E63946",
        borderWidth: 2.5,
        pointBackgroundColor: "#E63946",
        pointBorderColor: "white",
        pointRadius: 3,
        pointHoverRadius: 5,
        fill: false,
        tension: 0.1,
      },
      {
        label: "Límite superior",
        data: values.map((val, i) => val + stds[i]),
        borderColor: "#A8DADC",
        backgroundColor: "rgba(168, 218, 220, 0.1)",
        borderWidth: 1,
        borderDash: [5, 5],
        pointRadius: 0,
        fill: false,
      },
      {
        label: "Límite inferior",
        data: values.map((val, i) => val - stds[i]),
        borderColor: "#A8DADC",
        backgroundColor: "rgba(168, 218, 220, 0.1)",
        borderWidth: 1,
        borderDash: [5, 5],
        pointRadius: 0,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: `Evolución Temporal - ${binsAvailable[selectedBin] || "Bin"}`,
        font: {
          size: 16,
          weight: "bold",
        },
        color: "#fff",
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
        mode: "index",
        intersect: false,
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              const std =
                context.datasetIndex === 0
                  ? stds[context.dataIndex]
                  : context.datasetIndex === 1
                  ? stds[context.dataIndex]
                  : -stds[context.dataIndex];
              label += `${context.parsed.y.toFixed(2)} (std: ${Math.abs(
                std
              ).toFixed(2)})`;
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Fecha",
          font: {
            size: 12,
            weight: "bold",
          },
          padding: { top: 10 },
        },
        grid: {
          display: true,
          drawOnChartArea: true,
          drawTicks: true,
          color: "rgba(0, 0, 0, 0.05)",
        },
      },
      y: {
        title: {
          display: true,
          text: "Valor Normalizado",
          font: {
            size: 12,
            weight: "bold",
          },
          padding: { bottom: 10 },
        },
        grid: {
          display: true,
          drawOnChartArea: true,
          drawTicks: true,
          color: "rgba(0, 0, 0, 0.05)",
        },
        beginAtZero: false,
      },
    },
  };

  return (
    <div style={{ width: "100%", position: "relative" }}>
      {/* Selector de bins */}
      {binsAvailable.length > 1 && (
        <div
          style={{
            marginBottom: "20px",
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          {binsAvailable.map((bin, index) => (
            <button
              key={bin}
              onClick={() => setSelectedBin(index)}
              style={{
                padding: "8px 12px",
                backgroundColor: selectedBin === index ? "#1D3557" : "#A8DADC",
                color: selectedBin === index ? "white" : "#1D3557",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "bold",
                transition: "all 0.3s ease",
              }}
            >
              {bin}
            </button>
          ))}
        </div>
      )}

      {/* Gráfico */}
      <div style={{ height: "400px", position: "relative" }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default TimeLineBins;
