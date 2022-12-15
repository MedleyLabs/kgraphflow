function getElementById(elements, elementId) {

  let result = null;

  for (let element of elements) {
    if (element.id == elementId) {
      result = element;
      break;
    }
  }

  return result;
}

export default getElementById;
