import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import useResizeObserver from "@/components/custom/sensoryGraphs/useResizeObserver"; // Custom hook for resizing

const prefixColor = {
  GENERIC: "#4CAF50",
  FIX: "#2196F3",
  OR: "#FF9800",
  LOC: "#E91E63",
  "": "#9C27B0",
};

const Treemap = ({ dataRaw }) => {
  const svgRef = useRef(null);
  const wrapperRef = useRef(null);
  const dimensions = useResizeObserver(wrapperRef);
  const [currentRoot, setCurrentRoot] = useState(null);

  // Minimum dimensions
  const minWidth = 600;
  const minHeight = 600;
  const maxHeight = 600;

  useEffect(() => {
    const data = {
      name: "root",
      children: Object.entries(dataRaw).map(([category, categoryData]) => {
        console.log(category, categoryData);
        const children = categoryData.labels
          ? Object.entries(categoryData.labels).map(([label, labelData]) => ({
              name: label,
              value: labelData.count || 0,
              //prefix: labelData.prefijo,
              color: prefixColor[labelData.prefijo] || prefixColor[""],
            }))
          : [];

        return {
          name: categoryData.categoria,
          color: categoryData.color || "#ccc",
          children: children,
        };
      }),
    };

    if (!dimensions || !data) return;

    // Calculate dimensions with minimums
    const width = Math.max(dimensions.width || minWidth, minWidth);
    const height = Math.max(dimensions.height || minHeight, minHeight);

    // Custom tiling function
    const tile = (node, x0, y0, x1, y1) => {
      d3.treemapBinary(node, 0, 0, width, height);
      for (const child of node.children) {
        child.x0 = x0 + (child.x0 / width) * (x1 - x0);
        child.x1 = x0 + (child.x1 / width) * (x1 - x0);
        child.y0 = y0 + (child.y0 / height) * (y1 - y0);
        child.y1 = y0 + (child.y1 / height) * (y1 - y0);
      }
    };

    // Compute the hierarchy and layout
    const hierarchy = d3
      .hierarchy(data)
      .sum((d) => d.value || 0)
      .sort((a, b) => (b.value || 0) - (a.value || 0));
    const root = d3.treemap().tile(tile)(hierarchy);
    setCurrentRoot(root);

    // Create scales
    const x = d3.scaleLinear().rangeRound([0, width]);
    const y = d3.scaleLinear().rangeRound([0, height]);

    // Formatting utilities
    const format = d3.format(",d");
    const name = (d) =>
      d
        .ancestors()
        .reverse()
        .map((d) => d.data.name)
        .join("/");

    // Create SVG
    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", [0.5, -30.5, width, height + 30])
      .attr("width", width)
      .attr("height", height + 30)
      .attr("style", "max-width: 100%; height: auto;")
      .style("font", "10px sans-serif");

    // Clear previous content
    svg.selectAll("*").remove();

    let group = svg.append("g");

    const render = (group, root) => {
      const node = group
        .selectAll("g")
        .data(root.children ? root.children.concat(root) : [root])
        .join("g");

      node
        .filter((d) => (d === root ? d.parent : d.children))
        .attr("cursor", "pointer")
        .on("click", (event, d) => (d === root ? zoomout(root) : zoomin(d)));

      node.append("title").text((d) => `${name(d)}\n${format(d.value || 0)}`);

      node
        .append("rect")
        .attr("id", (d) => (d.leafUid = d3.create("svg").append("g").node().id))
        .attr("fill", (d) =>
          d === root ? "#fff" : d.data.color || (d.children ? "#ccc" : "#ddd")
        )
        .attr("stroke", "#fff");

      node
        .append("clipPath")
        .attr("id", (d) => (d.clipUid = d3.create("svg").append("g").node().id))
        .append("use")
        .attr("xlink:href", (d) => `#${d.leafUid.id}`);

      node
        .append("text")
        .attr("clip-path", (d) => `url(#${d.clipUid.id})`)
        .attr("font-weight", (d) => (d === root ? "bold" : null))
        .selectAll("tspan")
        .data((d) =>
          (d === root ? name(d) : d.data.name)
            .split(/(?=[A-Z][^A-Z])/g)
            .concat(format(d.value || 0))
        )
        .join("tspan")
        .attr("x", 3)
        .attr(
          "y",
          (d, i, nodes) => `${(i === nodes.length - 1) * 0.3 + 1.1 + i * 0.9}em`
        )
        .attr("fill-opacity", (d, i, nodes) =>
          i === nodes.length - 1 ? 0.7 : null
        )
        .attr("font-weight", (d, i, nodes) =>
          i === nodes.length - 1 ? "normal" : null
        )
        .text((d) => d);

      group.call(position, root);
    };

    const position = (group, root) => {
      group
        .selectAll("g")
        .attr("transform", (d) =>
          d === root ? `translate(0,-30)` : `translate(${x(d.x0)},${y(d.y0)})`
        )
        .select("rect")
        .attr("width", (d) => (d === root ? width : x(d.x1) - x(d.x0)))
        .attr("height", (d) => (d === root ? 30 : y(d.y1) - y(d.y0)));
    };

    const zoomin = (d) => {
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

      setCurrentRoot(d);
    };

    const zoomout = (d) => {
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

      setCurrentRoot(d.parent);
    };

    // Initial render
    render(group, root);
  }, [dimensions, dataRaw]);

  return (
    <div
      ref={wrapperRef}
      style={{
        width: "100%",
        height: "100%",
        minHeight: `${minHeight}px`,
        maxHeight: `${maxHeight}px`,
      }}
    >
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default Treemap;
