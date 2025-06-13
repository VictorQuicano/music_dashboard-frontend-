import { Tooltip } from "@chakra-ui/react";

const PREFIX_DATA = [
  {
    prefix: "GENERIC",
    code: "ALL_CAPS",
    description:
      "Etiquetas <strong>originales del usuario</strong> desde la app móvil.",
  },
  {
    prefix: "OR",
    code: "OR_",
    description:
      "Etiquetas <strong>sintetizadas</strong>, combinación lógica (ej. <code>OR_SITTING_OR_LYING</code>).",
  },
  {
    prefix: "LOC",
    code: "LOC_",
    description:
      "Etiquetas inferidas <strong>según la ubicación GPS</strong> (ej. <code>LOC_home</code>, <code>LOC_beach</code>).",
  },
  {
    prefix: "FIX",
    code: "FIX_",
    description:
      "Etiquetas <strong>corregidas por investigadores</strong> por errores del usuario.",
  },
];

export const PrefixedLegend = () => {
  return (
    <div className="flex flex-wrap gap-2">
      {PREFIX_DATA.map((item) => (
        <Tooltip
          key={item.prefix}
          label={
            <div className="p-2">
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="font-mono px-2">{item.code}</td>
                    <td
                      className="px-2"
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                  </tr>
                </tbody>
              </table>
            </div>
          }
          bg="white"
          color="gray.800"
          borderRadius="md"
          boxShadow="xl"
          placement="top"
          hasArrow
        >
          <div className="px-4 py-1 font-semibold bg-cyan-600 hover:bg-cyan-500  border-2 text-center cursor-help rounded-2xl min-w-[100px] mb-2 text-sm">
            {item.prefix}
          </div>
        </Tooltip>
      ))}
    </div>
  );
};
