import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

/**
 * PieChart
 * --------
 * Muestra un gráfico de pastel en dos niveles:
 *  - General (valor "general"): sectores = idiomas ➜ datos desde `valoresPorLang`.
 *  - Para un idioma específico: sectores = años de ese idioma ➜ datos desde `years`.
 *
 * Props:
 *  - valoresPorLang: [ { idioma, n_registros, … }, … ]
 *  - years:          [ { año, idioma, n_registros, … }, … ]
 *  - width:         ancho del SVG
 *  - selectedLanguage: string ("general" o el código de idioma seleccionado)
 */
const PieChart = ({
  valoresPorLang = [],
  years = [],
  width = 500,
  selectedLanguage = "general",
}) => {
  const containerRef = useRef();

  useEffect(() => {
    // 1) Calcular dimensiones y radios
    const height = Math.min(500, width / 2);
    const chartWidth = width * 0.7; // 70% para el gráfico, 30% para leyenda
    const outerRadius = height / 2 - 10;
    const innerRadius = 0; // pastel sin agujero en el centro

    // 2) Crear la escala de color
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // 3) Limpiar cualquier contenido SVG previo
    d3.select(containerRef.current).selectAll("*").remove();

    // 4) Preparar datos según nivel
    let chartData;
    if (selectedLanguage === "general") {
      // Nivel 1: cada sector = un idioma
      chartData = valoresPorLang.map((d) => ({
        key: d.idioma,
        value: d.n_registros,
      }));
    } else {
      // Nivel 2: filtrar solo los años que coincidan con el idioma seleccionado
      chartData = years
        .filter((d) => d.idioma === selectedLanguage)
        .map((d) => ({
          key: String(d.año),
          value: d.n_registros,
        }));
    }

    // 5) Crear el SVG (con viewBox centrado en el área del gráfico)
    const svg = d3
      .select(containerRef.current)
      .append("svg")
      .attr("viewBox", [-width + 50, -height / 2, width, height])
      .style("max-width", "80%")
      .style("height", "auto");

    // 6) Generadores: pie y arco
    const pie = d3
      .pie()
      .sort(null)
      .value((d) => d.value);
    const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);

    // 7) Dibujar los path (sectores)
    const arcs = svg
      .append("g")
      .attr("transform", `translate(${-chartWidth / 2}, 0)`)
      .datum(chartData)
      .selectAll("path")
      .data(pie)
      .join("path")
      .attr("fill", (d, i) => color(i))
      .attr("d", arc)
      .each(function (d) {
        this._current = d; // guardamos el ángulo inicial si llegáramos a animar
      });

    // 8) Dibujar leyenda mejorada a la derecha
    const legend = svg
      .append("g")
      .attr(
        "transform",
        `translate(${chartWidth / 2 - 220}, ${-height / 2 + 20})`
      );

    // Añadir título a la leyenda
    legend
      .append("text")
      .attr("font-weight", "bold")
      .attr("font-size", "14px")
      .attr("fill", "#fff")
      .text(selectedLanguage === "general" ? "Idiomas" : "Años");

    // Crear elementos de leyenda
    const legendItems = legend
      .selectAll(".legend-item")
      .data(chartData)
      .join("g")
      .attr("class", "legend-item")
      .attr("transform", (d, i) => `translate(0, ${i * 25 + 25})`);

    // Añadir cuadrados de color
    legendItems
      .append("rect")
      .attr("width", 18)
      .attr("height", 18)
      .attr("fill", (d, i) => color(i));

    // Añadir texto de leyenda
    legendItems
      .append("text")
      .attr("x", 24)
      .attr("y", 9)
      .attr("dy", "0.1em")
      .attr("font-size", "12px")
      .attr("fill", "#fff")
      .text((d) => `${d.key}: ${d3.format(",")(d.value)}`);
  }, [valoresPorLang, years, width, selectedLanguage]);

  return <div ref={containerRef}></div>;
};

export default PieChart;
