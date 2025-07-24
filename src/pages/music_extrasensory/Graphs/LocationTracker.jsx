import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, MapPin } from "lucide-react";

const LocationTracker = () => {
  // Datos de ejemplo
  const sampleData = [
    {
      latitude: 33.716835,
      longitude: -117.963662,
      timestamp: "2024-07-11 06:30:00",
      activity_color: "#6366F1",
      activity_label: "SLEEPING",
    },
    {
      latitude: 33.716835,
      longitude: -117.963662,
      timestamp: "2024-07-11 07:00:00",
      activity_color: "#3B82F6",
      activity_label: "BATHING_-_SHOWER",
    },
    {
      latitude: 33.716835,
      longitude: -117.963662,
      timestamp: "2024-07-11 07:15:00",
      activity_color: "#EC4899",
      activity_label: "GROOMING",
    },
    {
      latitude: 33.716835,
      longitude: -117.963662,
      timestamp: "2024-07-11 07:30:00",
      activity_color: "#EC4899",
      activity_label: "DRESSING",
    },
    {
      latitude: 33.716835,
      longitude: -117.963662,
      timestamp: "2024-07-11 07:45:00",
      activity_color: "#F97316",
      activity_label: "COOKING",
    },
    {
      latitude: 33.716835,
      longitude: -117.963662,
      timestamp: "2024-07-11 08:30:00",
      activity_color: "#06B6D4",
      activity_label: "SURFING_THE_INTERNET",
    },
    {
      latitude: 33.718245,
      longitude: -117.961892,
      timestamp: "2024-07-11 09:00:00",
      activity_color: "#6B7280",
      activity_label: "DRIVE_-_I_M_THE_DRIVER",
    },
    {
      latitude: 33.724567,
      longitude: -117.955234,
      timestamp: "2024-07-11 09:30:00",
      activity_color: "#6B7280",
      activity_label: "COMPUTER_WORK",
    },
    {
      latitude: 33.724567,
      longitude: -117.955234,
      timestamp: "2024-07-11 10:00:00",
      activity_color: "#EAB308",
      activity_label: "IN_A_MEETING",
    },
    {
      latitude: 33.724567,
      longitude: -117.955234,
      timestamp: "2024-07-11 11:00:00",
      activity_color: "#6B7280",
      activity_label: "COMPUTER_WORK",
    },
    {
      latitude: 33.724567,
      longitude: -117.955234,
      timestamp: "2024-07-11 12:00:00",
      activity_color: "#14B8A6",
      activity_label: "TALKING",
    },
    {
      latitude: 33.725123,
      longitude: -117.954876,
      timestamp: "2024-07-11 12:30:00",
      activity_color: "#F97316",
      activity_label: "COOKING",
    },
    {
      latitude: 33.724567,
      longitude: -117.955234,
      timestamp: "2024-07-11 13:30:00",
      activity_color: "#6B7280",
      activity_label: "COMPUTER_WORK",
    },
    {
      latitude: 33.724567,
      longitude: -117.955234,
      timestamp: "2024-07-11 14:00:00",
      activity_color: "#EAB308",
      activity_label: "LAB_WORK",
    },
    {
      latitude: 33.724567,
      longitude: -117.955234,
      timestamp: "2024-07-11 15:00:00",
      activity_color: "#EAB308",
      activity_label: "IN_A_MEETING",
    },
    {
      latitude: 33.724567,
      longitude: -117.955234,
      timestamp: "2024-07-11 16:00:00",
      activity_color: "#6B7280",
      activity_label: "COMPUTER_WORK",
    },
    {
      latitude: 33.724567,
      longitude: -117.955234,
      timestamp: "2024-07-11 17:00:00",
      activity_color: "#14B8A6",
      activity_label: "TALKING",
    },
    {
      latitude: 33.721234,
      longitude: -117.958765,
      timestamp: "2024-07-11 18:00:00",
      activity_color: "#6B7280",
      activity_label: "DRIVE_-_I_M_THE_DRIVER",
    },
    {
      latitude: 33.719876,
      longitude: -117.960123,
      timestamp: "2024-07-11 18:30:00",
      activity_color: "#EF4444",
      activity_label: "SHOPPING",
    },
    {
      latitude: 33.716835,
      longitude: -117.963662,
      timestamp: "2024-07-11 19:00:00",
      activity_color: "#6B7280",
      activity_label: "DRIVE_-_I_M_THE_DRIVER",
    },
    {
      latitude: 33.716835,
      longitude: -117.963662,
      timestamp: "2024-07-11 19:30:00",
      activity_color: "#F97316",
      activity_label: "COOKING",
    },
    {
      latitude: 33.716835,
      longitude: -117.963662,
      timestamp: "2024-07-11 20:30:00",
      activity_color: "#22C55E",
      activity_label: "WASHING_DISHES",
    },
    {
      latitude: 33.716835,
      longitude: -117.963662,
      timestamp: "2024-07-11 21:00:00",
      activity_color: "#8B5CF6",
      activity_label: "WATCHING_TV",
    },
    {
      latitude: 33.716835,
      longitude: -117.963662,
      timestamp: "2024-07-11 22:00:00",
      activity_color: "#06B6D4",
      activity_label: "SURFING_THE_INTERNET",
    },
    {
      latitude: 33.716835,
      longitude: -117.963662,
      timestamp: "2024-07-11 22:30:00",
      activity_color: "#3B82F6",
      activity_label: "BATHING_-_SHOWER",
    },
    {
      latitude: 33.716835,
      longitude: -117.963662,
      timestamp: "2024-07-11 23:00:00",
      activity_color: "#EC4899",
      activity_label: "GROOMING",
    },
    {
      latitude: 33.716835,
      longitude: -117.963662,
      timestamp: "2024-07-11 23:30:00",
      activity_color: "#6366F1",
      activity_label: "SLEEPING",
    },
  ];

  const [data, setData] = useState(sampleData);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState("06:00");
  const intervalRef = useRef(null);

  // Función para convertir timestamp a hora
  const getTimeFromTimestamp = (timestamp) => {
    return timestamp.split(" ")[1].slice(0, 5);
  };

  // Función para calcular la duración de cada actividad
  const getActivityDurations = () => {
    const durations = [];
    for (let i = 0; i < data.length; i++) {
      const current = new Date(data[i].timestamp);
      const next =
        i < data.length - 1
          ? new Date(data[i + 1].timestamp)
          : new Date(current.getTime() + 60 * 60 * 1000);
      const duration = (next - current) / (1000 * 60 * 60); // en horas
      durations.push(duration);
    }
    75;
    return durations;
  };

  const activityDurations = getActivityDurations();

  // Control de reproducción
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => {
          const nextIndex = prev + 1;
          if (nextIndex >= data.length) {
            setIsPlaying(false);
            return prev;
          }
          setCurrentTime(getTimeFromTimestamp(data[nextIndex].timestamp));
          return nextIndex;
        });
      }, 1000); // Cambia cada segundo para la demo
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPlaying, data.length]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setCurrentTime(getTimeFromTimestamp(data[0].timestamp));
    setIsPlaying(false);
  };

  // Función para convertir coordenadas a píxeles del mapa
  const coordsToPixels = (lat, lng) => {
    const mapWidth = 480;
    const mapHeight = 320;

    // Obtener bounds de los datos
    const lats = data.map((d) => d.latitude);
    const lngs = data.map((d) => d.longitude);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);

    // Convertir a píxeles con padding
    const padding = 50;
    const x =
      padding + ((lng - minLng) / (maxLng - minLng)) * (mapWidth - 2 * padding);
    const y =
      padding +
      ((maxLat - lat) / (maxLat - minLat)) * (mapHeight - 2 * padding);

    return { x, y };
  };

  // Generar horas para el timeline
  const timelineHours = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, "0");
    return `${hour}:00`;
  });

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Rastreador de Ubicación Diario
      </h2>

      <div className="flex gap-6">
        {/* Mapa */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">
                Mapa de Ubicaciones
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  Hora actual: {currentTime}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={handlePlayPause}
                    className="!p-2 !bg-blue-500 !text-white !rounded-md !hover:bg-blue-600 !transition-colors"
                  >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                  </button>
                  <button
                    onClick={handleRestart}
                    className="p!-2 !bg-gray-500 !text-white !rounded-md !hover:bg-gray-600 !transition-colors"
                  >
                    <RotateCcw size={20} />
                  </button>
                </div>
              </div>
            </div>

            <div className="relative bg-gray-100 rounded-lg">
              <svg width="480" height="320" className="w-full h-auto">
                {/* Fondo del mapa */}
                <rect fill="#e5f3ff" className="min-w-full min-h-full" />

                {/* Líneas de conexión entre puntos */}
                {data.slice(0, currentIndex + 1).map((point, index) => {
                  if (index === 0) return null;
                  const prevPoint = data[index - 1];
                  const currentCoords = coordsToPixels(
                    point.latitude,
                    point.longitude
                  );
                  const prevCoords = coordsToPixels(
                    prevPoint.latitude,
                    prevPoint.longitude
                  );

                  return (
                    <line
                      key={`line-${index}`}
                      x1={prevCoords.x}
                      y1={prevCoords.y}
                      x2={currentCoords.x}
                      y2={currentCoords.y}
                      stroke="#94a3b8"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                    />
                  );
                })}

                {/* Puntos visitados */}
                {data.slice(0, currentIndex + 1).map((point, index) => {
                  const coords = coordsToPixels(
                    point.latitude,
                    point.longitude
                  );
                  const isCurrentPoint = index === currentIndex;

                  return (
                    <g key={`point-${index}`}>
                      <circle
                        cx={coords.x}
                        cy={coords.y}
                        r={isCurrentPoint ? 10 : 6}
                        fill={point.activity_color}
                        stroke="#fff"
                        strokeWidth="2"
                        className={isCurrentPoint ? "animate-pulse" : ""}
                      />
                    </g>
                  );
                })}

                {/* Etiquetas de actividad */}
                {data.slice(0, currentIndex + 1).map((point, index) => {
                  const coords = coordsToPixels(
                    point.latitude,
                    point.longitude
                  );
                  const isCurrentPoint = index === currentIndex;

                  if (!isCurrentPoint) return null;

                  return (
                    <g key={`label-${index}`} style={{ zIndex: "10" }}>
                      <rect
                        x={coords.x + 15}
                        y={coords.y - 10}
                        width={point.activity_label.length * 8 + 16}
                        height="20"
                        fill="white"
                        stroke={point.activity_color}
                        strokeWidth="1"
                        rx="4"
                      />
                      <text
                        x={coords.x + 23}
                        y={coords.y + 4}
                        fontSize="12"
                        fill={point.activity_color}
                        fontWeight="bold"
                      >
                        {point.activity_label}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        </div>

        {/* Timeline de actividades */}
        <div className="w-80">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Timeline de Actividades
            </h3>

            <div className="space-y-1 max-h-[515px]">
              {/* Horas del día */}
              <div className="flex items-center mb-2">
                <div className="w-16 text-xs text-gray-500 font-mono">Hora</div>
                <div className="flex-1 text-xs text-gray-500">Actividad</div>
              </div>
              <div className="flex flex-col gap-1 overflow-y-auto max-h-[400px]">
                {data.map((point, index) => {
                  const time = getTimeFromTimestamp(point.timestamp);
                  const duration = activityDurations[index];
                  const width = Math.max(duration * 40, 20); // Ancho basado en duración
                  const isActive = index <= currentIndex;
                  const isCurrent = index === currentIndex;

                  return (
                    <div
                      key={index}
                      className={`flex items-center py-1 transition-all duration-300 ${
                        isCurrent ? "bg-blue-50 rounded-md px-2" : ""
                      }`}
                    >
                      <div className="w-16 text-xs text-gray-600 font-mono">
                        {time}
                      </div>
                      <div className="flex-1 flex items-center gap-2">
                        <div
                          className={`h-6 rounded-md transition-all duration-500 ${
                            isActive ? "opacity-100" : "opacity-30"
                          }`}
                          style={{
                            backgroundColor: point.activity_color,
                            width: `${width}px`,
                            transform: isCurrent ? "scale(1.05)" : "scale(1)",
                          }}
                        />
                        <span
                          className={`text-xs transition-all duration-300 ${
                            isActive
                              ? "text-gray-800 font-medium"
                              : "text-gray-400"
                          }`}
                        >
                          {point.activity_label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Indicador de progreso */}
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Progreso del día</span>
                <span>
                  {Math.round(((currentIndex + 1) / data.length) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${((currentIndex + 1) / data.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Panel de información actual */}
      <div className="mt-6 bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <MapPin
                size={20}
                style={{ color: data[currentIndex]?.activity_color }}
              />
              <span className="font-semibold text-gray-700">
                Actividad Actual:
              </span>
              <span
                className="px-3 py-1 rounded-full text-sm font-medium text-white"
                style={{ backgroundColor: data[currentIndex]?.activity_color }}
              >
                {data[currentIndex]?.activity_label}
              </span>
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-semibold">Ubicación:</span>{" "}
              {data[currentIndex]?.latitude.toFixed(6)},{" "}
              {data[currentIndex]?.longitude.toFixed(6)}
            </div>
          </div>
          <div className="text-sm text-gray-500">
            Punto {currentIndex + 1} de {data.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationTracker;
