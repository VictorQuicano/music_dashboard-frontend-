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
              <img src={databaseImage} width={60} alt="Database icon" />
              <div className="absolute z-10">{children}</div>
            </MotionDiv>
          </Link>
        </div>
      </PopoverTrigger>
      <PopoverContent bg="gray.700" color="white" borderRadius="md">
        <PopoverArrow />
        <PopoverBody className="p-2">
          <h3 className="font-bold text-lg">{data.title}</h3>
          <p>
            <strong>Registros:</strong> {data.records}
          </p>
          <p>
            <strong>Dominio:</strong> {data.domain}
          </p>
          {data.reference && (
            <p>
              <a
                href={data.reference}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                <strong>Referencia</strong>
              </a>
            </p>
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
  /*
    <Tooltip
      hasArrow
      placement="top"
      label={
        <div className="p-2">
          <h3 className="font-bold text-lg">{data.title}</h3>
          <p>
            <strong>Registros:</strong> {data.records}
          </p>
          <p>
            <strong>Dominio:</strong> {data.domain}
          </p>
          {data.reference && (
            <p>
              <a
                href={data.reference}
                target="_blank"
                rel="noopener noreferrer"
              >
                <strong>Referencia</strong>
              </a>
            </p>
          )}
        </div>
      }
      bg="gray.700"
      color="white"
      borderRadius="md"
    >
      <div>
        <Link to={to} style={{ display: "inline-block" }}>
          <MotionDiv
            className="relative flex justify-center items-center cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <img src={databaseImage} width={60} alt="Database icon" />
            <div className="absolute z-10">
              <MotionDiv
                whileHover={{
                  rotate: [0, -5, 5, -5, 5, 0],
                  transition: { duration: 0.6 },
                }}
              >
                {children}
              </MotionDiv>
            </div>
          </MotionDiv>
        </Link>
      </div>
    </Tooltip>
      */
}
