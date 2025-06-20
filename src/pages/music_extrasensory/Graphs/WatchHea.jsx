import watchHead from "@/constants/Extrasensory/watchHead";
import PolarHistogram from "../../../components/custom/sensoryGraphs/PolarHistogram;";
import { useEffect, useState } from "react";

export default function Gyro({ selectedYear }) {
  const Data = watchHead;
  const [meanSin, setMeanSin] = useState([]);
  const [meanCos, setMeanCos] = useState([]);

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
      setMeanSin(returnToArray(Data, "mean_sin"));
      setMeanCos(returnToArray(Data, "mean_cos"));
    } else {
      setMeanSin(Data.by_year[selectedYear]["mean_sin"]);
      setMeanCos(Data.by_year[selectedYear]["mean_cos"]);
    }
  }, [selectedYear]);

  if (selectedYear !== "general") {
  }
  return meanSin.length === 0 && meanCos.length == 0 ? (
    <div>Loading...</div>
  ) : (
    <div className="flex flex-col w-full h-full justify-center items-center gap-5">
      <PolarHistogram
        sinData={meanSin}
        cosData={meanCos}
        color="rgba(135, 206, 235, 0.7)"
        edgeColor="#333"
        title="Distribución angular del reloj (heading)"
      />
    </div>
  );
}
