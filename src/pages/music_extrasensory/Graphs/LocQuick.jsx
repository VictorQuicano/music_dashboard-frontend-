import ScatterChart from "../../../components/custom/sensoryGraphs/Scatter";

import location from "@/constants/Extrasensory/locQuick";

function transformScatterData(originalData, options = {}) {
  // Valores por defecto
  const defaultOptions = {
    pointRadius: 6,
    pointHoverRadius: 8,
    showLine: false,
    tension: 0.1,
  };

  // Combinar opciones proporcionadas con las predeterminadas
  const finalOptions = { ...defaultOptions, ...options };

  // Transformar cada dataset
  const transformedDatasets = originalData.datasets.map((dataset) => {
    return {
      ...dataset, // Mantener todas las propiedades originales
      pointRadius: finalOptions.pointRadius,
      pointHoverRadius: finalOptions.pointHoverRadius,
      showLine: finalOptions.showLine,
      tension: finalOptions.tension,
      // Propiedades adicionales con valores por defecto
      backgroundColor: dataset.backgroundColor || "rgba(75, 192, 192, 0.6)",
      borderColor: dataset.borderColor || "rgba(75, 192, 192, 1)",
      borderWidth: dataset.borderWidth || 1,
    };
  });

  return {
    ...originalData, // Mantener otras propiedades del objeto original
    datasets: transformedDatasets,
  };
}

export default function LocQuick({ selectedYear }) {
  const chartData = transformScatterData(location);
  return <ScatterChart data={chartData} xLabel="Latitud" yLabel="Longuitud" />;
}
