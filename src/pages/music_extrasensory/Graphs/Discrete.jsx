import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import dataDiscrete from "@/constants/Extrasensory/discretes";

// Registrar componentes necesarios de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChartComponent = ({ selectedYear = "general" }) => {
  const [data, setData] = useState({});

  const dataTRaw = dataDiscrete;

  useEffect(() => {
    if (selectedYear === "general") {
      setData(dataTRaw?.general || {});
    } else {
      setData(dataTRaw?.by_year?.[selectedYear] || {});
    }
  }, [dataTRaw, selectedYear]);

  if (!data || Object.keys(data).length === 0) {
    return <div>No hay datos disponibles</div>;
  }

  // Opciones del gráfico
  const getChartOptions = (title) => ({
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
          weight: "bold",
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const value = context.parsed.y;
            const percent = total > 0 ? ((value / total) * 100).toFixed(2) : 0;
            return `${value.toLocaleString()} (${percent}%)`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return value.toLocaleString();
          },
        },
      },
    },
  });

  // Datos del gráfico
  const getChartData = (items = []) => {
    const backgroundColors = [
      "rgba(54, 162, 235, 0.7)",
      "rgba(255, 99, 132, 0.7)",
      "rgba(75, 192, 192, 0.7)",
      "rgba(153, 102, 255, 0.7)",
    ];

    return {
      labels: items.map((item) =>
        item.label.replace("is_", "").replace(/_/g, " ")
      ),
      datasets: [
        {
          label: "Cantidad",
          data: items.map((item) => item.count),
          backgroundColor: backgroundColors.slice(0, items.length),
          borderColor: backgroundColors
            .map((c) => c.replace("0.7", "1"))
            .slice(0, items.length),
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <div
      className="grid grid-cols-3"
      style={{
        gap: "20px",
        padding: "20px",
      }}
    >
      {Object.entries(data).map(([key, value]) => (
        <div
          key={key}
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            padding: "20px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            width: "100%", // Asegura que ocupe todo el ancho disponible
            minHeight: "500px", // Altura mínima de 500px
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h3 style={{ textTransform: "capitalize", marginBottom: "10px" }}>
            {key.replace(/_/g, " ")}
          </h3>
          <div
            style={{
              flex: 1, // Ocupa todo el espacio restante
              width: "100%",
              position: "relative", // Necesario para el correcto dimensionamiento de Chart.js
            }}
          >
            <Bar
              data={getChartData(value)}
              options={{
                ...getChartOptions(key.replace(/_/g, " ").toUpperCase()),
                responsive: true,
                maintainAspectRatio: false, // Permite que el gráfico se ajuste al contenedor
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default BarChartComponent;
