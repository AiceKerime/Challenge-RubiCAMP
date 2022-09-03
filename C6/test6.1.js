function sentencesManipulation(sentence) {
    let str = ' '
    let wordSplit = sentence.split(' ')

    for (let i = 0; i < wordSplit.length; i++) {
        let word = wordSplit[i]
        let hurufAwal = wordSplit[i].charAt(0);

        if (word.startsWith('a') || word.startsWith('i') || word.startsWith('u') || word.startsWith('e') || word.startsWith('o') || word.startsWith('A') || word.startsWith('I') || word.startsWith('U') || word.startsWith('E') || word.startsWith('O')) {
            str += wordSplit[i] + ' '
        } else {
            str += wordSplit[i].substr(1) + hurufAwal + 'nyo '
        }
    } 
    console.log(str)
}

sentencesManipulation('kucing suka makan ikan emas')