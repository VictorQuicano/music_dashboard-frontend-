import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

const MultiMetricChart = ({ data }) => {
  const [selectedYear, setSelectedYear] = useState(null);
  const svgRef = useRef();
  const tooltipRef = useRef();

  useEffect(() => {
    if (!data || Object.keys(data).length === 0) return;

    // Limpiar el SVG antes de dibujar
    d3.select(svgRef.current).selectAll("*").remove();

    // Convertir datos a array y agrupar por año
    const dataArray = Object.entries(data).map(([date, values]) => ({
      date: new Date(date),
      year: new Date(date).getFullYear(),
      ...values,
    }));

    // Configuración del gráfico
    const width = 928;
    const height = 600;
    const marginTop = 40;
    const marginRight = 40;
    const marginBottom = 50;
    const marginLeft = 60;

    // Crear escalas
    const x = d3
      .scaleLinear()
      .domain([0, 1]) // Todas las métricas van de 0 a 1
      .range([marginLeft, width - marginRight]);

    const y = d3
      .scaleBand()
      .domain(["avg_energy", "avg_valence", "avg_danceable"])
      .range([height - marginBottom, marginTop])
      .padding(0.3);

    // Crear SVG
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

    // Crear ejes
    svg
      .append("g")
      .attr("transform", `translate(0,${marginTop})`)
      .call(d3.axisTop(x).ticks(5))
      .call((g) => g.select(".domain").remove());

    svg
      .append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).tickFormat((d) => d.replace("avg_", "")))
      .call((g) => g.select(".domain").remove());

    // Añadir etiquetas de ejes
    svg
      .append("text")
      .attr("transform", `translate(${width / 2},${20})`)
      .style("text-anchor", "middle")
      .text("Valor de la métrica (0-1)");

    // Colores para cada año
    const years = [...new Set(dataArray.map((d) => d.year))];
    const color = d3.scaleOrdinal(d3.schemeCategory10).domain(years);

    // Dibujar líneas para cada métrica
    const metrics = ["avg_energy", "avg_valence", "avg_danceable"];

    metrics.forEach((metric) => {
      // Agrupar datos por año para esta métrica
      const yearData = years.map((year) => {
        const yearEntries = dataArray.filter((d) => d.year === year);
        const avgValue = d3.mean(yearEntries, (d) => d[metric]);
        return { year, value: avgValue };
      });

      // Dibujar línea
      svg
        .append("path")
        .datum(yearData)
        .attr("fill", "none")
        .attr("stroke", "#ddd")
        .attr("stroke-width", 1.5)
        .attr(
          "d",
          d3
            .line()
            .x((d) => x(d.value))
            .y((d) => y(metric) + y.bandwidth() / 2)
        );

      // Dibujar puntos por año
      svg
        .selectAll(`.dot-${metric}`)
        .data(yearData)
        .enter()
        .append("circle")
        .attr("class", `dot-${metric}`)
        .attr("cx", (d) => x(d.value))
        .attr("cy", (d) => y(metric) + y.bandwidth() / 2)
        .attr("r", 5)
        .attr("fill", (d) => color(d.year))
        .attr("stroke", "#fff")
        .attr("stroke-width", 1)
        .attr("opacity", (d) =>
          selectedYear === null || selectedYear === d.year ? 1 : 0.3
        )
        .on("mouseover", (event, d) => {
          d3.select(tooltipRef.current)
            .style("opacity", 1)
            .html(
              `
              <div><strong>Año:</strong> ${d.year}</div>
              <div><strong>${metric.replace(
                "avg_",
                ""
              )}:</strong> ${d.value.toFixed(4)}</div>
            `
            )
            .style("left", `${event.pageX + 10}px`)
            .style("top", `${event.pageY - 10}px`);
        })
        .on("mouseout", () => {
          d3.select(tooltipRef.current).style("opacity", 0);
        })
        .on("click", (event, d) => {
          setSelectedYear((prev) => (prev === d.year ? null : d.year));
        });
    });

    // Leyenda de años
    const legend = svg
      .append("g")
      .attr("transform", `translate(${width - marginRight + 20},${marginTop})`);

    years.forEach((year, i) => {
      const legendItem = legend
        .append("g")
        .attr("transform", `translate(0,${i * 20})`)
        .style("cursor", "pointer")
        .on("click", () => {
          setSelectedYear((prev) => (prev === year ? null : year));
        });

      legendItem
        .append("rect")
        .attr("width", 15)
        .attr("height", 15)
        .attr("fill", color(year))
        .attr(
          "opacity",
          selectedYear === null || selectedYear === year ? 1 : 0.3
        );

      legendItem
        .append("text")
        .attr("x", 20)
        .attr("y", 12)
        .text(year)
        .attr(
          "opacity",
          selectedYear === null || selectedYear === year ? 1 : 0.3
        );
    });
  }, [data, selectedYear]);

  if (!data || Object.keys(data).length === 0) {
    return <div>No hay datos disponibles</div>;
  }

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "100%",
        overflowX: "auto",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Métricas Musicales por Año
      </h2>
      <p style={{ textAlign: "center" }}>
        {selectedYear
          ? `Mostrando datos del año ${selectedYear} - Click en un punto o leyenda para ver todos`
          : "Mostrando todos los años - Click en un punto o leyenda para filtrar por año"}
      </p>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <svg ref={svgRef}></svg>
      </div>

      <div
        ref={tooltipRef}
        style={{
          position: "absolute",
          opacity: 0,
          padding: "10px",
          background: "rgba(0, 0, 0, 0.8)",
          color: "white",
          borderRadius: "4px",
          pointerEvents: "none",
          transition: "opacity 0.3s",
          zIndex: 10,
          fontSize: "14px",
        }}
      ></div>
    </div>
  );
};

export default MultiMetricChart;
