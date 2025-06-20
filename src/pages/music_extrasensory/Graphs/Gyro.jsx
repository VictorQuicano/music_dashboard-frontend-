import gyroComp from "@/constants/Extrasensory/gyroComp";
import HistogramWithKDE from "../../../components/custom/sensoryGraphs/Histogram";
import { useEffect, useState } from "react";

export default function Gyro({ selectedYear }) {
  const Data = gyroComp;
  const [mean, setMean] = useState([]);
  const [meanX, setMeanX] = useState([]);
  const [meanY, setMeanY] = useState([]);
  const [meanZ, setMeanZ] = useState([]);

  const returnToArray = (data, key) => {
    const allValues = [];

    for (const year in data.by_year) {
      const stats = data.by_year[year];
      if (stats[key]) {
        allValues.push(...stats[key]);
      }
    }

    return allValues;
  };

  useEffect(() => {
    if (selectedYear === "general") {
      setMean(returnToArray(Data, "mean"));
      setMeanX(returnToArray(Data, "mean_x"));
      setMeanY(returnToArray(Data, "mean_y"));
      setMeanZ(returnToArray(Data, "mean_z"));
    } else {
      setMean(Data.by_year[selectedYear]["mean"]);
      setMeanX(Data.by_year[selectedYear]["mean_x"]);
      setMeanY(Data.by_year[selectedYear]["mean_y"]);
      setMeanZ(Data.by_year[selectedYear]["mean_z"]);
    }
  }, [selectedYear]);

  return meanX.length === 0 &&
    mean.length == 0 &&
    meanY == 0 &&
    meanZ.length == 0 ? (
    <div>Loading...</div>
  ) : (
    <div className="grid grid-cols-3 gap-5">
      <div className="col-span-3">
        <HistogramWithKDE data={mean} title="Distribución Media" />
      </div>
      <HistogramWithKDE data={meanX} title="Distribución Media X" />
      <HistogramWithKDE data={meanY} title="Distribución Media Y" />
      <HistogramWithKDE data={meanZ} title="Distribución Media Z" />
    </div>
  );
}
