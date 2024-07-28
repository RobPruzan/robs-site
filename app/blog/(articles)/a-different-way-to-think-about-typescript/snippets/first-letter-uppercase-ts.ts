const separateFirstWord = (t: string) => {
  const [firstWord, ...restWords] = t.split(" ");
  return [firstWord, restWords.join(" ")];
};
const firstLetterUppercase = (t: string): string => {
  if (t.length === 0) {
    // base case
    return "";
  }
  const [firstWord, restWords] = separateFirstWord(t);
  return `${firstWord[0].toUpperCase()}${firstWord.slice(1)} ${firstLetterUppercase(restWords)}`; // recursive call
};