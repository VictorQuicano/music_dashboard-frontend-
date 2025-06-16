import CardContainer from "@/components/basic/Card";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
} from "@chakra-ui/react";

const Data = {
  by_user: {
    nans: {
      porcentaje_nan_global: 22.5,
      porcentaje_nan_por_anio: {
        2005: 21.61,
        2006: 21.6,
        2007: 21.54,
        2008: 21.53,
        2009: 21.48,
        2010: 22.48,
        2011: 23.19,
        2012: 23.81,
        2013: 22.96,
        2014: 23.08,
        2015: 23.2,
        2016: 22.63,
        2017: 22.98,
        2018: 22.67,
        2019: 22.32,
        2020: 22.37,
      },
    },
    counts: {
      global: {
        fecha_min: "2005-02-14 19:52:06",
        fecha_max: "2020-03-20 12:50:43",
        total_registros: 671298,
      },
      por_anio: {
        2005: {
          fecha_min: "2005-02-14 19:52:06",
          fecha_max: "2005-12-30 22:00:58",
          total_registros: 13677,
        },
        2006: {
          fecha_min: "2006-01-01 19:41:56",
          fecha_max: "2006-12-31 18:05:42",
          total_registros: 24341,
        },
        2007: {
          fecha_min: "2007-01-01 01:15:37",
          fecha_max: "2007-12-31 23:26:42",
          total_registros: 35074,
        },
        2008: {
          fecha_min: "2008-01-01 00:19:47",
          fecha_max: "2008-12-31 21:27:25",
          total_registros: 47148,
        },
        2009: {
          fecha_min: "2009-01-01 07:48:32",
          fecha_max: "2009-12-31 23:44:23",
          total_registros: 49004,
        },
        2010: {
          fecha_min: "2010-01-01 01:02:56",
          fecha_max: "2010-12-31 18:21:46",
          total_registros: 47862,
        },
        2011: {
          fecha_min: "2011-01-01 11:24:54",
          fecha_max: "2011-12-31 18:27:18",
          total_registros: 42999,
        },
        2012: {
          fecha_min: "2012-01-01 12:19:21",
          fecha_max: "2012-12-31 22:40:38",
          total_registros: 26910,
        },
        2013: {
          fecha_min: "2013-01-01 10:05:45",
          fecha_max: "2013-12-31 22:40:39",
          total_registros: 38067,
        },
        2014: {
          fecha_min: "2014-01-01 00:11:02",
          fecha_max: "2014-12-31 18:03:16",
          total_registros: 33329,
        },
        2015: {
          fecha_min: "2015-01-02 15:56:20",
          fecha_max: "2015-12-31 23:50:26",
          total_registros: 41646,
        },
        2016: {
          fecha_min: "2016-01-01 00:26:32",
          fecha_max: "2016-12-30 16:21:37",
          total_registros: 54122,
        },
        2017: {
          fecha_min: "2017-01-02 16:01:50",
          fecha_max: "2017-12-20 22:48:44",
          total_registros: 62966,
        },
        2018: {
          fecha_min: "2018-01-04 19:09:11",
          fecha_max: "2018-12-27 16:54:02",
          total_registros: 65479,
        },
        2019: {
          fecha_min: "2019-01-03 12:01:29",
          fecha_max: "2019-12-19 10:04:35",
          total_registros: 72607,
        },
        2020: {
          fecha_min: "2020-01-03 11:08:35",
          fecha_max: "2020-03-20 12:50:43",
          total_registros: 16067,
        },
      },
    },
  },
  all_dataset: {
    counts: {
      global: {
        fecha_min: "2005-02-14 18:41:12",
        fecha_max: "2020-03-20 12:59:27",
        total_registros: 5763454,
      },
      por_anio: {
        2005: {
          fecha_min: "2005-02-14 18:41:12",
          fecha_max: "2005-12-30 22:00:58",
          total_registros: 3448,
        },
        2006: {
          fecha_min: "2006-01-01 19:41:56",
          fecha_max: "2006-12-31 23:56:06",
          total_registros: 33368,
        },
        2007: {
          fecha_min: "2007-01-01 00:09:53",
          fecha_max: "2007-12-31 23:34:39",
          total_registros: 69801,
        },
        2008: {
          fecha_min: "2008-01-01 00:15:04",
          fecha_max: "2008-12-31 23:55:16",
          total_registros: 124128,
        },
        2009: {
          fecha_min: "2009-01-01 00:04:30",
          fecha_max: "2009-12-31 23:59:32",
          total_registros: 165021,
        },
        2010: {
          fecha_min: "2010-01-01 00:00:03",
          fecha_max: "2010-12-31 23:58:00",
          total_registros: 256933,
        },
        2011: {
          fecha_min: "2011-01-01 00:01:08",
          fecha_max: "2011-12-31 23:59:29",
          total_registros: 287262,
        },
        2012: {
          fecha_min: "2012-01-01 00:04:29",
          fecha_max: "2012-12-31 23:57:27",
          total_registros: 328211,
        },
        2013: {
          fecha_min: "2013-01-01 00:02:58",
          fecha_max: "2013-12-31 23:55:58",
          total_registros: 333986,
        },
        2014: {
          fecha_min: "2014-01-01 00:02:58",
          fecha_max: "2014-12-31 23:59:29",
          total_registros: 787931,
        },
        2015: {
          fecha_min: "2015-01-01 00:00:31",
          fecha_max: "2015-12-31 23:56:03",
          total_registros: 669745,
        },
        2016: {
          fecha_min: "2016-01-01 00:02:00",
          fecha_max: "2016-12-31 23:57:33",
          total_registros: 566188,
        },
        2017: {
          fecha_min: "2017-01-01 00:01:21",
          fecha_max: "2017-12-31 23:59:37",
          total_registros: 639965,
        },
        2018: {
          fecha_min: "2018-01-01 00:00:21",
          fecha_max: "2018-12-31 23:59:06",
          total_registros: 797853,
        },
        2019: {
          fecha_min: "2019-01-01 00:01:28",
          fecha_max: "2019-12-31 23:59:17",
          total_registros: 580310,
        },
        2020: {
          fecha_min: "2020-01-01 00:00:02",
          fecha_max: "2020-03-20 12:59:27",
          total_registros: 119304,
        },
      },
    },
  },
};

