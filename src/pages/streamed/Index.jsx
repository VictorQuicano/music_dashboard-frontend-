import { Streamed as Layout } from "@/components/layouts/Streamed";
import dataset from "@/constants/Streamed/dataset";
//import StreamContainer from "./Graph/StreamContainer";
import { StreamGraphPageViews } from "./Graph/StreamGraphPageViews";
import ActivitiesVisualization from "../music_extrasensory/Graphs/ActivitiesSchedule";
import LocationTracker from "../music_extrasensory/Graphs/LocationTracker";
import RadialChart from "../music_extrasensory/Graphs/RadialChart";

const RadialChartEnergy = () => {
  const sampleDataE = {
    2016: [0.8, 0.3, 0.95, 0.6, 0.75, 0.9, 0.4, 0.85, 0.2, 0.7, 0.6, 0.9],
    2017: [0.9, 0.4, 0.8, 0.7, 0.85, 0.95, 0.5, 0.9, 0.3, 0.8, 0.7, 0.95],
    2018: [0.7, 0.6, 0.9, 0.8, 0.9, 0.85, 0.6, 0.95, 0.4, 0.9, 0.8, 0.85],
    2019: [0.85, 0.7, 0.95, 0.9, 0.95, 0.9, 0.7, 1.0, 0.5, 0.95, 0.9, 0.9],
    2020: [0.9, 0.8, 1.0, 0.95, 1.0, 0.95, 0.8, 0.95, 0.6, 1.0, 0.95, 0.95],
  };
  const sampleDataV = {
    2016: [0.85, 0.7, 0.95, 0.9, 0.95, 0.9, 0.7, 1.0, 0.5, 0.95, 0.9, 0.9],
    2017: [0.9, 0.4, 0.8, 0.7, 0.85, 0.95, 0.5, 0.9, 0.3, 0.8, 0.7, 0.95],
    2018: [0.7, 0.6, 0.9, 0.8, 0.9, 0.85, 0.6, 0.95, 0.4, 0.9, 0.8, 0.85],
    2019: [0.9, 0.8, 1.0, 0.95, 1.0, 0.95, 0.8, 0.95, 0.6, 1.0, 0.95, 0.95],
    2020: [0.8, 0.3, 0.95, 0.6, 0.75, 0.9, 0.4, 0.85, 0.2, 0.7, 0.6, 0.9],
  };
  const sampleDataD = {
    2016: [0.9, 0.4, 0.8, 0.7, 0.85, 0.95, 0.5, 0.9, 0.3, 0.8, 0.7, 0.95],
    2017: [0.7, 0.6, 0.9, 0.8, 0.9, 0.85, 0.6, 0.95, 0.4, 0.9, 0.8, 0.85],
    2018: [0.85, 0.7, 0.95, 0.9, 0.95, 0.9, 0.7, 1.0, 0.5, 0.95, 0.9, 0.9],
    2019: [0.8, 0.3, 0.95, 0.6, 0.75, 0.9, 0.4, 0.85, 0.2, 0.7, 0.6, 0.9],
    2020: [0.9, 0.8, 1.0, 0.95, 1.0, 0.95, 0.8, 0.95, 0.6, 1.0, 0.95, 0.95],
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl !font-bold text-center mb-8 text-gray-800 !font-sans uppercase">
          Gráfico Radial por valores acumulados de Metadata
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <RadialChart
            data={sampleDataE}
            subtitle="DISTRIBUCIÓN ENERGÍA"
            emoji="⚡️"
            centerText="Total"
            baseColor="#FEF08A"
            maxColor="#A16207"
          />
          <RadialChart
            data={sampleDataV}
            subtitle="DISTRIBUCIÓN BALANCE"
            emoji="🎭"
            centerText="Total"
            baseColor="#DDD6FE"
            maxColor="#6B21A8"
          />
          <RadialChart
            data={sampleDataD}
            subtitle="DISTRIBUCIÓN DANZABILIDAD"
            emoji="💃🏻"
            centerText="Total"
            baseColor="#F9A8D4"
            maxColor="#9D174D"
          />
        </div>
      </div>
    </div>
  );
};

export function Index() {
  const back = {
    to: "/",
    label: "Volver al inicio",
  };
  return (
    <Layout title="Streamed Graph" back={back}>
      <div className="w-full bg-white p-10">
        <RadialChartEnergy />
      </div>
    </Layout>
  );
}
//<StreamGraphPageViews />
