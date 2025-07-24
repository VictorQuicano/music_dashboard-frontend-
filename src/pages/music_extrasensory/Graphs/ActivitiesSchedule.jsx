import React, { useState, useMemo } from "react";
import { Clock, Calendar, Timer, Search, Filter } from "lucide-react";

const ActivitiesVisualization = () => {
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterByTime, setFilterByTime] = useState("all");

  const activities = [
    {
      name: "BATHING_-_SHOWER",
      intervals: ["06-09", "18-21"],
      duration: { min: 10, max: 30 },
    },
    {
      name: "GROOMING",
      intervals: ["06-09"],
      duration: { min: 5, max: 20 },
    },
    {
      name: "DRESSING",
      intervals: ["06-09"],
      duration: { min: 5, max: 15 },
    },
    {
      name: "TOILET",
      intervals: ["06-09"],
      duration: { min: 5, max: 10 },
    },
    {
      name: "COOKING",
      intervals: ["06-09", "12-15", "18-21"],
      duration: { min: 15, max: 90 },
    },
    {
      name: "CLEANING",
      intervals: ["09-12", "15-18"],
      duration: { min: 30, max: 120 },
    },
    {
      name: "DOING_LAUNDRY",
      intervals: ["09-12", "15-18"],
      duration: { min: 30, max: 120 },
    },
    {
      name: "WASHING_DISHES",
      intervals: ["12-15", "18-21"],
      duration: { min: 10, max: 45 },
    },
    {
      name: "WATCHING_TV",
      intervals: ["15-18", "18-21", "21-24"],
      duration: { min: 10, max: 240 },
    },
    {
      name: "SURFING_THE_INTERNET",
      intervals: [
        "00-03",
        "03-06",
        "06-09",
        "09-12",
        "12-15",
        "15-18",
        "18-21",
        "21-24",
      ],
      duration: { min: 15, max: 240 },
    },
    {
      name: "SLEEPING",
      intervals: ["21-24", "00-03", "03-06"],
      duration: { min: 360, max: 540 },
    },
    {
      name: "LAB_WORK",
      intervals: ["09-12", "15-18"],
      duration: { min: 60, max: 300 },
    },
    {
      name: "COMPUTER_WORK",
      intervals: ["09-12", "15-18"],
      duration: { min: 60, max: 480 },
    },
    {
      name: "IN_CLASS",
      intervals: ["09-12", "12-15"],
      duration: { min: 60, max: 180 },
    },
    {
      name: "IN_A_MEETING",
      intervals: ["09-12", "12-15", "15-18"],
      duration: { min: 15, max: 120 },
    },
    {
      name: "AT_A_PARTY",
      intervals: ["18-21", "21-24"],
      duration: { min: 60, max: 240 },
    },
    {
      name: "AT_A_BAR",
      intervals: ["18-21", "21-24"],
      duration: { min: 30, max: 180 },
    },
    {
      name: "AT_THE_GYM",
      intervals: ["06-09", "15-18"],
      duration: { min: 30, max: 120 },
    },
    {
      name: "STROLLING",
      intervals: ["06-09", "15-18", "18-21"],
      duration: { min: 20, max: 120 },
    },
    {
      name: "SINGING",
      intervals: [
        "00-03",
        "03-06",
        "06-09",
        "09-12",
        "12-15",
        "15-18",
        "18-21",
        "21-24",
      ],
      duration: { min: 5, max: 60 },
    },
    {
      name: "TALKING",
      intervals: [
        "00-03",
        "03-06",
        "06-09",
        "09-12",
        "12-15",
        "15-18",
        "18-21",
        "21-24",
      ],
      duration: { min: 1, max: 240 },
    },
    {
      name: "DRINKING__ALCOHOL_",
      intervals: ["18-21", "21-24"],
      duration: { min: 30, max: 180 },
    },
    {
      name: "SHOPPING",
      intervals: ["09-12", "12-15"],
      duration: { min: 30, max: 120 },
    },
    {
      name: "DRIVE_-_I_M_THE_DRIVER",
      intervals: ["06-09", "15-18"],
      duration: { min: 15, max: 90 },
    },
    {
      name: "DRIVE_-_I_M_A_PASSENGER",
      intervals: ["06-09", "15-18"],
      duration: { min: 15, max: 90 },
    },
    {
      name: "IN_A_CAR",
      intervals: [
        "00-03",
        "03-06",
        "06-09",
        "09-12",
        "12-15",
        "15-18",
        "18-21",
        "21-24",
      ],
      duration: { min: 30, max: 240 },
    },
    {
      name: "ON_A_BUS",
      intervals: [
        "00-03",
        "03-06",
        "06-09",
        "09-12",
        "12-15",
        "15-18",
        "18-21",
        "21-24",
      ],
      duration: { min: 10, max: 120 },
    },
    {
      name: "BICYCLING",
      intervals: ["06-09", "15-18"],
      duration: { min: 10, max: 120 },
    },
  ];

  const timeSlots = [
    { slot: "00-03", label: "00:00-03:00", period: "Madrugada" },
    { slot: "03-06", label: "03:00-06:00", period: "Madrugada" },
    { slot: "06-09", label: "06:00-09:00", period: "Mañana" },
    { slot: "09-12", label: "09:00-12:00", period: "Mañana" },
    { slot: "12-15", label: "12:00-15:00", period: "Tarde" },
    { slot: "15-18", label: "15:00-18:00", period: "Tarde" },
    { slot: "18-21", label: "18:00-21:00", period: "Noche" },
    { slot: "21-24", label: "21:00-24:00", period: "Noche" },
  ];

  const getActivityColor = (name) => {
    const colors = {
      SLEEPING: "!bg-indigo-500",
      COOKING: "!bg-orange-500",
      CLEANING: "!bg-green-500",
      "BATHING_-_SHOWER": "!bg-blue-500",
      GROOMING: "!bg-pink-500",
      WATCHING_TV: "!bg-purple-500",
      COMPUTER_WORK: "!bg-gray-500",
      LAB_WORK: "!bg-yellow-500",
      AT_THE_GYM: "!bg-red-500",
      SURFING_THE_INTERNET: "!bg-cyan-500",
      TALKING: "!bg-teal-500",
      SINGING: "!bg-rose-500",
    };
    return colors[name] || "!bg-slate-500";
  };

  const formatActivityName = (name) => {
    return name
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const formatDuration = (duration) => {
    const minHours = Math.floor(duration.min / 60);
    const minMinutes = duration.min % 60;
    const maxHours = Math.floor(duration.max / 60);
    const maxMinutes = duration.max % 60;

    const formatTime = (hours, minutes) => {
      if (hours > 0) {
        return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
      }
      return `${minutes}m`;
    };

    return `${formatTime(minHours, minMinutes)} - ${formatTime(
      maxHours,
      maxMinutes
    )}`;
  };

  const filteredActivities = useMemo(() => {
    return activities.filter((activity) => {
      const matchesSearch = activity.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesTimeFilter =
        filterByTime === "all" || activity.intervals.includes(filterByTime);
      return matchesSearch && matchesTimeFilter;
    });
  }, [searchTerm, filterByTime]);

  const getActivitiesForTimeSlot = (timeSlot) => {
    return activities.filter((activity) =>
      activity.intervals.includes(timeSlot)
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="mb-8">
        <h1 className="!font-mono text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
          <Calendar className="text-blue-600" />
          Visualización de Actividades Diarias
        </h1>
        <p className="text-gray-600 text-lg">
          Explora los horarios y duraciones de las diferentes actividades
        </p>
      </div>

      {/* Controles */}
      <div className="mb-8 flex flex-wrap gap-4 bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center gap-2 flex-1 min-w-64">
          <Search className="text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar actividad..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-3 py-2 border !border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black !placeholder-gray-400"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="text-gray-400" size={20} />
          <select
            value={filterByTime}
            onChange={(e) => setFilterByTime(e.target.value)}
            className="!px-3 !py-2 border !border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 !text-black"
          >
            <option value="all">Todos los horarios</option>
            {timeSlots.map((slot) => (
              <option key={slot.slot} value={slot.slot}>
                {slot.label} ({slot.period})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Timeline View */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="!text-2xl !font-semibold mb-6 flex items-center !gap-2  text-black">
            <Clock className="text-blue-600" />
            Línea de Tiempo (24h)
          </h2>
          <div className="space-y-4">
            {timeSlots.map((slot) => {
              const activitiesInSlot = getActivitiesForTimeSlot(slot.slot);
              return (
                <div
                  key={slot.slot}
                  className="!border-l-4 !border-blue-500 !pl-4 !pb-4"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-semibold text-lg text-gray-800">
                      {slot.label}
                    </span>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {slot.period}
                    </span>
                    <span className="text-xs text-gray-400">
                      {activitiesInSlot.length} actividades
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activitiesInSlot.map((activity) => (
                      <button
                        key={`${slot.slot}-${activity.name}`}
                        onClick={() => setSelectedActivity(activity)}
                        className={`!px-3 !py-1 !rounded-full !text-white !text-sm !font-medium !transition-all hover:scale-105 ${getActivityColor(
                          activity.name
                        )}`}
                      >
                        {formatActivityName(activity.name)}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Activities List */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="!text-2xl !font-semibold mb-6 flex items-center gap-2 !text-black">
            <Timer className="text-green-600" />
            Lista de Actividades
          </h2>
          <div className="gap-3 overflow-y-auto grid grid-cols-3">
            {filteredActivities.map((activity) => (
              <div
                key={activity.name}
                onClick={() => setSelectedActivity(activity)}
                className={`!p-4 !rounded-lg !border-2 cursor-pointer transition-all hover:shadow-md ${
                  selectedActivity?.name === activity.name
                    ? "!border-blue-500 bg-blue-50"
                    : "!border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-800">
                    {formatActivityName(activity.name)}
                  </h3>
                  <div
                    className={`w-4 h-4 rounded-full ${getActivityColor(
                      activity.name
                    )}`}
                  ></div>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <div className="flex items-center gap-2">
                    <Clock size={14} />
                    <span>Horarios: {activity.intervals.join(", ")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Timer size={14} />
                    <span>Duración: {formatDuration(activity.duration)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Detail Modal */}
      {selectedActivity && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full ${getActivityColor(
                      selectedActivity.name
                    )}`}
                  ></div>
                  {formatActivityName(selectedActivity.name)}
                </h3>
                <button
                  onClick={() => setSelectedActivity(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <Clock className="text-blue-600" size={18} />
                    Horarios Disponibles
                  </h4>
                  <div className="space-y-2">
                    {selectedActivity.intervals.map((interval) => {
                      const timeSlot = timeSlots.find(
                        (slot) => slot.slot === interval
                      );
                      return (
                        <div key={interval} className="flex items-center gap-3">
                          <span className="font-medium">{timeSlot?.label}</span>
                          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {timeSlot?.period}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <Timer className="text-green-600" size={18} />
                    Duración
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Mínimo:</span>
                      <span className="font-medium">
                        {formatDuration({
                          min: selectedActivity.duration.min,
                          max: selectedActivity.duration.min,
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Máximo:</span>
                      <span className="font-medium">
                        {formatDuration({
                          min: selectedActivity.duration.max,
                          max: selectedActivity.duration.max,
                        })}
                      </span>
                    </div>
                    <div className="pt-2 border-t">
                      <span className="text-sm text-gray-600">
                        Rango: {formatDuration(selectedActivity.duration)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivitiesVisualization;
