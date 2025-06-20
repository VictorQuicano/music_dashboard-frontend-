import { useEffect, useState } from "react";
import { parseTime, StreamGraph } from "./components/StreamGraph";
import { aggregateByDay } from "./components/utils"; // reemplaza pivotWider
import { csvParse } from "d3";
import * as d3 from "d3";

const HEADER_HEIGHT = 150;
const monthTimeFormatter = d3.timeFormat("%B %Y");

export const StreamGraphPageViews = () => {
  const [data, setData] = useState();
  const [width, setWidth] = useState(window.innerWidth - 100);
  const height = 800;

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth - 100);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [startDate, setStartDate] = useState(parseTime("2019-12-01"));

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://raw.githubusercontent.com/VictorQuicano/ViraHadoop/refs/heads/main/actividad_2019.csv"
      );
      const csvText = await response.text();
      const parsed = csvParse(csvText);
      const aggregated = aggregateByDay(parsed);
      setData(aggregated);
    };

    fetchData();
  }, []);

  if (!data || !startDate) {
    return null;
  }

  return (
    <div>
      <div style={{ height: HEADER_HEIGHT }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <p
            style={{
              fontSize: 12,
              width: 155,
              paddingTop: 11,
            }}
          >
            {"Data since "}
            <b>{monthTimeFormatter(startDate)}</b>
          </p>
          <input
            type="range"
            min={parseTime("2019-01-01")?.getTime()}
            max={parseTime("2019-12-29")?.getTime()}
            value={startDate.getTime()}
            step={10000}
            onChange={(e) => setStartDate(new Date(Number(e.target.value)))}
            style={{ height: 1, opacity: 0.5, width: 80 }}
          />
        </div>
      </div>
      <StreamGraph
        width={width}
        height={height - HEADER_HEIGHT}
        data={data}
        startDate={startDate}
      />
    </div>
  );
};
