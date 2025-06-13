export function msToHumanReadable(ms) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} día${days !== 1 ? "s" : ""}, ${hours % 24} hora${
      hours % 24 !== 1 ? "s" : ""
    }`;
  } else if (hours > 0) {
    return `${hours} hora${hours !== 1 ? "s" : ""}, ${minutes % 60} minuto${
      minutes % 60 !== 1 ? "s" : ""
    }`;
  } else if (minutes > 0) {
    return `${minutes} minuto${minutes !== 1 ? "s" : ""}, ${
      seconds % 60
    } segundo${seconds % 60 !== 1 ? "s" : ""}`;
  } else {
    return `${seconds} segundo${seconds !== 1 ? "s" : ""}`;
  }
}
