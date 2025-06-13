import React, { useState } from "react";
import ArtistList from "@/constants/artists";

const ArtistSearch = ({ selectedArtist, setSelectedArtist }) => {
  const [searchTerm, setSearchTerm] = useState(selectedArtist || "");
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    //setSelectedArtist(""); // Actualizar el artista seleccionado

    if (term === "") {
      setResults([]);
      return;
    }

    const filteredArtists = ArtistList.filter((name) =>
      name.toLowerCase().includes(term)
    ).slice(0, 8); // Mostrar solo 8 resultados

    setResults(filteredArtists);
  };

  return (
    <div
      style={{ padding: "20px", minWidth: "800px", margin: "0 auto" }}
      className="relative"
    >
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-5 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          id="default-search"
          className="block w-full !ps-12 h-[50px] text-lg border rounded-full bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
          type="text"
          placeholder="Escribe el nombre del artista..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* Mostrar resultados */}
      <div
        style={{ marginTop: "20px" }}
        className="absolute w-full backdrop-blur-sm z-10"
      >
        {results.length > 0 ? (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {results.map((name, index) => (
              <li
                key={index}
                style={{
                  margin: "10px 0",
                  display: "flex",
                  alignItems: "center",
                }}
                className={`cursor-pointer hover:bg-gray-400 hover:text-white transition-colors duration-200 rounded-lg p-2 ${
                  selectedArtist === name && "bg-gray-400 text-white"
                }`}
                onClick={() => {
                  setSelectedArtist(name);
                  setSearchTerm(name); // Actualiza el input con el nombre seleccionado
                  setResults([]);
                }}
              >
                <img
                  src="https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png"
                  alt={name}
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    marginRight: "10px",
                  }}
                  onError={(e) => {
                    e.target.src =
                      "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png";
                  }}
                />
                <span>{name}</span>
              </li>
            ))}
          </ul>
        ) : (
          searchTerm &&
          results.length === 0 &&
          selectedArtist === "" && <p>No se encontraron artistas.</p>
        )}
      </div>
    </div>
  );
};

export default ArtistSearch;
