export const formatDate = (date) => {
  if (!date) return "—";

  const formattedDate = new Date(date);

  if (Number.isNaN(formattedDate.getTime())) {
    return "—";
  }

  return formattedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const formatDateTime = (date) => {
  if (!date) return "—";

  const formattedDate = new Date(date);

  if (Number.isNaN(formattedDate.getTime())) {
    return "—";
  }

  return formattedDate.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};