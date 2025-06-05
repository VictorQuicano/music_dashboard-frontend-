import LanguageLabels from "@/constants/Languages";

export default function BulletsLanguages({
  languages,
  totalSongs,
  selectedLanguage,
  onSelectLanguage,
}) {
  return (
    <div className="max-w-full overflow-x-auto px-4 py-2">
      <div className="flex space-x-4 w-max">
        {/* Botón "General" */}
        <div
          onClick={() => onSelectLanguage("general")}
          className={`rounded-full px-4 py-2 inline-flex items-center gap-4 transition-colors hover:shadow-lg hover:cursor-pointer shrink-0 ${
            selectedLanguage === "general"
              ? "bg-white text-cyan-700"
              : "bg-cyan-700 text-white hover:bg-cyan-800"
          }`}
        >
          <p>
            {LanguageLabels["general"]?.emoji}{" "}
            {LanguageLabels["general"]?.label || "General"}
          </p>
          <span className="text-xs font-bold">{totalSongs}</span>
        </div>

        {/* Bullets por idioma */}
        {languages.map(({ idioma, n_registros }) => (
          <div
            key={idioma}
            onClick={() => onSelectLanguage(idioma)}
            className={`rounded-full px-4 py-2 inline-flex items-center gap-4 transition-colors hover:shadow-lg hover:cursor-pointer shrink-0 ${
              selectedLanguage === idioma
                ? "bg-white text-cyan-700"
                : "bg-cyan-700 text-white hover:bg-cyan-800"
            }`}
          >
            <p>
              {LanguageLabels[idioma]?.emoji}{" "}
              {LanguageLabels[idioma]?.label || idioma}
            </p>
            <span className="text-xs font-bold">{n_registros}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
