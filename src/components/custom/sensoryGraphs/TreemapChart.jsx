import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const TreemapChart = ({ rawData, minWidth = 928, minHeight = 500 }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!rawData || rawData.length === 0) return;

    // Procesamiento de datos para crear la jerarquía exacta requerida
    const processData = (data) => {
      const root = { name: "root", children: [] };
      const prefixMap = new Map();

      data.forEach((item) => {
        const category = item.categoria;

        Object.entries(item.labels).forEach(
          ([fullLabel, { prefijo, count }]) => {
            if (!prefixMap.has(prefijo)) {
              prefixMap.set(prefijo, {
                name: prefijo,
                children: [],
              });
            }

            const prefixNode = prefixMap.get(prefijo);
            let categoryNode = prefixNode.children.find(
              (c) => c.name === category
            );

            if (!categoryNode) {
              categoryNode = { name: category, children: [] };
              prefixNode.children.push(categoryNode);
            }

            categoryNode.children.push({
              name: fullLabel, // Mantenemos el label completo sin modificar
              value: count,
            });
          }
        );
      });

      root.children = Array.from(prefixMap.values());
      return root;
    };

    const data = processData(rawData);

    // Configuración de dimensiones responsivas
    const margin = { top: 30, right: 0, bottom: 0, left: 0 };
    const container = svgRef.current.parentElement;
    const width =
      Math.max(minWidth, container.clientWidth) - margin.left - margin.right;
    const height =
      Math.max(minHeight, container.clientHeight) - margin.top - margin.bottom;

    // Limpieza del SVG anterior
    d3.select(svgRef.current).selectAll("*").remove();

    // Función de teselado personalizada
    function tile(node, x0, y0, x1, y1) {
      d3.treemapBinary(node, 0, 0, width, height);
      for (const child of node.children) {
        child.x0 = x0 + (child.x0 / width) * (x1 - x0);
        child.x1 = x0 + (child.x1 / width) * (x1 - x0);
        child.y0 = y0 + (child.y0 / height) * (y1 - y0);
        child.y1 = y0 + (child.y1 / height) * (y1 - y0);
      }
    }

    // Cálculo del layout
    const hierarchy = d3
      .hierarchy(data)
      .sum((d) => d.value)
      .sort((a, b) => b.value - a.value);

    const root = d3.treemap().tile(tile)(hierarchy);

    // Escalas
    const x = d3.scaleLinear().rangeRound([0, width]);
    const y = d3.scaleLinear().rangeRound([0, height]);

    // Utilidades de formato
    const format = d3.format(",d");
    const name = (d) =>
      d
        .ancestors()
        .reverse()
        .map((d) => d.data.name)
        .join("/");

    // Escala de color (4 segmentos)
    const allValues = root.leaves().map((d) => d.value);
    const colorScale = d3
      .scaleQuantize()
      .domain([d3.min(allValues), d3.max(allValues)])
      .range(d3.schemeBlues[4]);

    // Creación del contenedor SVG
    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", [0.5, -30.5, width, height + 30])
      .attr("width", width)
      .attr("height", height + 30)
      .attr("style", "max-width: 100%; height: auto;")
      .style("font", "10px sans-serif");

    // Renderizado inicial
    let group = svg.append("g").call(render, root);

    function render(group, root) {
      const node = group
        .selectAll("g")
        .data(root.children.concat(root))
        .join("g");

      // Interactividad
      node
        .filter((d) => (d === root ? d.parent : d.children))
        .attr("cursor", "pointer")
        .on("click", (event, d) => (d === root ? zoomout(root) : zoomin(d)));

      // Tooltip
      node.append("title").text((d) => `${name(d)}\n${format(d.value || 0)}`);

      // Rectángulos del treemap
      node
        .append("rect")
        .attr(
          "id",
          (d) => (d.leafUid = `leaf-${Math.random().toString(36).substr(2, 9)}`)
        )
        .attr("fill", (d) => {
          if (d === root) return "#fff";
          if (d.children) return "#ccc";
          return colorScale(d.value);
        })
        .attr("stroke", "#fff");

      // ClipPath para texto
      node
        .append("clipPath")
        .attr(
          "id",
          (d) => (d.clipUid = `clip-${Math.random().toString(36).substr(2, 9)}`)
        )
        .append("use")
        .attr("xlink:href", (d) => `#${d.leafUid}`);

      // Texto en los nodos
      node
        .append("text")
        .attr("clip-path", (d) => `url(#${d.clipUid})`)
        .attr("font-weight", (d) => (d === root ? "bold" : null))
        .selectAll("tspan")
        .data((d) => {
          if (d === root) return [name(d)];
          return [d.data.name, format(d.value || 0)];
        })
        .join("tspan")
        .attr("x", 3)
        .attr("y", (d, i) => `${1.1 + i * 0.9}em`)
        .attr("fill-opacity", (d, i) => (i === 1 ? 0.7 : null))
        .text((d) => d);

      group.call(position, root);
    }

    function position(group, root) {
      group
        .selectAll("g")
        .attr("transform", (d) =>
          d === root ? `translate(0,-30)` : `translate(${x(d.x0)},${y(d.y0)})`
        )
        .select("rect")
        .attr("width", (d) => (d === root ? width : x(d.x1) - x(d.x0)))
        .attr("height", (d) => (d === root ? 30 : y(d.y1) - y(d.y0)));
    }

    // Funciones de zoom
    function zoomin(d) {
      const group0 = group.attr("pointer-events", "none");
      const group1 = (group = svg.append("g").call(render, d));

      x.domain([d.x0, d.x1]);
      y.domain([d.y0, d.y1]);

      svg
        .transition()
        .duration(750)
        .call((t) => group0.transition(t).remove().call(position, d.parent))
        .call((t) =>
          group1
            .transition(t)
            .attrTween("opacity", () => d3.interpolate(0, 1))
            .call(position, d)
        );
    }

    function zoomout(d) {
      const group0 = group.attr("pointer-events", "none");
      const group1 = (group = svg.insert("g", "*").call(render, d.parent));

      x.domain([d.parent.x0, d.parent.x1]);
      y.domain([d.parent.y0, d.parent.y1]);

      svg
        .transition()
        .duration(750)
        .call((t) =>
          group0
            .transition(t)
            .remove()
            .attrTween("opacity", () => d3.interpolate(1, 0))
            .call(position, d)
        )
        .call((t) => group1.transition(t).call(position, d.parent));
    }
  }, [rawData, minWidth, minHeight]);

  return (
    <div style={{ width: "100%", height: "100%", minWidth, minHeight }}>
      <svg ref={svgRef} />
    </div>
  );
};

export default TreemapChart;
