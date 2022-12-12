function getElement(iterable, elementId) {

  let result = null;

  for (let element of iterable) {
    if (element.id == elementId) {
      result = element;
      break;
    }
  }

  return result;
}

export default getElement;
