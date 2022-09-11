function stringManipulation(word) { // Function untuk memanipulasi string
    if (word[0].toLowerCase() == 'a' ||
        word[0].toLowerCase() == 'i' ||
        word[0].toLowerCase() == 'u' ||
        word[0].toLowerCase() == 'e' ||
        word[0].toLowerCase() == 'o') { // Membuat kondisi yang mana jika di kata tersebut diawali dengan huruf a, i , u , e, atau o (VOKAL).
        return word //  Maka akan mengembalikan atau me-print ulang kata tersebut.
    } else { // Kecuali
        return `${word.slice(1)}${word[0]}nyo` // Jika kondisinya tidak terpenuhi maka akan membuat huruf awal dari kata tersebut berpindah ke depan dan diberikan tambahan kata nyo. 
    }
}
function sentenceManipulation(sentence) { // Function untuk memanipulasi kalimat
    const words = sentence.split(' ') // Variable untuk membuat kalimat menjadi array yang dibagi berdasarkan spasi 
    const result = [] // Variable untuk menampung hasil atau result

    // for...in, perulangan yang diperuntukan untuk object
    // for...of, perulangan yang diperuntukan untuk object atau array

    words.forEach(word => { // forEach berfungsi untuk melakukan perulangan pada array dan tidak dijalankan untuk elemen yang kosong
        result.push(stringManipulation(word)) // Memasukkan hasil dari function untuk memanipulasi string dan kalimat diatas kedalam variable result
    })
    console.log(result.join(' ')) // Untuk mengubah array menjadi string berdasarkan spasi 
}
sentenceManipulation('ibu pergi ke pasar bersama aku')
sentenceManipulation('aku makan baso siang hari')