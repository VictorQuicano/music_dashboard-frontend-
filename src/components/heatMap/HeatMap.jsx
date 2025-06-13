import React, { useEffect } from "react";
import L from "./leaflet/leaflet-src"; // Usar la versión local
import "./leaflet/leaflet.css"; // CSS local
import { MapContainer, TileLayer } from "react-leaflet";

const HeatMap = ({
  heatPoints,
  intensity = 0.05,
  radius = 25,
  maxZoom = 17,
}) => {
  useEffect(() => {
    // Solución para los iconos de Leaflet
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require("./leaflet/images/marker-icon-2x.png").default,
      iconUrl: require("./leaflet/images/marker-icon.png").default,
      shadowUrl: require("./leaflet/images/marker-shadow.png").default,
    });

    if (typeof window !== "undefined") {
      // Cargar heatmap desde archivo local
      import("./leaflet/leaflet.heat").then(({ default: heatLayer }) => {
        if (heatPoints && heatPoints.length > 0 && window.heatMap) {
          const heatData = heatPoints.map((point) => [
            point.lat,
            point.lng,
            point.intensity || 1,
          ]);

          const heat = heatLayer(heatData, {
            radius: radius,
            maxZoom: maxZoom,
            intensity: intensity,
            gradient: {
              0.4: "blue",
              0.6: "cyan",
              0.7: "lime",
              0.8: "yellow",
              1.0: "red",
            },
          });

          heat.addTo(window.heatMap);
          window.currentHeatLayer = heat;
        }
      });
    }

    return () => {
      if (window.currentHeatLayer && window.heatMap) {
        window.heatMap.removeLayer(window.currentHeatLayer);
      }
    };
  }, [heatPoints, intensity, radius, maxZoom]);

  const saveMap = (map) => {
    window.heatMap = map;
  };

  const calculateCenter = () => {
    if (!heatPoints || heatPoints.length === 0) {
      return [20, 0];
    }

    const sum = heatPoints.reduce(
      (acc, point) => {
        return {
          lat: acc.lat + point.lat,
          lng: acc.lng + point.lng,
        };
      },
      { lat: 0, lng: 0 }
    );

    return [sum.lat / heatPoints.length, sum.lng / heatPoints.length];
  };

  return (
    <div style={{ height: "500px", width: "100%" }}>
      <MapContainer
        center={calculateCenter()}
        zoom={4}
        style={{ height: "100%", width: "100%" }}
        whenCreated={saveMap}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>
    </div>
  );
};

export default HeatMap;
