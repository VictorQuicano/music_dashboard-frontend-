import React, { useEffect } from "react";
import {
  Box,
  VStack,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  Stack,
  Flex,
  Badge,
  Divider,
} from "@chakra-ui/react";

import columnasLabel from "@/constants/columnasLabel";
import topUserLabelSummary from "@/constants/topUserLabelSummary";
import labelsGeneral from "@/constants/labelsGeneral";
import RadioCard from "@/components/custom/RadioCard";

import DataSets from "@/constants/DatasetDescription";
// JSON data for Extrasensory and Musi4all

const FilterSidebar = ({
  selectedYear,
  setSelectedYear,
  selectedExtraDS,
  setSelectedExtraDS,
  selectedM4ADS,
  setSelectedM4ADS,
}) => {
  // Obtener años disponibles
  const availableYears = Object.keys(topUserLabelSummary.records_per_year);
  const filterData = DataSets;
  //console.log(filterData);

  return (
    <Box w="300px" h="auto" p={4}>
      <VStack align="stretch" spacing={4}>
        {/* Título */}
        <Text fontSize="xl" fontWeight="bold" color="white">
          FILTROS
        </Text>

        <Divider />

        {/* Acordeón */}
        <Accordion allowMultiple defaultIndex={[]}>
          {/* Extrasensory */}
          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left" fontWeight="semibold">
                EXTRASENSORY
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <CheckboxGroup
                value={selectedExtraDS}
                onChange={setSelectedExtraDS}
              >
                <Stack spacing={2}>
                  {filterData.extrasensory.map((item) => (
                    <Checkbox key={item.campo} value={item.campo}>
                      {item.etiqueta}
                    </Checkbox>
                  ))}
                </Stack>
              </CheckboxGroup>
            </AccordionPanel>
          </AccordionItem>

          {/* Musi4all */}
          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left" fontWeight="semibold">
                MUSI4ALL
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <CheckboxGroup value={selectedM4ADS} onChange={setSelectedM4ADS}>
                <Stack spacing={2}>
                  {filterData.music4all.map((item) => (
                    <Checkbox key={item.campo} value={item.campo}>
                      {item.etiqueta}
                    </Checkbox>
                  ))}
                </Stack>
              </CheckboxGroup>
            </AccordionPanel>
          </AccordionItem>
          {/* Filtro por Años */}
          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left" fontWeight="semibold">
                POR AÑOS
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <RadioGroup value={selectedYear} onChange={setSelectedYear}>
                <Flex wrap="wrap" gap={4}>
                  {/* Opción General */}
                  <RadioCard
                    isSelected={selectedYear === "general"}
                    onClick={() => setSelectedYear("general")}
                  >
                    <Flex justify="space-between" align="center" w="full">
                      <Text>GENERAL</Text>
                      <Badge colorScheme="blue" ml={2}>
                        {topUserLabelSummary.total_records.toLocaleString()}
                      </Badge>
                    </Flex>
                  </RadioCard>

                  {/* Años específicos */}
                  {availableYears.map((year) => (
                    <RadioCard
                      key={year}
                      isSelected={selectedYear === year}
                      onClick={() => setSelectedYear(year)}
                    >
                      <Flex justify="space-between" align="center" w="full">
                        <Text>{year}</Text>
                        <Badge colorScheme="gray" ml={2}>
                          {topUserLabelSummary.records_per_year[
                            year
                          ].toLocaleString()}
                        </Badge>
                      </Flex>
                    </RadioCard>
                  ))}
                </Flex>
              </RadioGroup>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </VStack>
    </Box>
  );
};

export default FilterSidebar;
