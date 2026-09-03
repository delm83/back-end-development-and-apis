const getUpperCase = (str) => {
  return str.toUpperCase();
}

const getLowerCase = (str) => {
  return str.toLowerCase();
}

const getSentenceCase = (str) => {
  const lowerCaseStr = str.toLowerCase();
  return lowerCaseStr.charAt(0).toUpperCase() + lowerCaseStr.slice(1);
}

const getProperCase = (str) => {
  const lowerCaseStr = str.toLowerCase();
  const words = lowerCaseStr.split(' ');
  const properCaseWords = words.map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  return properCaseWords.join(' ');
}

module.exports = {
  getUpperCase,
  getLowerCase,
  getSentenceCase,
  getProperCase
};