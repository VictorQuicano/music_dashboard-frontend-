import React from "react";
import { Chart } from "chart.js/auto";
import { Line } from "react-chartjs-2";

const TimeLine = ({ data }) => {
  // Procesar los datos para el formato que necesita Chart.js
  //console.log(data);
  const means = data.map((item) => item.mean);
  const stds = data.map((item) => item.std);
  const labels = data.map((item) => item.label);

  // Encontrar índices de valores máximos y mínimos para las anotaciones
  const maxIndex = means.indexOf(Math.max(...means));
  const minIndex = means.indexOf(Math.min(...means));

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Valor medio",
        data: means,
        borderColor: "#1D3557",
        backgroundColor: "#E63946",
        borderWidth: 2.5,
        pointBackgroundColor: "#E63946",
        pointBorderColor: "white",
        pointRadius: 5,
        pointHoverRadius: 7,
        fill: false,
        tension: 0.1,
      },
      {
        label: "Límite superior",
        data: means.map((mean, i) => mean + stds[i]),
        borderColor: "#A8DADC",
        backgroundColor: "rgba(168, 218, 220, 0.1)",
        borderWidth: 1,
        borderDash: [5, 5],
        pointRadius: 0,
        fill: {
          target: "-1",
          above: "rgba(168, 218, 220, 0.1)",
        },
      },
      {
        label: "Límite inferior",
        data: means.map((mean, i) => mean - stds[i]),
        borderColor: "#A8DADC",
        backgroundColor: "rgba(168, 218, 220, 0.1)",
        borderWidth: 1,
        borderDash: [5, 5],
        pointRadius: 0,
        fill: {
          target: "+1",
          above: "rgba(168, 218, 220, 0.1)",
        },
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Análisis Temporal de Datos",
        font: {
          size: 16,
          weight: "bold",
        },
        color: "#1D3557",
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
      annotation: {
        annotations: {
          maxPoint: {
            type: "label",
            content: `Máximo: ${means[maxIndex].toFixed(2)}±${stds[
              maxIndex
            ].toFixed(2)}`,
            position: {
              x: "right",
              y: "top",
            },
            xValue: maxIndex,
            yValue: means[maxIndex],
            backgroundColor: "rgba(230, 57, 70, 0.8)",
            color: "white",
            font: {
              size: 10,
            },
            padding: 5,
            xAdjust: 30,
            yAdjust: -30,
            callout: {
              enabled: true,
              side: 10,
            },
          },
          minPoint: {
            type: "label",
            content: `Mínimo: ${means[minIndex].toFixed(2)}±${stds[
              minIndex
            ].toFixed(2)}`,
            position: {
              x: "left",
              y: "bottom",
            },
            xValue: minIndex,
            yValue: means[minIndex],
            backgroundColor: "rgba(69, 123, 157, 0.8)",
            color: "white",
            font: {
              size: 10,
            },
            padding: 5,
            xAdjust: -30,
            yAdjust: 30,
            callout: {
              enabled: true,
              side: 10,
            },
          },
          zeroLine: {
            type: "line",
            yMin: 0,
            yMax: 0,
            borderColor: "#457B9D",
            borderWidth: 1,
            borderDash: [6, 6],
            opacity: 0.4,
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Periodo",
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
    <div style={{ width: "100%", height: "400px", position: "relative" }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default TimeLine;
