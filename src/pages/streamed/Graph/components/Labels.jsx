import * as d3 from "d3";
import { useSpring, animated } from "@react-spring/web";

const PADDING_LEFT = 30;
const BAR_HEIGHT = 20;

export const Labels = ({ labelInfos, xStart, xEnd, biggestValue }) => {
  //console.log("label Infos: ", labelInfos);
  //console.log("XStart: ", xStart, "XEnd: ", xEnd, "Biggest: ", biggestValue);
  const xScale = d3
    .scaleLinear()
    .domain([0, biggestValue])
    .range([xStart + PADDING_LEFT, xEnd - 20]);

  const labels = labelInfos.map((label, i) => {
    const cleanValue = Math.floor(label.value / 1000000);

    return (
      <g key={i}>
        {/* Dashed Line between stream chart and label */}
        <line
          x1={xStart + 2}
          x2={xStart + PADDING_LEFT - 2}
          y1={label.position}
          y2={label.position}
          stroke="#808080"
          opacity={0.9}
          strokeDasharray={2}
        />
        {/* Bar that creates a bar chart */}
        <BarItem
          color={label.color}
          x={xScale(0)}
          y={label.position - BAR_HEIGHT / 2}
          width={xScale(label.value) - xScale(0)}
        />
        {/* Name of the group */}
        <text
          x={xStart + PADDING_LEFT + 2}
          y={label.position}
          textAnchor="start"
          alignmentBaseline="central"
          fontSize={12}
          fill="#808080"
        >
          {label.name + " | " + cleanValue + "M"}
        </text>
      </g>
    );
  });

  return <>{labels}</>;
};

export const BarItem = ({ color, x, y, width }) => {
  //console.log(color, x, y, width);
  const springProps = useSpring({
    to: {
      width,
    },
    config: {
      friction: 10,
      bounce: 0,
    },
  });

  return (
    <animated.rect
      x={x}
      y={y}
      width={springProps.width}
      height={BAR_HEIGHT}
      opacity={0.7}
      stroke={color}
      fill={color}
      fillOpacity={0.3}
      strokeWidth={1}
      rx={1}
    />
  );
};
