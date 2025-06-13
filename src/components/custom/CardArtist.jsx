import React, { useEffect, useState } from "react";
import { Card, Stack, Text, Image } from "@chakra-ui/react";

const DEFAULT_IMAGE =
  "https://i0.wp.com/blog.cuidamimascota.com/wp-content/uploads/2020/01/21c26-screen-shot-2018-04-16-at-4.42.32-pm.png?resize=688%2C540&ssl=1";

async function fetchArtistImage(artistName) {
  // Buscar el artista por nombre
  const searchResponse = await fetch(
    `https://es.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(
      artistName
    )}&prop=pageimages&format=json&pithumbsize=300`
  );
  const searchData = await searchResponse.json();
  const artist = searchData.query?.pages?.[0]?.thumbnail.source;

  if (artist) {
    return artist;
  } else {
    return DEFAULT_IMAGE;
  }
}

export default function CardArtist({ data, isSmall = false }) {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (data?.artista_top) {
      fetchArtistImage(data.artista_top).then(setImageUrl);
    }
  }, [data?.artista_top]);

  const imgHeight = isSmall ? 100 : 200;

  if (!data || !data.idioma) return null;

  return (
    <Card
      maxW={isSmall ? "xs" : "sm"}
      overflow="hidden"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="md"
    >
      <Image
        src={imageUrl || "https://via.placeholder.com/400x300?text=Artista+Top"}
        alt={`Imagen de ${data.artista_top}`}
        objectFit="cover"
        w="100%"
        h={imgHeight}
      />
      <Stack p={isSmall ? 2 : 4} spacing={isSmall ? 1 : 2}>
        <Text fontSize={isSmall ? "sm" : "lg"} fontWeight="bold">
          {data.artista_top}
        </Text>
        {isSmall ? (
          <Text fontSize="xs" color="gray.500">
            {data.año}
          </Text>
        ) : (
          <Text fontSize="md" color="gray.600">
            Idioma: {data.idioma.toUpperCase()}
          </Text>
        )}
        <Text fontSize={isSmall ? "xs" : "md"}>
          Registros: <b>{data.n_registros.toLocaleString()}</b>
        </Text>
        <Text fontSize={isSmall ? "xs" : "md"}>
          Canciones Top: <b>{data.canciones_artista_top}</b>
        </Text>
        <Text fontSize={isSmall ? "xs" : "md"}>
          Popularidad Promedio: <b>{data.promedios.popularity.toFixed(1)}</b>
        </Text>
      </Stack>
    </Card>
  );
}
