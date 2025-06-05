import React from "react";
import PieChart from "@/components/custom/Circular";
import CardArtist from "@/components/custom/CardArtist";
import { Box, SimpleGrid } from "@chakra-ui/react";
import LanguageLabels from "@/constants/Languages";

export default function VistaGeneral({ datos, selectedLanguage }) {
  // `datos` = { valores_por_lang: [...], years: [...] }
  // `selectedLanguage` = "general" o el código de idioma seleccionado

  // 1) Extraer los arrays del objeto datos
  const { valores_por_lang = [], years = [] } = datos;

  // 2) Encontrar el objeto de "idioma" correspondiente, si estamos en nivel 2
  const selectedLangData =
    selectedLanguage === "general"
      ? null
      : valores_por_lang.find((d) => d.idioma === selectedLanguage);

  // 3) Filtrar y ordenar los años para el idioma seleccionado
  const yearsForLang =
    selectedLanguage === "general"
      ? []
      : years
          .filter((d) => d.idioma === selectedLanguage)
          .sort((a, b) => a.año - b.año);

  return (
    <>
      <h1 className="!my-5">
        {selectedLanguage === "general"
          ? "CANCIONES POR IDIOMA"
          : "Registro histórico de canciones en " +
              LanguageLabels[selectedLanguage]?.label || "General"}
      </h1>
      <Box w="full" p={4}>
        {/* 4) Gráfico pie siempre visible, en función de selectedLanguage */}
        <PieChart
          valoresPorLang={valores_por_lang}
          years={years}
          width={500}
          selectedLanguage={selectedLanguage}
        />

        {/* 5) Si estoy en nivel 2 (selectedLanguage !== "general"), muestro las tarjetas */}
        {selectedLanguage !== "general" && selectedLangData && (
          <>
            {/* 5.1) Tarjeta grande del idioma */}
            <Box mt={8} mb={4} className="w-full flex flex-col items-center">
              <h2 className="!text-3xl !font-bold !mb-4 !w-full !text-center">
                Artista con más canciones en{" "}
                {LanguageLabels[selectedLanguage]?.emoji}
              </h2>
              <CardArtist data={selectedLangData} isSmall={false} />
            </Box>

            <h3 className="!text-2xl !font-bold !mb-4 !w-full">
              Registro histórico por año
            </h3>
            {/* 5.2) Cuadrícula con las tarjetas pequeñas de cada año */}
            <SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 5 }} spacing={4}>
              {yearsForLang.map((y) => (
                <CardArtist key={y.año} data={y} isSmall={true} />
              ))}
            </SimpleGrid>
          </>
        )}
      </Box>
    </>
  );
}
