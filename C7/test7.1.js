function weirdMultiply(sentence) {
    if (sentence === 0 || sentence === 1 || sentence === 2 || sentence === 3 || sentence === 5 || sentence === 6 || sentence === 7 || sentence === 9) {
      return sentence;
    } else {
        let toStr = sentence.toString();
        let splitter = toStr.split('')

        const newAngka = splitter.reduce((acc, curVal) =>
        acc * curVal)
        return newAngka;
    }
    
};
  console.log(weirdMultiply(39));
  console.log(weirdMultiply(999));
  console.log(weirdMultiply(3));