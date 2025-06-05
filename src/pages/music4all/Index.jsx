import { Music4All as Layout } from "@/components/layouts/Music4All";
import api from "@/api/axios";
import { useEffect, useState } from "react";
import VistaGeneral from "@/pages/music4all/tabs/General";
import { AnimatePresence, motion } from "framer-motion";
import LanguageLabels from "@/constants/Languages";
import BulletsLanguages from "@/components/custom/BulletsLanguages";

export function Index() {
  const back = {
    to: "/",
    label: "Volver al inicio",
  };

  const [languages, setLanguages] = useState([]);
  const [totalSongs, setTotalSongs] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState("general");
  const [dataFinal, setDataFinal] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get("/languages");

        const data = response.data?.general.valores_por_lang || [];
        let dataTotal = {
          valores_por_lang: data,
          years: response.data?.years || [],
        };

        setLanguages(data);
        setDataFinal(dataTotal);

        // Sumar todos los `n_registros` para la vista “General”
        const total = data.reduce(
          (sum, langData) => sum + (langData.n_registros || 0),
          0
        );
        setTotalSongs(total);
      } catch (error) {
        console.error("Error fetching songs:", error);
        setLanguages([]);
        setTotalSongs(0);
      }
    }

    fetchData();
  }, []);

  return (
    <Layout title="Music 4 All" back={back}>
      {/* Paso 1: renderizo los bullets. */}
      <BulletsLanguages
        languages={languages}
        totalSongs={totalSongs}
        selectedLanguage={selectedLanguage}
        onSelectLanguage={setSelectedLanguage}
      />

      {/* Paso 2: cada vez que cambie `selectedLanguage`, la vista se re-renderiza */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedLanguage}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.4 }}
          className="w-full"
        >
          {/* Paso 3: le paso `selectedLanguage` a VistaGeneral para que lo propague a PieChart */}
          <VistaGeneral datos={dataFinal} selectedLanguage={selectedLanguage} />
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
}
