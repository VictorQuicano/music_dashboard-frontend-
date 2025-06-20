// TODO: improve types here
// Note to self: Perhaps I should use the tidy.js library?
// https://pbeshai.github.io/tidy/docs/api/pivot/

export const pivotWider = (data) => {
  const result = [];

  data.forEach((item) => {
    const existingEntry = result.find((entry) => entry.date === item.date);

    if (existingEntry) {
      existingEntry[item.group] = item.value;
    } else {
      const newEntry = { date: item.date };
      newEntry[item.group] = item.value;
      result.push(newEntry);
    }
  });

  return result;
};

import { csvParse } from "d3";

// Agrupa por día (YYYY-MM-DD) y suma todas las columnas por grupo
export const aggregateByDay = (data) => {
  const result = {};

  data.forEach((row) => {
    const date = new Date(row.date);
    const dayKey = date.toISOString().split("T")[0]; // YYYY-MM-DD

    if (!result[dayKey]) {
      result[dayKey] = { date: dayKey };
      Object.keys(row).forEach((k) => {
        if (k !== "date") {
          result[dayKey][k] = parseFloat(row[k]) || 0;
        }
      });
    } else {
      Object.keys(row).forEach((k) => {
        if (k !== "date") {
          result[dayKey][k] += parseFloat(row[k]) || 0;
        }
      });
    }
  });

  return Object.values(result);
};
