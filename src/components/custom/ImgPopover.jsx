import React from "react"; // Importación necesaria añadida
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
} from "@chakra-ui/react";
import KidGif from "@/assets/Kid-2_v4.webp";
import { Link } from "react-router-dom";

export default function ImgPopover() {
  return (
    <Popover placement="right" trigger="hover">
      <PopoverTrigger>
        <div className="inline-block">
          <Link to="/streamed" className="cursor-pointer">
            <img src={KidGif} width={900} />
          </Link>
        </div>
      </PopoverTrigger>
      <PopoverContent
        bg="gray.700"
        color="white"
        borderRadius="md"
        _focus={{ boxShadow: "none" }}
      >
        <PopoverArrow />
        <PopoverBody className="p-2">
          <h3 className="!font-bold !text-xl !text-center">
            Visualización Historial Reproducción
          </h3>
          <p className="text-sm text-gray-400 !mb-4 !text-center">
            Has click en la imagen para explorar
          </p>
          <p>
            <strong>Registros:</strong> Registros de Escucha Contextualizados
          </p>
          <p>
            <strong>Dominio:</strong> Música/Actividades
          </p>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
