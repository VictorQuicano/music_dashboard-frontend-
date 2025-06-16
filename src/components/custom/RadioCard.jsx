import { Box, useColorModeValue } from "@chakra-ui/react";

export default function RadioCard({ isSelected, children, ...props }) {
  const bg = useColorModeValue(
    isSelected ? "blue.100" : "gray.100",
    isSelected ? "blue.700" : "gray.700"
  );
  const borderColor = isSelected ? "blue.500" : "transparent";

  return (
    <Box
      as="button"
      py={2}
      px={1}
      borderWidth="1px"
      borderRadius="md"
      borderColor={borderColor}
      bg={bg}
      cursor="pointer"
      maxW="fit-content"
      flex="1 1 200px"
      textAlign="left"
      transition="all 0.2s"
      _hover={{ boxShadow: "md" }}
      {...props}
    >
      {children}
    </Box>
  );
}
