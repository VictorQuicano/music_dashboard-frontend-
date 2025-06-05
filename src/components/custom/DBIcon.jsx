import React from "react"; // Importación necesaria añadida
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
} from "@chakra-ui/react";

import { motion } from "framer-motion";
import databaseImage from "@/assets/database.png";
import { Link } from "react-router-dom";

const MotionDiv = motion.div;

export default function DBIcon({
  children,
  data = {
    title: "",
    records: "",
    domain: "",
    reference: "",
  },
  to = "#",
}) {
  return (
    <Popover placement="top" trigger="hover">
      <PopoverTrigger>
        <div>
          <Link to={to} style={{ display: "inline-block" }}>
            <MotionDiv className="relative flex justify-center items-center cursor-pointer">
              <img
                src={databaseImage}
                width={180}
                alt="Database icon"
                className="opacity-50"
              />
              <div className="absolute z-10 ">{children}</div>
            </MotionDiv>
          </Link>
        </div>
      </PopoverTrigger>
      <PopoverContent bg="gray.700" color="white" borderRadius="md">
        <PopoverArrow />
        <PopoverBody className="p-2">
          <h3 className="!font-bold !text-xl !text-center ">{data.title}</h3>
          <p className="text-sm text-gray-400 !mb-4 !text-center">
            Has click en la imagen para explorar
          </p>
          <p>
            <strong>Registros:</strong> {data.records}
          </p>
          <p>
            <strong>Dominio:</strong> {data.domain}
          </p>
          {data.reference && (
            <p className="text-center">
              <a
                href={data.reference}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                <strong>[Referencia]</strong>
              </a>
            </p>
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
