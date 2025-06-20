import audioMFCC from "@/constants/Extrasensory/audioMFCC";
import TimeLine from "../../../components/custom/sensoryGraphs/Timeline";
import { useEffect, useState } from "react";

export default function RawAcc({ selectedYear }) {
  const Data = audioMFCC;
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
  ) : (
    <TimeLine data={dataToGraph} />
  );
}
