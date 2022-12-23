function findAll(iterable, attributeName, attributeValue) {

  return iterable.filter(obj => {
    return obj.getAttribute(attributeName) === attributeValue;
  });
}

export default findAll;
