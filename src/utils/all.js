/** */
export const getFormattedDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("ru-RU", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";
