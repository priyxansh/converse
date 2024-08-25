/**
 * Calculates the scroll percentage of an HTML element.
 *
 * @param element - The HTML element to calculate the scroll percentage for.
 * @returns The scroll percentage as a number between 0 and 100.
 */
export const getScrollPercentage = (element: HTMLElement) => {
  if (!element) return 0;
  const { scrollTop, scrollHeight, clientHeight } = element;
  return (scrollTop / (scrollHeight - clientHeight)) * 100;
};
