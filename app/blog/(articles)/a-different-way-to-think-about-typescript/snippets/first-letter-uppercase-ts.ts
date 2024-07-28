const isSingleWord = (t: string) => {
  return t.split(" ").length === 0;
};

const seperateFirstWord = (t: string) => {
  const [firstWord, ...restWords] = t.split(" ");
  return [firstWord, restWords.join(" ")];
};
const uppercase = (char: string) => {
  return char.toUpperCase();
};
const firstLetterUppercase = (t: string): string => {
  if (t.length === 0) {
    // base case
    return "";
  }
  const [firstWord, restWords] = seperateFirstWord(t);
  return `${uppercase(firstWord[0])}${firstWord.slice(
    1
  )} ${firstLetterUppercase(restWords)}`; // recurssive call
};