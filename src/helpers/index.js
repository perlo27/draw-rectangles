export const getRectangles = () => {
  const savedRectangles = localStorage.getItem('rectangles');
  let rectangles;
  try {
    rectangles = JSON.parse(savedRectangles);
  } catch (e) {
    console.log('invalid json ', e);
  }
  return rectangles || [];
};
export const saveRectangles = rectangles => {
  localStorage.setItem('rectangles', JSON.stringify(rectangles));
};
export const clearStorage = () => {
  localStorage.removeItem('rectangles');
};
export const getWidthsSum = rectArray => rectArray.reduce((acc,rect) => acc + rect.width, 0);
export const getRemainingWidth = (maxWidth, rectangles) => maxWidth - getWidthsSum(rectangles);
export const getAllowedWidth = (maxWidth, value) => Math.min(maxWidth, value);