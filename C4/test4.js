function indexPrime(param1) {
    let arr = []; // Membuat variable berupa array sebagai penampung 

    for (let i = 2; i; i++){ // Melakukan perulangan dengan variable i yang mana dimulai dari 2 yang nanti nya akan bertambah 1 di looping berikutnya
        let isPrime = true // Membuat variable yang memiliki value berupa boolean yaitu true
        for (let j = 2; j < i; j++){ // Melakukan perulangan lagi dengan variable j yang mana sama-sama dimulai dari 2 dan jika j itu memiliki nilai lebih kecil dari hasil perulangan i, makan akan terus mengulang dengan bertambah 1 sampai memiliki value yang lebih dari hasil perulangan i
            // console.log(j, "asu")
            if (i % j === 0){ // Membuat kondisi yang mana jika hasil dari i % j itu menghasilkan value 0
                isPrime = false; // Maka variable isPrime memiliki nilai false
                break; // Untuk menghentikan looping agar tidak terjadi infinity loop
            }
        }
        if (isPrime) arr.push(i); // Membuat kondisi yang mana jika variable isPrime memiliki nilai true
        if (arr.length === param1) break; // Membuat kondisi yang mana jika panjang dari value itu sama dengan parameter param1 akan langsung dihentikan oleh break
    }
    return arr[arr.length-1]; // Mengembalikan value dari arr yang mana arr ini meng-index ke value terakhir (arr.length-1) dari hasil perulangan diatas
}

console.log(indexPrime(4)) //result => 7
console.log(indexPrime(500)) //result => 3571
console.log(indexPrime(37786)) //result => 450881