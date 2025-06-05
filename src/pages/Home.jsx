import Music from "@/components/icons/Music";
import DBIcon from "@/components/custom/DBIcon";

function Home() {
  const Music4AllInfo = {
    title: "Music4All",
    records: "109,269 Canciones",
    domain: "Música: Géneros, Artista, etc",
    reference: "https://sites.google.com/view/contact4music4all",
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <DBIcon data={Music4AllInfo} to="/music_4_all">
        <Music className="text-white text-2xl z-10" />
      </DBIcon>
    </div>
  );
}

export default Home;
