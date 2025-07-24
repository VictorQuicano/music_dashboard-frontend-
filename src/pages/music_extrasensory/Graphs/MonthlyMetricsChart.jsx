import React, { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const MonthlyMetricsChart = () => {
  // Datos de ejemplo siguiendo tu estructura
  const sampleData = {
    2019: {
      "01": { new_songs: 10, total_songs: 120 },
      "02": { new_songs: 20, total_songs: 110 },
      "03": { new_songs: 18, total_songs: 128 },
      "04": { new_songs: 22, total_songs: 102 },
      "05": { new_songs: 19, total_songs: 92 },
      "06": { new_songs: 2, total_songs: 220 },
      "07": { new_songs: 10, total_songs: 124 },
      "08": { new_songs: 0, total_songs: 262 },
      "09": { new_songs: 23, total_songs: 285 },
      10: { new_songs: 5, total_songs: 110 },
      11: { new_songs: 9, total_songs: 29 },
      12: { new_songs: 3, total_songs: 135 },
    },
    2020: {
      "01": { new_songs: 18, total_songs: 128 },
      "02": { new_songs: 3, total_songs: 135 },
      "03": { new_songs: 2, total_songs: 220 },
      "04": { new_songs: 19, total_songs: 92 },
      "05": { new_songs: 0, total_songs: 262 },
      "06": { new_songs: 10, total_songs: 124 },
      "07": { new_songs: 10, total_songs: 120 },
      "08": { new_songs: 5, total_songs: 110 },
      "09": { new_songs: 22, total_songs: 102 },
      10: { new_songs: 9, total_songs: 29 },
      11: { new_songs: 20, total_songs: 110 },
      12: { new_songs: 23, total_songs: 285 },
    },
  };

  const [selectedMetric, setSelectedMetric] = useState("new_songs");
  const [selectedYear, setSelectedYear] = useState("2019");

  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const metricOptions = [
    { value: "new_songs", label: "Nuevas Canciones" },
    { value: "total_songs", label: "Total de Canciones" },
  ];

  // Transformar datos para el gráfico
  const chartData = useMemo(() => {
    const yearData = sampleData[selectedYear];
    if (!yearData) return [];

    return Object.entries(yearData)
      .map(([month, data]) => ({
        month: monthNames[parseInt(month) - 1],
        monthNumber: parseInt(month),
        value: data[selectedMetric] || 0,
        ...data,
      }))
      .sort((a, b) => a.monthNumber - b.monthNumber);
  }, [selectedYear, selectedMetric, sampleData]);

  // Calcular el rango del eje Y basado en la métrica seleccionada
  const yAxisDomain = useMemo(() => {
    if (chartData.length === 0) return [0, 100];

    const values = chartData.map((item) => item.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const padding = (max - min) * 0.1;

    return [Math.max(0, Math.floor(min - padding)), Math.ceil(max + padding)];
  }, [chartData]);

  const formatTooltipValue = (value) => {
    return value.toLocaleString();
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="!text-2xl !font-bold !text-gray-800 !mb-4">
          Métricas Mensuales - {selectedYear}
        </h2>

        <div className="flex flex-wrap gap-4 mb-4">
          {/* Selector de Año */}
          <div className="flex flex-col">
            <label className="!text-sm !font-medium !text-gray-700 !mb-1">
              Año
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="!px-3 !py-2 !border !border-gray-300 !rounded-md !focus:outline-none !focus:ring-2 !focus:ring-blue-500 !focus:border-transparent !text-gray-700"
            >
              {Object.keys(sampleData).map((year) => (
                <option key={year} value={year} className="!text-gray-700">
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Selector de Métrica */}
          <div className="flex flex-col">
            <label className="!text-sm !font-medium !text-gray-700 !mb-1">
              Métrica
            </label>
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="!px-3 !py-2 !border !border-gray-300 !rounded-md !focus:outline-none !focus:ring-2 !focus:ring-blue-500 !focus:border-transparent !text-gray-700"
            >
              {metricOptions.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  className="!text-gray-700"
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Información actual */}
        <div className="bg-blue-50 p-3 rounded-md">
          <p className="text-sm text-blue-800">
            Mostrando:{" "}
            <span className="font-semibold">
              {metricOptions.find((opt) => opt.value === selectedMetric)?.label}
            </span>{" "}
            para el año <span className="font-semibold">{selectedYear}</span>
          </p>
        </div>
      </div>

      {/* Gráfico */}
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis
              dataKey="month"
              stroke="#666"
              fontSize={12}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis
              stroke="#666"
              fontSize={12}
              domain={yAxisDomain}
              tickFormatter={formatTooltipValue}
            />
            <Tooltip
              formatter={(value, name) => [
                formatTooltipValue(value),
                metricOptions.find((opt) => opt.value === selectedMetric)
                  ?.label,
              ]}
              labelStyle={{ color: "#333" }}
              contentStyle={{
                backgroundColor: "#f8f9fa",
                border: "1px solid #dee2e6",
                borderRadius: "4px",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#2563eb"
              strokeWidth={3}
              dot={{ fill: "#2563eb", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: "#2563eb", strokeWidth: 2 }}
              name={
                metricOptions.find((opt) => opt.value === selectedMetric)?.label
              }
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Estadísticas resumidas */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {chartData.length > 0 && (
          <>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800">Máximo</h3>
              <p className="text-2xl font-bold text-green-600">
                {Math.max(
                  ...chartData.map((item) => item.value)
                ).toLocaleString()}
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800">Promedio</h3>
              <p className="text-2xl font-bold text-blue-600">
                {Math.round(
                  chartData.reduce((sum, item) => sum + item.value, 0) /
                    chartData.length
                ).toLocaleString()}
              </p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-orange-800">Mínimo</h3>
              <p className="text-2xl font-bold text-orange-600">
                {Math.min(
                  ...chartData.map((item) => item.value)
                ).toLocaleString()}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MonthlyMetricsChart;
