import DBIcon from "@/components/custom/DBIcon";
import MusicImg from "@/assets/music.png";
import Stadistic from "@/assets/stadistics.png";
import HumanActivity from "@/assets/human_activity.webp";
import KidGif from "@/assets/Kid-2_v4.webp";
import { title } from "framer-motion/client";

function Home() {
  const Music4AllInfo = {
    title: "Music4All",
    records: "109,269 Canciones",
    domain: "Música: Géneros, Artista, etc",
    reference: "https://sites.google.com/view/contact4music4all",
  };
  const Music4AllOnion = {
    title: "Music4All Onion",
    records: "109,269 Canciones",
    domain: "Metadata de la música: MFCC, Chroma, etc",
    reference: "https://dl.acm.org/doi/10.1145/3511808.3557656",
  };
  const Extrasensory = {
    title: "Extrasensory",
    records: "60 personas",
    dominio: "Acividad humana: Giroscopio, Acelerómetro, Micrófono",
    reference: "http://extrasensory.ucsd.edu/#tutorial",
  };
  return (
    <div className="grid grid-col-1 md:grid-cols-2 h-screen w-full">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-center font-bold !mb-5">
          Dataset Recomendador músical Contextualizado
        </h1>
        <div className="w-[80%] text-justify flex flex-col gap-5 mb-[100px]">
          <p>
            Para este proyecto se está haciendo uso de los siguientes datasets,
            que combinados nos ayudan a crear un sistema de recomendación
            musical contextualizado.
          </p>
          <p>
            Music4All se complementa con su derivado Onion, para obtener data y
            metadata sobre de las diversas canciones. Extrasensory nos ayuda a
            contextualizar los registros de escucha de música, añadiendo
            información sobre la actividad humana a través de sensores como
            giroscopio, acelerómetro y micrófono del celuar de 60 voluntarios.
          </p>
        </div>

        <div className="flex flex-col justify-center items-center">
          <div className="flex justify-between gap-[100px]">
            <DBIcon data={Music4AllInfo} to="/music_4_all">
              <img src={MusicImg} width={120} />
            </DBIcon>
            <DBIcon data={Music4AllOnion} to="#">
              <img src={Stadistic} width={120} />
            </DBIcon>
          </div>
          <div className="flex justify-center">
            <DBIcon data={Extrasensory} to="#">
              <img src={HumanActivity} width={150} />
            </DBIcon>
          </div>
        </div>
      </div>

      <div className="flex justify-end items-center md:items-end">
        <img src={KidGif} width={900} />
      </div>
    </div>
  );
}

export default Home;
