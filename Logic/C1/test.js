function sum() {
    let hasil = 0; // Membuat wadah awal yang memiliki nilai awal 0
    for (let i = 0; i < arguments.length; i++) { // Perulangan yang nantinya akan me-looping sesuai dengan panjang dari arguments/parameter dimulai dari nol dan bertambah 1 setiap looping
        hasil += arguments[i]; // untuk menambahkan hasil dengan panjang dari arguments
        //Contohnya 0 + 1 + 2 + 7 = 10
    }
    console.log(hasil)
}

sum(1, 2, 7); // Value atau isinya itu 10
sum(1, 4); // Value atau isinya itu 5
sum(11); // Value atau isinya itu 11
sum(10, 3, 6, 7, 9); // Value atau isinya itu 35