import moment from "moment";

export const useTimeAgo = (dateString) => {
  const date = moment(dateString);
  const now = moment();

  // Today
  if (date.isSame(now, "day")) {
    return `Today at ${date.format("hh:mm a")}`; // 12h format + am/pm
  }

  // Yesterday
  if (date.isSame(now.clone().subtract(1, "days"), "day")) {
    return `Yesterday at ${date.format("hh:mm a")}`;
  }

  // Older dates: include time in 12h format
  return date.format("DD/MM/YYYY hh:mm a");
};
