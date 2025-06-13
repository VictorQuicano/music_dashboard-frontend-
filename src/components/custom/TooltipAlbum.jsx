import { Button, HStack } from "@chakra-ui/react";

import { msToHumanReadable } from "@/utils/transformations";
import { Link } from "react-router";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  Box,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

const AlbumBubbleChart = ({ data }) => {
  const svgRef = useRef(null);
  const tooltipRef = useRef(null);
  const textColor = useColorModeValue("gray.800", "white");
  const bgColor = useColorModeValue("white", "gray.700");

  useEffect(() => {
    if (!data || data.length === 0) return;

    // Limpiar SVG existente
    d3.select(svgRef.current).selectAll("*").remove();

    // Configuración del gráfico
    const width = 928;
    const height = width;
    const margin = 1;
    const format = d3.format(",d");

    // Preparar datos para la jerarquía
    const hierarchyData = {
      name: "albums",
      children: data.map((album) => ({
        name: album.album_name,
        value: album.total_duration_ms,
        release: album.release,
        song_count: album.song_count,
        stats: album.stats,
      })),
    };

    // Crear layout de círculos
    const pack = d3
      .pack()
      .size([width - margin * 2, height - margin * 2])
      .padding(3);

    // Calcular jerarquía
    const root = pack(
      d3
        .hierarchy(hierarchyData)
        .sum((d) => d.value)
        .sort((a, b) => b.value - a.value)
    );

    // Crear SVG
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-margin, -margin, width, height])
      .attr("style", "width: 100%; height: auto; font: 10px sans-serif;")
      .attr("text-anchor", "middle");

    // Crear nodos
    const node = svg
      .append("g")
      .selectAll()
      .data(root.descendants().slice(1)) // Excluir el nodo raíz
      .join("g")
      .attr("transform", (d) => `translate(${d.x},${d.y})`);

    // Crear círculos
    node
      .append("circle")
      .attr("fill", "#3182CE")
      .attr("fill-opacity", 0.6)
      .attr("stroke", "#2C5282")
      .attr("stroke-width", 1)
      .attr("r", (d) => d.r)
      .on("mouseover", function (event, d) {
        // Mostrar tooltip
        d3.select(this).attr("fill-opacity", 0.9);
        tooltipRef.current.style.visibility = "visible";
        tooltipRef.current.innerHTML = `
          <strong>${d.data.name}</strong><br/>
          Año: ${d.data.release}<br/>
          Canciones: ${d.data.song_count}<br/>
          Duración: ${msToHumanReadable(d.data.value)} <br/>
          Danceability: ${d.data.stats.avg_danceability.toFixed(2)}<br/>
          Energy: ${d.data.stats.avg_energy.toFixed(2)}<br/>
          Valence: ${d.data.stats.avg_valence.toFixed(2)}
        `;
      })
      .on("mousemove", function (event) {
        tooltipRef.current.style.top = `${event.pageY - 10}px`;
        tooltipRef.current.style.left = `${event.pageX + 10}px`;
      })
      .on("mouseout", function () {
        d3.select(this).attr("fill-opacity", 0.6);
        tooltipRef.current.style.visibility = "hidden";
      });

    // Añadir etiquetas a círculos grandes
    const text = node
      .filter((d) => d.r > 20)
      .append("text")
      .attr("clip-path", (d) => `circle(${d.r})`)
      .attr("fill", textColor);

    // Añadir nombre del álbum (dividido en líneas si es necesario)
    text
      .selectAll()
      .data((d) => {
        const words = d.data.name.split(/(?=[A-Z][a-z])|\s+/g);
        return words.length > 5 ? words.slice(0, 4).concat("...") : words;
      })
      .join("tspan")
      .attr("x", 0)
      .attr("y", (d, i, nodes) => `${i - nodes.length / 2 + 0.35}em`)
      .text((d) => d);

    // Añadir año de lanzamiento
    text
      .append("tspan")
      .attr("x", 0)
      .attr(
        "y",
        (d) => `${d.data.name.split(/(?=[A-Z][a-z])|\s+/g).length / 2 + 1.35}em`
      )
      .attr("font-size", "0.8em")
      .attr("fill-opacity", 0.8)
      .text((d) => d.data.release);
  }, [data]);

  return (
    <Box position="relative">
      <svg ref={svgRef} />

      {/* Tooltip personalizado */}
      <Box
        ref={tooltipRef}
        position="absolute"
        visibility="hidden"
        bg={bgColor}
        p={2}
        borderRadius="md"
        boxShadow="md"
        zIndex="tooltip"
        pointerEvents="none"
        maxWidth="200px"
      />
    </Box>
  );
};

export default AlbumBubbleChart;
