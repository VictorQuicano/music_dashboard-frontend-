import * as d3 from "d3";
import { curveCatmullRom } from "d3";
import { aggregateByDay } from "./utils";
import { TimeGrid } from "./TimeGrid";
import { Labels } from "./Labels";
import { Cursor } from "./Cursor";
import { useState } from "react";
import styles from "./streamgraph.module.css";

const MARGIN = { top: 10, right: 250, bottom: 90, left: 0 };

export const parseTime = d3.timeParse("%Y-%m-%d");

export const StreamGraph = ({ width, height, data, startDate }) => {
  const [interactionData, setInteractionData] = useState(null);

  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  const filteredData = data.filter((d) => parseTime(d.date) > startDate);
  //console.log("FilteredData", filteredData);
  const biggestValue = d3.max(
    data.map((d) => {
      return d3.max(
        Object.entries(d)
          .filter(([key]) => key !== "date")
          .map(([, value]) => value)
      );
    })
  );

  const allGroups = [
    ...new Set(Object.keys(data[0]).filter((key) => key !== "date")),
  ];

  // Pivot the data: long to wide format
  const wideData = aggregateByDay(filteredData);

  // Data Wrangling: stack the data
  const stackSeries = d3
    .stack()
    .keys(allGroups)
    .order(d3.stackOrderNone)
    .offset(d3.stackOffsetSilhouette);
  const series = stackSeries(wideData);

  // Y axis
  const topYValues = series.flatMap((s) => s.map((d) => d[1]));
  const yMax = Math.max(...topYValues);

  const bottomYValues = series.flatMap((s) => s.map((d) => d[0]));
  const yMin = Math.min(...bottomYValues);

  const yScale = d3.scaleLinear().domain([yMin, yMax]).range([boundsHeight, 0]);

  // X axis
  const dateDomain = d3.extent(filteredData.map((d) => parseTime(d.date)));
  const xScale = d3.scaleTime().domain(dateDomain).range([0, boundsWidth]);

  // Color
  const colorScale = d3
    .scaleOrdinal()
    .domain(allGroups)
    .range(["#e0ac2b", "#e85252", "#6689c6", "#9a6fb0", "#a53253"]);

  // Build the streamgraph shapes
  const areaBuilder = d3
    .area()
    .x((d) => {
      return xScale(parseTime(d.data.date));
    })
    .y1((d) => yScale(d[1]))
    .y0((d) => yScale(d[0]))
    .curve(curveCatmullRom);

  const allPath = series.map((serie, i) => {
    const path = areaBuilder(serie);
    return (
      <path
        key={i}
        className={styles.shape}
        d={path}
        opacity={1}
        stroke="grey"
        fill={colorScale(serie.key)}
        fillOpacity={0.8}
      />
    );
  });

  const labelInfos = series.map((sery) => {
    const lastItem = sery[sery.length - 1];

    const value = interactionData
      ? interactionData[sery.key]
      : lastItem[1] - lastItem[0];

    return {
      name: sery.key,
      color: colorScale(sery.key),
      value,
      position: yScale((lastItem[0] + lastItem[1]) / 2),
    };
  });

  const getClosestPoint = (cursorPixelPosition) => {
    const x = xScale.invert(cursorPixelPosition);

    let minDistance = Infinity;
    let closest = null;

    for (const point of wideData) {
      const cursorTime = parseTime(point.date)?.getTime();

      if (!cursorTime) {
        return null;
      }

      const distance = Math.abs(cursorTime - x.getTime());

      if (distance < minDistance) {
        minDistance = distance;
        closest = point;
      }
    }

    return closest;
  };

  const onMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const closest = getClosestPoint(mouseX);
    setInteractionData(closest);
  };
  //console.log(xScale.range()[1]);

  return (
    <div>
      <svg width={width} height={height}>
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
          onMouseMove={onMouseMove}
          onMouseLeave={() => setInteractionData(null)}
        >
          {/* Additional rect on top of everything to catch mouse events */}
          <rect
            x={0}
            y={0}
            width={boundsWidth}
            height={boundsHeight}
            onMouseMove={onMouseMove}
            onMouseLeave={() => setInteractionData(null)}
            visibility={"hidden"}
            pointerEvents={"all"}
            cursor={"pointer"}
          />
          <TimeGrid xScale={xScale} height={boundsHeight} />
          <Labels
            labelInfos={labelInfos}
            xStart={xScale.range()[1]}
            xEnd={width}
            biggestValue={biggestValue}
          />
          <g className={styles.container}>{allPath}</g>
          {interactionData && (
            <Cursor
              height={boundsHeight}
              x={xScale(parseTime(interactionData.date))}
              biggestValue={biggestValue}
            />
          )}
        </g>
      </svg>
    </div>
  );
};
