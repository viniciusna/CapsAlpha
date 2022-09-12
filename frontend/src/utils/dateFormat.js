function dateFormat(date) {
  const format = new Date(date).toLocaleDateString("pt-br", {
    // weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return format;
}

export default dateFormat;
