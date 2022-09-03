let weirdMultiply = (num) => {
  var strNum = num.toString();

  if (strNum.length === 1) return Number(strNum);

  var hasil = 1;

  for (var i = 0; i < strNum.length; i++)
    hasil *= Number(strNum[i]);

  return weirdMultiply(hasil);
}

console.log(weirdMultiply(39));
console.log(weirdMultiply(999));
console.log(weirdMultiply(3));