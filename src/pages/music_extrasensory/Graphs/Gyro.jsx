import gyroComp from "@/constants/Extrasensory/gyroComp";
import HistogramWithKDE from "../../../components/custom/sensoryGraphs/Histogram";
import { useEffect, useState } from "react";

export default function Gyro({ selectedYear }) {
  const Data = gyroComp;
  const [mean, setMean] = useState([]);
  const [meanX, setMeanX] = useState([]);
  const [meanY, setMeanY] = useState([]);
  const [meanZ, setMeanZ] = useState([]);

  const returnToArray = (data, index) => {
    const allMeans = [];

    for (const year in data.by_year) {
      const statsArray = data.by_year[year];
      for (const stats of statsArray) {
        if (stats.mean) {
          allMeans.push(...stats[index]);
        }
      }
    }
    return allMeans;
  };

  useEffect(() => {
    if (selectedYear === "general") {
      setMean(returnToArray(Data, "mean"));
      setMeanX(returnToArray(Data, "mean_x"));
      setMeanY(returnToArray(Data, "mean_y"));
      setMeanZ(returnToArray(Data, "mean_z"));
    } else {
      setMean(Data.by_year[selectedYear][0]["mean"]);
      setMeanX(Data.by_year[selectedYear][0]["mean_x"]);
      setMeanY(Data.by_year[selectedYear][0]["mean_y"]);
      setMeanZ(Data.by_year[selectedYear][0]["mean_z"]);
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
