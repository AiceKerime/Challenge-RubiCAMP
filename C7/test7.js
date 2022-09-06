let weirdMultiply = (num) => {
  var strNum = num.toString(); //Membuat variable untuk mengubah value dari parameter num menjadi type data string

  if (strNum.length === 1) return Number(strNum); // Membuat kondisi yang mana jika panjang value itu 1 digit makan akan mengembalikan value nya menjadi type data Number

  var hasil = 1; // Membuat variable untuk menyimpan nilai awal

  for (var i = 0; i < strNum.length; i++) // Membuat perulangan yang mana distatement pertama terdapat variable i yang value nya 0, kemudian i tersebut akan dicari apakah panjang value dari variable strNum lebih pendek dari i, dan akan bertambah satu setiap perulangannya
    hasil *= Number(strNum[i]); // Membuat variable bernama hasil yang valuenya 1, yang kemudian akan dikalikan dengan hasil dari perulangan strNum yang meng-index ke i dan akan langsung di ubah ke type data Number

  return weirdMultiply(hasil); // Mengembalikan func weirdMultiply dengan value parameter num yang sebelumnya telah melakukan peng-kondisi-an dan juga perulangan
}

console.log(weirdMultiply(39));
console.log(weirdMultiply(999));
console.log(weirdMultiply(3));