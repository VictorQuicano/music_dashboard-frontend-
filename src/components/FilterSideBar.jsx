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

const FilterSidebar = ({
  selectedYear,
  setSelectedYear,
  selectedLabels,
  setSelectedLabels,
}) => {
  // Calcular totales por categoría
  const getCategoryTotal = (categoria) => {
    const labelsData = getLabelsDataByYear();
    const categoryData = labelsData.find((cat) => cat.categoria === categoria);

    if (!categoryData) return 0;

    return Object.values(categoryData.labels).reduce(
      (sum, label) => sum + label.count,
      0
    );
  };

  // Obtener años disponibles
  const availableYears = Object.keys(topUserLabelSummary.records_per_year);

  // Obtener todos los labels de una categoría
  const getCategoryLabels = (categoria) => {
    const labelsData = getLabelsDataByYear();
    const categoryData = labelsData.find((cat) => cat.categoria === categoria);

    return categoryData ? Object.keys(categoryData.labels) : [];
  };

  // Agregar esta función después de getCategoryTotal
  const getLabelsDataByYear = () => {
    if (selectedYear === "general") {
      return topUserLabelSummary.labels_global;
    } else {
      // Transformar labels_by_year al formato de labels_global
      const yearData = topUserLabelSummary.labels_by_year[selectedYear] || {};

      // Agrupar por categorías
      const categoriesMap = {};

      Object.entries(yearData).forEach(([labelKey, labelData]) => {
        // Encontrar la categoría de este label en los datos globales
        const globalCategory = topUserLabelSummary.labels_global.find((cat) =>
          cat.labels.hasOwnProperty(labelKey)
        );

        if (globalCategory) {
          const categoria = globalCategory.categoria;

          if (!categoriesMap[categoria]) {
            categoriesMap[categoria] = {
              categoria: categoria,
              labels: {},
            };
          }

          categoriesMap[categoria].labels[labelKey] = labelData;
        }
      });

      return Object.values(categoriesMap);
    }
  };

  // Verificar si una categoría está completamente seleccionada
  const isCategoryFullySelected = (categoria) => {
    const categoryLabels = getCategoryLabels(categoria);
    return (
      categoryLabels.length > 0 &&
      categoryLabels.every((label) => selectedLabels.includes(label))
    );
  };

  // Verificar si una categoría está parcialmente seleccionada
  const isCategoryPartiallySelected = (categoria) => {
    const categoryLabels = getCategoryLabels(categoria);
    return categoryLabels.some((label) => selectedLabels.includes(label));
  };

  // Manejar selección/deselección de categoría
  const handleCategoryChange = (categoria, isChecked) => {
    const categoryLabels = getCategoryLabels(categoria);

    if (isChecked) {
      // Seleccionar todos los labels de la categoría
      const newSelectedLabels = [
        ...new Set([...selectedLabels, ...categoryLabels]),
      ];
      setSelectedLabels(newSelectedLabels);
    } else {
      // Deseleccionar todos los labels de la categoría
      const newSelectedLabels = selectedLabels.filter(
        (label) => !categoryLabels.includes(label)
      );
      setSelectedLabels(newSelectedLabels);
    }
  };

  // Manejar selección/deselección de label individual
  const handleLabelChange = (labelKey, isChecked) => {
    let newSelectedLabels;

    if (isChecked) {
      newSelectedLabels = [...selectedLabels, labelKey];
    } else {
      newSelectedLabels = selectedLabels.filter((label) => label !== labelKey);
    }

    setSelectedLabels(newSelectedLabels);
  };

  useEffect(() => {
    // Limpiar labels seleccionados al cambiar de año
    setSelectedLabels([]);
  }, [selectedYear, setSelectedLabels]);

  return (
    <Box
      w="400px"
      h="100vh"
      p={4}
      borderRight="1px"
      borderColor="gray.200"
      overflowY="auto"
    >
      <VStack align="stretch" spacing={4}>
        {/* Título */}
        <Text fontSize="xl" fontWeight="bold" color="white">
          FILTROS
        </Text>

        <Divider />

        {/* Acordeón */}
        <Accordion allowMultiple defaultIndex={[0, 1]}>
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
                <Stack spacing={3}>
                  {/* Opción General */}
                  <Radio value="general" colorScheme="blue">
                    <Flex justify="space-between" align="center" w="full">
                      <Text>GENERAL</Text>
                      <Badge colorScheme="blue" ml={2}>
                        {topUserLabelSummary.total_records.toLocaleString()}
                      </Badge>
                    </Flex>
                  </Radio>

                  {/* Años específicos */}
                  {availableYears.map((year) => (
                    <Radio key={year} value={year} colorScheme="blue">
                      <Flex justify="space-between" align="center" w="full">
                        <Text>{year}</Text>
                        <Badge colorScheme="gray" ml={2}>
                          {topUserLabelSummary.records_per_year[
                            year
                          ].toLocaleString()}
                        </Badge>
                      </Flex>
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
            </AccordionPanel>
          </AccordionItem>

          {/* Filtro por Etiquetas */}
          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left" fontWeight="semibold">
                POR ETIQUETAS
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Accordion allowMultiple>
                {getLabelsDataByYear().map((categoryData) => (
                  <AccordionItem key={categoryData.categoria}>
                    <AccordionButton>
                      <Flex flex="1" align="center" justify="space-between">
                        <Flex align="center">
                          <Checkbox
                            colorScheme="green"
                            isChecked={isCategoryFullySelected(
                              categoryData.categoria
                            )}
                            isIndeterminate={
                              !isCategoryFullySelected(
                                categoryData.categoria
                              ) &&
                              isCategoryPartiallySelected(
                                categoryData.categoria
                              )
                            }
                            onChange={(e) =>
                              handleCategoryChange(
                                categoryData.categoria,
                                e.target.checked
                              )
                            }
                            mr={2}
                            onClick={(e) => e.stopPropagation()}
                          />
                          <Text fontWeight="medium">
                            {labelsGeneral[categoryData.categoria]}
                          </Text>
                        </Flex>
                        <Flex align="center">
                          <Badge colorScheme="green" mr={2}>
                            {getCategoryTotal(
                              categoryData.categoria
                            ).toLocaleString()}
                          </Badge>
                          <AccordionIcon />
                        </Flex>
                      </Flex>
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                      <Stack spacing={2} ml={4}>
                        {Object.entries(categoryData.labels).map(
                          ([labelKey, labelData]) => (
                            <Checkbox
                              key={labelKey}
                              isChecked={selectedLabels.includes(labelKey)}
                              onChange={(e) =>
                                handleLabelChange(labelKey, e.target.checked)
                              }
                              colorScheme="blue"
                              size="sm"
                            >
                              <Flex
                                justify="space-between"
                                align="center"
                                w="full"
                              >
                                <Text fontSize="md" color="gray.200">
                                  {columnasLabel[labelKey] || labelKey}
                                </Text>
                                <Badge colorScheme="blue" ml={2} fontSize="xs">
                                  {labelData.count.toLocaleString()}
                                </Badge>
                              </Flex>
                            </Checkbox>
                          )
                        )}
                      </Stack>
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>

        {/* Información de filtros aplicados */}
        {(selectedYear !== "general" || selectedLabels.length > 0) && (
          <Box mt={4} p={3} bg="blue.50" borderRadius="md">
            <Text fontSize="sm" fontWeight="semibold" color="blue.700" mb={2}>
              Filtros aplicados:
            </Text>
            {selectedYear !== "general" && (
              <Text fontSize="xs" color="blue.600">
                • Año: {selectedYear}
              </Text>
            )}
            {selectedLabels.length > 0 && (
              <Text fontSize="xs" color="blue.600">
                • Etiquetas: {selectedLabels.length}
              </Text>
            )}
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default FilterSidebar;
