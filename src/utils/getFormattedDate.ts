import {
  differenceInHours,
  differenceInYears,
  formatDate,
  formatDistanceToNowStrict,
} from "date-fns";

type GetFormattedDateOptions = {
  addSuffix?: boolean;
  type?: "relative" | "absolute";
};

/**
 * Formats a given date into a human-readable string.
 * If the date is within the last 24 hours, it returns a relative time string.
 * If the date is within the current year, it returns a formatted date string with month and day.
 * Otherwise, it returns a formatted date string with month, day, and year.
 * @param date - The date to be formatted.
 * @returns The formatted date string.
 */
export const getFormattedDate = (
  date: Date,
  { type = "relative", addSuffix = true }: GetFormattedDateOptions = {
    addSuffix: true,
    type: "relative",
  },
) => {
  if (differenceInHours(new Date(), date) < 24) {
    if (type === "relative") {
      return formatDistanceToNowStrict(date, { addSuffix: addSuffix });
    }

    return formatDate(date, "h:mm a");
  }

  if (differenceInYears(new Date(), date) === 0) {
    return formatDate(date, "MMM d");
  }

  return formatDate(date, "MMM d, yyyy");
};
