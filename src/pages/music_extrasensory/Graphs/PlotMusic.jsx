import MusicStatsChart from "../../../components/custom/sensoryGraphs/Music";
import musicFeatures from "@/constants/Music/musicFeatures";

export default function PlotMusic({ selectedYear = "general" }) {
  //console.log(musicFeatures.general);
  return <MusicStatsChart data={musicFeatures} />;
}
