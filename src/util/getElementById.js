function getElementById(objList, objId) {

  let result = null;

  for (let obj of objList) {
    if (obj.id == objId) {
      result = obj;
      break;
    }
  }

  return result;
}

export default getElementById;
