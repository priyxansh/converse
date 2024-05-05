import {
  differenceInHours,
  differenceInYears,
  formatDate,
  formatDistanceToNowStrict,
} from "date-fns";

/**
 * Formats a given date into a human-readable string.
 * If the date is within the last 24 hours, it returns a relative time string.
 * If the date is within the current year, it returns a formatted date string with month and day.
 * Otherwise, it returns a formatted date string with month, day, and year.
 * @param date - The date to be formatted.
 * @returns The formatted date string.
 */
export const getFormattedDate = (date: Date) => {
  if (differenceInHours(new Date(), date) < 24) {
    return formatDistanceToNowStrict(date, { addSuffix: true });
  }

  if (differenceInYears(new Date(), date) === 0) {
    return formatDate(date, "MMM d");
  }

  return formatDate(date, "MMM d, yyyy");
};
