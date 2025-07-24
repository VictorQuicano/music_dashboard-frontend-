import React, { useState, useMemo } from "react";

const RadialChart = ({
  data = {},
  subtitle = "TÍTULO - SUBTÍTULO",
  emoji = "🎵",
  centerText = "",
  baseColor = "#87CEEB", // Color base para valores bajos
  maxColor = "#1B4F72", // Color máximo para valores alto
}) => {
  const [selectedYear, setSelectedYear] = useState(
    Object.keys(data)[0] || "2024"
  );

  // Función para interpolar colores
  const interpolateColor = (color1, color2, factor) => {
    const hex1 = color1.replace("#", "");
    const hex2 = color2.replace("#", "");

    const r1 = parseInt(hex1.substring(0, 2), 16);
    const g1 = parseInt(hex1.substring(2, 4), 16);
    const b1 = parseInt(hex1.substring(4, 6), 16);

    const r2 = parseInt(hex2.substring(0, 2), 16);
    const g2 = parseInt(hex2.substring(2, 4), 16);
    const b2 = parseInt(hex2.substring(4, 6), 16);

    const r = Math.round(r1 + (r2 - r1) * factor);
    const g = Math.round(g1 + (g2 - g1) * factor);
    const b = Math.round(b1 + (b2 - b1) * factor);

    return `#${r.toString(16).padStart(2, "0")}${g
      .toString(16)
      .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  };

  // Procesar datos para el año seleccionado
  const processedData = useMemo(() => {
    const yearData = data[selectedYear];
    if (!yearData || !Array.isArray(yearData)) return [];

    const segmentCount = yearData.length;
    const segmentAngle = 360 / segmentCount;

    return yearData.map((value, index) => {
      // Asegurar que el valor esté entre 0 y 1
      const normalizedValue = Math.max(0, Math.min(1, value));
      const startAngle = index * segmentAngle;
      const endAngle = (index + 1) * segmentAngle;

      // Calcular color basado en el valor (interpolación entre baseColor y maxColor)
      const color = interpolateColor(baseColor, maxColor, normalizedValue);

      return {
        value: normalizedValue,
        originalValue: value,
        startAngle,
        endAngle,
        color,
        segmentAngle,
      };
    });
  }, [data, selectedYear, baseColor, maxColor, interpolateColor]);

  // Crear el path de la barra radial
  const createRadialBarPath = (
    centerX,
    centerY,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    value
  ) => {
    // Calcular el radio efectivo basado en el valor (0-1)
    const effectiveRadius = innerRadius + (outerRadius - innerRadius) * value;

    const start = polarToCartesian(centerX, centerY, effectiveRadius, endAngle);
    const end = polarToCartesian(centerX, centerY, effectiveRadius, startAngle);
    const innerStart = polarToCartesian(
      centerX,
      centerY,
      innerRadius,
      endAngle
    );
    const innerEnd = polarToCartesian(
      centerX,
      centerY,
      innerRadius,
      startAngle
    );

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    const d = [
      "M",
      start.x,
      start.y,
      "A",
      effectiveRadius,
      effectiveRadius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
      "L",
      innerEnd.x,
      innerEnd.y,
      "A",
      innerRadius,
      innerRadius,
      0,
      largeArcFlag,
      1,
      innerStart.x,
      innerStart.y,
      "Z",
    ].join(" ");

    return d;
  };

  // Convertir coordenadas polares a cartesianas
  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  // Crear líneas divisorias entre segmentos
  const createDividerLines = (centerX, centerY, innerRadius, outerRadius) => {
    return processedData.map((segment, index) => {
      const angle = segment.startAngle;
      const start = polarToCartesian(centerX, centerY, innerRadius, angle);
      const end = polarToCartesian(centerX, centerY, outerRadius, angle);

      return (
        <line
          key={`divider-${index}`}
          x1={start.x}
          y1={start.y}
          x2={end.x}
          y2={end.y}
          stroke="#ffffff"
          strokeWidth="2"
          opacity="0.7"
        />
      );
    });
  };

  // Crear etiquetas de años alrededor del círculo
  const createYearLabels = (centerX, centerY, radius) => {
    const years = Object.keys(data);
    if (years.length === 0) return [];
    const monthsAbbrev = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN"];

    return monthsAbbrev.map((month, index) => {
      const angle = (index / monthsAbbrev.length) * 360;
      const pos = polarToCartesian(centerX, centerY, radius, angle);

      return (
        <text
          key={`month-${month}`}
          x={pos.x}
          y={pos.y}
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-sm font-semibold fill-gray-600"
          transform={`rotate(${
            angle > 90 && angle < 270 ? angle + 180 : angle
          }, ${pos.x}, ${pos.y})`}
        >
          {month}
        </text>
      );
    });
  };

  const svgSize = 400;
  const center = svgSize / 2;
  const outerRadius = 160;
  const innerRadius = 80;
  const yearLabelRadius = 180;

  return (
    <div className="flex flex-col items-center p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg max-w-2xl mx-auto">
      {/* Selector de año 
      {Object.keys(data).length > 1 && (
        <div className="mb-4">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {Object.keys(data).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      )}
      */}
      {/* Gráfico SVG */}
      <div className="relative">
        <svg width={svgSize} height={svgSize} className="drop-shadow-lg">
          {/* Círculo de fondo */}
          <circle
            cx={center}
            cy={center}
            r={outerRadius}
            fill="none"
            stroke="#e9ecef"
            strokeWidth="2"
          />

          {/* Círculos de referencia */}
          <circle
            cx={center}
            cy={center}
            r={innerRadius + (outerRadius - innerRadius) * 0.25}
            fill="none"
            stroke="#f1f3f4"
            strokeWidth="1"
            strokeDasharray="5,5"
          />
          <circle
            cx={center}
            cy={center}
            r={innerRadius + (outerRadius - innerRadius) * 0.5}
            fill="none"
            stroke="#f1f3f4"
            strokeWidth="1"
            strokeDasharray="5,5"
          />
          <circle
            cx={center}
            cy={center}
            r={innerRadius + (outerRadius - innerRadius) * 0.75}
            fill="none"
            stroke="#f1f3f4"
            strokeWidth="1"
            strokeDasharray="5,5"
          />

          {/* Barras radiales */}
          {processedData.map((segment, index) => (
            <g key={`bar-${index}`}>
              {/* Barra de fondo (segmento completo) */}
              <path
                d={createRadialBarPath(
                  center,
                  center,
                  innerRadius,
                  outerRadius,
                  segment.startAngle,
                  segment.endAngle,
                  1
                )}
                fill="#f8f9fa"
                stroke="#e9ecef"
                strokeWidth="1"
                opacity="0.3"
              />
              {/* Barra de valor */}
              <path
                d={createRadialBarPath(
                  center,
                  center,
                  innerRadius,
                  outerRadius,
                  segment.startAngle,
                  segment.endAngle,
                  segment.value
                )}
                fill={segment.color}
                stroke="#ffffff"
                strokeWidth="1"
                className="transition-all duration-300 hover:opacity-80"
              />
            </g>
          ))}

          {/* Líneas divisorias */}
          {createDividerLines(center, center, innerRadius, outerRadius)}

          {/* Etiquetas de años */}
          {createYearLabels(center, center, yearLabelRadius)}

          {/* Círculo central */}
          <circle
            cx={center}
            cy={center}
            r={innerRadius}
            fill="white"
            stroke="#e9ecef"
            strokeWidth="2"
          />
        </svg>

        {/* Contenido central */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-4xl mb-2">{emoji}</div>
          {centerText && (
            <div className="text-center text-sm font-medium text-gray-700 max-w-20">
              {centerText}
            </div>
          )}
        </div>
      </div>

      {/* Subtítulo */}
      <div className="mt-4 text-center">
        <h3 className="text-lg font-bold text-gray-800 tracking-wide">
          {subtitle}
        </h3>
      </div>

      {/* Leyenda de colores */}
      <div className="mt-4 flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div
            className="w-4 h-4 rounded"
            style={{ backgroundColor: baseColor }}
          ></div>
          <span className="text-sm text-gray-600">0.0</span>
        </div>
        <div
          className="flex-1 h-4 rounded"
          style={{
            background: `linear-gradient(to right, ${baseColor}, ${maxColor})`,
          }}
        ></div>
        <div className="flex items-center space-x-2">
          <div
            className="w-4 h-4 rounded"
            style={{ backgroundColor: maxColor }}
          ></div>
          <span className="text-sm text-gray-600">1.0</span>
        </div>
      </div>

      {/* Estadísticas del año seleccionado 
      {processedData.length > 0 && (
        <div className="mt-6 w-full">
          <h4 className="text-md font-semibold text-gray-700 mb-3">
            Valores para {selectedYear}
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {processedData.map((segment, index) => (
              <div
                key={`stat-${index}`}
                className="bg-white p-3 rounded-lg shadow-sm border border-gray-200"
              >
                <div className="flex items-center mb-1">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: segment.color }}
                  ></div>
                  <span className="text-xs text-gray-600">
                    Segmento {index + 1}
                  </span>
                </div>
                <div className="text-lg font-bold text-gray-800">
                  {segment.originalValue.toFixed(3)}
                </div>
                <div className="text-xs text-gray-500">
                  {(segment.value * 100).toFixed(1)}%
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
        */}
    </div>
  );
};

export default RadialChart;
