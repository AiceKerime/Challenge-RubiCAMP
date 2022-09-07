function sentencesManipulation(sentence) {
    let str = ' '
    let wordSplit = sentence.split(' ')

    console.log(wordSplit, "splitted")

    for (let i = 0; i < wordSplit.length; i++) {
        let word = wordSplit[i]
        let hurufAwal = wordSplit[i].charAt(0);
        console.log(hurufAwal, "awal")

        if (word[0] == 'a' || word[0] == 'i' || word[0] == 'u' || word[0] == 'e' || word[0] == 'o') {
            str += wordSplit[i] + ' '
        } else {
            str += wordSplit[i].substr(1) + hurufAwal + 'nyo '
        }
    } 
    console.log(str)
}

sentencesManipulation('ibu pergi ke pasar bersama aku')