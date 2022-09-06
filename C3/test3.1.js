function romawi(n) {
    const roma = { // Membuat objek untuk menampung properti dan value dari angka romawi
        M: 1000,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1
    }    
    let hasil = ''; // Membuat variable penampung dengan value string kosong

    for (const roman in roma) { // Membuat perulangan dengan variable roman yang mengambil value dari roma
        while (roma[roman] <= n) { // Membuat kondisi, ketika roma yang ada didalam variable roman kurang dari parameter n
            n -= roma[roman] // Akan meng-eksekusi parameter n yang isi nya parameter n -  roma yang ada didalam variable roman
            hasil += roman // Memasukkan value dari peng-kondisi-an roman kedalam variable hasil
        }
    }
    return hasil; // Mengembalikan value dari variable hasil
}

console.log("Script Testing untuk Konversi Romawi\n");
console.log("input    |   expected  |   result");
console.log("---------|-------------|---------");
console.log("4        | IV          | ", romawi(4));
console.log("9        | IX          | ", romawi(9));
console.log("13       | XIII        | ", romawi(13));
console.log("1453     | MCDLIII     | ", romawi(1453));
console.log("1646     | MDCXLVI     | ", romawi(1646));