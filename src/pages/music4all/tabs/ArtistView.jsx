import React, { useState, useEffect } from "react";
import { Skeleton, SkeletonText } from "@chakra-ui/react";
import { Box, Heading, Text } from "@chakra-ui/react";
import api from "@/api/axios";
import Radar from "@/components/custom/Spider";
import AlbumBubbleChart from "@/components/custom/TooltipAlbum";
import { area } from "framer-motion/client";

const ArtistAlbumsView = ({ artistData }) => {
  return (
    <Box p={4}>
      <Heading size="lg" mb={4}>
        Álbumes
      </Heading>
      {artistData?.albums ? (
        <AlbumBubbleChart data={artistData.albums} />
      ) : (
        <Text>No hay datos de álbumes disponibles</Text>
      )}
    </Box>
  );
};

export default function ArtistView({ name }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(true);
  const [artistData, setArtistData] = useState(null);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchArtist = async () => {
      if (name && name.trim() !== "") {
        setIsEmpty(false);
        setIsLoading(true);
        try {
          const response = await api.get(`/artist/${name}`);
          setArtistData(response.data);
          setAlbums(response.albums);
        } catch (error) {
          console.error("Error fetching artist data:", error);
          setArtistData(null);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsEmpty(true);
        setIsLoading(false);
      }
    };

    fetchArtist();
  }, [name]);

  // Datos seguros para el Radar
  const radarData = artistData?.stats
    ? {
        "⚡️": artistData.stats.avg_energy ?? 0.0,
        "🎭": artistData.stats.avg_valence ?? 0.0,
        "💃🏻": artistData.stats.avg_danceability ?? 0.0,
      }
    : null;

  const labels_help = ["💃🏻Danzabilidad", "⚡️Energía", "🎭Valance"];
  if (isEmpty) {
    return (
      <div className="w-full flex flex-col justify-center items-center py-30">
        <img
          src="https://images.squarespace-cdn.com/content/v1/5d6a8208f8d59d00010283c0/11165819-437d-4ecc-bef9-0587c55055ce/Kitty_Typing_REVISED.gif"
          width={400}
          alt="Placeholder"
        />
        <h2 className="!text-2xl uppercase !font-semibold !text-center !mt-10 text-gray-600">
          Conoces las estadisticas de tu X artista
        </h2>
      </div>
    );
  }

  return (
    <div className="w-full flex gap-4 items-start flex-1 relative">
      <div className="col-span-3 bg-gray-900 backdrop-blur-lg p-4 rounded-3xl h-full w-[70%]">
        <Skeleton isLoaded={!isLoading} rounded="xl">
          <ArtistAlbumsView artistData={artistData} />
        </Skeleton>
      </div>

      {/* Columna derecha */}
      <div className="w-[30%] h-full sticky top-5">
        <Skeleton isLoaded={!isLoading} rounded="xl">
          <div className="relative w-full h-full">
            <div className="flex flex-col gap-4 w-full justify-center items-center sticky top-0">
              {artistData?.image_url && (
                <img
                  src={artistData.image_url}
                  alt={artistData.artist_name || "Artista"}
                  className="w-[250px] !h-[250px] object-cover rounded-full"
                />
              )}

              <h2 className="!text-5xl uppercase !font-bold !mb-4 text-center text-gray-300">
                {artistData?.artist_name || "Artista desconocido"}
              </h2>

              <div className="rounded-3xl p-4 bg-gray-800 h-fit flex flex-col gap-4 w-full">
                <ul className="text-gray-400">
                  <li>
                    <p>
                      * # de canciones:{" "}
                      <strong>{artistData?.stats?.total_songs ?? "N/A"}</strong>
                    </p>
                  </li>
                  <li>
                    <p>
                      * # de Albumes:{" "}
                      <strong>{artistData?.albums?.length ?? "N/A"}</strong>
                    </p>
                  </li>
                </ul>
                <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2">
                  {labels_help.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="rounded-full border border-gray-600 text-center py-2 px-4 m-1 bg-gray-600"
                      >
                        {item}
                      </div>
                    );
                  })}
                </div>
                {radarData && <Radar data={radarData} />}
              </div>
            </div>
          </div>
        </Skeleton>
      </div>
    </div>
  );
}
