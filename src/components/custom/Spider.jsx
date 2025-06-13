import React, { useRef, useEffect } from "react";
import { select, scaleLinear, line } from "d3";

function Radar({
  data,
  playerName = "Player",
  color = "oklch(76.8% 0.233 130.85)",
}) {
  const containerRef = useRef(null);
  const margin = { top: -10, right: 10, bottom: 60, left: 10 },
    width = 350 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    // Limpiar SVG existente antes de redibujar
    select(containerRef.current).selectAll("*").remove();

    var svg = select(containerRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)
      .attr("fill", "gray");

    const attributes = Object.keys(data);
    const radius = 150;
    const ticks = [0.2, 0.4, 0.6, 0.8, 1.0];

    // Escala radial
    const radAxis = scaleLinear().domain([0, 1.0]).range([0, radius]);

    // Función para coordenadas polares
    const cordForAngle = (angle, len) => ({
      x: Math.cos(angle) * len,
      y: Math.sin(angle) * len,
    });

    // Dibujar ejes y etiquetas
    attributes.forEach((key, i) => {
      const angle = Math.PI / 2 + (2 * Math.PI * i) / attributes.length;
      const { x, y } = cordForAngle(angle, radius);

      // Líneas del eje
      svg
        .append("line")
        .attr("x2", x + width / 2)
        .attr("y2", y + height / 2)
        .attr("x1", width / 2)
        .attr("y1", height / 2)
        .attr("stroke", "white")
        .attr("stroke-width", 1.5)
        .style("opacity", "0.1");

      // Etiquetas de atributos
      svg
        .append("text")
        .attr("x", x + width / 2)
        .attr("y", y + height / 2)
        .text(capitalize(key))
        .style("text-anchor", "middle")
        .style("font-size", "1.5rem")
        .attr("dx", () => {
          const positions = ["0.5em", "-0.5em", "-0.5em", "0.5em", "0.5em"];
          return positions[i % positions.length];
        })
        .attr("dy", () => {
          const positions = ["1.5em", "0.5em", "-0.5em", "-0.5em", "0.5em"];
          return positions[i % positions.length];
        })
        .attr("fill", "white");
    });

    // Círculos de nivel y etiquetas
    ticks.forEach((el) => {
      svg
        .append("circle")
        .attr("cx", width / 2)
        .attr("cy", height / 2)
        .attr("fill", "none")
        .attr("stroke", "gray")
        .attr("stroke-width", 1.0)
        .attr("r", radAxis(el));

      svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", height / 2 - radAxis(el) - 5)
        .text(el)
        .attr("fill", "white")
        .attr("opacity", "0.5")
        .style("text-anchor", "middle")
        .style("font-size", "0.825rem");
    });

    // Generador de línea para el radar
    const lineGen = line()
      .x((d) => d.x)
      .y((d) => d.y);

    // Convertir datos a coordenadas
    const getCoordPath = () => {
      return attributes.map((attr, i) => {
        const angle = Math.PI / 2 + (2 * Math.PI * i) / attributes.length;
        return cordForAngle(angle, radAxis(data[attr]));
      });
    };

    // Dibujar el radar
    svg
      .append("path")
      .datum(getCoordPath())
      .attr("class", "radar-path")
      .attr("d", lineGen)
      .attr("stroke-width", 2)
      .attr("stroke", color)
      .attr("fill", color)
      .attr("opacity", 0.3)
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // Leyenda
    svg
      .append("circle")
      .attr("cx", width / 2 + 250)
      .attr("cy", height / 2 + 150)
      .attr("r", 10)
      .style("fill", color)
      .style("opacity", "0.5");

    svg
      .append("text")
      .attr("y", height / 2 + 155)
      .attr("x", width / 2 + 280)
      .text(playerName)
      .style("fill", "white");
  }, [data, color, playerName]);

  return <svg viewBox={`0 0 ${width} ${height}`} ref={containerRef}></svg>;
}

export default Radar;
