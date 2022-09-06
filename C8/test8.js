let pola = (str) => {
    let arr = [] //Membuat suatu variable berupa array untuk menampung value
    let splitStr = str.split(' ') // Membuat variable yang isinya itu akan membagi/memotong parameter str berdasarkan spasi ---- "42#3 * 188 = 80$#04"

    let angkaSatu = splitStr[0] // Membuat variable yang nantinya akan mengakses index ke-0 dari value yang dihasilkan splitStr ---- "42#3"
    let angkaDua = splitStr[2]  // Membuat variable yang nantinya akan mengakses index ke-2 dari value yang dihasilkan splitStr ---- "188"
    let angkaTiga = splitStr[4] // Membuat variable yang nantinya akan mengakses index ke-4 dari value yang dihasilkan splitStr ---- "80#204"


    // Karena yang harus ditemukan jawabannya itu berada di index 0 dan 4, maka:
    for (let f = 0; f < 10; f++) { // Membuat perulangan yang tugasnya nanti akan menghasilkan value dari 0-9
        let firstNum = angkaSatu.replace(/#/, f) // Setelah perulangan selesai maka akan di replace ke variable angkaSatu atau lebih tepatnya mengganti # dengan value dari perulangan f
        for (let n = 0; n < 10; n++) {// Membuat perulangan yang tugasnya nanti akan menghasilkan value dari 0-9
            let thirdNum = angkaTiga.replace(/#/, n)// Setelah perulangan selesai maka akan di replace ke variable angkaTiga atau lebih tepatnya mengganti # dengan value dari perulangan n
            if (Number(firstNum) * angkaDua === Number(thirdNum)) { // Membuat peng-kondisi-an yang mana akan mengubah firstNum menjadi Number kemudian dikalikan dengan angkaDua lalu dibandingkan apakah ada value yang sama dengan thirdNum yang type data nya telah menjadi Number atau tidak ---- 4283 * 188 = 805204
                arr.push(f, n) // Yang kemudian nantinya setelah memalui perulangan dan pen-kondisi-an maka akan di push atau dimasukkan ke dalam variable arr (Variable penampung yang berupa array)
            }
        }
    }
    return arr; // Mengembalikan value atau nilai dari variable arr
}

console.log(pola("42#3 * 188 = 80#204"));
console.log(pola("8#61 * 895 = 78410#5"));