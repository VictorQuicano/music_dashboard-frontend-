import React from "react";
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

// Registrar componentes necesarios
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MusicStatsChart = ({ data }) => {
  if (!data || !data.general) return <div>No hay datos disponibles</div>;

  // Extraer categorías y datos
  const categories = Object.keys(data.general);
  const statsLabels = data.general.popularity.map((item) =>
    item.label.replace(/(mean_|median_|max_|min_)/, "")
  );

  // Configurar datos para Chart.js
  const chartData = {
    labels: statsLabels,
    datasets: categories.map((category) => ({
      label: category,
      data: data.general[category].map((item) => item.count),
      backgroundColor: getCategoryColor(category),
      borderColor: getCategoryColor(category, 1),
      borderWidth: 1,
    })),
  };

  // Opciones del gráfico
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Estadísticas Musicales",
        font: {
          size: 18,
          weight: "bold",
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${
              context.dataset.label
            }: ${context.parsed.y.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Estadísticas",
          font: {
            weight: "bold",
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Valor",
          font: {
            weight: "bold",
          },
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "600px", padding: "20px" }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

// Función auxiliar para colores por categoría
function getCategoryColor(category, opacity = 0.7) {
  const colorMap = {
    popularity: `rgba(75, 192, 192, ${opacity})`,
    danceability: `rgba(255, 99, 132, ${opacity})`,
    energy: `rgba(54, 162, 235, ${opacity})`,
    key: `rgba(255, 206, 86, ${opacity})`,
    mode: `rgba(153, 102, 255, ${opacity})`,
    valence: `rgba(255, 159, 64, ${opacity})`,
    tempo: `rgba(199, 199, 199, ${opacity})`,
    duration_ms: `rgba(83, 102, 255, ${opacity})`,
  };
  return colorMap[category] || `rgba(169, 169, 169, ${opacity})`;
}

export default MusicStatsChart;
