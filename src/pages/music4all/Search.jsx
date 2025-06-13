import { Music4All as Layout } from "@/components/layouts/Music4All";
import ArtistSearch from "@/pages/music4all/tabs/ArtistSearch";
import React, { useState } from "react";
import ArtistView from "./tabs/ArtistView";

export function Search() {
  const [selectedArtist, setSelectedArtist] = useState("");

  return (
    <Layout
      title="Buscar por Artista"
      back={{ to: "/", label: "Volver al inicio" }}
    >
      <ArtistSearch
        selectedArtist={selectedArtist}
        setSelectedArtist={setSelectedArtist}
      />
      <ArtistView name={selectedArtist} />
    </Layout>
  );
}
