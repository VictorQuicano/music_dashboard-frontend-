import { useEffect, useState } from "react";
import DataSets from "@/constants/DatasetDescription";

import Card from "@/components/basic/Card";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
} from "@chakra-ui/react";

import RawAcc from "../Graphs/RawAcc";
import Gyro from "../Graphs/Gyro";
import Mag from "../Graphs/Mag";
import WatchAcc from "../Graphs/WatchAcc";
import WatchHea from "../Graphs/WatchHea";
import MovementVisualization from "../Graphs/Location";
import LocQuick from "../Graphs/LocQuick";
import AudioMFCC from "../Graphs/AudioMFCC";
import Discrete from "../Graphs/Discrete";
import Labels from "../Graphs/Labels";
import PlotMusic from "../Graphs/PlotMusic";

const PorDefecto = () => <h1>Soy Un Test</h1>;

const NoSelectec = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-5 p-10">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-20 text-slate-500"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path d="M7 0q-.891.002-1.527.463c-.418.302-.717.726-.93 1.208C4.123 2.619 4 3.879 4 5.187v.504L3.382 6A2.5 2.5 0 0 0 2 8.236v2.576C2 13.659 4.22 16 7 16h2c2.78 0 5-2.342 5-5.188V5.186c0-1.13-.272-2.044-.748-2.772-.474-.726-1.13-1.235-1.849-1.59C9.981.123 8.26 0 7 0m2.5 6.099V1.232c.51.11 1.008.267 1.46.49.596.293 1.099.694 1.455 1.24.355.543.585 1.262.585 2.225v1.69zm-1-5.025v4.803L5 5.099c.006-1.242.134-2.293.457-3.024.162-.366.363-.63.602-.801C6.292 1.105 6.593 1 7 1c.468 0 .98.018 1.5.074M5 6.124 13 7.9v2.912C13 13.145 11.19 15 9 15H7c-2.19 0-4-1.855-4-4.188V8.236a1.5 1.5 0 0 1 .83-1.342l.187-.093c.01.265.024.58.047.92.062.938.19 2.12.462 2.937a.5.5 0 1 0 .948-.316c-.227-.683-.35-1.75-.413-2.688a29 29 0 0 1-.06-1.528v-.002z" />
      </svg>
      <h4 className="text-slate-500 !text-xl font-semibold">
        Selecciona una gráfica dentro de los filtros
      </h4>
    </div>
  );
};

export default function MasterCard({
  selectedExtraDS = [],
  selectedM4ADS = [],
  selectedYear,
}) {
  const [extraGraphs, setExtraGraphs] = useState([]);
  const [m4aGraphs, setM4AGraphs] = useState([]);

  // 👇 Define el graphMap dentro del componente, con acceso a selectedYear
  const graphMap = {
    raw_acc: {
      Component: (props) => <RawAcc {...props} />,
      colSpan: 4,
    },
    proc_gyro: {
      Component: (props) => <Gyro {...props} />,
      colSpan: 2,
    },
    raw_magnet: { Component: (props) => <Mag {...props} />, colSpan: 2 },
    watch_acceleration: {
      Component: (props) => <WatchAcc {...props} />,
      colSpan: 2,
    },
    watch_heading: {
      Component: (props) => <WatchHea {...props} />,
      colSpan: 2,
    },
    location: {
      Component: (props) => <MovementVisualization {...props} />,
      colSpan: 4,
    },
    location_quick_features: {
      Component: (props) => <LocQuick {...props} />,
      colSpan: 4,
    },
    audio_naive: { Component: (props) => <AudioMFCC {...props} />, colSpan: 2 },
    discrete: { Component: (props) => <Discrete {...props} />, colSpan: 4 },
    label: { Component: (props) => <Labels {...props} />, colSpan: 2 },
    Audio: { Component: (props) => <PlotMusic {...props} />, colSpan: 3 },
    EMD: { Component: PorDefecto, colSpan: 1 },
    EGC: { Component: PorDefecto, colSpan: 1 },
    UGC: { Component: PorDefecto, colSpan: 1 },
    DC: { Component: PorDefecto, colSpan: 1 },
  };

  useEffect(() => {
    const getLabelForKey = (key) => {
      const allItems = [...DataSets.extrasensory, ...DataSets.music4all];
      const match = allItems.find((item) => item.campo === key);
      return match?.etiqueta || key;
    };

    const getDescriptionForKey = (key) => {
      const allItems = [...DataSets.extrasensory, ...DataSets.music4all];
      const match = allItems.find((item) => item.campo === key);
      return match ? match["descripción"] : key;
    };

    const getComponents = (keysArray) =>
      keysArray.map((key, index) => {
        const { Component, colSpan } = graphMap[key] || {
          Component: () => <p>Gráfico no disponible para {key}</p>,
          colSpan: 1,
        };
        const label = getLabelForKey(key);
        const description = getDescriptionForKey(key);

        return (
          <div
            key={`graph-${key}-${index}`}
            className={`col-span-${colSpan} w-full`}
          >
            <Card className="bg-slate-900">
              <div className="w-full relative">
                <h3 className="!font-semibold !text-center !mb-2">{label}</h3>
                <Popover placement="top" trigger="hover">
                  <PopoverTrigger>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="w-4 hover:cursor-pointer absolute top-0 right-0"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                    </svg>
                  </PopoverTrigger>
                  <PopoverContent bg="gray.700" color="white" borderRadius="md">
                    <PopoverArrow />
                    <PopoverBody className="p-2">
                      <h3 className="!font-bold !text-xl !text-center ">
                        Contexto
                      </h3>
                      <div className="flex flex-col gap-4">
                        <p>{description}</p>
                      </div>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </div>
              <Component selectedYear={selectedYear} />
            </Card>
          </div>
        );
      });

    setExtraGraphs(getComponents(selectedExtraDS));
    setM4AGraphs(getComponents(selectedM4ADS));
  }, [selectedExtraDS, selectedM4ADS, selectedYear]);

  return (
    <div className="flex flex-col gap-4">
      <Card className="grid grid-cols-4 gap-5">
        <h2 className="!text-lg !font-bold !mb-2 text-center col-span-4">
          Data proporcionada por EXTRASENSORY
        </h2>
        {extraGraphs.length > 0 ? extraGraphs : <NoSelectec />}
      </Card>

      <Card className="grid grid-cols-4 gap-5">
        <h2 className="!text-lg !font-bold !mb-2 text-center col-span-4">
          Data proporcionada por MUSIC4ALL
        </h2>
        {m4aGraphs.length > 0 ? m4aGraphs : <NoSelectec />}
      </Card>
    </div>
  );
}
