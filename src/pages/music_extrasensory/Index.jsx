import { Sensory as Layout } from "@/components/layouts/Sensory";
import api from "@/api/axios";
import { useEffect, useState } from "react";
import HorizontalBarChart from "@/components/custom/sensoryGraphs/HorizontalBarChart";
import topUserLabelSummary from "@/constants/topUserLabelSummary";
import labelsGeneral from "@/constants/labelsGeneral";
import columnasLabel from "@/constants/columnasLabel";

import TreemapChart from "@/components/custom/sensoryGraphs/TreemapChart";
import resumenAnual from "@/constants/resumenAnual";
import { PrefixedLegend } from "@/components/custom/PrefixedLegend";

export function Index() {
  const back = {
    to: "/",
    label: "Volver al inicio",
  };

  const [selectedYear, setSelectedYear] = useState("general");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [labelsPeriod, setLabelsPeriod] = useState([]);
  const [fish_2, setFish_2] = useState({});

  const categoríaLabels = {
    actividad_fisica: [
      "label:FIX_walking",
      "label:FIX_running",
      "label:OR_exercise",
      "label:AT_THE_GYM",
      "label:STAIRS_-_GOING_UP",
      "label:STAIRS_-_GOING_DOWN",
    ],
    transporte: [
      "label:BICYCLING",
      "label:IN_A_CAR",
      "label:ON_A_BUS",
      "label:DRIVE_-_I_M_THE_DRIVER",
      "label:DRIVE_-_I_M_A_PASSENGER",
    ],
    ubicacion: [
      "label:LOC_home",
      "label:LOC_main_workplace",
      "label:LOC_beach",
      "label:FIX_restaurant",
      "label:AT_A_BAR",
      "label:AT_SCHOOL",
    ],
    uso_del_telefono: [
      "label:PHONE_IN_POCKET",
      "label:PHONE_IN_HAND",
      "label:PHONE_IN_BAG",
      "label:PHONE_ON_TABLE",
    ],
    estado_postural: ["label:LYING_DOWN", "label:SITTING", "label:OR_standing"],
    rutina_diaria: [
      "label:SLEEPING",
      "label:EATING",
      "label:COOKING",
      "label:CLEANING",
      "label:DOING_LAUNDRY",
      "label:WASHING_DISHES",
      "label:TOILET",
      "label:GROOMING",
      "label:DRESSING",
      "label:BATHING_-_SHOWER",
    ],
    ocio: [
      "label:WATCHING_TV",
      "label:SURFING_THE_INTERNET",
      "label:SINGING",
      "label:AT_A_PARTY",
    ],
    actividad_social: [
      "label:TALKING",
      "label:WITH_CO-WORKERS",
      "label:WITH_FRIENDS",
      "label:IN_A_MEETING",
    ],
    trabajo_estudio: [
      "label:LAB_WORK",
      "label:IN_CLASS",
      "label:COMPUTER_WORK",
    ],
    sinteticos_y_fix: ["label:OR_indoors", "label:OR_outside"],
  };
  const getCategoriaFromLabel = (label) => {
    for (const [categoria, labels] of Object.entries(categoríaLabels)) {
      if (labels.includes(label)) {
        return categoria;
      }
    }
    return "otros";
  };

  const updateLabelsPeriod = () => {
    let newLabelsPeriod = [];

    if (selectedYear === "general") {
      // Ya está agrupado por categoría y solo reemplazamos nombres
      newLabelsPeriod = topUserLabelSummary.labels_global.map((entry) => {
        const categoriaNombre =
          labelsGeneral[entry.categoria] || entry.categoria;

        const etiquetas = {};
        for (const [labelKey, labelData] of Object.entries(entry.labels)) {
          const nombreLabel = columnasLabel[labelKey] || labelKey;
          etiquetas[nombreLabel] = labelData;
        }

        return {
          categoria: categoriaNombre,
          labels: etiquetas,
        };
      });
    } else {
      const labelsByYear =
        topUserLabelSummary.labels_by_year[selectedYear] || {};

      const groupedByCategoria = {};

      for (const [label, data] of Object.entries(labelsByYear)) {
        const categoriaKey = getCategoriaFromLabel(label);
        const categoriaNombre = labelsGeneral[categoriaKey] || categoriaKey;
        const nombreLabel = columnasLabel[label] || label;

        if (!groupedByCategoria[categoriaNombre]) {
          groupedByCategoria[categoriaNombre] = {
            categoria: categoriaNombre,
            labels: {},
          };
        }

        groupedByCategoria[categoriaNombre].labels[nombreLabel] = data;
      }

      newLabelsPeriod = Object.values(groupedByCategoria);
    }
    setLabelsPeriod(newLabelsPeriod);
  };

  const updateFishArray = () => {
    // Aquí implementas la lógica para generar el nuevo array fish_2
    // basado en los valores actuales de selectedYear, selectedCategories y selectedLabels

    const monthNames = {
      1: "Enero",
      2: "Febrero",
      3: "Marzo",
      4: "Abril",
      5: "Mayo",
      6: "Junio",
      7: "Julio",
      8: "Agosto",
      9: "Septiembre",
      10: "Octubre",
      11: "Noviembre",
      12: "Diciembre",
    };

    let newFishArray = {};

    if (selectedYear === "general") {
      newFishArray = resumenAnual.records_per_year;
      //console.log(newFishArray);
    } else {
      const monthlyData =
        resumenAnual.records_per_year_month[selectedYear] || {};
      newFishArray = {};

      Object.entries(monthlyData).forEach(([monthNumber, value]) => {
        const monthName = monthNames[parseInt(monthNumber, 10)];
        newFishArray[monthName] = value;
      });
    }

    // Filtrar por categorías si hay seleccionadas
    if (selectedCategories.length > 0) {
      newFishArray = newFishArray.filter((item) =>
        selectedCategories.includes(item.category)
      );
    }

    // Filtrar por etiquetas si hay seleccionadas
    if (selectedLabels.length > 0) {
      newFishArray = newFishArray.filter((item) =>
        selectedLabels.some((label) => item.labels.includes(label))
      );
    }

    setFish_2(newFishArray);
  };

  // Efecto que se ejecuta cuando cambian los estados dependientes
  useEffect(() => {
    updateFishArray();
    updateLabelsPeriod();
  }, [selectedYear, selectedCategories, selectedLabels]); // Dependencias

  return (
    <Layout
      title="MusicExtrasensory"
      back={back}
      selectedYear={selectedYear}
      setSelectedYear={setSelectedYear}
      selectedCategories={selectedCategories}
      setSelectedCategories={setSelectedCategories}
      selectedLabels={selectedLabels}
      setSelectedLabels={setSelectedLabels}
    >
      <div className="grid grid-cols-3">
        <div className="w-full flex flex-col bg-[#282b33] rounded-2xl p-4">
          <h4>
            Número de registros de usuarios:{" "}
            {selectedYear === "general" ? "GENERAL" : `AÑO ${selectedYear}`}
          </h4>

          <HorizontalBarChart data={fish_2} />
        </div>
        <div className="w-full flex flex-col bg-[#282b33] rounded-2xl p-4 col-span-2 max-h-[500px]">
          <PrefixedLegend />
          <TreemapChart rawData={labelsPeriod} />
        </div>
      </div>
    </Layout>
  );
}
