import rawAcc from "@/constants/Extrasensory/rawAcc";
import TimeLineBins from "../../../components/custom/sensoryGraphs/TimeLineBins";
import TimeLine from "../../../components/custom/sensoryGraphs/Timeline";
import { useEffect, useState } from "react";

export default function RawAcc({ selectedYear }) {
  const Data = rawAcc;
  const [dataToGraph, setDataToGraph] = useState([]);

  useEffect(() => {
    if (selectedYear === "general") {
      setDataToGraph(Data.general);
    } else {
      setDataToGraph(Data.by_year[selectedYear] || []);
    }
  }, [selectedYear]);

  return dataToGraph.length === 0 ? (
    <div>Loading...</div>
  ) : selectedYear === "general" ? (
    <TimeLineBins data={dataToGraph} />
  ) : (
    <TimeLine data={dataToGraph} />
  );
}
