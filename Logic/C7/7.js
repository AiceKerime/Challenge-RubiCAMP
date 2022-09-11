function weirdMultiply(number) {
    const numberString = number.toString() // Mengubah dulu isi dari parameter number menjadi string yang kemudian ditampung oleh variable
    if (numberString.length == 1) // Kondisi yang mana jika panjang dari value parameter number itu = 1,
        return number // Maka akan mengembalikan value dari number tersebut
    let total = numberString[0] // Variable untuk mengambil string atau index pertama contohnya 3.
    for (let i = 1; i < numberString.length; i++) // Perulangan yang dimulai dari 1, yang jika panjangnya lebih kecil dari parameter number, maka akan bertambah 1 di perulangan berikutnya, contoh: 9. 
        total *= numberString[i] // Jika hasil dari perulangan telah terpenuhi, yaitu kurang dari panjang parameter number, maka value pertama akan dikalikan value berikutnya hingga tersisa satu value, contoh: 3 * 9 = 27 => 2 * 7 = 14 => 1 * 4 = 4.
    return weirdMultiply(total) // Yang kemudian akan dikembalikan kedalam function dan diprint.
}
console.log(weirdMultiply(39)) // 3 * 9 = 27 => 2 * 7 = 14 => 1 * 4 = 4. Value akhirnya 4
console.log(weirdMultiply(999))// 9 * 9 * 9 = 729 => 7 * 2 * 9 = 126 => 1 * 2 * 6 = 12 => 1 * 2 = 2. Value akhirnya 2
console.log(weirdMultiply(3))  // 3 Value akhirnya 3 karena kondisi diawal telah terpenuhi, yaitu value akhirnya tersisa 1 string/number/angka