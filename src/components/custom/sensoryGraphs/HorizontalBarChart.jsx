import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const HorizontalBarChart = ({ data, minWidth = 460, minHeight = 400 }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data) return;

    // Transform the JSON data into array format that D3 expects
    const dataArray = Object.entries(data).map(([label, value]) => ({
      label,
      value,
    }));

    // Set dimensions
    const margin = { top: 20, right: 30, bottom: 40, left: 90 };
    const container = svgRef.current.parentElement;
    const width =
      Math.max(minWidth, container.clientWidth) - margin.left - margin.right;
    const height =
      Math.max(minHeight, container.clientHeight) - margin.top - margin.bottom;

    // Clear previous SVG
    d3.select(svgRef.current).selectAll("*").remove();

    // Create SVG
    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Add X axis
    const x = d3
      .scaleLinear()
      .domain([0, d3.max(dataArray, (d) => d.value)])
      .range([0, width]);

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Y axis
    const y = d3
      .scaleBand()
      .range([0, height])
      .domain(dataArray.map((d) => d.label))
      .padding(0.1);

    svg.append("g").call(d3.axisLeft(y));

    // Bars
    svg
      .selectAll("myRect")
      .data(dataArray)
      .enter()
      .append("rect")
      .attr("x", x(0))
      .attr("y", (d) => y(d.label))
      .attr("width", (d) => x(d.value))
      .attr("height", y.bandwidth())
      .attr("fill", "#69b3a2");
  }, [data, minWidth, minHeight]);

  return (
    <div style={{ width: "100%", height: "100%", minWidth, minHeight }}>
      <svg ref={svgRef} />
    </div>
  );
};

export default HorizontalBarChart;
