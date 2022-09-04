function romawi(n) {
    //Membuat sebuah variable yang berupa object dan akan menampung bilangan/angka romawi
    var roma = {
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
      };

    let str = '';
    //Object.keys itu berfungsi untuk mengembalikan dari nama properti 
    for (let i of Object.keys(roma)) { // Perulangan untuk mengembalikan nama properti yang terdapat didalam object

        let q = Math.floor(n / roma[i]); // Membuat variable q yang nantinya dengan menggunakan Math.floor akan membulatkan value atau nilai dari hasil parameter atau n dibagi dengan variable roma yang meng-index ke i

        n -= q * roma[i]; // Membuat variable n yang nantinya akan melakukan pengurangan terhadap q yang dikalikan dengan value properti dari variable roma yang meng-index ke i
        // Variable n disini memiliki value default yaitu sesuai dengan yang di masukkan ke parameter
        // Contoh parameter n memiliki value 4, Jadi n = 4 - (4 / roma[i]) * roma[i]. roma[i] disini nantinya akan melakukan looping sampai muncul nilai yang terdapat di variable roma, kemudian di terjemahkan menjadi angka romawi

        str = str + i.repeat(q); // str disini akan ter-eksekusi terus menerus atau akan mengulangi proses dari variable q sampai mendapatkan hasil yang sesuai dengan nilai yang diinputkan ke parameter n
    }
    return str; // Mengembalikan nilai str
}

console.log("Script Testing untuk Konversi Romawi\n");
console.log("input    |   expected  |   result");
console.log("---------|-------------|---------");
console.log("4        | IV          | ", romawi(4));
console.log("9        | IX          | ", romawi(9));
console.log("13       | XIII        | ", romawi(13));
console.log("1453     | MCDLIII     | ", romawi(1453));
console.log("1646     | MDCXLVI     | ", romawi(1646));