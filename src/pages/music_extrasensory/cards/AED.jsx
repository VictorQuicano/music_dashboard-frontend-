//Esta es una mausqe herramienta que será útil más adelante
<div className="grid grid-cols-3 gap-4">
  <div className="w-full flex flex-col bg-[#282b33] rounded-2xl p-4">
    <h4>
      Número de registros de usuarios:{" "}
      {selectedYear === "general" ? "GENERAL" : `AÑO ${selectedYear}`}
    </h4>

    <HorizontalBarChart data={fish_2} />
  </div>
  <div className="w-full flex flex-col bg-[#282b33] rounded-2xl p-4 col-span-2 max-h-[500px]">
    <PrefixedLegend />
    <Treemap dataRaw={labelsPeriod} />
  </div>
  <div className="w-full flex flex-col bg-[#282b33] rounded-2xl p-4 col-span-2 max-h-[500px]">
    <PrefixedLegend />
    <Treemap dataRaw={labelsPeriod} />
  </div>
</div>;