//ME DIO FLOREA PASARLO A UN JSON NO ME JUZGUEN >:v

export default function InfoCard({ selectedYear }) {
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  return (
    <CardContainer className="flex flex-row justify-between items-start my-5">
      <div>
        <h2 className="!font-semibold !text-4xl mb-8">
          Contexto general{" "}
          {selectedYear !== "general" && <strong>{selectedYear}</strong>}
        </h2>
        <h3 className="!font-semibold !text-2xl mb-8">
          User con ID: 2C32C23E-E30C-498A-8DD2-0EFB9150A02E
        </h3>
        <ul className="!mt-8">
          <li>
            <strong># de Datos: </strong>{" "}
            {selectedYear === "general"
              ? Data.by_user.counts.global.total_registros
              : Data.by_user.counts.por_anio[selectedYear]?.total_registros ??
                "N/A"}
          </li>
          <li>
            <strong>% global de Datos Nan: </strong>{" "}
            {selectedYear === "general"
              ? Data.by_user.nans.porcentaje_nan_global
              : Data.by_user.nans.porcentaje_nan_por_anio[selectedYear] ??
                "N/A"}
          </li>
          <li>
            <strong>Rango de fechas: </strong>
            {selectedYear === "general" ? (
              <>
                {formatDate(Data.by_user.counts.global.fecha_min)} al{" "}
                {formatDate(Data.by_user.counts.global.fecha_max)}
              </>
            ) : (
              <>
                {formatDate(
                  Data.by_user.counts.por_anio[selectedYear].fecha_min
                )}{" "}
                al{" "}
                {formatDate(
                  Data.by_user.counts.por_anio[selectedYear].fecha_max
                )}
              </>
            )}
          </li>
        </ul>
      </div>
      <Popover placement="top" trigger="hover">
        <PopoverTrigger>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="w-8 hover:cursor-pointer"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
          </svg>
        </PopoverTrigger>
        <PopoverContent bg="gray.700" color="white" borderRadius="md">
          <PopoverArrow />
          <PopoverBody className="p-2">
            <h3 className="!font-bold !text-xl !text-center ">Contexto</h3>
            <div className="flex flex-col gap-4">
              <p>
                MusicSensory surge de la combinación de tres fuentes de datos:
                <strong>Music4All, su versión Onion</strong>, y{" "}
                <strong>Extrasensory</strong>.
              </p>
              <p>
                <strong>
                  Music4All proporciona registros de escucha de música y la
                  metadata de las canciones
                </strong>
                , mientras que{" "}
                <strong>
                  Extrasensory recopila datos de actividad y contexto diario de
                  60 usuarios
                </strong>{" "}
                a través de sus dispositivos.
              </p>
              <p>
                La idea fue <strong>simular</strong> que estos usuarios estaban
                escuchando música mientras realizaban sus actividades diarias.
                Para lograrlo, se{" "}
                <strong>
                  sincronizaron los datos usando las marcas de tiempo
                  (timestamps)
                </strong>
                , primero emparejando los días de la semana y luego coincidiendo
                la hora y el minuto del día.
              </p>
            </div>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </CardContainer>
  );
}
