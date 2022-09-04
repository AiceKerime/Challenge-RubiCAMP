function deretKaskus(n) {
    let arr = [] // Variable atau wadah untuk menyimpan string/number kedalam array
    let hasilKali = n * 3 // Karena perulangan 3, jadi mencari dulu akhir dari nilainya
    //Contoh disini n atau parameternya tu diisi dengan 15, maka n akan dikalikan dengan 3. Jadi, 15 * 3 = 45 (Nilai akhirnya itu berada di 45)
    for( let i = 3; i <= hasilKali; i += 3 ){ //Membuat perulangan untuk mencetak nilai hingga 45 / hasilKali

        // Membuat peng-kondisi-an dengan else if
        if(i % 5 === 0 && i % 6 === 0){ // Kondisi yang mana i / hasil dari perulangannya itu bisa di modulus 5 dan 6 dan menghasilkan nilai 0 atau tersisa 0

            arr.push('KASKUS') // Akan ter-eksekusi apabila kondisi diatas terpenuhi, yang hasilnya itu nanti akan mengganti value menjadi 'KASKUS' dan dimasukkan kedalam array

        } else if(i % 6 === 0){ // Kondisi yang mana i / hasil dari perulangannya itu hanya bisa di modulus 6 dan menghasilkan nilai 0 atau tersisa 0

            arr.push('KUS')// Akan ter-eksekusi apabila kondisi diatas terpenuhi, yang hasilnya itu nanti akan mengganti value menjadi 'KUS' dan dimasukkan kedalam array

        } else if(i % 5 === 0){ // Kondisi yang mana i / hasil dari perulangannya itu hanya bisa di modulus 5 dan menghasilkan nilai 0 atau tersisa 0

            arr.push('KAS')// Akan ter-eksekusi apabila kondisi diatas terpenuhi, yang hasilnya itu nanti akan mengganti value menjadi 'KAS' dan dimasukkan kedalam array

        } else {
            arr.push(i) // Akan ter-eksekusi apabila semua kondisi diatas tidak terpenuhi yang mana nantinya akan mencetak value atau nilai berupa number
        }
    }
    return arr; // mengembalikan ke variable arr
}
console.log(deretKaskus(10));