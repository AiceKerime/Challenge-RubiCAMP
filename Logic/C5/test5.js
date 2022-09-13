function stringManipulation(word) {
    if (word.startsWith('a') || word.startsWith('i') || word.startsWith('u') || word.startsWith('e') || word.startsWith('o') || word.startsWith('A') || word.startsWith('I') || word.startsWith('U') || word.startsWith('E') || word.startsWith('O')) {
        console.log(word) // Membuat suatu kondisi yang mana jika kata yang dimasukkan ke parameter word diawali dengan huruf a/i/u/e/o/A/I/U/E/O makan print kembali kata tersebut
    } else {
        console.log(`${word.substr(1)}${word[0]}nyo`) // Tetapi jika kondisi diatas tidak terpenuhi maka huruf pertama (konsonan) akan dihapus dengan method .substr(1) yang kemudian huruf pertama tersebut akan direplace ke akhir kata dan ditambahkan kata 'nyo' yang akan langsung tercetak di console
    }
}

stringManipulation('ITIK') // => 'ITIK'
stringManipulation('ayam') // => 'ayam'
stringManipulation('bebek') // => 'ebekbnyo'