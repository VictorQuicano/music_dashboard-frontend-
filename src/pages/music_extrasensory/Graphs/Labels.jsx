import Treemap from "@/components/custom/sensoryGraphs/Treemap";
import { PrefixedLegend } from "@/components/custom/PrefixedLegend";
import topUserLabelSummary from "@/constants/topUserLabelSummary";
import labelsGeneral from "@/constants/labelsGeneral";
import columnasLabel from "@/constants/columnasLabel";
import { useState, useEffect } from "react";

export default function Label({ selectedYear }) {
  const [labelsPeriod, setLabelsPeriod] = useState([]);

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

    newLabelsPeriod = topUserLabelSummary.labels_global.map((entry) => {
      const categoriaNombre =
        labelsGeneral[entry.categoria]["etiqueta"] || entry.categoria;
      const categoryColor = labelsGeneral[entry.categoria]["color"];
      const etiquetas = {};
      for (const [labelKey, labelData] of Object.entries(entry.labels)) {
        const nombreLabel = columnasLabel[labelKey] || labelKey;
        etiquetas[nombreLabel] = labelData;
      }

      return {
        categoria: categoriaNombre,
        color: categoryColor,
        labels: etiquetas,
      };
    });
    //if (selectedYear === "general") {
    //  // Ya está agrupado por categoría y solo reemplazamos nombres
    //  newLabelsPeriod = topUserLabelSummary.labels_global.map((entry) => {
    //    const categoriaNombre =
    //      labelsGeneral[entry.categoria]["etiqueta"] || entry.categoria;
    //    const categoryColor = labelsGeneral[entry.categoria]["color"];
    //    const etiquetas = {};
    //    for (const [labelKey, labelData] of Object.entries(entry.labels)) {
    //      const nombreLabel = columnasLabel[labelKey] || labelKey;
    //      etiquetas[nombreLabel] = labelData;
    //    }
    //
    //    return {
    //      categoria: categoriaNombre,
    //      color: categoryColor,
    //      labels: etiquetas,
    //    };
    //  });
    //} else {
    //  return;
    //  const labelsByYear =
    //    topUserLabelSummary.labels_by_year[selectedYear] || {};
    //
    //  const groupedByCategoria = {};
    //
    //  for (const [label, data] of Object.entries(labelsByYear)) {
    //    const categoriaKey = getCategoriaFromLabel(label);
    //    const categoriaNombre =
    //      labelsGeneral[categoriaKey]["etiqueta"] || categoriaKey;
    //    const categoryColor = labelsGeneral[entry.categoria]["color"];
    //
    //    const nombreLabel = columnasLabel[label] || label;
    //
    //    if (!groupedByCategoria[categoriaNombre]) {
    //      groupedByCategoria[categoriaNombre] = {
    //        categoria: categoriaNombre,
    //        color: categoryColor,
    //        labels: {},
    //      };
    //    }
    //
    //    groupedByCategoria[categoriaNombre].labels[nombreLabel] = data;
    //  }

    //   newLabelsPeriod = Object.values(groupedByCategoria);
    // }
    setLabelsPeriod(newLabelsPeriod);
  };
  useEffect(() => {
    updateLabelsPeriod();
  }, [selectedYear]);
  return (
    <div className="w-full max-h-[800px]">
      <PrefixedLegend />
      {labelsPeriod.length !== 0 ? (
        <Treemap dataRaw={labelsPeriod} />
      ) : (
        <h1>Wait please</h1>
      )}
    </div>
  );
}
