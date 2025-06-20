import React, { useEffect, useState } from "react";
import { Chart } from "chart.js/auto";
import { Bar, Line } from "react-chartjs-2";
import location from "@/constants/Extrasensory/location";

const MovementVisualization = ({ selectedYear }) => {
  const Data = location;
  const [df, setDf] = useState({
    "location:num_valid_updates": [],
    "location:min_speed": [],
    "location:max_speed": [],
    "location:log_diameter": [],
  });

  const returnToArray = (data, key) => {
    const allValues = [];

    for (const year in data.by_year) {
      const stats = data.by_year[year];
      if (stats[key]) {
        allValues.push(...stats[key]);
      }
    }

    return allValues;
  };

  useEffect(() => {
    const yearData = Data.by_year[selectedYear];
    if (yearData) {
      let df = {
        "location:num_valid_updates": yearData["num_valid_updates"] || [],
        "location:min_speed": yearData["min_speed"] || [],
        "location:max_speed": yearData["max_speed"] || [],
        "location:log_diameter": yearData["log_diameter"] || [],
      };
      setDf(df);
    } else {
      // Evita setear datos corruptos si el año no existe
      setDf({
        "location:num_valid_updates": returnToArray(Data, "num_valid_updates"),
        "location:min_speed": returnToArray(Data, "min_speed"),
        "location:max_speed": returnToArray(Data, "max_speed"),
        "location:log_diameter": returnToArray(Data, "log_diameter"),
      });
    }
  }, [selectedYear]);
  //console.log(df);
  // Función para calcular bins y frecuencias
  const calculateHistogramData = (data, binCount = 30) => {
    const filteredData = data.filter((val) => !isNaN(val));
    if (filteredData.length === 0) return { bins: [], frequencies: [] };

    const min = Math.min(...filteredData);
    const max = Math.max(...filteredData);
    const binSize = (max - min) / binCount;

    const bins = Array(binCount)
      .fill(0)
      .map((_, i) => min + i * binSize);
    const frequencies = Array(binCount).fill(0);

    filteredData.forEach((value) => {
      const binIndex = Math.min(
        Math.floor((value - min) / binSize),
        binCount - 1
      );
      frequencies[binIndex]++;
    });

    return { bins, frequencies };
  };

  // Gráfico 1: Actualizaciones válidas
  const validUpdatesData = calculateHistogramData(
    df["location:num_valid_updates"]
  );
  const validUpdatesChart = {
    labels: validUpdatesData.bins.map((bin) => bin.toFixed(2)),
    datasets: [
      {
        label: "Frecuencia",
        data: validUpdatesData.frequencies,
        backgroundColor: "rgba(54, 162, 235, 0.7)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Gráfico 2: Velocidades
  const minSpeedData = calculateHistogramData(df["location:min_speed"]);
  const maxSpeedData = calculateHistogramData(df["location:max_speed"]);
  const speedsChart = {
    labels: minSpeedData.bins.map((bin) => bin.toFixed(2)),
    datasets: [
      {
        label: "Velocidad mínima",
        data: minSpeedData.frequencies,
        backgroundColor: "rgba(135, 206, 235, 0.5)",
        borderColor: "rgba(135, 206, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Velocidad máxima",
        data: maxSpeedData.frequencies,
        backgroundColor: "rgba(255, 165, 0, 0.5)",
        borderColor: "rgba(255, 165, 0, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Gráfico 3: Diámetro
  const diameterData = calculateHistogramData(df["location:log_diameter"]);
  const diameterChart = {
    labels: diameterData.bins.map((bin) => bin.toFixed(2)),
    datasets: [
      {
        label: "Frecuencia",
        data: diameterData.frequencies,
        backgroundColor: "rgba(128, 0, 128, 0.7)",
        borderColor: "rgba(128, 0, 128, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Opciones comunes
  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => `Frecuencia: ${context.raw}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Frecuencia",
        },
      },
    },
  };

  return (
    <div className="grid grid-cols-3 gap-5 h-fit pb-10">
      {/* Gráfico 1: Actualizaciones válidas */}
      <div style={{ height: "400px" }}>
        <h3>Número de actualizaciones válidas</h3>
        <Bar
          data={validUpdatesChart}
          options={{
            ...commonOptions,
            plugins: {
              ...commonOptions.plugins,
              title: {
                display: true,
                text: "Distribución de actualizaciones válidas",
              },
            },
            scales: {
              ...commonOptions.scales,
              x: {
                title: {
                  display: true,
                  text: "Actualizaciones válidas",
                },
              },
            },
          }}
        />
      </div>

      {/* Gráfico 2: Velocidades */}
      <div style={{ height: "400px" }}>
        <h3>Distribución de velocidades</h3>
        <Bar
          data={speedsChart}
          options={{
            ...commonOptions,
            plugins: {
              ...commonOptions.plugins,
              title: {
                display: true,
                text: "Comparación de velocidades mínimas y máximas",
              },
            },
            scales: {
              ...commonOptions.scales,
              x: {
                title: {
                  display: true,
                  text: "Velocidad",
                },
              },
            },
          }}
        />
      </div>

      {/* Gráfico 3: Diámetro */}
      <div style={{ height: "400px" }}>
        <h3>Distribución de log(diámetro)</h3>
        <Bar
          data={diameterChart}
          options={{
            ...commonOptions,
            plugins: {
              ...commonOptions.plugins,
              title: {
                display: true,
                text: "Distribución del logaritmo del diámetro",
              },
            },
            scales: {
              ...commonOptions.scales,
              x: {
                title: {
                  display: true,
                  text: "log(Diámetro)",
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default MovementVisualization;
