function sentencesManipulation(sentence) {
    let str = ' ' // Membuat variable yang isinya merupakan string kosong
    let wordSplit = sentence.split(' ') // Membuat variable yang nantinya akan membagi value dari parameter sentece

    for (let i = 0; i < wordSplit.length; i++) { // Membuat perulangan yang mana statement pertama dimulai dari 0 kemudian di statement ke 2 akan dicari panjang dari parameter sentence yang telah di split/dibagi value nya, dan akan bertambah 1 ketika terjadi perulangan lagi
        let word = wordSplit[i] // Membuat variable yang isinya itu berupa kalimat yang telah di split yang meng-index ke i
        let hurufAwal = wordSplit[i].charAt(0); // Mengambil huruf awal dari tiap kata yang terdapat di parameter yang telah displit 

        if (word.startsWith('a') || word.startsWith('i') || word.startsWith('u') || word.startsWith('e') || word.startsWith('o') || word.startsWith('A') || word.startsWith('I') || word.startsWith('U') || word.startsWith('E') || word.startsWith('O')) {
            str += wordSplit[i] + ' ' // Membuat suatu kondisi yang mana jika word atau parameter sentence yang telah di split dan meng-index ke i dimulai dengan huruf a/i/u/e/o/A/I/U/E/O maka akan menambahkan kata tersebut ke variable penampung (str), lalu ditambahkan dengan hasil dari perulangan wordSplit yang meng-index ke i dan ditambahkan spasi
        } else {
            str += wordSplit[i].substr(1) + hurufAwal + 'nyo ' // Tetapi jika kondisi diatas tidak terpenuhi maka huruf pertama (konsonan) akan dihapus dengan method .substr(1) yang kemudian huruf pertama tersebut akan direplace ke akhir kata dan ditambahkan kata 'nyo'
        }
    } 
    console.log(str) // Memanggil atau mencetak hasil dari perulangan dan pen-kondisi-an diatas
}

sentencesManipulation('ibu pergi ke pasar bersama aku')